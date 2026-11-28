import * as logging from '../../diagnostics/logging.ts';

import { isObservationSessionForUrl } from "../../lifecycle/observation.ts";

import type * as observe from './types.ts';

import type { ObserverState } from './state.ts';
import { create as createEvidence } from './evidence.ts';
import { create as createCollection } from './collect.ts';
import { create as createResources } from './resources.ts';
import { create as createMutations } from './mutations.ts';

/** Create one bounded document observer and its local late-observation queue. */
export function create(options: observe.OptionsType): observe.SignalsType {
	const state: ObserverState = {
		activeSession: undefined,
		observationGeneration: 0,
		sessionStatus: 'idle',
		stopReason: undefined,
		lastObservedAt: undefined,
		lastScannedAt: undefined,
		pendingMutationCount: 0,
	};
	const observerLogger = logging.get('content', 'observer');
	/** Emit structured observer diagnostics through the durable, rate-controlled logging path. */
	function logObserverEvent(event: string, details?: Record<string, unknown>): void {
		observerLogger.debug('[kaiju-deepscope][content][observer] {event}', {
			event,
			...(details ?? {}),
		});
	}
	const evidence = createEvidence(state);
	const { clearEvidence, getRetainedEvidenceCounts, getTarget, batch: observationBatchController } = evidence;
	const collection = createCollection({ state, evidence, logObserverEvent });
	const { scanNode, scanSnapshot, scanDocument, getContent } = collection;
	const resources = createResources(state, evidence, scheduleNotice);
	const { stopResources, startResources, rememberTimings } = resources;
	const mutations = createMutations({ state, options, logObserverEvent, stopSession, flushMutations });
	const { clearMutations, clearFlushTimer } = mutations;
	let batchNoticeTimer: ReturnType<typeof globalThis.setTimeout> | undefined;

	/** Cancel the pending background dirty notification. */
	function clearNoticeTimer(): void {
		if (batchNoticeTimer !== undefined) {
			globalThis.clearTimeout(batchNoticeTimer);
			batchNoticeTimer = undefined;
		}
	}

	/** Stop every live observer owned by the current document session. */
	function stopSession(reason: observe.StopReasonType): observe.StateType {
		const session = state.activeSession;
		session?.scanAbortController.abort();
		state.observationGeneration += 1;
		const queue = observationBatchController.stats();
		const retained = getRetainedEvidenceCounts();
		mutations.disconnect();
		stopResources();
		clearFlushTimer();
		clearNoticeTimer();
		clearMutations();
		observationBatchController.reset();
		state.activeSession = undefined;
		state.sessionStatus = 'stopped';
		state.stopReason = reason;
		clearEvidence();
		logObserverEvent('session-stopped', {
			sessionId: session?.sessionId,
			reason,
			queuedObservationCount: queue.queuedCount,
			acceptedObservationCount: queue.acceptedCount,
			duplicateDropCount: queue.duplicateDropCount,
			queueLimitDropCount: queue.queueLimitDropCount,
			stormLimitDropCount: queue.stormLimitDropCount,
			...retained,
		});
		return {
			...getState(),
			...(session ? {
				sessionId: session.sessionId,
				expectedUrl: session.expectedUrl,
				startedAt: session.startedAt,
				expiresAt: session.expiresAt,
			} : {}),
		};
	}

	/** Stop before old-document evidence can cross into a newly loaded page. */
	function stopIfNavigated(): void {
		if (!state.activeSession || isObservationSessionForUrl(state.activeSession, globalThis.location.href)) {
			return;
		}

		logObserverEvent('session-navigation', {
			sessionId: state.activeSession.sessionId,
			...(!options.incognito && {
				expectedUrl: state.activeSession.expectedUrl,
				actualUrl: globalThis.location.href,
			}),
		});
		stopSession('navigation');
	}

	/** Flush the coalesced mutation roots without rescanning unrelated page state. */
	async function flushMutations(
		content = getContent(),
		notify = true,
		generation = state.activeSession?.generation,
	): Promise<void> {
		clearFlushTimer();
		if (generation === undefined || state.activeSession?.generation !== generation) return;
		const acceptedBefore = observationBatchController.stats().acceptedCount;

		if (mutations.requiresDocumentScan()) {
			await scanDocument(content, generation);
		} else {
			for (const [node, deep] of mutations.roots()) {
				await scanNode(node, deep, content, generation);
				if (state.activeSession?.generation !== generation) return;
			}
		}

		if (state.activeSession?.generation !== generation) return;
		clearMutations();
		state.lastScannedAt = Date.now();

		if (state.activeSession && state.sessionStatus !== 'stopped') {
			state.sessionStatus = 'observing';
			if (notify && observationBatchController.stats().acceptedCount > acceptedBefore) {
				publishBatch();
			}
		}
	}

	/**
	 * Notify content runtime that bounded late observations are ready to flush.
	 *
	 * The callback carries lifecycle counters only. The observation records remain
	 * inside the local controller until the background explicitly flushes them.
	 */
	function publishBatch(): void {
		clearNoticeTimer();
		if (!state.activeSession || state.sessionStatus === 'stopped') return;

		const stats = observationBatchController.stats();
		if (stats.queuedCount === 0) return;

		options.onObservationBatchQueued?.({
			observedAt: state.lastScannedAt ?? state.lastObservedAt ?? Date.now(),
			stats,
			session: getState(),
		});
	}

	/** Coalesce resource-only dirty notifications to the same cadence as DOM scans. */
	function scheduleNotice(): void {
		if (batchNoticeTimer !== undefined || observationBatchController.stats().queuedCount === 0) return;

		batchNoticeTimer = globalThis.setTimeout(() => {
			batchNoticeTimer = undefined;
			publishBatch();
		}, options.throttleMs);
	}

	/** Snapshot the authoritative lifecycle state without mutating the observer. */
	function getState(): observe.StateType {
		return {
			sessionId: state.activeSession?.sessionId,
			expectedUrl: state.activeSession?.expectedUrl,
			status: state.sessionStatus,
			throttleMs: options.throttleMs,
			startedAt: state.activeSession?.startedAt,
			expiresAt: state.activeSession?.expiresAt,
			lastObservedAt: state.lastObservedAt,
			lastScannedAt: state.lastScannedAt,
			pendingMutationCount: state.pendingMutationCount,
			stopReason: state.stopReason,
		};
	}

	/** Reset prior observation state and start one bounded session for this document. */
	function beginSession(
		input: observe.BeginType,
	): observe.StateType {
		state.activeSession?.scanAbortController.abort();
		state.observationGeneration += 1;
		mutations.disconnect();
		stopResources();
		clearFlushTimer();
		clearNoticeTimer();
		clearMutations();
		observationBatchController.reset();
		clearEvidence();

		const startedAt = Date.now();
		state.activeSession = {
			generation: state.observationGeneration,
			scanAbortController: new AbortController(),
			sessionId: input.sessionId,
			expectedUrl: input.expectedUrl,
			startedAt,
			expiresAt: startedAt + input.durationMs,
			maxPendingNodes: input.maxPendingNodes,
			maxMutations: input.maxMutations,
			includeScriptContent: input.includeScriptContent === true,
			includeStylesheetContent: input.includeStylesheetContent === true,
			domSelectorPlan: input.domSelectorPlan,
		};
		state.lastObservedAt = undefined;
		state.lastScannedAt = undefined;
		state.stopReason = undefined;
		state.sessionStatus = 'observing';

		mutations.start(input.domSelectorPlan);
		startResources();
		rememberTimings();

		return getState();
	}

	return {
		/** Flush pending changes for the current generation or perform a standalone scan when no session owns observation. */
		async snapshot(content = { includeScriptContent: true, includeStylesheetContent: true }) {
			stopIfNavigated();
			if (!state.activeSession) {
				return scanSnapshot(content);
			}

			const generation = state.activeSession.generation;
			await flushMutations(content, false, generation);
			if (state.activeSession?.generation === generation) await scanDocument(content, generation);

			if (state.activeSession?.generation === generation && state.sessionStatus !== 'stopped') {
				state.sessionStatus = 'observing';
			}

			return evidence.snapshot(content);
		},

		/** Drain only a live current-document session after pending scans finish, rescheduling notice when facts remain queued. */
		async flushObservationBatch() {
			stopIfNavigated();
			clearNoticeTimer();
			const generation = state.activeSession?.generation;
			if (generation !== undefined && state.sessionStatus !== 'stopped') {
				await flushMutations(undefined, false, generation);
			}

			const session = getState();
			const target = getTarget();
			const batch = target && session.status !== 'stopped'
				? observationBatchController.flush({ target, observedAt: Date.now() })
				: null;
			const stats = observationBatchController.stats();
			if (stats.queuedCount > 0) scheduleNotice();

			return {
				...(batch ? { batch } : {}),
				stats,
				session,
			};
		},

		beginObservationSession: beginSession,

		/** Stop all session-owned observers/timers with manual stop as the caller-facing default. */
		stopObservationSession(reason = 'manual') {
			return stopSession(reason);
		},

		/** Detect navigation before exposing lifecycle state so an old document cannot appear active. */
		status() {
			stopIfNavigated();
			return getState();
		},

		/** Release every observer-owned resource with invalidation as the default shutdown reason. */
		disconnect(reason = 'invalidated') {
			stopSession(reason);
		},
	};
}
