import type { AnalyzeVisibleTabOutput, BackgroundApi } from "../../messaging/index.ts";

import { isObservationDirtyNotification } from "../../messaging/observation-notifications.ts";

import { errorResponse, ok, type ExtensionResult } from "../../messaging/result.ts";

import type { BackgroundRuntimeMessageSender, BackgroundRuntimeDependencies } from './types.ts';
import { createVisibleTabIdentity } from './output.ts';

import type { Type as Tabs } from './tabs.ts';
import type { Type as Analysis } from './analysis.ts';
import type { Type as Sessions } from './sessions.ts';
import type { Type as RefreshSchedule } from './refresh/schedule.ts';

/** Only adapters and peer operations needed by this owner. Constructors perform no browser work. */
export interface Dependencies {
	readonly persistence: Pick<BackgroundRuntimeDependencies['persistence'], 'getReplayHistory' | 'getStatus'>;
	readonly getInspectableTab: Tabs['getInspectableTab'];
	readonly getInspectableActiveTab: Tabs['getInspectableActiveTab'];
	readonly analyzeTabTarget: Analysis['analyzeTabTarget'];
	readonly refreshObservationSessionTarget: Sessions['refreshObservationSessionTarget'];
	readonly stopObservationSessionTarget: Sessions['stopObservationSessionTarget'];
	readonly getObservationSessionStateForTarget: Sessions['getObservationSessionStateForTarget'];
	readonly scheduleObservationRefreshFromContent: RefreshSchedule['scheduleObservationRefreshFromContent'];
}

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly createBackgroundApi: () => BackgroundApi;
	readonly handleRuntimeMessage: (message: unknown, sender: BackgroundRuntimeMessageSender) => void;
}

/** Create one api owner for the background context. */
export function create(dependencies: Dependencies): Type {
	const { getInspectableTab, getInspectableActiveTab, analyzeTabTarget, refreshObservationSessionTarget, stopObservationSessionTarget, getObservationSessionStateForTarget, scheduleObservationRefreshFromContent } = dependencies;

	const { getReplayHistory: getCachedReplayTraceHistory, getStatus } = dependencies.persistence;

	/** Bind RPC operations to the already-composed runtime owners; this adapter allocates no independent session state. */
	function createBackgroundApi(): BackgroundApi {
		return {
			/** Wrap current persistence status in the extension result envelope without starting a scan. */
			async getAnalysisStatus() {
				return ok(await getStatus());
			},

			/** Validate a pinned target directly or a following target against the active tab before exposing its identity. */
			async getVisibleTabIdentity(input) {
				const tabResponse = input.follow === 'pinned'
					? await getInspectableTab(input.tabId, input.windowId)
					: await getInspectableActiveTab(input.tabId, input.windowId);
				if (!tabResponse.ok) {
					return tabResponse;
				}

				return ok(createVisibleTabIdentity(tabResponse.value));
			},

			/** Use scheduled-target rules for pinned panels and foreground-target rules for following panels. */
			async analyzeVisibleTab(input): Promise<ExtensionResult<AnalyzeVisibleTabOutput>> {
				return await analyzeTabTarget(input, input.follow === 'pinned' ? 'scheduled' : 'visible');
			},

			/** Translate unexpected refresh exceptions into the existing RPC failure envelope. */
			async refreshObservationSession(target) {
				try {
					return await refreshObservationSessionTarget(target);
				} catch (error) {
					const stack = error instanceof Error ? error.stack : undefined;
					const message =
						error instanceof Error ? error.message : 'Unexpected runtime error';
					return errorResponse('UNKNOWN', message, stack);
				}
			},

			/** Delegate exact-session cleanup to the session owner; no global stop is introduced here. */
			async stopObservationSession(target) {
				return stopObservationSessionTarget(target);
			},

			/** Read status only after the session owner validates the requested target. */
			async getObservationSessionState(target) {
				return getObservationSessionStateForTarget(target);
			},

			/** Return stored replay history through the declared result envelope. */
			async getReplayTraceHistory(input) {
				return ok(await getCachedReplayTraceHistory(input.url));
			},
		};
	}

	/** Route a validated dirty notification without exposing private page URLs to diagnostics. */
	function handleRuntimeMessage(message: unknown, sender: BackgroundRuntimeMessageSender): void {
		if (!isObservationDirtyNotification(message) || typeof sender.tab?.id !== 'number') return;
		scheduleObservationRefreshFromContent(
			{ tabId: sender.tab.id, sessionId: message.sessionId, expectedUrl: message.expectedUrl, ...(sender.tab.incognito ? { incognito: true } : {}) },
			{ tabId: sender.tab.id, sessionId: message.sessionId, ...(!sender.tab.incognito && { hostname: new globalThis.URL(message.expectedUrl).hostname }), observedAt: message.observedAt, pendingMutationCount: message.pendingMutationCount },
		);
	}

	return { createBackgroundApi, handleRuntimeMessage };
}
