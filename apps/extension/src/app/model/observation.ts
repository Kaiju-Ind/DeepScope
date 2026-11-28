import type * as observe from '../../lib/content/observe/index.ts';
import type { DetectionSessionSnapshot } from "../../lib/storage/session.ts";
import type { VisibleRevision } from './revision.ts';

/**
 * Panel observation states that are meaningful to the user interface.
 *
 * These values intentionally hide the lower-level content-session statuses. The
 * side panel only needs to know whether page watching is active, stopped, idle, or
 * unknown. Storage revisions are the receive stream; this state only drives copy
 * and controls.
 */
export const OBSERVATION_MODES = ['idle', 'active', 'stopped', 'unknown'] as const;

/** User-facing observation state used by the side panel controls and status text. */
export type ObservationMode = typeof OBSERVATION_MODES[number];

/**
 * Returns the side panel label for an observation mode.
 */
export function getObservationLabel(mode: ObservationMode): string {
	if (mode === 'active') {
		return 'Observing';
	}

	if (mode === 'stopped') {
		return 'Stopped';
	}

	if (mode === 'idle') {
		return 'Idle';
	}

	return 'Loading';
}

/**
 * Converts content-session state into the smaller side panel state model.
 */
export function getObservationModeFromSession(
	session: Pick<observe.StateType, 'status'>,
): ObservationMode {
	if (session.status === 'observing' || session.status === 'dirty') {
		return 'active';
	}

	if (session.status === 'idle') {
		return 'idle';
	}

	return 'stopped';
}

/**
 * Converts durable snapshot lifecycle status into the side panel state model.
 *
 * Detector snapshots and content lifecycle snapshots flow through the same
 * storage subscription. This mapping lets lifecycle-only content revisions stop
 * or idle the controls without replacing the detector results already rendered.
 */
export function getObservationModeFromSnapshot(
	snapshot: Pick<DetectionSessionSnapshot, 'status'>,
): ObservationMode {
	if (snapshot.status === 'collecting' || snapshot.status === 'observing' || snapshot.status === 'enriching') {
		return 'active';
	}

	if (snapshot.status === 'cached' || snapshot.status === 'complete') {
		return 'idle';
	}

	if (snapshot.status === 'stopped' || snapshot.status === 'failed' || snapshot.status === 'stale') {
		return 'stopped';
	}

	return 'unknown';
}

/**
 * Converts a successful analysis response into the side panel observation mode.
 *
 * Cache hits can be useful without active observation, so they render as `idle`.
 * Fresh responses without an active session render as `stopped`, preserving the
 * current copy that tells users refresh is needed to resume observation.
 */
export function getObservationModeFromAnalysis(
	response: Pick<VisibleRevision, 'snapshot' | 'session'>,
): ObservationMode {
	if (response.session) {
		return getObservationModeFromSession(response.session);
	}

	return response.snapshot.status === 'hit' ? 'idle' : 'stopped';
}

/** Returns whether active page watching should keep the side panel in a live-update state. */
export function shouldKeepLiveUpdatesActive(mode: ObservationMode): boolean {
	return mode === 'active';
}
