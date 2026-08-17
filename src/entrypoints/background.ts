import { defineProxy } from 'comctx';
import { browser } from 'wxt/browser';

import { registerBackgroundLifecycleListeners } from '@/lib/background/lifecycle';
import { createAutoScanController } from '@/lib/autostart/controller';
import { getAutoScanEnabled } from '@/lib/autostart/settings';
import { createBackgroundRuntime } from '@/lib/background/runtime';
import { collectExtensionObservationBatch } from '@/lib/collectors/extension-page-collector';
import { bundledTechnologyRegistryProvider } from '@/lib/detection/registry-provider';
import { configureKaijuSiteScopeLogging, getKaijuSiteScopeLogger } from '@/lib/diagnostics/logging';
import type { SiteAnalysis } from '@/lib/detection/types';
import {
	cancelOffscreenMatcherJob,
	ensureKaijuSiteScopeOffscreenDocument,
	runMatcherJobWithOffscreenFallback,
} from '@/lib/lifecycle/offscreen-matcher';
import {
	BACKGROUND_RPC_NAMESPACE,
	CONTENT_RPC_NAMESPACE,
	createBackgroundServerAdapter,
	createContentClientAdapter,
	isSidePanelTabUpdateChange,
	type BackgroundApi,
	type ContentApi,
	type SidePanelTabNotificationReason,
	SIDE_PANEL_ACTION_NOTIFICATION_TYPE,
	SIDE_PANEL_TAB_NOTIFICATION_TYPE,
} from '@/lib/messaging';
import {
	browserDetectionPersistence,
	browserDetectionSnapshotStore,
} from '@/lib/persistence';

configureKaijuSiteScopeLogging('background');

const backgroundLogger = getKaijuSiteScopeLogger('background');

/** Build a content-script RPC client for one tab/frame at the browser interface. */
function createContentApiClient(tabId: number, frameId = 0): ContentApi {
	const [, injectContentApi] = defineProxy(() => ({}) as ContentApi, {
		namespace: CONTENT_RPC_NAMESPACE,
		heartbeatCheck: false,
		transfer: false,
	});

	return injectContentApi(createContentClientAdapter(tabId, frameId));
}

/** Inject the generated content-script bundle into the top frame. */
async function executeContentScript(tabId: number): Promise<void> {
	await browser.scripting.executeScript({
		target: { tabId, frameIds: [0] },
		files: ['/content-scripts/content.js'],
	});
}

/** Browser-runtime logging adapter used by orchestration and lifecycle listeners. */
function logBackgroundEvent(event: string, details?: Record<string, unknown>): void {
	backgroundLogger.debug('[kaiju-site-scope][background] {event}{summary}', {
		event,
		summary: formatBackgroundLogSummary(details),
		...(details ?? {}),
	});
}

/** Debug output is intentionally summary-only; never log raw page observations. */
function logAnalysisSummary(analysis: SiteAnalysis): void {
	backgroundLogger.info('[kaiju-site-scope] analysis summary', {
		hostname: analysis.hostname,
		resultCount: analysis.results.length,
		technologyIds: analysis.results.map((result) => result.technologyId),
		analyzedAt: analysis.analyzedAt,
	});
}

function formatBackgroundLogSummary(details?: Record<string, unknown>): string {
	if (!details) {
		return '';
	}

	const pairs: string[] = [];
	for (const key of [
		'tabId',
		'hostname',
		'jobId',
		'mode',
		'refreshKind',
		'matcherMode',
		'kind',
		'partitionId',
		'collectionPassId',
		'collectionPassIds',
		'revision',
		'rejectedByRevision',
		'observationCount',
		'queuedObservationCount',
		'resultCount',
		'storedResultCount',
		'matchCount',
		'candidateRuleCount',
		'completedPartitionCount',
		'partitionCount',
		'status',
		'executor',
		'timingTraceId',
	]) {
		const value = details[key];
		if (value === undefined) {
			continue;
		}

		pairs.push(`${key}=${formatBackgroundLogValue(value)}`);
	}

	return pairs.length ? ` (${pairs.join(' ')})` : '';
}

function formatBackgroundLogValue(value: unknown): string {
	if (Array.isArray(value)) {
		return `[${value.map(formatBackgroundLogValue).join(',')}]`;
	}

	if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
		return String(value);
	}

	return JSON.stringify(value);
}

/**
 * Open the window-scoped side panel directly from the action-click user gesture.
 *
 * The panel belongs to the browser window, not to the tab that happened to open
 * it. The mounted panel can therefore follow later active-tab changes in that
 * same window without Chrome replacing it with a tab-specific panel instance.
 */
