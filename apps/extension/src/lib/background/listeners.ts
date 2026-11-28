import { browser } from 'wxt/browser';
import { registerBackgroundLifecycleListeners } from "./lifecycle.ts";

import { openPanelFromToolbar } from "./toolbar.ts";

import type * as writes from './writes.ts';

import { isDiagnosticTransportMessage } from "../diagnostics/journal/schema.ts";
import { persistTransportedDiagnosticMessage } from "../diagnostics/journal/write.ts";

import { diagnosticErrorType } from "@deepscope/detection/privacy/redaction";

import type * as analysisScheduler from '../scheduler/analysis.ts';
import type * as matcherScheduler from '../scheduler/matcher/types.ts';
import { isSidePanelTabUpdateChange, type SidePanelTabNotificationReason, SIDE_PANEL_TAB_NOTIFICATION_TYPE } from "../messaging/index.ts";
import { browserDetectionSnapshotStore } from "../persistence/index.ts";
import type { BackgroundRuntime, BackgroundRuntimeDependencies } from './runtime/types.ts';
import type { AutoScanController } from "../autostart/controller.ts";
import type { BadgeWriter } from './badge.ts';

/** Live services owned by this background context. Registration does not await any operation. */
export interface Dependencies {
	readonly backgroundRuntime: BackgroundRuntime;
	readonly autoScanController: AutoScanController;
	readonly badges: BadgeWriter;
	readonly tabWrites: writes.TabWrites;
	readonly analysisQueue: analysisScheduler.AnalysisScheduler;
	readonly matcherQueue: matcherScheduler.MatcherScheduler;
	/** Tabs already queued for recovery; activation raises priority without recollecting them. */
	readonly matcherRecoveryTabs: Set<number>;
	readonly logBackgroundEvent: BackgroundRuntimeDependencies['logEvent'];
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

/** Register every browser listener synchronously, invalidating old documents before new scans. */
export function register(dependencies: Dependencies): void {
	const { backgroundRuntime, autoScanController, badges, tabWrites, analysisQueue, matcherQueue, matcherRecoveryTabs, logBackgroundEvent } = dependencies;
	// Firefox opens its sidebar only during this click, so the handler stays synchronous.
	browser.action.onClicked.addListener((tab) => openPanelFromToolbar(tab, logBackgroundEvent));
	// One update can carry both a replacement URL and a completed load. Invalidate
	// the old page before the scan listener queues the completed page.
	registerBackgroundLifecycleListeners({
		snapshots: browserDetectionSnapshotStore,
		writes: tabWrites,
		/** Invalidate auto-scan, recovery and runtime document state before canceling queued analysis for the old page. */
		onTabNavigation(tabId) {
			autoScanController.onTabNavigation(tabId);
			matcherRecoveryTabs.delete(tabId);
			backgroundRuntime.onTabNavigation(tabId);
			void analysisQueue.cancelTab(tabId);
		},
		// Also called for the old id of a replaced tab.
		onTabRemoved(tabId) {
			badges.forget(tabId);
			autoScanController.onTabRemoved(tabId);
			matcherRecoveryTabs.delete(tabId);
			backgroundRuntime.onTabRemoved(tabId);
			void analysisQueue.cancelTab(tabId);
		},
		log: logBackgroundEvent,
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
}
