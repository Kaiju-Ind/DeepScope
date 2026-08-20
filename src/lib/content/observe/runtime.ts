import { collectResourceEntries, collectResourceTimings } from '../collect-page-signals';
import { mergeStringsByTotalChars } from '../../detection/normalizers';
import { SOURCE_LIMITS } from '../../detection/source-limits';
import * as logging from '../../diagnostics/logging';
import type { PageSignals } from '../../detection/types';
import * as dom from '../../dom';
import type { DomPlanType, DomSiblingType, DomSignalType } from '../../dom';
import { isObservationSessionForUrl } from '../../lifecycle/observation';
import {
	createObservationBatchController,
	normalizeObservedPageSignalsSnapshot,
	type ObservationBatch,
	type ObservationTarget,
} from '../../observations';
import * as scan from './scan';
import type * as observe from './types';

const MAX_PENDING_MUTATION_NODES = 100;
const observerLogger = logging.get('content', 'observer');

type ActiveObservationSession = {
	/** Monotonic local generation used to reject late asynchronous scans. */
	readonly generation: number;
	/** Cancels time-sliced DOM scans when this session loses ownership. */
	readonly scanAbortController: AbortController;
	sessionId: string;
	expectedUrl: string;
	startedAt: number;
	expiresAt: number;
	maxPendingNodes: number;
	maxMutations: number;
	includeScriptContent: boolean;
	includeStylesheetContent: boolean;
	domSelectorPlan?: DomPlanType;
};

/** Emit structured observer diagnostics through the durable, rate-controlled logging path. */
function logObserverEvent(event: string, details?: Record<string, unknown>): void {
	observerLogger.debug('[kaiju-deepscope][content][observer] {event}', {
		event,
		...(details ?? {}),
	});
}

