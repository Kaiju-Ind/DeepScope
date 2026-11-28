import type * as observe from '../../content/observe/index.ts';

import { createTimingTraceId, timeAsyncSpan, type TimingContext } from "../../diagnostics/timing.ts";
import type { AnalyzeVisibleTabOutput, ObservationSessionTarget } from "../../messaging/index.ts";

import { getObservationRefreshBlockReason } from "../../lifecycle/observation.ts";

import { errorResponse, ok, type ExtensionResult } from "../../messaging/result.ts";

import type { BackgroundRuntimeDependencies, InspectableTab } from './types.ts';
import { summarizeTab, summarizeSession, createObservationSessionTarget, validateObservationSessionTarget } from './output.ts';

import type { Type as Tabs } from './tabs.ts';
import type { Type as Work } from './work.ts';
import type { Type as Content } from './content.ts';
import type { Type as RefreshAnalysis } from './refresh/analysis.ts';
import type { Type as RefreshSchedule } from './refresh/schedule.ts';
import type { Type as RefreshBaseline } from './refresh/baseline.ts';
import type { Type as Progress } from './progress.ts';

/** Only adapters and peer operations needed by this owner. Constructors perform no browser work. */
export interface Dependencies {
	readonly logEvent: BackgroundRuntimeDependencies['logEvent'];
	readonly getInspectableTabForObservationSessionTarget: Tabs['getInspectableTabForObservationSessionTarget'];
	readonly getDocumentWork: Work['getDocumentWork'];
	readonly canSaveMatcher: Tabs['canSaveMatcher'];
	readonly getObservationSessionStateForTab: Content['getObservationSessionStateForTab'];
	readonly flushObservationBatchForTab: Content['flushObservationBatchForTab'];
	readonly analyzeObservationBatchRefresh: RefreshAnalysis['analyzeObservationBatchRefresh'];
	readonly clearObservationRefreshForSession: RefreshSchedule['clearObservationRefreshForSession'];
	readonly releaseObservationRefreshBaseline: RefreshBaseline['releaseObservationRefreshBaseline'];
	readonly retireVisibleSessionOwnership: Progress['retireVisibleSessionOwnership'];
	readonly stopObservationSessionForTab: Content['stopObservationSessionForTab'];
}

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly refreshObservationSessionTarget: (target: ObservationSessionTarget, knownSession?: observe.StateType) => Promise<ExtensionResult<AnalyzeVisibleTabOutput>>;
	readonly stopObservationSessionTarget: (target: ObservationSessionTarget) => Promise<ExtensionResult<observe.StateType>>;
	readonly getObservationSessionStateForTarget: (target: ObservationSessionTarget) => Promise<ExtensionResult<observe.StateType>>;
	readonly stopFailedFreshObservation: (tab: InspectableTab, session: observe.StateType | undefined, failedAt: string) => Promise<void>;
}

