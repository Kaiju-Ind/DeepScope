import { defineProxy } from 'comctx';
import { browser } from 'wxt/browser';

import { registerBackgroundLifecycleListeners } from '@/lib/background/lifecycle';
import { createAutoScanController } from '@/lib/autostart/controller';
import { getAutoScanEnabled } from '@/lib/autostart/settings';
import { createBackgroundRuntime } from '@/lib/background/runtime';
import { collectExtensionObservationBatch } from '@/lib/collectors/extension-page-collector';
import { createPackagedRuntimeTechnologyRegistryProvider } from '@/lib/registry/packaged-runtime';
import { installDiagnosticCrashHooks } from '@/lib/diagnostics/crash';
import * as logging from '@/lib/diagnostics/logging';
import {
	isDiagnosticTransportMessage,
	persistTransportedDiagnosticMessage,
} from '@/lib/diagnostics/journal';
import type { SiteAnalysis } from '@/lib/detection/types';
import * as offscreen from '@/lib/matcher/offscreen';
import * as analysisScheduler from '@/lib/scheduler/analysis';
import * as matcherScheduler from '@/lib/scheduler/matcher';
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
import { reconcileMatcherJobRecords } from '@/lib/storage/matcher-jobs';


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

/** Create the runtime-owned logging projections after WXT starts the service worker. */
function createBackgroundLoggers() {
	const backgroundLogger = logging.get('background');

	function logBackgroundEvent(event: string, details?: Record<string, unknown>): void {
		backgroundLogger.debug('[kaiju-deepscope][background] {event}{summary}', {
			event,
			summary: formatBackgroundLogSummary(details),
			...(details ?? {}),
		});
	}

	function logAnalysisSummary(analysis: SiteAnalysis): void {
		backgroundLogger.info('[kaiju-deepscope] analysis summary', {
			hostname: analysis.hostname,
			resultCount: analysis.results.length,
			technologyIds: analysis.results.map((result) => result.technologyId),
			analyzedAt: analysis.analyzedAt,
		});
	}

	return { logBackgroundEvent, logAnalysisSummary };
}

function formatBackgroundLogSummary(details?: Record<string, unknown>): string {
	if (!details) return '';

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
		if (value === undefined) continue;
		pairs.push(`${key}=${formatBackgroundLogValue(value)}`);
	}

	return pairs.length ? ` (${pairs.join(' ')})` : '';
}

function formatBackgroundLogValue(value: unknown): string {
	if (Array.isArray(value)) return `[${value.map(formatBackgroundLogValue).join(',')}]`;
	if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
	return JSON.stringify(value);
}

/**
 * Open the window-scoped side panel directly from the action-click user gesture.
 *
 * The panel belongs to the browser window, not to the tab that happened to open
 * it. The mounted panel can therefore follow later active-tab changes in that
 * same window without Chrome replacing it with a tab-specific panel instance.
 */
