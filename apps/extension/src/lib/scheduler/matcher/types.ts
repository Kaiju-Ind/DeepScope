import type { MatcherJobExecutor, RunMatcherPartitionRequest, MatcherPartitionResult, MatcherJobTerminalReason, RunMatcherJobRequest, MatcherJobObserver, MatcherJobExecutorResult, MatcherPartitionTask } from "../../matcher/contracts.ts";
import * as budget from "../budget.ts";
import type { WorkPriorityType } from "../schema.ts";

/** Offscreen capability consumed by the background partition scheduler. */
export interface MatcherPartitionExecutor {
	/** Where partitions run, recorded on jobs and snapshots: the offscreen pool or the background's own workers. */
	readonly kind: MatcherJobExecutor;
	/** Maximum partitions the hidden worker pool can execute at once. */
	readonly capacity: number;
	/** Execute one already-selected partition. */
	runPartition(request: RunMatcherPartitionRequest): Promise<MatcherPartitionResult>;
	/** Stop active worker slots owned by one matcher job. */
	cancelJob(jobId: string): Promise<void>;
	/** Stop active worker slots and lifecycle state owned by one tab. */
	cancelTab(tabId: number, reason: MatcherJobTerminalReason): Promise<void>;
	touchLifecycle(lifecycleId: string, tabId: number): Promise<void>;
	releaseLifecycle(lifecycleId: string): Promise<void>;
}

/** Job-level matcher capability consumed by the background analysis runtime. */
export interface MatcherScheduler {
	runJob(request: RunMatcherJobRequest, observer?: MatcherJobObserver): Promise<MatcherJobExecutorResult>;
	cancelJob(jobId: string): Promise<void>;
	cancelTab(tabId: number, reason: MatcherJobTerminalReason): Promise<void>;
	touchLifecycle(lifecycleId: string, tabId: number): Promise<void>;
	releaseLifecycle(lifecycleId: string): Promise<void>;
	/** Change future partition order when another tab becomes active. */
	activateTab(tabId: number, windowId: number): Promise<void>;
	/** Cancel orphaned matcher records after service-worker replacement and return exact documents to recollect. */
	reconcile(): Promise<readonly MatcherRecovery[]>;
	/** Resume lifecycle creation and matcher admission after startup reconciliation settles. */
	resume(): void;
}

/** Safe document metadata needed to reproduce matcher work after service-worker replacement. */
export interface MatcherRecovery {
	readonly tabId: number;
	readonly windowId: number;
	/** Hash of the exact URL that owned the orphaned matcher work. */
	readonly documentKey: string;
}

export interface PendingMatcher {
	readonly request: RunMatcherJobRequest;
	readonly observer?: MatcherJobObserver;
	readonly estimatedBytes: number;
	/** Transient memory admission held from reservation until the job leaves `pending`. */
	readonly lease: budget.Lease;
	readonly createdAt: number;
	readonly durable: boolean;
	readonly remaining: MatcherPartitionTask[];
	readonly partitionCount: number;
	readonly resolve: (result: MatcherJobExecutorResult) => void;
	readonly reject: (error: unknown) => void;
	priority: WorkPriorityType;
	priorityRank: number;
	claimed: boolean;
	startedAt?: number;
	completedPartitionCount: number;
	inFlightPartitionCount: number;
	lastDispatchSequence: number;
}
