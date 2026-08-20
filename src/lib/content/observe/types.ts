import type { PageSignals } from '../../detection/types';
import type { DomPlanType } from '../../dom';
import type { ObservationBatch, ObservationBatchControllerStats } from '../../observations';

/** Bounded page evidence collected from one live DOM view. */
export type SnapshotType = Pick<
	PageSignals,
	| 'scripts'
	| 'stylesheets'
	| 'links'
	| 'resources'
	| 'requests'
	| 'scriptContents'
	| 'stylesheetContents'
	| 'meta'
	| 'dom'
> & {
	/** Image URLs observed in the live page. */
	images: string[];
};

/** Lifecycle states owned by one content-script observation session. */
export type StatusType = 'idle' | 'observing' | 'dirty' | 'stopped';

/** Reasons that permanently stop one content observation session. */
export type StopReasonType = 'manual' | 'expired' | 'navigation' | 'invalidated';

/** Serializable state returned to the background for one content observation session. */
export type StateType = {
	sessionId?: string;
	expectedUrl?: string;
	status: StatusType;
	throttleMs: number;
	startedAt?: number;
	expiresAt?: number;
	lastObservedAt?: number;
	lastScannedAt?: number;
	pendingMutationCount: number;
	stopReason?: StopReasonType;
};

/** Result returned when queued late observations are flushed to the background. */
export type FlushType = {
	/** Next bounded observation batch when new facts are available. */
	batch?: ObservationBatch;
	/** Batch-controller counters after the flush attempt. */
	stats: ObservationBatchControllerStats;
	/** Session state after pending mutation scans finish. */
	session: StateType;
};

/** Input that starts a bounded content observation session. */
export type BeginType = {
	sessionId: string;
	expectedUrl: string;
	durationMs: number;
	maxPendingNodes: number;
	maxMutations: number;
	includeScriptContent?: boolean;
	includeStylesheetContent?: boolean;
	domSelectorPlan?: DomPlanType;
};

/** Evidence flags for one explicit live-page snapshot. */
export type SnapshotOptionsType = {
	/** Collect inline and accessible script source text. */
	readonly includeScriptContent?: boolean;
	/** Collect inline and accessible stylesheet source text. */
	readonly includeStylesheetContent?: boolean;
	/** Selector plan used when no active observation session owns one. */
	readonly domSelectorPlan?: DomPlanType;
};

/** Public content observation capability used by the WXT content runtime. */
export type SignalsType = {
	snapshot(options?: SnapshotOptionsType): Promise<SnapshotType>;
	flushObservationBatch(): Promise<FlushType>;
	beginObservationSession(input: BeginType): StateType;
	stopObservationSession(reason?: StopReasonType): StateType;
	status(): StateType;
	disconnect(reason?: StopReasonType): void;
};

/** Event emitted when late page observations are ready for a background flush. */
export type QueuedBatchEventType = {
	/** Timestamp associated with the scan that queued the newest facts. */
	readonly observedAt: number;
	/** Batch-controller counters after the scan queued facts. */
	readonly stats: ObservationBatchControllerStats;
	/** Current session state used by content snapshot publishers. */
	readonly session: StateType;
};

/** Construction options for one page-local observation capability. */
export type OptionsType = {
	/** Delay used to coalesce DOM mutations before scanning changed nodes. */
	readonly throttleMs: number;
	/** Optional hook for content-owned streaming when new facts enter the batch. */
	readonly onObservationBatchQueued?: (event: QueuedBatchEventType) => void;
};
