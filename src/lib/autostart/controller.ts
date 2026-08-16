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
	scanVisibleTab(tabId: number, mode: AnalyzeVisibleTabMode, reason: string): Promise<void>;
};

/**
 * Serialize automatic scans per tab so load/activation events cannot enqueue duplicate work.
 *
 * The background API still validates the exact visible-tab identity immediately before analysis,
 * so a tab switch that races this controller is dropped instead of scanning the wrong page.
 */
export function createAutoScanController(
	dependencies: AutoScanControllerDependencies,
): AutoScanController {
	const inFlightByTab = new Map<number, Promise<void>>();

	async function runVisibleTabScan(tabId: number, mode: AnalyzeVisibleTabMode, reason: string): Promise<void> {
		if (!(await dependencies.getEnabled())) {
			dependencies.log?.('auto-scan-disabled', { tabId, reason });
			return;
		}

		const identityResponse = await dependencies.getVisibleTabIdentity();
		if (!identityResponse.ok || identityResponse.value.tabId !== tabId) {
			dependencies.log?.('auto-scan-visible-tab-mismatch', {
				tabId,
				reason,
				visibleTabId: identityResponse.ok ? identityResponse.value.tabId : undefined,
				code: identityResponse.ok ? undefined : identityResponse.error.code,
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
		scanVisibleTab(tabId, mode, reason) {
			const existing = inFlightByTab.get(tabId);
			if (existing) {
				dependencies.log?.('auto-scan-already-in-flight', { tabId, mode, reason });
				return existing;
			}

			const task = runVisibleTabScan(tabId, mode, reason)
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