function openSidePanelForActionTab(
	tabId: number,
	windowId: number,
	log: (event: string, details?: Record<string, unknown>) => void,
): void {
	void browser.sidePanel.open({ windowId })
		.then(() => {
			void browser.runtime.sendMessage({
				type: SIDE_PANEL_ACTION_NOTIFICATION_TYPE,
				tabId,
				windowId,
			}).catch((error) => {
				log('side-panel-action-notification-failed', {
					tabId,
					windowId,
					message: error instanceof Error ? error.message : String(error),
				});
			});
		})
		.catch((error) => {
			log('side-panel-open-failed', {
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
 * WXT imports background entrypoints during build-time manifest generation. Keep
 * all browser-owned resources and side effects inside `defineBackground` so the
 * module remains import-safe in that Node.js build process.
 */
/** Show a compact count and useful finding in the browser action without opening the panel. */
async function setBadge(tabId: number, count: number, finding?: string): Promise<void> {
	const text = count <= 0 ? '' : count > 99 ? '99+' : String(count);
	const title = count <= 0
		? 'Kaiju DeepScope'
		: `Kaiju DeepScope · ${count} ${count === 1 ? 'technology' : 'technologies'}${finding ? ` · Top finding: ${finding}` : ''}`;
	const textColor = browser.action.setBadgeTextColor?.({ tabId, color: '#030812' });
	await Promise.all([
		browser.action.setBadgeText({ tabId, text }),
		browser.action.setBadgeBackgroundColor({ tabId, color: '#54def0' }),
		browser.action.setTitle({ tabId, title }),
		...(textColor ? [textColor] : []),
	]);
}

export default defineBackground(() => {
	logging.configure('background');
	installDiagnosticCrashHooks('background');
	offscreen.start();
	const { logBackgroundEvent, logAnalysisSummary } = createBackgroundLoggers();
	const matcherContextId = crypto.randomUUID();

	const registryProvider = createPackagedRuntimeTechnologyRegistryProvider();
	const matcherQueue = matcherScheduler.create({
		capacity: offscreen.capacity,
		runPartition: offscreen.runPartition,
		cancelJob: offscreen.cancel,
		cancelTab: offscreen.cancelTab,
		touchLifecycle: offscreen.touchLifecycle,
		releaseLifecycle: offscreen.releaseLifecycle,
	}, logBackgroundEvent);

	const backgroundRuntime = createBackgroundRuntime({
		getTab: (tabId) => browser.tabs.get(tabId),
		executeContentScript,
		createContentApiClient,
		collectObservationBatch: collectExtensionObservationBatch,
		registryProvider,
		matcherContextId,
		matcher: matcherQueue,
		persistence: browserDetectionPersistence,
		logEvent: logBackgroundEvent,
		logAnalysisSummary,
		setBadge,
	});
	const analysisQueue = analysisScheduler.create({
		resolveTarget: (work) => backgroundRuntime.resolveScheduledTab({
			windowId: work.windowId,
			tabId: work.tabId,
			frameId: work.frameId,
			urlHash: work.urlHash,
		}),
		analyze: (input) => backgroundRuntime.analyzeScheduledTab(input),
		log: logBackgroundEvent,
	});
	const scheduledBackgroundApi: BackgroundApi = {
		...backgroundRuntime.api,
		analyzeVisibleTab: (input) => analysisQueue.analyze(input, 'interactive'),
	};

	const autoScanController = createAutoScanController({
		getEnabled: getAutoScanEnabled,
		getVisibleTabIdentity: (input) => backgroundRuntime.api.getVisibleTabIdentity(input),
		analyzeVisibleTab: (input) => analysisQueue.analyze(input, 'automatic'),
		log: logBackgroundEvent,
	});
	const matcherRecoveryTabs = new Set<number>();
	const [provideBackgroundApi] = defineProxy(() => scheduledBackgroundApi, {
		namespace: BACKGROUND_RPC_NAMESPACE,
		heartbeatCheck: false,
		transfer: false,
	});

	void (async () => {
		const [, matcherRecoveries, interruptedMatcherJobs] = await Promise.all([
			analysisQueue.reconcile(),
			matcherQueue.reconcile(),
			reconcileMatcherJobRecords(matcherContextId),
		]);
		matcherQueue.resume();
		analysisQueue.resume();
		for (const recovery of matcherRecoveries) {
			matcherRecoveryTabs.add(recovery.tabId);
			void backgroundRuntime.resolveScheduledTab({
				windowId: recovery.windowId,
				tabId: recovery.tabId,
				frameId: 0,
				urlHash: recovery.documentKey,
			}).then((target) => {
				if (!target.ok) return;
				return analysisQueue.analyze({ target: target.value, mode: 'refresh', observe: 'none' }, 'recovery');
			}).finally(() => matcherRecoveryTabs.delete(recovery.tabId));
		}
		logBackgroundEvent('scheduler-reconciled', {
			matcherRecoveries,
			interruptedMatcherJobCount: interruptedMatcherJobs.length,
		});
	})().catch((error) => {
		logBackgroundEvent('scheduler-reconciliation-failed', {
			message: error instanceof Error ? error.message : String(error),
		});
	});

	browser.action.onClicked.addListener((tab) => {
		if (typeof tab.id !== 'number') {
			logBackgroundEvent('side-panel-open-skipped', { reason: 'missing-tab-id' });
			return;
		}

		openSidePanelForActionTab(tab.id, tab.windowId, logBackgroundEvent);
	});
	browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (tab.active !== true) {
			return;
		}

		if (changeInfo.status === 'loading' || changeInfo.url !== undefined) void setBadge(tabId, 0);

		if (isSidePanelTabUpdateChange(changeInfo)) {
			notifySidePanelTab(tabId, tab.windowId, 'updated');
		}

		if (changeInfo.status !== 'complete') {
			return;
		}

		void autoScanController.scanVisibleTab(tabId, tab.windowId, 'refresh', 'page-load');
	});
	browser.tabs.onActivated.addListener(({ tabId, windowId }) => {
		void analysisQueue.activateTab(tabId, windowId);
		void matcherQueue.activateTab(tabId, windowId);
		notifySidePanelTab(tabId, windowId, 'activated');
		void browser.tabs.get(tabId).then((tab) => {
			if (tab.status !== 'complete' || matcherRecoveryTabs.has(tabId)) return;
			return autoScanController.scanVisibleTab(tabId, windowId, 'snapshot-first', 'tab-activated');
		}).catch((error) => {
			logBackgroundEvent('auto-scan-activation-read-failed', {
				tabId,
				message: error instanceof Error ? error.message : String(error),
			});
		});
	});
	browser.runtime.onMessage.addListener((message, sender) => {
		if (isDiagnosticTransportMessage(message)) {
			void persistTransportedDiagnosticMessage(message);
			return;
		}
		backgroundRuntime.handleRuntimeMessage(message, sender);
	});
	registerBackgroundLifecycleListeners({
		snapshots: browserDetectionSnapshotStore,
		onTabNavigation(tabId) {
			autoScanController.cancelTab(tabId);
			matcherRecoveryTabs.delete(tabId);
			backgroundRuntime.onTabNavigation(tabId);
			void analysisQueue.cancelTab(tabId);
		},
		onTabRemoved(tabId) {
			autoScanController.cancelTab(tabId);
			matcherRecoveryTabs.delete(tabId);
			backgroundRuntime.onTabRemoved(tabId);
			void analysisQueue.cancelTab(tabId);
		},
		log: logBackgroundEvent,
	});
	browser.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
		autoScanController.cancelTab(removedTabId);
		matcherRecoveryTabs.delete(removedTabId);
		backgroundRuntime.onTabRemoved(removedTabId);
		void analysisQueue.cancelTab(removedTabId);
		logBackgroundEvent('tab-replaced', { addedTabId, removedTabId });
	});
	provideBackgroundApi(createBackgroundServerAdapter());
});
