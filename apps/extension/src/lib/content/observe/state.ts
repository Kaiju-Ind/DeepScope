import type { DomPlanType } from "@deepscope/dom";

import type * as observe from './types.ts';

/** Browser document and cancellation identity owned by the live observer session. */
export type ActiveObservationSession = {
	/** Monotonic local generation used to reject late asynchronous scans. */
	readonly generation: number;
	/** Cancels time-sliced DOM scans when this session loses ownership. */
	readonly scanAbortController: AbortController;
	sessionId: string;
	expectedUrl: string;
	startedAt: number;
	expiresAt: number;
	maxPendingNodes: number;
	maxMutations: number;
	includeScriptContent: boolean;
	includeStylesheetContent: boolean;
	domSelectorPlan?: DomPlanType;
};

/** Mutable lifecycle facts shared by the observer's owners. Evidence and DOM roots remain private. */
export interface ObserverState {
	/** Current exact-document session; clearing it rejects late asynchronous work. */
	activeSession: ActiveObservationSession | undefined;
	/** Monotonic token changed before stopping or replacing a session. */
	observationGeneration: number;
	/** Lifecycle state exposed to the background. */
	sessionStatus: observe.StatusType;
	/** Terminal reason retained after the session's resources are released. */
	stopReason: observe.StopReasonType | undefined;
	/** Timestamp of the latest accepted resource or mutation evidence. */
	lastObservedAt: number | undefined;
	/** Timestamp of the last completed scan for the current generation. */
	lastScannedAt: number | undefined;
	/** Mutation burst size, reset when its roots are flushed or released. */
	pendingMutationCount: number;
}
