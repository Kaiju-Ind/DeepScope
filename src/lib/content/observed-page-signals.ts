import {
	collectLinkTags,
	collectImageSources,
	collectMetaTags,
	collectResourceEntries,
	collectResourceTimings,
	collectScriptContents,
	collectScriptSources,
	collectStylesheetContents,
	collectStylesheetSources,
	collectDomSelectorMatches,
} from './collect-page-signals';
import { mergeStringsByTotalChars } from '../detection/normalizers';
import { SOURCE_LIMITS } from '../detection/source-limits';
import * as logging from '../diagnostics/logging';
import type { PageSignals } from '../detection/types';
import type { DomSelectorPlan } from '../collectors/planning';
import { isObservationSessionForUrl } from '../lifecycle/observation';
import {
	createObservationBatchController,
	normalizeObservedPageSignalsSnapshot,
	type ObservationBatch,
	type ObservationBatchControllerStats,
	type ObservationTarget,
} from '../observations';

export type ObservedPageSignalsSnapshot = Pick<
	PageSignals,
	| 'scripts'
	| 'stylesheets'
	| 'links'
	| 'resources'
	| 'requests'
	| 'scriptContents'
	| 'stylesheetContents'
	| 'meta'
	| 'dom'
> & {
	images: string[];
};

export type ObservationSessionStatus = 'idle' | 'observing' | 'dirty' | 'stopped';

export type ObservationStopReason = 'manual' | 'expired' | 'navigation' | 'invalidated';

export type ObservationSessionState = {
	sessionId?: string;
	expectedUrl?: string;
	status: ObservationSessionStatus;
	throttleMs: number;
	startedAt?: number;
	expiresAt?: number;
	lastObservedAt?: number;
	lastScannedAt?: number;
	pendingMutationCount: number;
	stopReason?: ObservationStopReason;
};

export type PageSignalPollingState = ObservationSessionState;

/** Result returned when the content observer flushes queued observation events. */
export type FlushObservedObservationBatchOutput = {
	/** Next bounded observation batch, when late facts are queued. */
	batch?: ObservationBatch;
	/** Batch controller counters after the flush attempt. */
	stats: ObservationBatchControllerStats;
	/** Observation session state after pending mutation scans run. */
	session: ObservationSessionState;
};

export type BeginObservationSessionInput = {
	sessionId: string;
	expectedUrl: string;
	durationMs: number;
	maxPendingNodes: number;
	maxMutations: number;
	includeScriptContent?: boolean;
	includeStylesheetContent?: boolean;
	domSelectorPlan?: DomSelectorPlan;
};

export type ObservedPageSignalsSnapshotOptions = {
	/** Collect inline and accessible script source text for this snapshot. */
	readonly includeScriptContent?: boolean;
	/** Collect inline and accessible stylesheet source text for this snapshot. */
	readonly includeStylesheetContent?: boolean;
};

export type ObservedPageSignals = {
	snapshot(options?: ObservedPageSignalsSnapshotOptions): Promise<ObservedPageSignalsSnapshot>;
	flushObservationBatch(): Promise<FlushObservedObservationBatchOutput>;
	beginObservationSession(input: BeginObservationSessionInput): ObservationSessionState;
	stopObservationSession(reason?: ObservationStopReason): ObservationSessionState;
	status(): ObservationSessionState;
	disconnect(reason?: ObservationStopReason): void;
};

/** Event raised after page-local observations have been queued for background refresh. */
export type ObservedPageSignalsQueuedBatchEvent = {
	/** Timestamp associated with the observer scan that queued the latest facts. */
	readonly observedAt: number;
	/** Batch-controller counters after the observer scan pushed new facts. */
	readonly stats: ObservationBatchControllerStats;
	/** Session state after the observer scan, used by content snapshot publishers. */
	readonly session: ObservationSessionState;
};

export type ObservedPageSignalsOptions = {
	/** Delay used to coalesce DOM mutations before scanning changed nodes. */
	readonly throttleMs: number;
	/** Optional hook for content-owned streaming when new facts enter the batch. */
	readonly onObservationBatchQueued?: (event: ObservedPageSignalsQueuedBatchEvent) => void;
};