/** Create one sessions owner for the background context. */
export function create(dependencies: Dependencies): Type {
	const { getInspectableTabForObservationSessionTarget, getDocumentWork, canSaveMatcher, getObservationSessionStateForTab, flushObservationBatchForTab, analyzeObservationBatchRefresh, clearObservationRefreshForSession, releaseObservationRefreshBaseline, retireVisibleSessionOwnership, stopObservationSessionForTab } = dependencies;

	const logBackgroundEvent = dependencies.logEvent;

	/** Validate the live tab and exact observation session before draining its queue and scheduling a document-owned refresh. */
	async function refreshObservationSessionTarget(
		target: ObservationSessionTarget,
		knownSession?: observe.StateType,
	): Promise<ExtensionResult<AnalyzeVisibleTabOutput>> {
		const tabResponse = await getInspectableTabForObservationSessionTarget(target);
		if (!tabResponse.ok) {
			return tabResponse;
		}

		const tab = tabResponse.value;
		const workScope = getDocumentWork(tab, target.expectedUrl);
		const signal = workScope.controller.signal;
		signal.throwIfAborted();
		if (!await canSaveMatcher(tab, target.expectedUrl)) {
			return errorResponse(
				'OBSERVATION_SESSION_UNAVAILABLE',
				'The observed tab no longer shows the document this session was started for.',
			);
		}
		const timingTraceId = createTimingTraceId('refresh-session');
		const timingContext: TimingContext = {
			traceId: timingTraceId,
			surface: 'background',
			incognito: tab.incognito,
			details: {
				...summarizeTab(tab),
				sessionId: target.sessionId,
			},
		};
		logBackgroundEvent('observation-refresh-requested', {
			...summarizeTab(tab),
			timingTraceId,
		});
		const sessionResponse = knownSession
			? ok(knownSession)
			: await timeAsyncSpan(
				'background.observation-refresh.get-session-state',
				timingContext,
				() => getObservationSessionStateForTab(tab.id, signal),
				(response) => ({ ok: response.ok, status: response.ok ? response.value.status : undefined }),
			);
		if (!sessionResponse.ok) {
			return sessionResponse;
		}

		const resolvedSession = sessionResponse.value;
		const targetValidation = validateObservationSessionTarget(resolvedSession, target);
		if (!targetValidation.ok) {
			return targetValidation;
		}

		logBackgroundEvent('observation-refresh-session-state', {
			...summarizeTab(tab),
			...summarizeSession(resolvedSession),
		});

		const blockReason = getObservationRefreshBlockReason(resolvedSession, tab.url);
		if (blockReason) {
			logBackgroundEvent('observation-refresh-unavailable', {
				...summarizeTab(tab),
				reason: blockReason,
				...(!tab.incognito && { sessionExpectedUrl: sessionResponse.value.expectedUrl }),
			});
			return errorResponse(
				'OBSERVATION_SESSION_UNAVAILABLE',
				blockReason === 'navigation'
					? 'The visible tab navigated away from the observed document.'
					: 'No active observation session exists for the analyzed tab.',
			);
		}

		const batchResponse = await timeAsyncSpan(
			'background.observation-refresh.flush-batch',
			timingContext,
			() => flushObservationBatchForTab(tab.id, signal),
			(response) => ({
				ok: response.ok,
				queuedCount: response.ok ? response.value.stats.queuedCount : undefined,
				lateObservationCount: response.ok ? (response.value.batch?.observations.length ?? 0) : undefined,
			}),
		);
		if (!batchResponse.ok) {
			return batchResponse;
		}

		return analyzeObservationBatchRefresh(
			tab,
			batchResponse.value,
			timingTraceId,
		);
	}

	/** Release timers, retained baseline and publication claims before asking content to stop the exact session. */
	async function stopObservationSessionTarget(
		target: ObservationSessionTarget,
	): Promise<ExtensionResult<observe.StateType>> {
		const tabResponse = await getInspectableTabForObservationSessionTarget(target);
		if (!tabResponse.ok) {
			return tabResponse;
		}

		const tab = tabResponse.value;
		logBackgroundEvent('observation-stop-api', summarizeTab(tab));
		clearObservationRefreshForSession(tab.id, target.sessionId);
		releaseObservationRefreshBaseline(tab.id, target.sessionId);
		retireVisibleSessionOwnership(tab.id, target.sessionId, target.expectedUrl);
		return stopObservationSessionForTab(tab.id, target);
	}

	/** Return status only when the live tab and reported content session still match the requested identity. */
	async function getObservationSessionStateForTarget(
		target: ObservationSessionTarget,
	): Promise<ExtensionResult<observe.StateType>> {
		const tabResponse = await getInspectableTabForObservationSessionTarget(target);
		if (!tabResponse.ok) {
			return tabResponse;
		}

		const response = await getObservationSessionStateForTab(target.tabId);
		if (!response.ok) {
			return response;
		}

		const targetValidation = validateObservationSessionTarget(response.value, target);
		if (!targetValidation.ok) {
			return targetValidation;
		}

		return ok(response.value);
	}

	/** Stop an observer that started for a fresh analysis which cannot return an owner target. */
	async function stopFailedFreshObservation(
		tab: InspectableTab,
		session: observe.StateType | undefined,
		failedAt: string,
	): Promise<void> {
		const target = createObservationSessionTarget(tab, session);
		if (!target) return;

		const response = await stopObservationSessionTarget(target);
		logBackgroundEvent(response.ok ? 'observation-failed-analysis-stopped' : 'observation-failed-analysis-stop-skipped', {
			...summarizeTab(tab),
			sessionId: target.sessionId,
			failedAt,
			...(response.ok ? {} : {
				code: response.failure.code,
				...(!tab.incognito && { message: response.failure.message }),
			}),
		});
	}

	return { refreshObservationSessionTarget, stopObservationSessionTarget, getObservationSessionStateForTarget, stopFailedFreshObservation };
}
