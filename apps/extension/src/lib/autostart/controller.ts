import type { AnalyzeVisibleTabMode, AnalyzeVisibleTabOutput, BackgroundApi, VisibleTabIdentity } from "../messaging/index.ts";
import type { ExtensionResult } from "../messaging/result.ts";
import { diagnosticErrorType } from "@deepscope/detection/privacy/redaction";

/** Settings, browser target validation, and analysis owned by the background runtime. */
export type AutoScanControllerDependencies = {
	readonly getEnabled: () => Promise<boolean>;
	readonly getVisibleTabIdentity: BackgroundApi['getVisibleTabIdentity'];
	readonly analyzeVisibleTab: BackgroundApi['analyzeVisibleTab'];
	readonly log?: (event: string, details?: Record<string, unknown>) => void;
	/** How long one scan may stay unsettled before it is released and retried once. */
	readonly watchdogMs?: number;
};

/**
 * Default watchdog bound. It is longer than the analysis lane's own timeout
 * (`LANE_TIMEOUT_MS`), so it fires only when a scan's completion was lost
 * rather than slow; a retry of work that is merely queued joins it again.
 */
export const AUTO_SCAN_WATCHDOG_MS = 150_000;

/** One-shot scans scheduled from the background's tab lifecycle listeners. */
export type AutoScanController = {
	/** Wait until the scan is handled, coalesced with the same page, or superseded. */
	scanVisibleTab(tabId: number, windowId: number, mode: AnalyzeVisibleTabMode, reason: string): Promise<void>;
	/** Discard queued work for the old page and let any already-dispatched request settle. */
	onTabNavigation(tabId: number): void;
	/** Release the tab's scheduling state, including work that has yet to start. */
	onTabRemoved(tabId: number): void;
};

/** A request and the completion shared by all callers that coalesced into it. */
type ScanRequest = {
	/** Unknown until the active browser tab resolves. Used to limit error details for this request. */
	incognito?: boolean;
	readonly generation: number;
	readonly windowId: number;
	/** A queued refresh takes precedence over snapshot-first for the same generation. */
	mode: AnalyzeVisibleTabMode;
	reason: string;
	/** True for the one retry the watchdog starts after a stalled scan. */
	retry?: boolean;
	readonly promise: Promise<void>;
	readonly resolve: () => void;
};

/** Keep at most one active request and one successor while a tab has pending work. */
type TabScans = {
	/** Changes when the background reports a navigation or a request names a new window. */
	generation: number;
	windowId: number;
	active: ScanRequest;
	pending: ScanRequest | undefined;
};

/** Create a request whose callers can also settle when a later page supersedes it. */
function createScanRequest(
	generation: number,
	windowId: number,
	mode: AnalyzeVisibleTabMode,
	reason: string,
): ScanRequest {
	const { promise, resolve } = Promise.withResolvers<void>();
	return { generation, windowId, mode, reason, promise, resolve };
}

/**
 * Coalesce automatic scans for one page and retain the newest request after navigation.
 *
 * The generation tracks the background's tab events. Each request still resolves the
 * active window and tab through the background API just before it asks for analysis.
 */
