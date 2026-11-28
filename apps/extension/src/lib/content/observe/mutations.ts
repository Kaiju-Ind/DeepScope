import type { DomPlanType, DomSiblingType } from "@deepscope/dom";

import type * as observe from './types.ts';

import type { ObserverState } from './state.ts';
import { containsNode, canScanNode, matchesSignal, previousElement, nextElement, isScanRoot, isElementNode, isFragmentNode, isDocumentNode, getParentElement, isSignalElement } from './nodes.ts';

const MAX_PENDING_MUTATION_NODES = 100;

/** Callbacks are invoked only by a registered mutation observer or its trailing timer. */
export interface Dependencies {
	readonly state: ObserverState;
	readonly options: observe.OptionsType;
	readonly logObserverEvent: (event: string, details?: Record<string, unknown>) => void;
	readonly stopSession: (reason: observe.StopReasonType) => observe.StateType;
	readonly flushMutations: (content?: observe.SnapshotOptionsType, notify?: boolean, generation?: number) => Promise<void>;
}

/** Queue and native observer lifetime owned by one content runtime. */
export interface Type {
	readonly clearMutations: () => void;
	readonly clearFlushTimer: () => void;
	readonly disconnect: () => void;
	readonly start: (plan?: DomPlanType) => void;
	/** Iterate live queued roots in the same order in which mutations inserted them. */
	readonly roots: () => IterableIterator<[Node, boolean]>;
	readonly requiresDocumentScan: () => boolean;
}

/** Limit attribute observation to selectors and resource-bearing DOM attributes. */
function createAttributeFilter(plan: DomPlanType | undefined): string[] {
	if (plan?.attributeFilter.length) return [...plan.attributeFilter];
	return ['src', 'href', 'rel', 'name', 'property', 'http-equiv', 'content'];
}