function openSidePanelForActionTab(tabId: number, windowId: number): void {
	void browser.sidePanel.open({ windowId })
		.then(() => {
			void browser.runtime.sendMessage({
				type: SIDE_PANEL_ACTION_NOTIFICATION_TYPE,
				tabId,
				windowId,
			}).catch((error) => {
				logBackgroundEvent('side-panel-action-notification-failed', {
					tabId,
					windowId,
					message: error instanceof Error ? error.message : String(error),
				});
			});
		})
		.catch((error) => {
			logBackgroundEvent('side-panel-open-failed', {
				tabId,
				windowId,
				message: error instanceof Error ? error.message : String(error),
			});
		});
}

/** Forward an active-tab lifecycle event to any mounted side panel in the same window. */
function notifySidePanelTab(
	tabId: number,
	windowId: number,
	reason: SidePanelTabNotificationReason,
): void {
	void browser.runtime.sendMessage({
		type: SIDE_PANEL_TAB_NOTIFICATION_TYPE,
		tabId,
		windowId,
		reason,
	}).catch(() => {
		// No receiving panel is the normal state when the side panel is closed.
	});
}

/**
 * Compose the background application runtime from concrete browser adapters.
 *
 * No analysis workflow lives in this entrypoint. Its job is to select implementations,
 * register browser listeners, and expose the RPC server.
 */
const backgroundRuntime = createBackgroundRuntime({
	getTab: (tabId) => browser.tabs.get(tabId),
	executeContentScript,
	createContentApiClient,
	collectObservationBatch: collectExtensionObservationBatch,
	registryProvider: bundledTechnologyRegistryProvider,
	matcher: {
		cancelJob: cancelOffscreenMatcherJob,
		ensureOffscreenDocument: ensureKaijuSiteScopeOffscreenDocument,
		runJob: runMatcherJobWithOffscreenFallback,
	},
	persistence: browserDetectionPersistence,
	logEvent: logBackgroundEvent,
	logAnalysisSummary,
});

const autoScanController = createAutoScanController({
	getEnabled: getAutoScanEnabled,
	getVisibleTabIdentity: (input) => backgroundRuntime.api.getVisibleTabIdentity(input),
	analyzeVisibleTab: (input) => backgroundRuntime.api.analyzeVisibleTab(input),
	log: logBackgroundEvent,
});

/** Compatibility export used by tests and non-browser callers. */
export function createBackgroundApi(): BackgroundApi {
	return backgroundRuntime.api;
}

const [provideBackgroundApi] = defineProxy(() => backgroundRuntime.api, {
	namespace: BACKGROUND_RPC_NAMESPACE,
	heartbeatCheck: false,
	transfer: false,
});

export default defineBackground(() => {
	browser.action.onClicked.addListener((tab) => {
		if (typeof tab.id !== 'number') {
			logBackgroundEvent('side-panel-open-skipped', { reason: 'missing-tab-id' });
			return;
		}

		openSidePanelForActionTab(tab.id, tab.windowId);
	});
	browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (tab.active !== true) {
			return;
		}

		if (isSidePanelTabUpdateChange(changeInfo)) {
			notifySidePanelTab(tabId, tab.windowId, 'updated');
		}

		if (changeInfo.status !== 'complete') {
			return;
		}

		void autoScanController.scanVisibleTab(tabId, tab.windowId, 'refresh', 'page-load');
	});
	browser.tabs.onActivated.addListener(({ tabId, windowId }) => {
		notifySidePanelTab(tabId, windowId, 'activated');
		void browser.tabs.get(tabId).then((tab) => {
			if (tab.status !== 'complete') {
				return;
			}

			return autoScanController.scanVisibleTab(tabId, windowId, 'snapshot-first', 'tab-activated');
		}).catch((error) => {
			logBackgroundEvent('auto-scan-activation-read-failed', {
				tabId,
				message: error instanceof Error ? error.message : String(error),
			});
		});
	});
	browser.runtime.onMessage.addListener((message, sender) => {
		backgroundRuntime.handleRuntimeMessage(message, sender);
	});
	registerBackgroundLifecycleListeners({
		snapshots: browserDetectionSnapshotStore,
		onTabNavigation: backgroundRuntime.onTabNavigation,
		onTabRemoved: backgroundRuntime.onTabRemoved,
		log: logBackgroundEvent,
	});
	provideBackgroundApi(createBackgroundServerAdapter());
});
