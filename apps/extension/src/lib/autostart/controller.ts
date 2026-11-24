import type {
	AnalyzeVisibleTabMode,
	AnalyzeVisibleTabOutput,
	BackgroundApi,
	VisibleTabIdentity,
} from '@/lib/messaging';
import type { ExtensionResult } from '@/lib/messaging/result';
import { diagnosticErrorType } from '@/lib/privacy/redaction';

/** Settings, browser target validation, and analysis owned by the background runtime. */
export type AutoScanControllerDependencies = {
	readonly getEnabled: () => Promise<boolean>;
	readonly getVisibleTabIdentity: BackgroundApi['getVisibleTabIdentity'];
	readonly analyzeVisibleTab: BackgroundApi['analyzeVisibleTab'];
	readonly log?: (event: string, details?: Record<string, unknown>) => void;
};

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

	/** Release the active callers and start a successor only while this tab entry still owns it. */
	function finishScan(tabId: number, scans: TabScans): void {
		scans.active.resolve();
		if (scansByTab.get(tabId) !== scans) return;
		if (!scans.pending) {
			scansByTab.delete(tabId);
			return;
		}
		scans.active = scans.pending;
		scans.pending = undefined;
		startScan(tabId, scans);
	}

	/** Keep rejected settings, lookup, and analysis calls from blocking the next page. */
	function startScan(tabId: number, scans: TabScans): void {
		const request = scans.active;
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
			.finally(() => finishScan(tabId, scans));
	}

	return {
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
		onTabNavigation(tabId) {
			const scans = scansByTab.get(tabId);
			if (scans) invalidateScans(scans);
		},
		onTabRemoved(tabId) {
			const scans = scansByTab.get(tabId);
			if (!scans) return;
			invalidateScans(scans);
			scansByTab.delete(tabId);
		},
	};
}
