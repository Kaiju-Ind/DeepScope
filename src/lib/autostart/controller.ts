import type {
	AnalyzeVisibleTabMode,
	AnalyzeVisibleTabOutput,
	BackgroundApi,
	VisibleTabIdentity,
} from '@/lib/messaging';
import type { AppResult } from '@/lib/shared/result';

export type AutoScanControllerDependencies = {
	readonly getEnabled: () => Promise<boolean>;
	readonly getVisibleTabIdentity: BackgroundApi['getVisibleTabIdentity'];
	readonly analyzeVisibleTab: BackgroundApi['analyzeVisibleTab'];
	readonly log?: (event: string, details?: Record<string, unknown>) => void;
};

export type AutoScanController = {
	/** Analyze a tab when it is the currently visible page and automatic scanning is enabled. */
	scanVisibleTab(tabId: number, windowId: number, mode: AnalyzeVisibleTabMode, reason: string): Promise<void>;
};

/**
 * Serialize automatic scans per tab so load/activation events cannot enqueue duplicate work.
 *
 * The background API resolves the exact window/tab pair from the browser immediately before analysis.
 * If activation changes while this controller is waiting, the now-inactive target is rejected.
 */
export function createAutoScanController(
	dependencies: AutoScanControllerDependencies,
): AutoScanController {
	const inFlightByTab = new Map<number, Promise<void>>();

	async function runVisibleTabScan(tabId: number, windowId: number, mode: AnalyzeVisibleTabMode, reason: string): Promise<void> {
		if (!(await dependencies.getEnabled())) {
			dependencies.log?.('auto-scan-disabled', { tabId, reason });
			return;
		}

		const identityResponse = await dependencies.getVisibleTabIdentity({ tabId, windowId });
		if (!identityResponse.ok) {
			dependencies.log?.('auto-scan-target-unavailable', {
				tabId,
				reason,
				code: identityResponse.error.code,
			});
			return;
		}

		const identity: VisibleTabIdentity = identityResponse.value;
		dependencies.log?.('auto-scan-start', {
			tabId,
			hostname: identity.hostname,
			mode,
			reason,
		});
		const response: AppResult<AnalyzeVisibleTabOutput> = await dependencies.analyzeVisibleTab({
			target: identity,
			mode,
			observe: 'bounded',
		});
		dependencies.log?.(response.ok ? 'auto-scan-queued' : 'auto-scan-failed', {
			tabId,
			hostname: identity.hostname,
			mode,
			reason,
			...(response.ok
				? { resultCount: response.value.analysis.results.length, snapshotStatus: response.value.snapshot.status }
				: { code: response.error.code, message: response.error.message }),
		});
	}

	return {
		scanVisibleTab(tabId, windowId, mode, reason) {
			const existing = inFlightByTab.get(tabId);
			if (existing) {
				dependencies.log?.('auto-scan-already-in-flight', { tabId, mode, reason });
				return existing;
			}

			const task = runVisibleTabScan(tabId, windowId, mode, reason)
				.catch((error: unknown) => {
					dependencies.log?.('auto-scan-threw', {
						tabId,
						mode,
						reason,
						message: error instanceof Error ? error.message : String(error),
					});
				})
				.finally(() => {
					if (inFlightByTab.get(tabId) === task) {
						inFlightByTab.delete(tabId);
					}
				});
			inFlightByTab.set(tabId, task);
			return task;
		},
	};
}
