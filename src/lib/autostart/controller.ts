import type {
	AnalyzeVisibleTabMode,
	AnalyzeVisibleTabOutput,
	BackgroundApi,
	VisibleTabIdentity,
} from '@/lib/messaging';
import type { ExtensionResult } from '@/lib/messaging/result';
import * as generation from '@/utils/generation';

export type AutoScanControllerDependencies = {
	readonly getEnabled: () => Promise<boolean>;
	readonly getVisibleTabIdentity: BackgroundApi['getVisibleTabIdentity'];
	readonly analyzeVisibleTab: BackgroundApi['analyzeVisibleTab'];
	readonly log?: (event: string, details?: Record<string, unknown>) => void;
};

export type AutoScanController = {
	/** Analyze a tab when it is the currently visible page and automatic scanning is enabled. */
	scanVisibleTab(tabId: number, windowId: number, mode: AnalyzeVisibleTabMode, reason: string): Promise<void>;
	/** Invalidate an automatic scan that has not yet crossed into scheduler-owned analysis work. */
	cancelTab(tabId: number): void;
};

interface InFlightScan {
	readonly generation: number;
	readonly task: Promise<void>;
}

/**
 * Serialize automatic scans per tab and reject stale pre-scheduler work.
 *
 * Scheduler/runtime cancellation owns analysis after it is admitted. The local
 * generation closes the smaller race before admission: a tab can close or
 * navigate after identity lookup but before `analyzeVisibleTab()` is called.
 */
export function createAutoScanController(
	dependencies: AutoScanControllerDependencies,
): AutoScanController {
	const inFlightByTab = new Map<number, InFlightScan>();
	const generations = generation.create<number>();

	async function runVisibleTabScan(
		tabId: number,
		windowId: number,
		mode: AnalyzeVisibleTabMode,
		reason: string,
		generation: number,
	): Promise<void> {
		if (!(await dependencies.getEnabled()) || !generations.isCurrent(tabId, generation)) {
			dependencies.log?.('auto-scan-disabled-or-canceled', { tabId, reason });
			return;
		}

		const identityResponse = await dependencies.getVisibleTabIdentity({ tabId, windowId });
		if (!generations.isCurrent(tabId, generation)) return;
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
		if (!generations.isCurrent(tabId, generation)) return;
		const response: ExtensionResult<AnalyzeVisibleTabOutput> = await dependencies.analyzeVisibleTab({
			target: identity,
			mode,
			observe: 'none',
		});
		if (!generations.isCurrent(tabId, generation)) return;
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
			const currentGeneration = generations.capture(tabId);
			const existing = inFlightByTab.get(tabId);
			if (existing?.generation === currentGeneration) {
				dependencies.log?.('auto-scan-already-in-flight', { tabId, mode, reason });
				return existing.task;
			}

			const task = runVisibleTabScan(tabId, windowId, mode, reason, currentGeneration)
				.catch((error: unknown) => {
					dependencies.log?.('auto-scan-threw', {
						tabId,
						mode,
						reason,
						message: error instanceof Error ? error.message : String(error),
					});
				})
				.finally(() => {
					if (inFlightByTab.get(tabId)?.task === task) inFlightByTab.delete(tabId);
				});
			inFlightByTab.set(tabId, { generation: currentGeneration, task });
			return task;
		},

		cancelTab(tabId) {
			generations.invalidate(tabId);
			inFlightByTab.delete(tabId);
			dependencies.log?.('auto-scan-canceled', { tabId });
		},
	};
}
