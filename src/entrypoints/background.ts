import { defineProxy } from 'comctx';
import { browser } from 'wxt/browser';

import { registerBackgroundLifecycleListeners } from '@/lib/background/lifecycle';
import { createAutoScanController } from '@/lib/autostart/controller';
import { getAutoScanEnabled } from '@/lib/autostart/settings';
import { createBackgroundRuntime } from '@/lib/background/runtime';
import { reconcileInterruptedMatcherJobs } from '@/lib/background/reconcile-matcher-jobs';
import { reconcileAndResume } from '@/lib/background/startup';
import { openPanelFromToolbar } from '@/lib/background/toolbar';
import { badgeText, createBadgeWriter, type BadgeState } from '@/lib/background/badge';
import { collectExtensionObservationBatch } from '@/lib/collectors/extension-page-collector';
import { createPackagedRuntimeTechnologyRegistryProvider } from '@/lib/registry/packaged-runtime';
import { installDiagnosticCrashHooks } from '@/lib/diagnostics/crash';
import * as logging from '@/lib/diagnostics/logging';
import {
	isDiagnosticTransportMessage,
	persistTransportedDiagnosticMessage,
} from '@/lib/diagnostics/journal';
import type { SiteAnalysis } from '@/lib/detection/types';
import { diagnosticErrorType } from '@/lib/privacy/redaction';
import * as offscreen from '@/lib/matcher/offscreen';
import * as localWorkers from '@/lib/matcher/workers/local';
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
	SIDE_PANEL_TAB_NOTIFICATION_TYPE,
} from '@/lib/messaging';
import {
	browserDetectionPersistence,
	browserDetectionSnapshotStore,
} from '@/lib/persistence';


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
async function applyBadge(tabId: number, { count, finding }: BadgeState): Promise<void> {
	const text = badgeText(count);
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
	const { logBackgroundEvent, logAnalysisSummary } = createBackgroundLoggers();
	const badges = createBadgeWriter(applyBadge, (tabId, error) => {
		logBackgroundEvent('toolbar-badge-update-failed', { tabId, errorType: diagnosticErrorType(error) });
	});
	const matcherContextId = crypto.randomUUID();

	// Firefox and Safari backgrounds are pages and run the matcher workers
	// themselves. Chrome's background is a service worker, which cannot create
	// workers, so it delegates to the offscreen document.
	const localMatcher = localWorkers.canRunWorkersLocally();
	if (!localMatcher) offscreen.start();
	const matcherExecutor: matcherScheduler.MatcherPartitionExecutor = localMatcher
		? localWorkers.createLocalExecutor()
		: {
			capacity: offscreen.capacity,
			runPartition: offscreen.runPartition,
			cancelJob: offscreen.cancel,
			cancelTab: offscreen.cancelTab,
			touchLifecycle: offscreen.touchLifecycle,
			releaseLifecycle: offscreen.releaseLifecycle,
		};
	const cancelForRecovery = localMatcher ? localWorkers.cancelForRecovery : offscreen.cancelForRecovery;
	logBackgroundEvent('matcher-executor-selected', { executor: localMatcher ? 'background-workers' : 'offscreen-document' });

	const registryProvider = createPackagedRuntimeTechnologyRegistryProvider();
	const matcherQueue = matcherScheduler.create(matcherExecutor, logBackgroundEvent);

	const backgroundRuntime = createBackgroundRuntime({
		getTab: (tabId) => browser.tabs.get(tabId),
		executeContentScript,
		createContentApiClient,
		collectObservationBatch: collectExtensionObservationBatch,
		registryProvider,
		matcherContextId,
		matcher: matcherQueue,
		persistence: browserDetectionPersistence,
		// Called only after startup returns, so `analysisQueue` is initialized by then.
		scheduleBackgroundWork: (task) => analysisQueue.runBackground(task),
		logEvent: logBackgroundEvent,
		logAnalysisSummary,
		setBadge: (tabId, count, finding) => badges.set(tabId, { count, ...(finding ? { finding } : {}) }),
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
		async analyzeVisibleTab(input) {
			// Activation gates admission only. A surface following the active tab must
			// still be looking at it now; once admitted, the work keeps running even if
			// the tab is later deactivated.
			if (input.follow !== 'pinned') {
				const current = await backgroundRuntime.api.getVisibleTabIdentity({
					tabId: input.target.tabId,
					windowId: input.target.windowId,
				});
				if (!current.ok) return current;
			}
			return await analysisQueue.analyze(input, 'interactive');
		},
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

	void reconcileAndResume({
		schedulers: { analysis: analysisQueue, matcher: matcherQueue },
		reconcileRecords: async () => (await reconcileInterruptedMatcherJobs(matcherContextId, logBackgroundEvent, cancelForRecovery)).length,
		recover(recovery) {
			matcherRecoveryTabs.add(recovery.tabId);
			void backgroundRuntime.resolveScheduledTab({
				windowId: recovery.windowId,
				tabId: recovery.tabId,
				frameId: 0,
				urlHash: recovery.documentKey,
			}).then((target) => {
				if (!target.ok) return;
				return analysisQueue.analyze({ target: target.value, mode: 'refresh', observe: 'none' }, 'recovery');
			}).catch((error: unknown) => {
				logBackgroundEvent('scheduler-recovery-failed', { tabId: recovery.tabId, errorType: diagnosticErrorType(error) });
			}).finally(() => matcherRecoveryTabs.delete(recovery.tabId));
		},
		log: logBackgroundEvent,
	});

	// Firefox opens its sidebar only during this click, so the handler stays synchronous.
	browser.action.onClicked.addListener((tab) => openPanelFromToolbar(tab, logBackgroundEvent));
	// One update can carry both a replacement URL and a completed load. Invalidate
	// the old page before the scan listener queues the completed page.
	registerBackgroundLifecycleListeners({
		snapshots: browserDetectionSnapshotStore,
		onTabNavigation(tabId) {
			autoScanController.onTabNavigation(tabId);
			matcherRecoveryTabs.delete(tabId);
			backgroundRuntime.onTabNavigation(tabId);
			void analysisQueue.cancelTab(tabId);
		},
		onTabRemoved(tabId) {
			badges.forget(tabId);
			autoScanController.onTabRemoved(tabId);
			matcherRecoveryTabs.delete(tabId);
			backgroundRuntime.onTabRemoved(tabId);
			void analysisQueue.cancelTab(tabId);
		},
		log: logBackgroundEvent,
	});
	// A prerendered or restored page can replace a tab id. The old id never
	// receives another event, so release its work as if the tab closed.
	browser.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
		badges.forget(removedTabId);
		autoScanController.onTabRemoved(removedTabId);
		matcherRecoveryTabs.delete(removedTabId);
		backgroundRuntime.onTabRemoved(removedTabId);
		void analysisQueue.cancelTab(removedTabId);
		logBackgroundEvent('tab-replaced', { addedTabId, removedTabId });
	});
	browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		// Any tab can be scanned, so any tab's badge must clear when its page changes.
		// Browsers clear it on a full navigation but not on history.pushState.
		if (changeInfo.status === 'loading' || changeInfo.url !== undefined) void badges.clear(tabId);

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
		void analysisQueue.activateTab(tabId, windowId);
		void matcherQueue.activateTab(tabId, windowId);
		notifySidePanelTab(tabId, windowId, 'activated');
		void browser.tabs.get(tabId).then((tab) => {
			// A recovery recollection for this tab is already queued; activation only
			// raises its priority (above) instead of starting a second scan.
			if (tab.status !== 'complete' || tab.active !== true || tab.windowId !== windowId || matcherRecoveryTabs.has(tabId)) {
				return;
			}

			return autoScanController.scanVisibleTab(tabId, windowId, 'snapshot-first', 'tab-activated');
		}).catch((error) => {
			logBackgroundEvent('auto-scan-activation-read-failed', {
				tabId,
				errorType: diagnosticErrorType(error),
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
	provideBackgroundApi(createBackgroundServerAdapter());
});