export function createAutoScanController(
	dependencies: AutoScanControllerDependencies,
): AutoScanController {
	/** Remove each entry when the last request settles or the tab closes. */
	const scansByTab = new Map<number, TabScans>();

	/** Invalidate work waiting on a replaced page, moved window, or closed tab. */
	function invalidateScans(scans: TabScans): void {
		scans.generation++;
		scans.pending?.resolve();
		scans.pending = undefined;
	}

	/** Check both the generation and the tab entry in case the tab closed while awaiting I/O. */
	function ownsScan(tabId: number, scans: TabScans, request: ScanRequest): boolean {
		return scansByTab.get(tabId) === scans && scans.generation === request.generation;
	}

	/** Resolve the current page and submit one analysis while this scan still owns the tab. */
	async function scanVisiblePage(tabId: number, scans: TabScans, request: ScanRequest): Promise<void> {
		const { windowId, mode, reason } = request;
		const enabled = await dependencies.getEnabled();
		if (!ownsScan(tabId, scans, request)) return;
		if (!enabled) {
			dependencies.log?.('auto-scan-disabled', { tabId, reason });
			return;
		}

		const identityResponse = await dependencies.getVisibleTabIdentity({ tabId, windowId });
		if (!ownsScan(tabId, scans, request)) return;
		if (!identityResponse.ok) {
			dependencies.log?.('auto-scan-target-unavailable', {
				tabId,
				reason,
				code: identityResponse.failure.code,
			});
			return;
		}

		const identity: VisibleTabIdentity = identityResponse.value;
		request.incognito = identity.incognito;
		dependencies.log?.('auto-scan-start', {
			tabId,
			...(!identity.incognito && { hostname: identity.hostname }),
			mode,
			reason,
		});
		const response: ExtensionResult<AnalyzeVisibleTabOutput> = await dependencies.analyzeVisibleTab({
			target: identity,
			mode,
			observe: 'none',
		});
		const ordinaryOwner = !identity.incognito && ownsScan(tabId, scans, request);
		dependencies.log?.(response.ok ? 'auto-scan-queued' : 'auto-scan-failed', {
			tabId,
			...(ordinaryOwner && { hostname: identity.hostname }),
			mode,
			reason,
			...(response.ok
				? { resultCount: response.value.analysis.results.length, snapshotStatus: response.value.snapshot.status }
				: { code: response.failure.code, ...(ordinaryOwner && { message: response.failure.message }) }),
		});
	}

	/** Release the request's callers and start a successor only while it still owns the tab entry. */
	function finishScan(tabId: number, scans: TabScans, request: ScanRequest): void {
		request.resolve();
		if (scansByTab.get(tabId) !== scans || scans.active !== request) return;
		if (!scans.pending) {
			scansByTab.delete(tabId);
			return;
		}
		scans.active = scans.pending;
		scans.pending = undefined;
		startScan(tabId, scans);
	}

	/**
	 * Release a scan that has not settled within the watchdog bound.
	 *
	 * Nothing else would: re-activating a tab that is already active fires no
	 * event, and every later request for the page joins the stuck one. A newer
	 * page's pending request takes over; otherwise the same page is retried once
	 * and, if that also stalls, the tab is released for the next tab event.
	 */
	function releaseStalledScan(tabId: number, scans: TabScans, request: ScanRequest): void {
		if (scansByTab.get(tabId) !== scans || scans.active !== request) return;
		const retry = !scans.pending && !request.retry && request.generation === scans.generation;
		dependencies.log?.('auto-scan-stalled', { tabId, mode: request.mode, reason: request.reason, retry });
		if (retry) {
			scans.pending = createScanRequest(scans.generation, scans.windowId, request.mode, request.reason);
			scans.pending.retry = true;
		}
		finishScan(tabId, scans, request);
	}

	/** Keep rejected settings, lookup, and analysis calls from blocking the next page. */
	function startScan(tabId: number, scans: TabScans): void {
		const request = scans.active;
		const watchdog = setTimeout(
			() => releaseStalledScan(tabId, scans, request),
			dependencies.watchdogMs ?? AUTO_SCAN_WATCHDOG_MS,
		);
		void scanVisiblePage(tabId, scans, request)
			.catch((error: unknown) => {
				dependencies.log?.('auto-scan-threw', {
					tabId,
					mode: request.mode,
					reason: request.reason,
					...(request.incognito === false && ownsScan(tabId, scans, request)
						? { message: error instanceof Error ? error.message : String(error) }
						: { errorType: diagnosticErrorType(error) }),
				});
			})
			.finally(() => {
				clearTimeout(watchdog);
				finishScan(tabId, scans, request);
			});
	}

	return {
		/** Reuse current-generation work and retain at most one replacement request after navigation or a window change. */
		scanVisibleTab(tabId, windowId, mode, reason) {
			const scans = scansByTab.get(tabId);
			if (!scans) {
				const active = createScanRequest(0, windowId, mode, reason);
				const newScans = { generation: 0, windowId, active, pending: undefined };
				scansByTab.set(tabId, newScans);
				startScan(tabId, newScans);
				return active.promise;
			}

			if (scans.windowId !== windowId) {
				invalidateScans(scans);
				scans.windowId = windowId;
			}
			if (scans.active.generation === scans.generation) {
				dependencies.log?.('auto-scan-already-in-flight', { tabId, mode, reason });
				return scans.active.promise;
			}
			if (!scans.pending) {
				scans.pending = createScanRequest(scans.generation, windowId, mode, reason);
			} else if (mode === 'refresh') {
				scans.pending.mode = mode;
				scans.pending.reason = reason;
			}
			return scans.pending.promise;
		},
		/** Invalidate the current document generation so its scan cannot satisfy the next navigation request. */
		onTabNavigation(tabId) {
			const scans = scansByTab.get(tabId);
			if (scans) invalidateScans(scans);
		},
		/** Invalidate pending work before removing the tab's scan state; in-flight completion remains responsible for settling its promise. */
		onTabRemoved(tabId) {
			const scans = scansByTab.get(tabId);
			if (!scans) return;
			invalidateScans(scans);
			scansByTab.delete(tabId);
		},
	};
}
