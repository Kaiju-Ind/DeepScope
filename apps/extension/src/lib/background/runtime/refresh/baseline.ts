import type * as observe from '../../../content/observe/index.ts';

import type { ObservationBatch } from "@deepscope/detection/observations";

import { canRefreshObservationSession } from "../../../lifecycle/observation.ts";

import type { InspectableTab } from '../types.ts';

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly retainObservationRefreshBaseline: (tab: InspectableTab, batch: ObservationBatch, session?: observe.StateType) => void;
	readonly getObservationRefreshBaseline: (tabId: number, session?: observe.StateType) => ObservationBatch | undefined;
	readonly releaseObservationRefreshBaseline: (tabId: number, sessionId?: string) => void;
}

/** Create one refresh baseline owner for the background context. */
export function create(): Type {
	/** Observation batch retained only while one refreshable content session owns it. */
	interface ObservationRefreshBaseline {
		/** Full batch used to merge late observer facts into the next refresh. */
		readonly batch: ObservationBatch;
		/** Browser window that owned the visible tab when the session started. */
		readonly windowId: number;
		/** Whether the observed tab belongs to an incognito browser context. */
		readonly incognito: boolean;
		/** Content-session identity that owns this retained batch. */
		readonly sessionId: string;
		/** Session start time used to reject late writes from an older matcher job. */
		readonly startedAt?: number;
		/** Session expiry copied here so an expired baseline is rejected on access. */
		readonly expiresAt?: number;
	}

	/**
	 * Refresh baselines for active content observation sessions only.
	 *
	 * One-shot analyses never enter this map. A panel-owned observer needs one full
	 * batch so late facts can be merged without recollecting the document. The entry
	 * is released when that session stops, navigates, switches tabs, expires, or no
	 * longer matches the caller's session identity. If the Manifest V3 service worker
	 * is suspended and this memory disappears, the refresh path recollects instead.
	 */
	const observationRefreshBaselineByTab = new Map<number, ObservationRefreshBaseline>();

	/** Retain one full observation batch only for a live content observation session. */
	function retainObservationRefreshBaseline(
		tab: InspectableTab,
		batch: ObservationBatch,
		session?: observe.StateType,
	): void {
		const tabId = tab.id;
		if (!session?.sessionId || !canRefreshObservationSession(session)) {
			return;
		}

		const current = observationRefreshBaselineByTab.get(tabId);
		if (
			current &&
			current.sessionId !== session.sessionId &&
			(current.startedAt ?? 0) > (session.startedAt ?? 0)
		) {
			return;
		}

		observationRefreshBaselineByTab.set(tabId, {
			batch,
			windowId: tab.windowId,
			incognito: tab.incognito,
			sessionId: session.sessionId,
			...(session.startedAt ? { startedAt: session.startedAt } : {}),
			...(session.expiresAt ? { expiresAt: session.expiresAt } : {}),
		});
	}

	/** Return the retained batch only when the requesting content session still owns it. */
	function getObservationRefreshBaseline(
		tabId: number,
		session?: observe.StateType,
	): ObservationBatch | undefined {
		if (!session?.sessionId || !canRefreshObservationSession(session)) {
			return undefined;
		}

		const baseline = observationRefreshBaselineByTab.get(tabId);
		if (!baseline) {
			return undefined;
		}

		if (baseline.sessionId !== session.sessionId) {
			return undefined;
		}

		if (baseline.expiresAt !== undefined && baseline.expiresAt <= Date.now()) {
			releaseObservationRefreshBaseline(tabId, baseline.sessionId);
			return undefined;
		}

		return baseline.batch;
	}

	/** Release one retained refresh baseline without disturbing a newer session for the same tab. */
	function releaseObservationRefreshBaseline(tabId: number, sessionId?: string): void {
		const baseline = observationRefreshBaselineByTab.get(tabId);
		if (!baseline || (sessionId !== undefined && baseline.sessionId !== sessionId)) {
			return;
		}

		observationRefreshBaselineByTab.delete(tabId);
	}

	return { retainObservationRefreshBaseline, getObservationRefreshBaseline, releaseObservationRefreshBaseline };
}
