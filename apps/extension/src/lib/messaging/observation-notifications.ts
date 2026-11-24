import type * as observe from '../content/observe';

/** Message type used by content scripts to wake the background after page facts change. */
export const OBSERVATION_DIRTY_NOTIFICATION_TYPE = 'kaiju-deepscope.observation-dirty.v1';

/**
 * Runtime notification sent outside RPC when a live page observation session queues facts.
 *
 * Content can see DOM and performance changes first, but it should not own detector scheduling.
 * This small message wakes the background with the stable session identity while Chrome supplies
 * the sender tab id. The background can then validate the session before flushing observations.
 */
export type ObservationDirtyNotification = {
	/** Discriminator that keeps dirty notifications separate from comctx RPC envelopes. */
	readonly type: typeof OBSERVATION_DIRTY_NOTIFICATION_TYPE;
	/** Session id assigned by the background when observation started. */
	readonly sessionId: string;
	/** Document URL the content script is still observing. */
	readonly expectedUrl: string;
	/** Millisecond timestamp for the newest queued observation known to content. */
	readonly observedAt: number;
	/** Number of DOM mutation records known to the active content session. */
	readonly pendingMutationCount: number;
};

/** Build a background wake-up message only when the session can be targeted later. */
export function createObservationDirtyNotification(
	session: observe.StateType,
	observedAt: number = session.lastObservedAt ?? Date.now(),
): ObservationDirtyNotification | null {
	if (!session.sessionId || !session.expectedUrl) {
		return null;
	}

	return {
		type: OBSERVATION_DIRTY_NOTIFICATION_TYPE,
		sessionId: session.sessionId,
		expectedUrl: session.expectedUrl,
		observedAt,
		pendingMutationCount: session.pendingMutationCount,
	};
}

/** Return whether a raw runtime message is an observation dirty notification. */
export function isObservationDirtyNotification(
	value: unknown,
): value is ObservationDirtyNotification {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<ObservationDirtyNotification>;
	return (
		candidate.type === OBSERVATION_DIRTY_NOTIFICATION_TYPE &&
		typeof candidate.sessionId === 'string' &&
		typeof candidate.expectedUrl === 'string' &&
		typeof candidate.observedAt === 'number' &&
		typeof candidate.pendingMutationCount === 'number'
	);
}