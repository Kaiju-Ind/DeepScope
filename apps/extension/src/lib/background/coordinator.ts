import { defineProxy } from 'comctx';
import { browser } from 'wxt/browser';

import { createAutoScanController } from "../autostart/controller.ts";
import { getAutoScanEnabled } from "../autostart/settings.ts";
import { createBackgroundRuntime } from "./runtime/index.ts";
import { missingUrlFailure } from "../browser/permissions.ts";
import { createContentApiClient, executeContentScript } from './content.ts';

import { reconcileInterruptedMatcherJobs } from "./reconcile-matcher-jobs.ts";
import { reconcileAndResume } from "./startup.ts";

import { createBadgeWriter } from "./badge.ts";
import * as writes from './writes.ts';
import { collectExtensionObservationBatch } from "../collectors/extension-page-collector.ts";
import { createPackagedRuntimeTechnologyRegistryProvider } from "../registry/runtime.ts";
import { installDiagnosticCrashHooks } from "../diagnostics/crash.ts";
import * as logging from '../diagnostics/logging.ts';

import { diagnosticErrorType } from "@deepscope/detection/privacy/redaction";

import * as analysisScheduler from '../scheduler/analysis.ts';
import * as matcherScheduler from '../scheduler/matcher/index.ts';
import { BACKGROUND_RPC_NAMESPACE, createBackgroundServerAdapter, type BackgroundApi } from "../messaging/index.ts";
import { browserDetectionPersistence } from "../persistence/index.ts";

import { createBackgroundLoggers } from './logging.ts';
import { applyBadge } from './action.ts';
import { selectMatcherExecutor } from './executor.ts';
import { register } from './listeners.ts';

/**
 * Start one browser background context and bind its explicit runtime adapters.
 *
 * Recovery begins asynchronously. All listeners and the RPC server are registered
 * before this function returns, as required by a Manifest V3 service worker.
 */
export function start(): void {
	logging.configure('background');
	installDiagnosticCrashHooks('background');
	const { logBackgroundEvent, logAnalysisSummary } = createBackgroundLoggers();
	const badges = createBadgeWriter(applyBadge, (tabId, error) => {
		logBackgroundEvent('toolbar-badge-update-failed', { tabId, errorType: diagnosticErrorType(error) });
	});
	const matcherContextId = crypto.randomUUID();

	const { matcherExecutor, cancelForRecovery } = selectMatcherExecutor(logBackgroundEvent);

	const registryProvider = createPackagedRuntimeTechnologyRegistryProvider();
	const matcherQueue = matcherScheduler.create(matcherExecutor, logBackgroundEvent);
	const tabWrites = writes.create();

	const backgroundRuntime = createBackgroundRuntime({
		missingUrlFailure,
		/** Resolve current browser state through the concrete tabs adapter at operation time. */
		getTab: (tabId) => browser.tabs.get(tabId),
		executeContentScript,
		createContentApiClient,
		collectObservationBatch: collectExtensionObservationBatch,
		registryProvider,
		matcherContextId,
		matcher: matcherQueue,
		persistence: tabWrites.guard(browserDetectionPersistence),
		// Called only after startup returns, so `analysisQueue` is initialized by then.
		scheduleBackgroundWork: (task) => analysisQueue.runBackground(task),
		logEvent: logBackgroundEvent,
		logAnalysisSummary,
		/** Send count/finding updates through the single ordered badge writer. */
		setBadge: (tabId, count, finding) => badges.set(tabId, { count, ...(finding ? { finding } : {}) }),
	});
	const analysisQueue = analysisScheduler.create({
		/** Revalidate the scheduler's captured tab/window/document identity before executing queued analysis. */
		resolveTarget: (work) => backgroundRuntime.resolveScheduledTab({
			windowId: work.windowId,
			tabId: work.tabId,
			frameId: work.frameId,
			urlHash: work.urlHash,
		}),
		/** Run admitted scheduler work through the composed runtime's scheduled-target path. */
		analyze: (input) => backgroundRuntime.analyzeScheduledTab(input),
		log: logBackgroundEvent,
	});
	const scheduledBackgroundApi: BackgroundApi = {
		...backgroundRuntime.api,
		/** Route analysis through the shared scheduler using this call site's interactive or automatic admission policy. */
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
		/** Use the runtime's live target validation for auto-scan admission. */
		getVisibleTabIdentity: (input) => backgroundRuntime.api.getVisibleTabIdentity(input),
		/** Route analysis through the shared scheduler using this call site's interactive or automatic admission policy. */
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
		/** Reconcile interrupted jobs for this new background context before schedulers resume. */
		reconcileRecords: async () => (await reconcileInterruptedMatcherJobs(matcherContextId, logBackgroundEvent, cancelForRecovery)).length,
		/** Track recovery-owned tabs until refresh settles, logging failures and always releasing the recovery marker. */
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

	register({ backgroundRuntime, autoScanController, badges, tabWrites, analysisQueue, matcherQueue, matcherRecoveryTabs, logBackgroundEvent });

	provideBackgroundApi(createBackgroundServerAdapter());
}
