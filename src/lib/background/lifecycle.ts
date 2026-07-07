import { browser } from 'wxt/browser';

import {
	markDetectionSessionSnapshotsForTab,
	removeDetectionSessionIndex,
} from '../storage';

/** Reason recorded when a tab lifecycle event updates stored snapshots. */
type BackgroundTabLifecycleReason = 'tab-navigation' | 'tab-removed';

/** Callback used to clean memory that is safe to lose across service-worker restarts. */
export type BackgroundTabCleanup = (tabId: number) => void;

/** Diagnostic logger shape used by the background entrypoint without importing LogTape here. */
export type BackgroundLifecycleLogger = (event: string, details?: Record<string, unknown>) => void;

/** Options for registering lightweight background lifecycle listeners. */
export interface RegisterBackgroundLifecycleListenersInput {
	/** Remove volatile tab-scoped maps when Chrome reports that a document is being replaced. */
	readonly onTabNavigation?: BackgroundTabCleanup;
	/** Remove volatile tab-scoped maps when Chrome reports a closed tab. */
	readonly onTabRemoved: BackgroundTabCleanup;
	/** Optional summary logger for lifecycle events and cleanup failures. */
	readonly log?: BackgroundLifecycleLogger;
}

/**
 * Register lifecycle listeners that do not need the detector registry.
 *
 * Manifest V3 can wake the background service worker for tab events before a
 * popup command asks for analysis. The listeners stay lightweight: they mark
 * stored snapshot revisions stale or stopped and prune disposable maps, but they
 * do not import registry data, run detection, or inject content scripts.
 */
export function registerBackgroundLifecycleListeners(
	input: RegisterBackgroundLifecycleListenersInput,
): void {
	browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
		if (!isNavigationChange(changeInfo)) {
			return;
		}

		input.onTabNavigation?.(tabId);
		void markTabSnapshots(tabId, 'stale', 'tab-navigation', input.log);
	});

	browser.tabs.onRemoved.addListener((tabId) => {
		input.onTabRemoved(tabId);
		void (async () => {
			await markTabSnapshots(tabId, 'stopped', 'tab-removed', input.log);
			await removeDetectionSessionIndex(tabId);
		})().catch((error) => {
			input.log?.('tab-session-cleanup-failed', {
				tabId,
				reason: describeLifecycleError(error),
			});
		});
	});
}

/** Treat URL changes and new loading cycles as the old document becoming stale. */
function isNavigationChange(changeInfo: { readonly status?: string; readonly url?: string }): boolean {
	return typeof changeInfo.url === 'string' || changeInfo.status === 'loading';
}

/** Update stored snapshots without letting lifecycle cleanup throw into Chrome listeners. */
async function markTabSnapshots(
	tabId: number,
	status: 'stale' | 'stopped',
	reason: BackgroundTabLifecycleReason,
	log?: BackgroundLifecycleLogger,
): Promise<void> {
	const marked = await markDetectionSessionSnapshotsForTab(tabId, status, reason);
	if (marked.length === 0) {
		return;
	}

	log?.('tab-session-snapshots-marked', {
		tabId,
		status,
		reason,
		count: marked.length,
	});
}

/** Convert unknown listener failures into a stable summary for diagnostics. */
function describeLifecycleError(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}