/** Coalesce mutation roots while keeping DOM references out of evidence storage. */
export function create(dependencies: Dependencies): Type {
	const { state, options, logObserverEvent, stopSession, flushMutations } = dependencies;
	const pendingScans = new Map<Node, boolean>();
	let pendingFullDocumentScan = false;
	let throttleTimer: ReturnType<typeof globalThis.setTimeout> | undefined;
	/** Drop queued mutation roots and reset the current mutation burst count. */
	function clearMutations(): void {
		pendingScans.clear();
		pendingFullDocumentScan = false;
		state.pendingMutationCount = 0;
	}

	/** Return the active mutation-root limit, with a safe pre-session fallback. */
	function getPendingLimit(): number {
		return state.activeSession?.maxPendingNodes ?? MAX_PENDING_MUTATION_NODES;
	}

	/** Cancel the pending DOM mutation flush. */
	function clearFlushTimer(): void {
		if (throttleTimer !== undefined) {
			globalThis.clearTimeout(throttleTimer);
			throttleTimer = undefined;
		}
	}

	/** Schedule one trailing DOM scan for the current mutation burst. */
	function scheduleFlush(): void {
		if (throttleTimer !== undefined) {
			return;
		}

		const generation = state.activeSession?.generation;
		throttleTimer = globalThis.setTimeout(() => {
			void flushMutations(undefined, true, generation);
		}, options.throttleMs);
	}

	/** Queue one conservative document scan and record why local invalidation was insufficient. */
	function queueDocument(reason: 'structural-selector' | 'structural-attribute'): boolean {
		const queued = queueScan(globalThis.document, true, true);
		if (queued) {
			logObserverEvent('mutation-document-scan-queued', {
				sessionId: state.activeSession?.sessionId,
				reason,
			});
		}
		return queued;
	}

	/**
	 * Queue one DOM region while preserving the smallest required scan set.
	 *
	 * A deep scan subsumes every contained scan. A self-only structural recheck does
	 * not subsume descendant work because `A + B`, positional selectors, and `:has()`
	 * can require existing elements outside the newly inserted subtree.
	 */
	function queueScan(node: Node, deep: boolean, force = false): boolean {
		if (pendingFullDocumentScan || !isScanRoot(node)) return false;
		if (!force && !canScanNode(node, state.activeSession?.domSelectorPlan)) return false;

		const current = pendingScans.get(node);
		if (current !== undefined) {
			if (deep && !current) pendingScans.set(node, true);
			return deep && !current;
		}

		for (const [pending, pendingDeep] of pendingScans) {
			if (pendingDeep && containsNode(pending, node)) return false;
		}
		if (deep) {
			for (const pending of pendingScans.keys()) {
				if (containsNode(node, pending)) pendingScans.delete(pending);
			}
		}

		if (pendingScans.size >= getPendingLimit()) {
			const queuedCount = pendingScans.size;
			pendingScans.clear();
			pendingFullDocumentScan = true;
			logObserverEvent('mutation-scan-overflow', {
				sessionId: state.activeSession?.sessionId,
				queuedCount,
				limit: getPendingLimit(),
			});
			return true;
		}

		pendingScans.set(node, deep);
		return true;
	}

	/** Queue inserted content and existing nodes whose structural selector truth changed. */
	function queueChildMutation(mutation: MutationRecord): boolean {
		let queued = false;
		const plan = state.activeSession?.domSelectorPlan;
		if (plan?.mutation.documentOnChildList && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
			return queueDocument('structural-selector');
		}
		for (const node of mutation.addedNodes) {
			queued = queueScan(node, true) || queued;
			if (plan && isElementNode(node)) queued = queueSiblingImpact(node, plan.mutation.siblings) || queued;
		}

		const impact = plan?.mutation;
		if (!impact || (mutation.addedNodes.length === 0 && mutation.removedNodes.length === 0)) return queued;

		// Removing one or more nodes can make the surviving nodes on each side newly
		// adjacent. Recheck only the right survivor when the left survivor could satisfy
		// an authored adjacent-sibling trigger.
		if (mutation.removedNodes.length > 0) {
			const left = previousElement(mutation.previousSibling);
			const right = nextElement(mutation.nextSibling);
			if (left && right) queued = queueAdjacentSurvivor(left, right, impact.siblings) || queued;
		}

		if (impact.parentOnChildList) {
			queued = queueScan(mutation.target, impact.parentDeepOnChildList, true) || queued;
			queued = queueChildren(mutation.target, impact.parentDeepOnChildList) || queued;
		}
		if (impact.ancestorsOnChildList) {
			queued = queueAncestors(mutation.target, impact.ancestorDeepOnChildList) || queued;
		}
		return queued;
	}

	/** Queue an attribute target and only the structural regions that can become matches. */
	function queueAttributeMutation(mutation: MutationRecord): boolean {
		if (!isElementNode(mutation.target)) return false;
		const plan = state.activeSession?.domSelectorPlan;
		const attribute = mutation.attributeName?.toLowerCase() ?? '';
		if (attribute && plan?.mutation.documentAttributes.includes(attribute)) {
			return queueDocument('structural-attribute');
		}
		let queued = queueScan(
			mutation.target,
			false,
			isSignalElement(mutation.target) || Boolean(plan?.selectors.length),
		);
		if (!plan || !attribute) return queued;

		if (plan.mutation.descendantAttributes.includes(attribute)) {
			queued = queueScan(mutation.target, true, true) || queued;
		}
		if (plan.mutation.siblingAttributes.includes(attribute)) {
			queued = queueSiblingImpact(mutation.target, plan.mutation.siblings) || queued;
		}
		if (plan.mutation.ancestorAttributes.includes(attribute)) {
			queued = queueAncestors(mutation.target, plan.mutation.ancestorDeepOnChildList) || queued;
		}
		return queued;
	}

	/** Recheck existing direct children for child-position structural selectors. */
	function queueChildren(node: Node, deep: boolean): boolean {
		if (!isElementNode(node) && !isDocumentNode(node) && !isFragmentNode(node)) return false;
		let queued = false;
		for (const child of node.children) queued = queueScan(child, deep, true) || queued;
		return queued;
	}

	/** Route one changed left-side element to the sibling roots it can invalidate. */
	function queueSiblingImpact(node: Element, triggers: readonly DomSiblingType[]): boolean {
		let queued = false;
		for (const trigger of triggers) {
			if (!matchesSignal(node, trigger.left)) continue;
			if (trigger.kind === 'adjacent') {
				const sibling = node.nextElementSibling;
				if (sibling) queued = queueScan(sibling, trigger.deep, true) || queued;
				continue;
			}
			for (let sibling = node.nextElementSibling; sibling; sibling = sibling.nextElementSibling) {
				queued = queueScan(sibling, trigger.deep, true) || queued;
			}
		}
		return queued;
	}

	/** Recheck the right survivor after removals that can create a new adjacency. */
	function queueAdjacentSurvivor(
		left: Element,
		right: Element,
		triggers: readonly DomSiblingType[],
	): boolean {
		let queued = false;
		for (const trigger of triggers) {
			if (trigger.kind !== 'adjacent' || !matchesSignal(left, trigger.left)) continue;
			queued = queueScan(right, trigger.deep, true) || queued;
		}
		return queued;
	}

	/** Recheck one element and its ancestors for selectors whose descendant state matters. */
	function queueAncestors(node: Node, deep: boolean): boolean {
		let current = isElementNode(node) ? node : getParentElement(node);
		let queued = false;
		while (current) {
			queued = queueScan(current, deep, true) || queued;
			current = current.parentElement;
		}
		return queued;
	}

	const observer = new globalThis.MutationObserver((mutations) => {
		if (!state.activeSession) {
			return;
		}

		let hasRelevantMutation = false;

		for (const mutation of mutations) {
			if (mutation.type === 'childList') {
				hasRelevantMutation = queueChildMutation(mutation) || hasRelevantMutation;
				continue;
			}

			if (mutation.type === 'attributes') {
				hasRelevantMutation = queueAttributeMutation(mutation) || hasRelevantMutation;
			}
		}

		if (!hasRelevantMutation) {
			return;
		}

		state.lastObservedAt = Date.now();
		state.pendingMutationCount += mutations.length;
		if (state.sessionStatus !== 'dirty') {
			logObserverEvent('session-dirty', {
				sessionId: state.activeSession.sessionId,
				pendingMutationCount: state.pendingMutationCount,
				mutationBatchSize: mutations.length,
			});
		}
		state.sessionStatus = 'dirty';

		if (state.activeSession.maxMutations > 0 && state.pendingMutationCount >= state.activeSession.maxMutations) {
			logObserverEvent('session-max-mutations-reached', {
				sessionId: state.activeSession.sessionId,
				pendingMutationCount: state.pendingMutationCount,
				maxMutations: state.activeSession.maxMutations,
			});
			stopSession('expired');
			return;
		}

		scheduleFlush();
	});
	return {
		clearMutations,
		clearFlushTimer,
		/** Stop future mutation deliveries; the runtime owner separately clears queued roots and timers. */
		disconnect: () => observer.disconnect(),
		/** Expose the live pending-root iterator so mutations added during an awaited scan retain existing iteration semantics. */
		roots: () => pendingScans.entries(),
		/** Read whether accumulated mutations require a whole-document pass instead of individual roots. */
		requiresDocumentScan: () => pendingFullDocumentScan,
		/** Observe subtree structure and only the attributes requested by the current selector plan. */
		start(plan) {
			observer.observe(globalThis.document.documentElement ?? globalThis.document, {
				subtree: true,
				childList: true,
				attributes: true,
				attributeFilter: createAttributeFilter(plan),
			});
		},
	};
}
