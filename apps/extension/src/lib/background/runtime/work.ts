import type { MatcherJobTerminalReason } from "../../matcher/index.ts";

import { diagnosticErrorType } from "@deepscope/detection/privacy/redaction";

import * as url from '../../../utils/url.ts';

import type { BackgroundRuntimeDependencies, InspectableTab, TabDocumentWorkScope } from './types.ts';

/** Only adapters and peer operations needed by this owner. Constructors perform no browser work. */
export interface Dependencies {
	readonly logEvent: BackgroundRuntimeDependencies['logEvent'];
	readonly matcher: Pick<BackgroundRuntimeDependencies['matcher'], 'cancelTab'>;
}

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly beginDocumentWork: (tab: InspectableTab, reason?: MatcherJobTerminalReason) => TabDocumentWorkScope;
	readonly getDocumentWork: (tab: InspectableTab, expectedUrl?: string) => TabDocumentWorkScope;
	readonly abortDocumentWork: (tabId: number, reason: MatcherJobTerminalReason) => void;
}

/** Create one work owner for the background context. */
export function create(dependencies: Dependencies): Type {
	const logBackgroundEvent = dependencies.logEvent;

	/** Current document work scope for each tab. Small control state survives until replacement/navigation. */
	const documentWorkByTab = new Map<number, TabDocumentWorkScope>();

	let documentWorkGeneration = 0;

	/** Create a new document-work generation and cancel every older generation for the tab. */
	function beginDocumentWork(tab: InspectableTab, reason: MatcherJobTerminalReason = 'newer-job'): TabDocumentWorkScope {
		abortDocumentWork(tab.id, reason);
		const generation = ++documentWorkGeneration;
		const scope: TabDocumentWorkScope = {
			tabId: tab.id,
			windowId: tab.windowId,
			expectedUrl: tab.url,
			generation,
			lifecycleId: `matcher-lifecycle:${tab.id}:${generation}:${Date.now()}`,
			controller: new AbortController(),
		};
		documentWorkByTab.set(tab.id, scope);
		return scope;
	}

	/** Reuse the current exact-document scope or create one after service-worker recovery. */
	function getDocumentWork(tab: InspectableTab, expectedUrl = tab.url): TabDocumentWorkScope {
		const current = documentWorkByTab.get(tab.id);
		if (current && !current.controller.signal.aborted && url.sameDocument(current.expectedUrl, expectedUrl)) {
			return current;
		}
		return beginDocumentWork(tab);
	}

	/** Abort background work and ask the offscreen host to discard tab-owned queue/worker state. */
	function abortDocumentWork(tabId: number, reason: MatcherJobTerminalReason): void {
		const scope = documentWorkByTab.get(tabId);
		if (scope && !scope.controller.signal.aborted) {
			scope.abortReason = reason;
			scope.controller.abort(new DOMException(`Tab document work canceled: ${reason}.`, 'AbortError'));
		}
		documentWorkByTab.delete(tabId);
		void dependencies.matcher.cancelTab(tabId, reason).catch((error: unknown) => {
			logBackgroundEvent('matcher-tab-cancel-failed', { tabId, reason, errorType: diagnosticErrorType(error) });
		});
	}

	return { beginDocumentWork, getDocumentWork, abortDocumentWork };
}
