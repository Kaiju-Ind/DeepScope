import {
	collectLinkTags,
	collectImageSources,
	collectMetaTags,
	collectResourceTimings,
	collectScriptContents,
	collectScriptSources,
	collectStylesheetContents,
	collectStylesheetSources,
	collectDomSelectorMatches,
} from './collect-page-signals';
import { mergeStringsByTotalChars } from '../detection/normalizers';
import { SOURCE_LIMITS } from '../detection/source-limits';
import { getKaijuSiteScopeLogger } from '../diagnostics/logging';
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
const observerLogger = getKaijuSiteScopeLogger('content', 'observer');

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
	observerLogger.debug('[kaiju-site-scope][content][observer] {event}', {
		event,
		...(details ?? {}),
	});
}

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
	let resourceObserver: PerformanceObserver | undefined;
	let activeSession: ActiveObservationSession | undefined;
	let sessionStatus: ObservationSessionStatus = 'idle';
	let stopReason: ObservationStopReason | undefined;
	let lastObservedAt: number | undefined;
	let lastScannedAt: number | undefined;
	let pendingMutationCount = 0;
	let pendingFullDocumentScan = false;
	const observationBatchController = createObservationBatchController();

	function clearPendingMutations(): void {
		pendingNodes.clear();
		pendingFullDocumentScan = false;
		pendingMutationCount = 0;
	}

	function maxPendingMutationNodes(): number {
		return activeSession?.maxPendingNodes ?? MAX_PENDING_MUTATION_NODES;
	}

	function clearThrottleTimer(): void {
		if (throttleTimer !== undefined) {
			clearTimeout(throttleTimer);
			throttleTimer = undefined;
		}
	}

	function stopResourceObserver(): void {
		resourceObserver?.disconnect();
		resourceObserver = undefined;
	}

	function stopObservationSessionWithReason(reason: ObservationStopReason): ObservationSessionState {
		observer.disconnect();
		stopResourceObserver();
		clearThrottleTimer();
		clearPendingMutations();
		observationBatchController.reset();
		activeSession = undefined;
		sessionStatus = 'stopped';
		stopReason = reason;
		return observationState();
	}

	function stopIfDocumentChanged(): void {
		if (!activeSession || isObservationSessionForUrl(activeSession, location.href)) {
			return;
		}

		logObserverEvent('session-navigation', {
			sessionId: activeSession.sessionId,
			expectedUrl: activeSession.expectedUrl,
			actualUrl: location.href,
		});
		stopObservationSessionWithReason('navigation');
	}

	function rememberResourceTimings(): void {
		const resources = collectResourceTimings();
		const acceptedBeforeScan = observationBatchController.stats().acceptedCount;
		rememberSnapshot({
			...emptySnapshot(),
			resources,
			requests: resources.map((resource) => ({
				url: resource.url,
				type: resource.initiatorType,
			})),
		});

		if (resources.length > 0) {
			lastObservedAt = Date.now();
			publishQueuedObservationBatch(acceptedBeforeScan);
		}
	}

	function startResourceObserver(): void {
		stopResourceObserver();

		if (typeof PerformanceObserver !== 'function') {
			return;
		}

		try {
			resourceObserver = new PerformanceObserver(() => {
				if (!activeSession) {
					return;
				}

				rememberResourceTimings();
				lastObservedAt = Date.now();
			});

			try {
				resourceObserver.observe({ type: 'resource', buffered: true });
			} catch {
				resourceObserver.observe({ entryTypes: ['resource'] });
			}
		} catch {
			stopResourceObserver();
		}
	}

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

	function rememberDomSelectors(selectors: Record<string, boolean>): void {
		for (const [selector, matched] of Object.entries(selectors)) {
			if (matched) domSelectorEntries.set(selector, true);
		}
	}

	function rememberSnapshot(snapshot: ObservedPageSignalsSnapshot): void {
		const observedAt = Date.now();
		for (const source of snapshot.images) {
			images.add(source);
		}
		for (const source of snapshot.scripts) {
			scripts.add(source);
		}

		for (const href of snapshot.stylesheets) {
			stylesheets.add(href);
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
			linkEntries.set(`${link.rel}:${link.type ?? ''}:${link.href}`, link);
		}

		for (const resource of snapshot.resources) {
			resourceEntries.set(resource.url, resource);
		}

		for (const request of snapshot.requests) {
			requestEntries.set(request.url, request);
		}

		rememberMeta(snapshot.meta);
		rememberDomSelectors(snapshot.dom.selectors);
		enqueueObservationSnapshot(snapshot, observedAt);
	}

	function enqueueObservationSnapshot(snapshot: ObservedPageSignalsSnapshot, observedAt: number): void {
		const target = currentObservationTarget();
		if (!target || sessionStatus === 'stopped') return;

		const batch = normalizeObservedPageSignalsSnapshot(snapshot, {
			target,
			observedAt,
			collector: 'content-observer',
		});

		for (const observation of batch.observations) observationBatchController.push(observation);
	}

	function currentObservationTarget(): ObservationTarget | undefined {
		if (!activeSession) return undefined;

		return {
			url: activeSession.expectedUrl,
			hostname: new URL(activeSession.expectedUrl).hostname,
		};
	}

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

	async function scanNode(node: Node, content: ObservedPageSignalsSnapshotOptions): Promise<void> {
		if (node instanceof HTMLScriptElement) {
			rememberSnapshot({
				...emptySnapshot(),
				scripts: collectScriptSources([node]),
				scriptContents: content.includeScriptContent ? collectScriptContents([node]) : [],
				dom: { selectors: await collectDomSelectors(node) },
			});
			return;
		}

		if (node instanceof HTMLImageElement) {
			rememberSnapshot({
				...emptySnapshot(),
				images: collectImageSources([node]),
				dom: { selectors: await collectDomSelectors(node) },
			});
			return;
		}

		if (node instanceof HTMLStyleElement) {
			rememberSnapshot({
				...emptySnapshot(),
				stylesheetContents: content.includeStylesheetContent ? collectStylesheetContents([node]) : [],
				dom: { selectors: await collectDomSelectors(node) },
			});
			return;
		}

		if (node instanceof HTMLLinkElement) {
			rememberSnapshot({
				...emptySnapshot(),
				stylesheets: collectStylesheetSources([node]),
				links: collectLinkTags([node]),
				dom: { selectors: await collectDomSelectors(node) },
			});
			return;
		}

		if (node instanceof HTMLMetaElement) {
			rememberSnapshot({
				...emptySnapshot(),
				meta: collectMetaTags([node]),
				dom: { selectors: await collectDomSelectors(node) },
			});
			return;
		}

		if (node instanceof Element || node instanceof DocumentFragment || node instanceof Document) {
			const resources = collectResourceTimings();
			rememberSnapshot({
				images: collectImageSources(node),
				scripts: collectScriptSources(node),
				stylesheets: collectStylesheetSources(node),
				links: collectLinkTags(node),
				resources,
				requests: resources.map((resource) => ({ url: resource.url, type: resource.initiatorType })),
				scriptContents: content.includeScriptContent ? collectScriptContents(node) : [],
				stylesheetContents: content.includeStylesheetContent ? collectStylesheetContents(node) : [],
				meta: collectMetaTags(node),
				dom: { selectors: await collectDomSelectors(node) },
			});
		}
	}

	async function scanCurrentDocument(content: ObservedPageSignalsSnapshotOptions): Promise<void> {
		const resources = collectResourceTimings();
		rememberSnapshot({
			images: collectImageSources(document),
			scripts: collectScriptSources(document),
			stylesheets: collectStylesheetSources(document),
			links: collectLinkTags(document),
			resources,
			requests: resources.map((resource) => ({ url: resource.url, type: resource.initiatorType })),
			scriptContents: content.includeScriptContent ? collectScriptContents(document) : [],
			stylesheetContents: content.includeStylesheetContent ? collectStylesheetContents(document) : [],
			meta: collectMetaTags(document),
			dom: { selectors: await collectDomSelectors(document) },
		});
		lastScannedAt = Date.now();
	}

	function collectDomSelectors(root: ParentNode): Promise<Record<string, boolean>> {
		return collectDomSelectorMatches(activeSession?.domSelectorPlan, activeSession?.domSelectorPlan?.selectors ?? [], root);
	}


	function getObservedContentOptions(): ObservedPageSignalsSnapshotOptions {
		return {
			includeScriptContent: activeSession?.includeScriptContent === true,
			includeStylesheetContent: activeSession?.includeStylesheetContent === true,
		};
	}

	async function flushPendingMutations(content = getObservedContentOptions()): Promise<void> {
		clearThrottleTimer();
		const acceptedBeforeScan = observationBatchController.stats().acceptedCount;

		if (pendingFullDocumentScan) {
			await scanCurrentDocument(content);
		} else {
			for (const node of pendingNodes) {
				await scanNode(node, content);
			}
		}

		clearPendingMutations();
		lastScannedAt = Date.now();

		if (activeSession && sessionStatus !== 'stopped') {
			sessionStatus = 'observing';
			publishQueuedObservationBatch(acceptedBeforeScan);
		}
	}

	/**
	 * Notify content runtime after the throttled observer scan queues new facts.
	 *
	 * The batch itself stays inside the controller so the background can still
	 * flush and analyze it later. The callback only carries enough lifecycle
	 * information for a durable side-panel snapshot revision, which avoids waiting for
	 * the next background refresh request before the open side panel knows the page has
	 * changed.
	 */
	function publishQueuedObservationBatch(acceptedBeforeScan: number): void {
		const stats = observationBatchController.stats();
		if (stats.acceptedCount <= acceptedBeforeScan) {
			return;
		}

		options.onObservationBatchQueued?.({
			observedAt: lastScannedAt ?? lastObservedAt ?? Date.now(),
			stats,
			session: observationState(),
		});
	}

	function scheduleThrottledFlush(): void {
		if (throttleTimer !== undefined) {
			return;
		}

		throttleTimer = setTimeout(() => {
			void flushPendingMutations();
		}, options.throttleMs);
	}

	function queueMutationNode(node: Node): void {
		if (pendingFullDocumentScan || !nodeMayContainSignal(node, activeSession?.domSelectorPlan)) {
			return;
		}

		if (pendingNodes.size >= maxPendingMutationNodes()) {
			pendingNodes.clear();
			pendingFullDocumentScan = true;
			return;
		}

		pendingNodes.add(node);
	}

	function snapshotMeta(): Record<string, string[]> {
		return Object.fromEntries(
			[...metaEntries.entries()].map(([key, values]) => [
				key,
				[...values].slice(0, SOURCE_LIMITS.metaValuesPerKey),
			]),
		);
	}

	function observationState(): ObservationSessionState {
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

	const observer = new MutationObserver((mutations) => {
		if (!activeSession) {
			return;
		}

		let hasRelevantMutation = false;

		for (const mutation of mutations) {
			if (mutation.type === 'childList') {
				for (const node of mutation.addedNodes) {
					const before = pendingNodes.size;
					const neededFullScan = pendingFullDocumentScan;
					queueMutationNode(node);
					hasRelevantMutation ||= pendingNodes.size > before || pendingFullDocumentScan !== neededFullScan;
				}

				continue;
			}

			if (
				mutation.type === 'attributes' &&
				nodeMayContainSignal(mutation.target, activeSession.domSelectorPlan)
			) {
				queueMutationNode(mutation.target);
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
			stopObservationSessionWithReason('expired');
			return;
		}

		scheduleThrottledFlush();
	});

	function beginObservationSession(
		input: BeginObservationSessionInput,
	): ObservationSessionState {
		observer.disconnect();
		stopResourceObserver();
		clearThrottleTimer();
		clearPendingMutations();
		observationBatchController.reset();

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

		observer.observe(document.documentElement ?? document, {
			subtree: true,
			childList: true,
			attributes: true,
			attributeFilter: createAttributeFilter(input.domSelectorPlan),
		});
		startResourceObserver();
		rememberResourceTimings();

		return observationState();
	}

	return {
		async snapshot(content = { includeScriptContent: true, includeStylesheetContent: true }) {
			stopIfDocumentChanged();
			await flushPendingMutations(content);
			await scanCurrentDocument(content);

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
				meta: snapshotMeta(),
				dom: { selectors: Object.fromEntries(domSelectorEntries) },
			};
		},

		async flushObservationBatch() {
			stopIfDocumentChanged();
			if (activeSession && sessionStatus !== 'stopped') await flushPendingMutations();

			const session = observationState();
			const target = currentObservationTarget();
			const batch = target && session.status !== 'stopped'
				? observationBatchController.flush({ target, observedAt: Date.now() })
				: null;

			return {
				...(batch ? { batch } : {}),
				stats: observationBatchController.stats(),
				session,
			};
		},

		beginObservationSession,

		stopObservationSession(reason = 'manual') {
			return stopObservationSessionWithReason(reason);
		},

		status() {
			stopIfDocumentChanged();
			return observationState();
		},

		disconnect(reason = 'invalidated') {
			stopObservationSessionWithReason(reason);
		},
	};
}

