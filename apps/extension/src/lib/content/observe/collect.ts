import type { SnapshotType } from '@deepscope/detection/observations/snapshot';
import * as dom from "@deepscope/dom";

import * as scan from './scan.ts';
import type * as observe from './types.ts';

import type { ObserverState } from './state.ts';
import { isScanRoot, isDocumentNode } from './nodes.ts';
import type { Type as Evidence } from './evidence.ts';

/** Scans share the session's cancellation token and bounded evidence owner. */
export interface Dependencies {
	readonly state: ObserverState;
	readonly evidence: Evidence;
	readonly logObserverEvent: (event: string, details?: Record<string, unknown>) => void;
}

/** Collection operations used by snapshot and mutation flushes. */
export interface Type {
	readonly scanNode: (node: Node, deep: boolean, content: observe.SnapshotOptionsType, generation: number) => Promise<void>;
	readonly scanSnapshot: (content: observe.SnapshotOptionsType, signal?: AbortSignal) => Promise<SnapshotType>;
	readonly scanDocument: (content: observe.SnapshotOptionsType, generation: number) => Promise<void>;
	readonly getContent: () => observe.SnapshotOptionsType;
}

/** Create time-sliced scanners that reject results from a canceled or replaced session. */
export function create(dependencies: Dependencies): Type {
	const { state, evidence, logObserverEvent } = dependencies;
	const { rememberSnapshot } = evidence;
	/** Scan one changed DOM region through the shared resource and selector walker. */
	async function scanNode(
		node: Node,
		deep: boolean,
		content: observe.SnapshotOptionsType,
		generation: number,
	): Promise<void> {
		if (state.activeSession?.generation !== generation || !isScanRoot(node)) return;
		const signal = state.activeSession.scanAbortController.signal;
		const snapshot = await scan.node({
			root: node,
			deep,
			content,
			plan: state.activeSession.domSelectorPlan,
			matched: evidence.selectors,
			signal,
			/** Attribute cooperative scan counters to this scan root and depth without retaining the walked DOM elements. */
			onStats: (stats) => logScan(node, deep, stats),
		});
		if (signal.aborted || state.activeSession?.generation !== generation) return;
		rememberSnapshot(snapshot, generation);
	}

	/** Collect one complete document snapshot without serializing or retaining the DOM. */
	async function scanSnapshot(
		content: observe.SnapshotOptionsType,
		signal?: AbortSignal,
	): Promise<SnapshotType> {
		return await scan.page({
			content,
			plan: state.activeSession?.domSelectorPlan ?? content.domSelectorPlan,
			matched: evidence.selectors,
			...(signal ? { signal } : {}),
			/** Attribute cooperative scan counters to this scan root and depth without retaining the walked DOM elements. */
			onStats: (stats) => logScan(globalThis.document, true, stats),
		});
	}

	/** Record bounded renderer-work measurements without retaining the scanned DOM root. */
	function logScan(root: ParentNode, deep: boolean, stats: dom.MatchStatsType): void {
		logObserverEvent('dom-scan', {
			sessionId: state.activeSession?.sessionId,
			scope: isDocumentNode(root) ? 'document' : deep ? 'subtree' : 'element',
			selectorCount: state.activeSession?.domSelectorPlan?.selectors.length ?? 0,
			retiredSelectorCount: evidence.selectors.size,
			...stats,
		});
	}

	/** Rebuild complete document evidence only for an active session or overflow fallback. */
	async function scanDocument(
		content: observe.SnapshotOptionsType,
		generation: number,
	): Promise<void> {
		if (state.activeSession?.generation !== generation) return;
		const signal = state.activeSession.scanAbortController.signal;
		const snapshot = await scanSnapshot(content, signal);
		if (signal.aborted || state.activeSession?.generation !== generation) return;
		rememberSnapshot(snapshot, generation);
		state.lastScannedAt = Date.now();
	}

	/** Return content flags owned by the active observation session. */
	function getContent(): observe.SnapshotOptionsType {
		return {
			includeScriptContent: state.activeSession?.includeScriptContent === true,
			includeStylesheetContent: state.activeSession?.includeStylesheetContent === true,
		};
	}
	return { scanNode, scanSnapshot, scanDocument, getContent };
}
