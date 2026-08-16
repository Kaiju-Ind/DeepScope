import { defineProxy } from 'comctx';
import { browser } from 'wxt/browser';

import { registerBackgroundLifecycleListeners } from '@/lib/background/lifecycle';
import { createAutoScanController } from '@/lib/autostart/controller';
import { getAutoScanEnabled } from '@/lib/autostart/settings';
import { createBackgroundRuntime } from '@/lib/background/runtime';
import { getActiveTab } from '@/lib/browser/active-tab';
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
	type BackgroundApi,
	type ContentApi,
	SIDE_PANEL_ACTION_NOTIFICATION_TYPE,
} from '@/lib/messaging';
import {
	browserDetectionPersistence,
	browserDetectionSnapshotStore,
} from '@/lib/persistence';

configureKaijuSiteScopeLogging('background');

const backgroundLogger = getKaijuSiteScopeLogger('background');

/** Build a content-script RPC client for one tab/frame at the browser boundary. */
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

const SIDE_PANEL_PATH = 'sidepanel.html';

/**
 * Open a tab-scoped side panel directly from the action-click user gesture.
 *
 * `sidePanel.open()` must run synchronously from the click handler. The options
 * call is intentionally started in the same turn without awaiting first so the
 * user gesture is not lost while Chrome configures the tab-specific panel.
 */
function openSidePanelForActionTab(tabId: number): void {
	const configurePanel = browser.sidePanel.setOptions({
		tabId,
		path: SIDE_PANEL_PATH,
		enabled: true,
	});
	const openPanel = browser.sidePanel.open({ tabId });

	void Promise.all([configurePanel, openPanel])
		.then(() => {
			void browser.runtime.sendMessage({
				type: SIDE_PANEL_ACTION_NOTIFICATION_TYPE,
				tabId,
			}).catch((error) => {
				logBackgroundEvent('side-panel-action-notification-failed', {
					tabId,
					message: error instanceof Error ? error.message : String(error),
				});
			});
		})
		.catch((error) => {
			logBackgroundEvent('side-panel-open-failed', {
				tabId,
				message: error instanceof Error ? error.message : String(error),
			});
		});
}

/**
 * Compose the background application runtime from concrete browser adapters.
 *
 * No analysis workflow lives in this entrypoint. Its job is to select implementations,
 * register browser listeners, and expose the RPC server.
 */
const backgroundRuntime = createBackgroundRuntime({
	getActiveTab,
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
	getVisibleTabIdentity: () => backgroundRuntime.api.getVisibleTabIdentity(),
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
	// Keep the persistent UI opt-in per tab even though automatic analysis can run
	// in the background. Toolbar clicks only control where the side panel is shown;
	// the separate auto-scan setting controls page-load analysis.
	void browser.sidePanel.setOptions({ enabled: false }).catch((error) => {
		logBackgroundEvent('side-panel-default-disable-failed', {
			message: error instanceof Error ? error.message : String(error),
		});
	});

	browser.action.onClicked.addListener((tab) => {
		if (typeof tab.id !== 'number') {
			logBackgroundEvent('side-panel-open-skipped', { reason: 'missing-tab-id' });
			return;
		}

		openSidePanelForActionTab(tab.id);
	});
	browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (changeInfo.status !== 'complete' || tab.active !== true) {
			return;
		}

		void autoScanController.scanVisibleTab(tabId, 'refresh', 'page-load');
	});
	browser.tabs.onActivated.addListener(({ tabId }) => {
		void browser.tabs.get(tabId).then((tab) => {
			if (tab.status !== 'complete') {
				return;
			}

			return autoScanController.scanVisibleTab(tabId, 'snapshot-first', 'tab-activated');
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