function createAttributeFilter(plan: DomSelectorPlan | undefined): string[] {
	if (plan?.attributeFilter.length) {
		return [...plan.attributeFilter];
	}

	return ['src', 'href', 'rel', 'name', 'property', 'http-equiv', 'content'];
}

function nodeMayContainSignal(node: Node, plan?: DomSelectorPlan): boolean {
	if (isSignalElement(node)) {
		return true;
	}

	if (plan && nodeMayContainDomSelectorSignal(node, plan)) {
		return true;
	}

	if (node instanceof Element || node instanceof DocumentFragment || node instanceof Document) {
		return node.querySelector('script,link,meta,style') !== null;
	}

	return false;
}

function nodeMayContainDomSelectorSignal(node: Node, plan: DomSelectorPlan): boolean {
	if (!plan.candidateSelector) {
		return false;
	}

	if (node instanceof Element && elementHasDomSelectorSignal(node, plan)) {
		return true;
	}

	if (node instanceof Element || node instanceof DocumentFragment || node instanceof Document) {
		try {
			return node.querySelector(plan.candidateSelector) !== null;
		} catch {
			return false;
		}
	}

	return false;
}

function elementHasDomSelectorSignal(element: Element, plan: DomSelectorPlan): boolean {
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

function isSignalElement(
	node: Node,
): node is HTMLScriptElement | HTMLStyleElement | HTMLLinkElement | HTMLMetaElement {
	return (
		node instanceof HTMLScriptElement ||
		node instanceof HTMLStyleElement ||
		node instanceof HTMLLinkElement ||
		node instanceof HTMLMetaElement
	);
}