/** Create one bounded document observer and its local late-observation queue. */
export function create(options: observe.OptionsType): observe.SignalsType {
	const scripts = new Set<string>();
	const images = new Set<string>();
	const stylesheets = new Set<string>();
	let scriptContents: string[] = [];
	let stylesheetContents: string[] = [];
	const metaEntries = new Map<string, Set<string>>();
	const domSelectorEntries = new Map<string, boolean>();
	const linkEntries = new Map<string, PageSignals['links'][number]>();
	const resourceEntries = new Map<string, PageSignals['resources'][number]>();
	const requestEntries = new Map<string, PageSignals['requests'][number]>();
	const pendingScans = new Map<Node, boolean>();
	let throttleTimer: ReturnType<typeof globalThis.setTimeout> | undefined;
	let batchNoticeTimer: ReturnType<typeof globalThis.setTimeout> | undefined;
	let resourceObserver: PerformanceObserver | undefined;
	let activeSession: ActiveObservationSession | undefined;
	let observationGeneration = 0;
	let sessionStatus: observe.StatusType = 'idle';
	let stopReason: observe.StopReasonType | undefined;
	let lastObservedAt: number | undefined;
	let lastScannedAt: number | undefined;
	let pendingMutationCount = 0;
	let pendingFullDocumentScan = false;
	const observationBatchController = createObservationBatchController();

	/** Release page-owned evidence retained by a completed observation session. */
	function clearEvidence(): void {
		scripts.clear();
		images.clear();
		stylesheets.clear();
		scriptContents = [];
		stylesheetContents = [];
		metaEntries.clear();
		domSelectorEntries.clear();
		linkEntries.clear();
		resourceEntries.clear();
		requestEntries.clear();
	}

	/** Drop queued mutation roots and reset the current mutation burst count. */
	function clearMutations(): void {
		pendingScans.clear();
		pendingFullDocumentScan = false;
		pendingMutationCount = 0;
	}

	/** Return the active mutation-root limit, with a safe pre-session fallback. */
	function getPendingLimit(): number {
		return activeSession?.maxPendingNodes ?? MAX_PENDING_MUTATION_NODES;
	}

	/** Cancel the pending DOM mutation flush. */
	function clearFlushTimer(): void {
		if (throttleTimer !== undefined) {
			globalThis.clearTimeout(throttleTimer);
			throttleTimer = undefined;
		}
	}

	/** Cancel the pending background dirty notification. */
	function clearNoticeTimer(): void {
		if (batchNoticeTimer !== undefined) {
			globalThis.clearTimeout(batchNoticeTimer);
			batchNoticeTimer = undefined;
		}
	}

	/** Disconnect the incremental Performance Timeline observer. */
	function stopResources(): void {
		resourceObserver?.disconnect();
		resourceObserver = undefined;
	}

	/** Stop every live observer owned by the current document session. */
	function stopSession(reason: observe.StopReasonType): observe.StateType {
		const session = activeSession;
		session?.scanAbortController.abort();
		observationGeneration += 1;
		const queue = observationBatchController.stats();
		const retained = getRetainedEvidenceCounts();
		observer.disconnect();
		stopResources();
		clearFlushTimer();
		clearNoticeTimer();
		clearMutations();
		observationBatchController.reset();
		activeSession = undefined;
		sessionStatus = 'stopped';
		stopReason = reason;
		clearEvidence();
		logObserverEvent('session-stopped', {
			sessionId: session?.sessionId,
			reason,
			queuedObservationCount: queue.queuedCount,
			acceptedObservationCount: queue.acceptedCount,
			duplicateDropCount: queue.duplicateDropCount,
			queueLimitDropCount: queue.queueLimitDropCount,
			stormLimitDropCount: queue.stormLimitDropCount,
			...retained,
		});
		return {
			...getState(),
			...(session ? {
				sessionId: session.sessionId,
				expectedUrl: session.expectedUrl,
				startedAt: session.startedAt,
				expiresAt: session.expiresAt,
			} : {}),
		};
	}

	/** Return count-only evidence-retention diagnostics without exposing page values. */
	function getRetainedEvidenceCounts(): Record<string, number> {
		return {
			retainedScriptCount: scripts.size,
			retainedImageCount: images.size,
			retainedStylesheetCount: stylesheets.size,
			retainedScriptContentCount: scriptContents.length,
			retainedStylesheetContentCount: stylesheetContents.length,
			retainedMetaKeyCount: metaEntries.size,
			retainedSelectorCount: domSelectorEntries.size,
			retainedLinkCount: linkEntries.size,
			retainedResourceCount: resourceEntries.size,
			retainedRequestCount: requestEntries.size,
		};
	}

	/** Stop before old-document evidence can cross into a newly loaded page. */
	function stopIfNavigated(): void {
		if (!activeSession || isObservationSessionForUrl(activeSession, globalThis.location.href)) {
			return;
		}

		logObserverEvent('session-navigation', {
			sessionId: activeSession.sessionId,
			expectedUrl: activeSession.expectedUrl,
			actualUrl: globalThis.location.href,
		});
		stopSession('navigation');
	}

	/** Remember resource entries without rescanning the complete Performance Timeline. */
	function rememberResources(
		resources: PageSignals['resources'],
		notify: boolean,
		generation = activeSession?.generation,
	): void {
		if (resources.length === 0) return;

		const acceptedBefore = observationBatchController.stats().acceptedCount;
		rememberSnapshot({
			...scan.empty(),
			resources,
			requests: resources.map((resource) => ({
				url: resource.url,
				type: resource.initiatorType,
			})),
		}, generation);

		if (observationBatchController.stats().acceptedCount <= acceptedBefore) return;
		lastObservedAt = Date.now();
		if (notify) scheduleNotice();
	}

	/** Remember resources that existed before the live PerformanceObserver started reporting entries. */
	function rememberTimings(notify = false): void {
		rememberResources(collectResourceTimings(), notify, activeSession?.generation);
	}

	/** Observe only new resource entries after the initial timeline snapshot. */
	function startResources(): void {
		stopResources();

		if (typeof globalThis.PerformanceObserver !== 'function') return;
		const generation = activeSession?.generation;
		if (generation === undefined) return;

		try {
			resourceObserver = new globalThis.PerformanceObserver((list) => {
				if (activeSession?.generation !== generation) return;
				rememberResources(collectResourceEntries(list.getEntries()), true, generation);
			});

			try {
				resourceObserver.observe({ type: 'resource' });
			} catch {
				resourceObserver.observe({ entryTypes: ['resource'] });
			}
		} catch {
			stopResources();
		}
	}

	/** Merge bounded meta values into the document-level evidence cache. */
	function rememberMeta(meta: Record<string, string[]>): void {
		for (const [key, values] of Object.entries(meta)) {
			let bucket = metaEntries.get(key);
			if (!bucket) {
				bucket = new Set<string>();
				metaEntries.set(key, bucket);
			}

			for (const value of values) {
				if (bucket.size >= SOURCE_LIMITS.metaValuesPerKey) {
					break;
				}
				bucket.add(value);
			}
		}
	}

	/** Preserve selector matches once observed because later DOM removal does not erase evidence. */
	function rememberSelectors(selectors: Record<string, boolean>): void {
		const selectorLimit = activeSession?.domSelectorPlan?.selectors.length ?? Number.POSITIVE_INFINITY;
		for (const [selector, matched] of Object.entries(selectors)) {
			if (!matched) continue;
			if (!domSelectorEntries.has(selector) && domSelectorEntries.size >= selectorLimit) continue;
			domSelectorEntries.set(selector, true);
		}
	}

	/** Merge one incremental page snapshot and enqueue its normalized observations. */
	function rememberSnapshot(snapshot: observe.SnapshotType, generation?: number): void {
		if (generation !== undefined && activeSession?.generation !== generation) return;
		const observedAt = Date.now();
		for (const source of snapshot.images) {
			addBoundedValue(images, source, SOURCE_LIMITS.imageSrc);
		}
		for (const source of snapshot.scripts) {
			addBoundedValue(scripts, source, SOURCE_LIMITS.scriptSrc);
		}

		for (const href of snapshot.stylesheets) {
			addBoundedValue(stylesheets, href, SOURCE_LIMITS.stylesheetHref);
		}

		scriptContents = mergeStringsByTotalChars(
			scriptContents,
			snapshot.scriptContents,
			SOURCE_LIMITS.scriptContentItems,
			SOURCE_LIMITS.scriptContentChars,
			SOURCE_LIMITS.scriptContentTotalChars,
		);

		stylesheetContents = mergeStringsByTotalChars(
			stylesheetContents,
			snapshot.stylesheetContents,
			SOURCE_LIMITS.stylesheetContentItems,
			SOURCE_LIMITS.stylesheetContentChars,
			SOURCE_LIMITS.stylesheetContentTotalChars,
		);

		for (const link of snapshot.links) {
			setBoundedEntry(linkEntries, `${link.rel}:${link.type ?? ''}:${link.href}`, link, SOURCE_LIMITS.linkTags);
		}

		for (const resource of snapshot.resources) {
			setBoundedEntry(resourceEntries, resource.url, resource, SOURCE_LIMITS.resourceUrls);
		}

		for (const request of snapshot.requests) {
			setBoundedEntry(requestEntries, request.url, request, SOURCE_LIMITS.requestUrls);
		}

		rememberMeta(snapshot.meta);
		rememberSelectors(snapshot.dom.selectors);
		enqueueSnapshot(snapshot, observedAt);
	}

	/** Normalize one incremental snapshot into the bounded observation controller. */
	function enqueueSnapshot(snapshot: observe.SnapshotType, observedAt: number): void {
		const target = getTarget();
		if (!target || sessionStatus === 'stopped') return;

		const batch = normalizeObservedPageSignalsSnapshot(snapshot, {
			target,
			observedAt,
			collector: 'content-observer',
		});

		for (const observation of batch.observations) observationBatchController.push(observation);
	}

	/** Return the current session target used to normalize late observations. */
	function getTarget(): ObservationTarget | undefined {
		if (!activeSession) return undefined;

		return {
			url: activeSession.expectedUrl,
			hostname: new globalThis.URL(activeSession.expectedUrl).hostname,
		};
	}

	/** Scan one changed DOM region through the shared resource and selector walker. */
	async function scanNode(
		node: Node,
		deep: boolean,
		content: observe.SnapshotOptionsType,
		generation: number,
	): Promise<void> {
		if (activeSession?.generation !== generation || !isScanRoot(node)) return;
		const signal = activeSession.scanAbortController.signal;
		const snapshot = await scan.node({
			root: node,
			deep,
			content,
			plan: activeSession.domSelectorPlan,
			matched: domSelectorEntries,
			signal,
			onStats: (stats) => logScan(node, deep, stats),
		});
		if (signal.aborted || activeSession?.generation !== generation) return;
		rememberSnapshot(snapshot, generation);
	}

	/** Collect one complete document snapshot without serializing or retaining the DOM. */
	async function scanSnapshot(
		content: observe.SnapshotOptionsType,
		signal?: AbortSignal,
	): Promise<observe.SnapshotType> {
		return await scan.document({
			content,
			plan: activeSession?.domSelectorPlan ?? content.domSelectorPlan,
			matched: domSelectorEntries,
			...(signal ? { signal } : {}),
			onStats: (stats) => logScan(globalThis.document, true, stats),
		});
	}

	/** Record bounded renderer-work measurements without retaining the scanned DOM root. */
	function logScan(root: ParentNode, deep: boolean, stats: dom.MatchStatsType): void {
		logObserverEvent('dom-scan', {
			sessionId: activeSession?.sessionId,
			scope: isDocumentNode(root) ? 'document' : deep ? 'subtree' : 'element',
			selectorCount: activeSession?.domSelectorPlan?.selectors.length ?? 0,
			retiredSelectorCount: domSelectorEntries.size,
			...stats,
		});
	}

	/** Rebuild complete document evidence only for an active session or overflow fallback. */
	async function scanDocument(
		content: observe.SnapshotOptionsType,
		generation: number,
	): Promise<void> {
		if (activeSession?.generation !== generation) return;
		const signal = activeSession.scanAbortController.signal;
		const snapshot = await scanSnapshot(content, signal);
		if (signal.aborted || activeSession?.generation !== generation) return;
		rememberSnapshot(snapshot, generation);
		lastScannedAt = Date.now();
	}

	/** Return content flags owned by the active observation session. */
	function getContent(): observe.SnapshotOptionsType {
		return {
			includeScriptContent: activeSession?.includeScriptContent === true,
			includeStylesheetContent: activeSession?.includeStylesheetContent === true,
		};
	}

	/** Flush the coalesced mutation roots without rescanning unrelated page state. */
	async function flushMutations(
		content = getContent(),
		notify = true,
		generation = activeSession?.generation,
	): Promise<void> {
		clearFlushTimer();
		if (generation === undefined || activeSession?.generation !== generation) return;
		const acceptedBefore = observationBatchController.stats().acceptedCount;

		if (pendingFullDocumentScan) {
			await scanDocument(content, generation);
		} else {
			for (const [node, deep] of pendingScans) {
				await scanNode(node, deep, content, generation);
				if (activeSession?.generation !== generation) return;
			}
		}

		if (activeSession?.generation !== generation) return;
		clearMutations();
		lastScannedAt = Date.now();

		if (activeSession && sessionStatus !== 'stopped') {
			sessionStatus = 'observing';
			if (notify && observationBatchController.stats().acceptedCount > acceptedBefore) {
				publishBatch();
			}
		}
	}

	/**
	 * Notify content runtime that bounded late observations are ready to flush.
	 *
	 * The callback carries lifecycle counters only. The observation records remain
	 * inside the local controller until the background explicitly flushes them.
	 */
	function publishBatch(): void {
		clearNoticeTimer();
		if (!activeSession || sessionStatus === 'stopped') return;

		const stats = observationBatchController.stats();
		if (stats.queuedCount === 0) return;

		options.onObservationBatchQueued?.({
			observedAt: lastScannedAt ?? lastObservedAt ?? Date.now(),
			stats,
			session: getState(),
		});
	}

	/** Coalesce resource-only dirty notifications to the same cadence as DOM scans. */
	function scheduleNotice(): void {
		if (batchNoticeTimer !== undefined || observationBatchController.stats().queuedCount === 0) return;

		batchNoticeTimer = globalThis.setTimeout(() => {
			batchNoticeTimer = undefined;
			publishBatch();
		}, options.throttleMs);
	}

	/** Schedule one trailing DOM scan for the current mutation burst. */
	function scheduleFlush(): void {
		if (throttleTimer !== undefined) {
			return;
		}

		const generation = activeSession?.generation;
		throttleTimer = globalThis.setTimeout(() => {
			void flushMutations(undefined, true, generation);
		}, options.throttleMs);
	}

	/** Queue one conservative document scan and record why local invalidation was insufficient. */
	function queueDocument(reason: 'structural-selector' | 'structural-attribute'): boolean {
		const queued = queueScan(globalThis.document, true, true);
		if (queued) {
			logObserverEvent('mutation-document-scan-queued', {
				sessionId: activeSession?.sessionId,
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
		if (!force && !canScanNode(node, activeSession?.domSelectorPlan)) return false;

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
				sessionId: activeSession?.sessionId,
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
		const plan = activeSession?.domSelectorPlan;
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
		const plan = activeSession?.domSelectorPlan;
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

	/** Materialize bounded meta evidence for an explicit page snapshot. */
	function getMeta(): Record<string, string[]> {
		return Object.fromEntries(
			[...metaEntries.entries()].map(([key, values]) => [
				key,
				[...values].slice(0, SOURCE_LIMITS.metaValuesPerKey),
			]),
		);
	}

	/** Snapshot the authoritative lifecycle state without mutating the observer. */
	function getState(): observe.StateType {
		return {
			sessionId: activeSession?.sessionId,
			expectedUrl: activeSession?.expectedUrl,
			status: sessionStatus,
			throttleMs: options.throttleMs,
			startedAt: activeSession?.startedAt,
			expiresAt: activeSession?.expiresAt,
			lastObservedAt,
			lastScannedAt,
			pendingMutationCount,
			stopReason,
		};
	}

	const observer = new globalThis.MutationObserver((mutations) => {
		if (!activeSession) {
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

		lastObservedAt = Date.now();
		pendingMutationCount += mutations.length;
		if (sessionStatus !== 'dirty') {
			logObserverEvent('session-dirty', {
				sessionId: activeSession.sessionId,
				pendingMutationCount,
				mutationBatchSize: mutations.length,
			});
		}
		sessionStatus = 'dirty';

		if (activeSession.maxMutations > 0 && pendingMutationCount >= activeSession.maxMutations) {
			logObserverEvent('session-max-mutations-reached', {
				sessionId: activeSession.sessionId,
				pendingMutationCount,
				maxMutations: activeSession.maxMutations,
			});
			stopSession('expired');
			return;
		}

		scheduleFlush();
	});

	/** Reset prior observation state and start one bounded session for this document. */
	function beginSession(
		input: observe.BeginType,
	): observe.StateType {
		activeSession?.scanAbortController.abort();
		observationGeneration += 1;
		observer.disconnect();
		stopResources();
		clearFlushTimer();
		clearNoticeTimer();
		clearMutations();
		observationBatchController.reset();
		clearEvidence();

		const startedAt = Date.now();
		activeSession = {
			generation: observationGeneration,
			scanAbortController: new AbortController(),
			sessionId: input.sessionId,
			expectedUrl: input.expectedUrl,
			startedAt,
			expiresAt: startedAt + input.durationMs,
			maxPendingNodes: input.maxPendingNodes,
			maxMutations: input.maxMutations,
			includeScriptContent: input.includeScriptContent === true,
			includeStylesheetContent: input.includeStylesheetContent === true,
			domSelectorPlan: input.domSelectorPlan,
		};
		lastObservedAt = undefined;
		lastScannedAt = undefined;
		stopReason = undefined;
		sessionStatus = 'observing';

		observer.observe(globalThis.document.documentElement ?? globalThis.document, {
			subtree: true,
			childList: true,
			attributes: true,
			attributeFilter: createAttributeFilter(input.domSelectorPlan),
		});
		startResources();
		rememberTimings();

		return getState();
	}

	return {
		async snapshot(content = { includeScriptContent: true, includeStylesheetContent: true }) {
			stopIfNavigated();
			if (!activeSession) {
				return scanSnapshot(content);
			}

			const generation = activeSession.generation;
			await flushMutations(content, false, generation);
			if (activeSession?.generation === generation) await scanDocument(content, generation);

			if (activeSession?.generation === generation && sessionStatus !== 'stopped') {
				sessionStatus = 'observing';
			}

			return {
				images: [...images].slice(0, SOURCE_LIMITS.imageSrc),
				scripts: [...scripts].slice(0, SOURCE_LIMITS.scriptSrc),
				stylesheets: [...stylesheets].slice(0, SOURCE_LIMITS.stylesheetHref),
				links: [...linkEntries.values()].slice(0, SOURCE_LIMITS.linkTags),
				resources: [...resourceEntries.values()].slice(0, SOURCE_LIMITS.resourceUrls),
				requests: [...requestEntries.values()].slice(0, SOURCE_LIMITS.requestUrls),
				scriptContents: content.includeScriptContent ? scriptContents : [],
				stylesheetContents: content.includeStylesheetContent ? stylesheetContents : [],
				meta: getMeta(),
				dom: { selectors: Object.fromEntries(domSelectorEntries) },
			};
		},

		async flushObservationBatch() {
			stopIfNavigated();
			clearNoticeTimer();
			const generation = activeSession?.generation;
			if (generation !== undefined && sessionStatus !== 'stopped') {
				await flushMutations(undefined, false, generation);
			}

			const session = getState();
			const target = getTarget();
			const batch = target && session.status !== 'stopped'
				? observationBatchController.flush({ target, observedAt: Date.now() })
				: null;
			const stats = observationBatchController.stats();
			if (stats.queuedCount > 0) scheduleNotice();

			return {
				...(batch ? { batch } : {}),
				stats,
				session,
			};
		},

		beginObservationSession: beginSession,

		stopObservationSession(reason = 'manual') {
			return stopSession(reason);
		},

		status() {
			stopIfNavigated();
			return getState();
		},

		disconnect(reason = 'invalidated') {
			stopSession(reason);
		},
	};
}

/** Limit attribute observation to selectors and resource-bearing DOM attributes. */
function createAttributeFilter(plan: DomPlanType | undefined): string[] {
	if (plan?.attributeFilter.length) return [...plan.attributeFilter];
	return ['src', 'href', 'rel', 'name', 'property', 'http-equiv', 'content'];
}

/** Add one unique value without letting a long-lived observation cache exceed its public source limit. */
function addBoundedValue(target: Set<string>, value: string, limit: number): void {
	if (target.has(value) || target.size < limit) target.add(value);
}

/** Insert or update one keyed value while bounding the number of retained page-owned objects. */
function setBoundedEntry<T>(target: Map<string, T>, key: string, value: T, limit: number): void {
	if (target.has(key) || target.size < limit) target.set(key, value);
}

/** Return whether one queued mutation root already contains another. */
function containsNode(parent: Node, child: Node): boolean {
	if (parent === child) return true;
	const contains = (parent as Node & { contains?: (node: Node) => boolean }).contains;
	return typeof contains === 'function' ? contains.call(parent, child) : false;
}

/**
 * Return whether a new subtree can contribute page signals or selector evidence.
 *
 * Keep this check synchronous. MutationObserver callbacks run on the renderer
 * main thread, so descendant queries are forbidden here. Route-free selectors
 * still require leaf elements to reach the later time-sliced walker.
 */
function canScanNode(node: Node, plan?: DomPlanType): boolean {
	if (isSignalElement(node)) return true;
	if (isElementNode(node)) {
		if (plan?.selectorsWithoutRoute.length) return true;
		if (matchesPlan(node, plan)) return true;
		return node.childElementCount > 0;
	}
	if (isFragmentNode(node)) return node.childNodes.length > 0;
	return isDocumentNode(node);
}

/** Check direct tag, attribute, id, and class indexes without querying descendants. */
function matchesPlan(element: Element, plan?: DomPlanType): boolean {
	if (!plan) return false;
	if (plan.selectorsByTag[element.localName.toLowerCase()]?.length) return true;
	for (const attribute of element.getAttributeNames()) {
		if (plan.selectorsByAttribute[attribute.toLowerCase()]?.length) return true;
	}
	if (element.id && plan.selectorsById[element.id]?.length) return true;
	for (const className of element.classList) {
		if (plan.selectorsByClass[className]?.length) return true;
	}
	return false;
}

/** Check the cheap necessary signals from one structural selector compound. */
function matchesSignal(element: Element, signal: DomSignalType): boolean {
	if (signal.unrouteable) return true;
	if (signal.tags.length > 0 && !signal.tags.includes(element.localName.toLowerCase())) return false;
	for (const attribute of signal.attributes) {
		if (!element.hasAttribute(attribute)) return false;
	}
	if (signal.ids.length > 0 && !signal.ids.includes(element.id)) return false;
	for (const className of signal.classes) {
		if (!element.classList.contains(className)) return false;
	}
	return true;
}

/** Return the nearest element at or before one mutation sibling marker. */
function previousElement(node: Node | null): Element | null {
	let current = node;
	while (current && !isElementNode(current)) current = current.previousSibling;
	return isElementNode(current) ? current : null;
}

/** Return the nearest element at or after one mutation sibling marker. */
function nextElement(node: Node | null): Element | null {
	let current = node;
	while (current && !isElementNode(current)) current = current.nextSibling;
	return isElementNode(current) ? current : null;
}

/** Return whether a node can be passed to the DOM walker as a ParentNode. */
function isScanRoot(node: Node): node is ParentNode {
	return isElementNode(node) || isFragmentNode(node) || isDocumentNode(node);
}

/** Narrow a mutation node to an Element without assuming constructors exist in tests. */
function isElementNode(node: Node | null): node is Element {
	return typeof globalThis.Element !== 'undefined' && node instanceof globalThis.Element;
}

/** Narrow a mutation node to a DocumentFragment in browser hosts that expose it. */
function isFragmentNode(node: Node): node is DocumentFragment {
	return typeof globalThis.DocumentFragment !== 'undefined' && node instanceof globalThis.DocumentFragment;
}

/** Narrow a mutation node to the current Document in browser hosts that expose it. */
function isDocumentNode(node: Node): node is Document {
	return typeof globalThis.Document !== 'undefined' && node instanceof globalThis.Document;
}

/** Return the nearest element parent without retaining a separate DOM reference. */
function getParentElement(node: Node): Element | null {
	return (node as Node & { readonly parentElement?: Element | null }).parentElement ?? null;
}

/** Return whether an element can contribute direct resource or metadata evidence. */
function isSignalElement(node: Node): node is Element {
	if (!isElementNode(node)) return false;
	return node.localName === 'script' || node.localName === 'style' || node.localName === 'link' ||
		node.localName === 'meta' || node.localName === 'img';
}