const MAX_PENDING_MUTATION_NODES = 100;
const observerLogger = logging.get('content', 'observer');

type ActiveObservationSession = {
	sessionId: string;
	expectedUrl: string;
	startedAt: number;
	expiresAt: number;
	maxPendingNodes: number;
	maxMutations: number;
	includeScriptContent: boolean;
	includeStylesheetContent: boolean;
	domSelectorPlan?: DomSelectorPlan;
};

function logObserverEvent(event: string, details?: Record<string, unknown>): void {
	observerLogger.debug('[kaiju-deepscope][content][observer] {event}', {
		event,
		...(details ?? {}),
	});
}

/** Create one bounded document observer and its local late-observation queue. */
export function createObservedPageSignals(
	options: ObservedPageSignalsOptions,
): ObservedPageSignals {
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
	const pendingNodes = new Set<Node>();
	let throttleTimer: ReturnType<typeof globalThis.setTimeout> | undefined;
	let batchNoticeTimer: ReturnType<typeof globalThis.setTimeout> | undefined;
	let resourceObserver: PerformanceObserver | undefined;
	let activeSession: ActiveObservationSession | undefined;
	let sessionStatus: ObservationSessionStatus = 'idle';
	let stopReason: ObservationStopReason | undefined;
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
		pendingNodes.clear();
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
	function stopSession(reason: ObservationStopReason): ObservationSessionState {
		const session = activeSession;
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
	function rememberResources(resources: PageSignals['resources'], notify: boolean): void {
		if (resources.length === 0) return;

		const acceptedBefore = observationBatchController.stats().acceptedCount;
		rememberSnapshot({
			...emptySnapshot(),
			resources,
			requests: resources.map((resource) => ({
				url: resource.url,
				type: resource.initiatorType,
			})),
		});

		if (observationBatchController.stats().acceptedCount <= acceptedBefore) return;
		lastObservedAt = Date.now();
		if (notify) scheduleNotice();
	}

	/** Remember resources that existed before the live PerformanceObserver started reporting entries. */
	function rememberTimings(notify = false): void {
		rememberResources(collectResourceTimings(), notify);
	}

	/** Observe only new resource entries after the initial timeline snapshot. */
	function startResources(): void {
		stopResources();

		if (typeof globalThis.PerformanceObserver !== 'function') return;

		try {
			resourceObserver = new globalThis.PerformanceObserver((list) => {
				if (!activeSession) return;
				rememberResources(collectResourceEntries(list.getEntries()), true);
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
	function rememberSnapshot(snapshot: ObservedPageSignalsSnapshot): void {
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
	function enqueueSnapshot(snapshot: ObservedPageSignalsSnapshot, observedAt: number): void {
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

	/** Create a sparse snapshot for one focused mutation or resource update. */
	function emptySnapshot(): ObservedPageSignalsSnapshot {
		return {
			images: [],
			scripts: [],
			stylesheets: [],
			links: [],
			resources: [],
			requests: [],
			scriptContents: [],
			stylesheetContents: [],
			meta: {},
			dom: { selectors: {} },
		};
	}

	/** Scan only the changed subtree that can contain evidence-bearing page signals. */
	async function scanNode(node: Node, content: ObservedPageSignalsSnapshotOptions): Promise<void> {
		if (node instanceof globalThis.HTMLScriptElement) {
			rememberSnapshot({
				...emptySnapshot(),
				scripts: collectScriptSources([node]),
				scriptContents: content.includeScriptContent ? collectScriptContents([node]) : [],
				dom: { selectors: await getSelectors(node) },
			});
			return;
		}

		if (node instanceof globalThis.HTMLImageElement) {
			rememberSnapshot({
				...emptySnapshot(),
				images: collectImageSources([node]),
				dom: { selectors: await getSelectors(node) },
			});
			return;
		}

		if (node instanceof globalThis.HTMLStyleElement) {
			rememberSnapshot({
				...emptySnapshot(),
				stylesheetContents: content.includeStylesheetContent ? collectStylesheetContents([node]) : [],
				dom: { selectors: await getSelectors(node) },
			});
			return;
		}

		if (node instanceof globalThis.HTMLLinkElement) {
			rememberSnapshot({
				...emptySnapshot(),
				stylesheets: collectStylesheetSources([node]),
				links: collectLinkTags([node]),
				dom: { selectors: await getSelectors(node) },
			});
			return;
		}

		if (node instanceof globalThis.HTMLMetaElement) {
			rememberSnapshot({
				...emptySnapshot(),
				meta: collectMetaTags([node]),
				dom: { selectors: await getSelectors(node) },
			});
			return;
		}

		if (node instanceof globalThis.Element || node instanceof globalThis.DocumentFragment || node instanceof globalThis.Document) {
			rememberSnapshot({
				...emptySnapshot(),
				images: collectImageSources(node),
				scripts: collectScriptSources(node),
				stylesheets: collectStylesheetSources(node),
				links: collectLinkTags(node),
				scriptContents: content.includeScriptContent ? collectScriptContents(node) : [],
				stylesheetContents: content.includeStylesheetContent ? collectStylesheetContents(node) : [],
				meta: collectMetaTags(node),
				dom: { selectors: await getSelectors(node) },
			});
		}
	}

	/** Collect one bounded current-document snapshot without retaining it in the content-script closure. */
	async function collectDocumentSnapshot(
		content: ObservedPageSignalsSnapshotOptions,
	): Promise<ObservedPageSignalsSnapshot> {
		const resources = collectResourceTimings();
		return {
			images: collectImageSources(globalThis.document),
			scripts: collectScriptSources(globalThis.document),
			stylesheets: collectStylesheetSources(globalThis.document),
			links: collectLinkTags(globalThis.document),
			resources,
			requests: resources.map((resource) => ({ url: resource.url, type: resource.initiatorType })),
			scriptContents: content.includeScriptContent ? collectScriptContents(globalThis.document) : [],
			stylesheetContents: content.includeStylesheetContent ? collectStylesheetContents(globalThis.document) : [],
			meta: collectMetaTags(globalThis.document),
			dom: { selectors: await getSelectors(globalThis.document) },
		};
	}

	/** Rebuild complete document evidence only for an active session or overflow fallback. */
	async function scanDocument(content: ObservedPageSignalsSnapshotOptions): Promise<void> {
		rememberSnapshot(await collectDocumentSnapshot(content));
		lastScannedAt = Date.now();
	}

	/** Evaluate the current compiled DOM selector plan against one root. */
	function getSelectors(root: ParentNode): Promise<Record<string, boolean>> {
		return collectDomSelectorMatches(activeSession?.domSelectorPlan, activeSession?.domSelectorPlan?.selectors ?? [], root);
	}


	/** Return content flags owned by the active observation session. */
	function getContent(): ObservedPageSignalsSnapshotOptions {
		return {
			includeScriptContent: activeSession?.includeScriptContent === true,
			includeStylesheetContent: activeSession?.includeStylesheetContent === true,
		};
	}

	/** Flush the coalesced mutation roots without rescanning unrelated page state. */
	async function flushMutations(
		content = getContent(),
		notify = true,
	): Promise<void> {
		clearFlushTimer();
		const acceptedBefore = observationBatchController.stats().acceptedCount;

		if (pendingFullDocumentScan) {
			await scanDocument(content);
		} else {
			for (const node of pendingNodes) await scanNode(node, content);
		}

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

		throttleTimer = globalThis.setTimeout(() => {
			void flushMutations();
		}, options.throttleMs);
	}

	/** Keep only minimal non-overlapping roots for the next mutation scan. */
	function queueNode(node: Node): void {
		if (pendingFullDocumentScan || !canQueueNode(node, activeSession?.domSelectorPlan)) return;

		for (const pending of pendingNodes) {
			if (containsNode(pending, node)) return;
		}

		for (const pending of pendingNodes) {
			if (containsNode(node, pending)) pendingNodes.delete(pending);
		}

		if (pendingNodes.size >= getPendingLimit()) {
			pendingNodes.clear();
			pendingFullDocumentScan = true;
			return;
		}

		pendingNodes.add(node);
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
	function getState(): ObservationSessionState {
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
				for (const node of mutation.addedNodes) {
					const before = pendingNodes.size;
					const neededFullScan = pendingFullDocumentScan;
					queueNode(node);
					hasRelevantMutation ||= pendingNodes.size > before || pendingFullDocumentScan !== neededFullScan;
				}

				continue;
			}

			if (
				mutation.type === 'attributes' &&
				canQueueNode(mutation.target, activeSession.domSelectorPlan)
			) {
				queueNode(mutation.target);
				hasRelevantMutation = true;
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
		input: BeginObservationSessionInput,
	): ObservationSessionState {
		observer.disconnect();
		stopResources();
		clearFlushTimer();
		clearNoticeTimer();
		clearMutations();
		observationBatchController.reset();
		clearEvidence();

		const startedAt = Date.now();
		activeSession = {
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
				return collectDocumentSnapshot(content);
			}

			await flushMutations(content, false);
			await scanDocument(content);

			if (activeSession && sessionStatus !== 'stopped') {
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
			if (activeSession && sessionStatus !== 'stopped') await flushMutations(undefined, false);

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
function createAttributeFilter(plan: DomSelectorPlan | undefined): string[] {
	if (plan?.attributeFilter.length) {
		return [...plan.attributeFilter];
	}

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
 * Return whether a mutation root is worth scanning after the throttle delay.
 *
 * Keep this check synchronous and cheap. MutationObserver callbacks run on the
 * page's main thread, so descendant selector queries here can make a busy site
 * pay DeepScope's scan cost once per DOM mutation. Detailed selector and
 * resource queries run later against the coalesced roots.
 */
function canQueueNode(node: Node, plan?: DomSelectorPlan): boolean {
	if (isSignalElement(node)) return true;

	if (typeof globalThis.Element !== 'undefined' && node instanceof globalThis.Element) {
		if (matchesPlan(node, plan)) return true;
		return node.childElementCount > 0;
	}

	if (typeof globalThis.DocumentFragment !== 'undefined' && node instanceof globalThis.DocumentFragment) {
		return node.childNodes.length > 0;
	}

	return typeof globalThis.Document !== 'undefined' && node instanceof globalThis.Document;
}

/** Check only direct tag, attribute, id, and class indexes without querying descendants. */
function matchesPlan(element: Element, plan?: DomSelectorPlan): boolean {
	if (!plan) return false;
	const tagName = element.localName.toLowerCase();
	if (plan.selectorsByTag[tagName]?.length) return true;

	for (const attribute of element.getAttributeNames()) {
		if (plan.selectorsByAttribute[attribute.toLowerCase()]?.length) return true;
	}

	if (element.id && plan.selectorsById[element.id]?.length) return true;

	for (const className of element.classList) {
		if (plan.selectorsByClass[className]?.length) return true;
	}

	return false;
}

/** Narrow direct resource and metadata elements handled without descendant scanning. */
function isSignalElement(
	node: Node,
): node is HTMLScriptElement | HTMLStyleElement | HTMLLinkElement | HTMLMetaElement | HTMLImageElement {
	return (
		(typeof globalThis.HTMLScriptElement !== 'undefined' && node instanceof globalThis.HTMLScriptElement) ||
		(typeof globalThis.HTMLStyleElement !== 'undefined' && node instanceof globalThis.HTMLStyleElement) ||
		(typeof globalThis.HTMLLinkElement !== 'undefined' && node instanceof globalThis.HTMLLinkElement) ||
		(typeof globalThis.HTMLMetaElement !== 'undefined' && node instanceof globalThis.HTMLMetaElement) ||
		(typeof globalThis.HTMLImageElement !== 'undefined' && node instanceof globalThis.HTMLImageElement)
	);
}
