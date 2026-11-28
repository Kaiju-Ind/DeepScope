import type { ObservationSessionTarget } from "../../../messaging/index.ts";

import { diagnosticErrorType } from "@deepscope/detection/privacy/redaction";

import type { BackgroundRuntimeDependencies } from '../types.ts';

import type { Type as JobsIndex } from '../jobs/index.ts';
import type { Type as Sessions } from '../sessions.ts';

/** Only adapters and peer operations needed by this owner. Constructors perform no browser work. */
export interface Dependencies {
	readonly scheduleBackgroundWork?: BackgroundRuntimeDependencies['scheduleBackgroundWork'];
	readonly logEvent: BackgroundRuntimeDependencies['logEvent'];
	readonly hasMatcherWorkForTab: JobsIndex['hasMatcherWorkForTab'];
	readonly refreshObservationSessionTarget: Sessions['refreshObservationSessionTarget'];
}

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly clearScheduledObservationRefreshesForTab: (tabId: number) => void;
	readonly clearDeferredObservationRefreshesForTab: (tabId: number) => void;
	readonly clearObservationRefreshForSession: (tabId: number, sessionId: string) => void;
	readonly flushDeferredObservationRefreshesForTab: (tabId: number) => void;
	readonly scheduleObservationRefreshFromContent: (target: ObservationSessionTarget, details: Record<string, unknown>) => void;
}

/** Create one refresh schedule owner for the background context. */
export function create(dependencies: Dependencies): Type {
	const { hasMatcherWorkForTab, refreshObservationSessionTarget } = dependencies;

	const logBackgroundEvent = dependencies.logEvent;

	/** Dirty observation notifications are coalesced before background flushes queued facts. */
	const BACKGROUND_OBSERVATION_REFRESH_DELAY_MS = 250;

	interface PendingObservationRefresh {
		/** Session target whose content queue still needs to be flushed by background. */
		readonly target: ObservationSessionTarget;
		/** Summary-only debug details carried into the eventual scheduled refresh. */
		readonly details: Record<string, unknown>;
	}

	/** Dirty content-session notifications waiting for a background-owned flush. */
	const scheduledObservationRefreshBySession = new Map<string, ReturnType<typeof globalThis.setTimeout>>();

	/** Dirty notifications deferred while another matcher job owns the document. */
	const deferredObservationRefreshBySession = new Map<string, PendingObservationRefresh>();

	/** Scope timer and deferred-work identities to a tab and its content session; different sessions never coalesce. */
	function createObservationRefreshScheduleKey(tabId: number, sessionId: string): string {
		return `${tabId}:${sessionId}`;
	}

	/** Cancel every queued refresh timer for a retired tab before its document state is released. */
	function clearScheduledObservationRefreshesForTab(tabId: number): void {
		const tabPrefix = `${tabId}:`;
		for (const [key, timer] of scheduledObservationRefreshBySession) {
			if (!key.startsWith(tabPrefix)) {
				continue;
			}

			globalThis.clearTimeout(timer);
			scheduledObservationRefreshBySession.delete(key);
		}
	}

	/** Discard dirty notifications held behind matcher work when their tab no longer owns a document. */
	function clearDeferredObservationRefreshesForTab(tabId: number): void {
		const tabPrefix = `${tabId}:`;
		for (const key of deferredObservationRefreshBySession.keys()) {
			if (key.startsWith(tabPrefix)) {
				deferredObservationRefreshBySession.delete(key);
			}
		}
	}

	/** Clear scheduled and deferred refresh work for one exact content observation session. */
	function clearObservationRefreshForSession(tabId: number, sessionId: string): void {
		const key = createObservationRefreshScheduleKey(tabId, sessionId);
		const timer = scheduledObservationRefreshBySession.get(key);
		if (timer !== undefined) {
			globalThis.clearTimeout(timer);
			scheduledObservationRefreshBySession.delete(key);
		}
		deferredObservationRefreshBySession.delete(key);
	}

	/**
	 * Keep dirty observer flushes behind the matcher job that already owns the page.
	 *
	 * Content queues are durable for the current page runtime, so a dirty notification
	 * does not need to start a competing matcher immediately. Deferring the flush
	 * lets the first complete matcher publish detections before later page facts
	 * enqueue another revision.
	 */
	function deferObservationRefresh(
		target: ObservationSessionTarget,
		details: Record<string, unknown>,
	): void {
		const key = createObservationRefreshScheduleKey(target.tabId, target.sessionId);
		deferredObservationRefreshBySession.set(key, { target, details });
		logBackgroundEvent('observation-refresh-deferred-during-match', details);
	}

	/** Remove deferred entries before rescheduling them so callbacks cannot replay the same notification twice. */
	function flushDeferredObservationRefreshesForTab(tabId: number): void {
		const tabPrefix = `${tabId}:`;
		const pending: PendingObservationRefresh[] = [];
		for (const [key, refresh] of deferredObservationRefreshBySession) {
			if (!key.startsWith(tabPrefix)) {
				continue;
			}

			deferredObservationRefreshBySession.delete(key);
			pending.push(refresh);
		}

		for (const refresh of pending) {
			scheduleObservationRefreshFromContent(refresh.target, refresh.details);
		}
	}

	/** Coalesce dirty notifications for 250 ms, defer behind active matching and contain asynchronous refresh failures. */
	function scheduleObservationRefreshFromContent(
		target: ObservationSessionTarget,
		details: Record<string, unknown>,
	): void {
		const key = createObservationRefreshScheduleKey(target.tabId, target.sessionId);
		if (scheduledObservationRefreshBySession.has(key)) {
			logBackgroundEvent('observation-refresh-already-scheduled', details);
			return;
		}

		if (hasMatcherWorkForTab(target.tabId)) {
			deferObservationRefresh(target, details);
			return;
		}

		logBackgroundEvent('observation-refresh-scheduled', details);
		const timer = globalThis.setTimeout(() => {
			scheduledObservationRefreshBySession.delete(key);
			if (hasMatcherWorkForTab(target.tabId)) {
				deferObservationRefresh(target, details);
				return;
			}

			/** Perform the exact-session refresh only after queue admission; log failure responses without exposing private details. */
			const run = () => refreshObservationSessionTarget(target).then((response) => {
				if (!response.ok) {
					logBackgroundEvent('observation-refresh-background-failed', {
						...details,
						code: response.failure.code,
						...(!target.incognito && { message: response.failure.message }),
					});
					return;
				}

				logBackgroundEvent('observation-refresh-background-complete', {
					...details,
					resultCount: response.value.analysis.results.length,
					analyzedAt: response.value.analysis.analyzedAt,
				});
			});
			const scheduled = dependencies.scheduleBackgroundWork
				? dependencies.scheduleBackgroundWork({ key: `observation-refresh:${key}`, tabId: target.tabId, run })
				: run();
			// The refresh is fire-and-forget from the content notification's point of
			// view, so every failure must end here rather than as an unhandled rejection.
			void scheduled.catch((error: unknown) => {
				logBackgroundEvent('observation-refresh-background-failed', {
					...details,
					...(target.incognito
						? { errorType: diagnosticErrorType(error) }
						: { message: error instanceof Error ? error.message : String(error) }),
				});
			});
		}, BACKGROUND_OBSERVATION_REFRESH_DELAY_MS);

		scheduledObservationRefreshBySession.set(key, timer);
	}

	return { clearScheduledObservationRefreshesForTab, clearDeferredObservationRefreshesForTab, clearObservationRefreshForSession, flushDeferredObservationRefreshesForTab, scheduleObservationRefreshFromContent };
}
