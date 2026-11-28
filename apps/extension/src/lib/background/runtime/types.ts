import type { CollectionEvidencePass, CollectionEvidencePassId } from "@deepscope/detection/collection/plan";
import type { ExtensionPageCollectorInput } from "../../collectors/extension-page-collector.ts";

import type * as observe from '../../content/observe/index.ts';

import type { DetectionEvidenceState, DetectionSessionSnapshot } from "../../storage/session.ts";
import type { RuntimeTechnologyRegistryProvider } from "@deepscope/detection/provider";
import type { SiteAnalysis } from "@deepscope/detection/types";

import type { TimingContext } from "../../diagnostics/timing.ts";
import type { VisibleTabIdentity, AnalysisEnrichmentState, AnalyzeVisibleTabInput, AnalyzeVisibleTabOutput, BackgroundApi, ContentApi } from "../../messaging/index.ts";
import type { ObservationBatch } from "@deepscope/detection/observations";

import type { ExtensionResult, ExtensionFailure } from "../../messaging/result.ts";
import type { MatcherJobMode, MatcherJobTerminalReason, MatcherJobRecord, MatcherJobExecutorResult, MatcherJobObserver, MatcherJobRunResult, MatcherPartitionResult, RunMatcherJobRequest } from "../../matcher/index.ts";
import type { BackgroundDetectionPersistence } from "../../persistence/ports.ts";
import type { BackgroundTaskInput } from "../../scheduler/analysis.ts";

import type { RuntimeTechnologyRegistryArtifact } from "@deepscope/detection/artifacts/runtime";

/** Browser tab fields needed by background orchestration. */
export interface BackgroundRuntimeTab {
	readonly id?: number;
	readonly windowId?: number;
	readonly url?: string;
	readonly active?: boolean;
	readonly incognito?: boolean;
}

/** Sender metadata needed when routing content-runtime notifications. */
export interface BackgroundRuntimeMessageSender {
	readonly tab?: BackgroundRuntimeTab;
}

/** Hashed browser-document identity safe to persist in the execution scheduler. */
export interface ScheduledTabIdentity {
	readonly windowId: number;
	readonly tabId: number;
	readonly frameId: number;
	readonly urlHash: string;
}

/** Runtime adapters wired by the browser entrypoint. */
export interface BackgroundRuntimeDependencies {
	readonly getTab: (tabId: number) => Promise<BackgroundRuntimeTab>;
	/** Explain an absent URL using the browser permission adapter. */
	readonly missingUrlFailure: () => Promise<ExtensionFailure>;
	readonly executeContentScript: (tabId: number) => Promise<void>;
	readonly createContentApiClient: (tabId: number, frameId?: number) => ContentApi;
	readonly collectObservationBatch: (input: ExtensionPageCollectorInput) => Promise<ExtensionResult<ObservationBatch>>;
	readonly registryProvider: RuntimeTechnologyRegistryProvider;
	/** Stable identity for matcher lifecycle records created by this background context. */
	readonly matcherContextId?: string;
	readonly matcher: {
		readonly cancelJob: (jobId: string) => Promise<void>;
		readonly cancelTab: (tabId: number, reason: MatcherJobTerminalReason) => Promise<void>;
		readonly touchLifecycle: (lifecycleId: string, tabId: number) => Promise<void>;
		readonly releaseLifecycle: (lifecycleId: string) => Promise<void>;
		readonly runJob: (request: RunMatcherJobRequest, observer?: MatcherJobObserver) => Promise<MatcherJobExecutorResult>;
	};
	readonly persistence: BackgroundDetectionPersistence;
	/**
	 * Run live observation refreshes on the analysis scheduler's lane at background priority.
	 *
	 * The entrypoint wires this to `analysisScheduler.runBackground` so a page that
	 * mutates constantly cannot starve interactive or foreground analyses. When it is
	 * absent (isolated runtime tests), refreshes run immediately.
	 */
	readonly scheduleBackgroundWork?: (task: BackgroundTaskInput) => Promise<void>;
	readonly logEvent: (event: string, details?: Record<string, unknown>) => void;
	readonly logAnalysisSummary: (analysis: SiteAnalysis) => void;
	/** Update the toolbar count and optional highest-confidence finding for one tab. */
	readonly setBadge: (tabId: number, count: number, finding?: string) => Promise<void>;
}

/** Public surface owned by one isolated background runtime instance. */
export interface BackgroundRuntime {
	readonly api: BackgroundApi;
	/** Resolve one persisted hashed scheduler identity against the current browser document. */
	readonly resolveScheduledTab: (target: ScheduledTabIdentity) => Promise<ExtensionResult<VisibleTabIdentity>>;
	/** Continue scheduler-owned work for the exact document even after its tab becomes inactive. */
	readonly analyzeScheduledTab: (input: AnalyzeVisibleTabInput) => Promise<ExtensionResult<AnalyzeVisibleTabOutput>>;
	readonly handleRuntimeMessage: (message: unknown, sender: BackgroundRuntimeMessageSender) => void;
	readonly onTabNavigation: (tabId: number) => void;
	readonly onTabRemoved: (tabId: number) => void;
}

/** Visible tab shape after unsupported URLs and missing ids have been rejected. */
export type InspectableTab = {
	readonly id: number;
	readonly windowId: number;
	readonly url: string;
	readonly active: boolean;
	readonly incognito: boolean;
};

/** Rule-free registry artifact shared by the background matcher owners. */
export type CompiledRegistry = RuntimeTechnologyRegistryArtifact;

/** Stable owner for active visible document work while the background is alive. */
export type VisibleSessionId = `${number}:${number}:${string}:${string}`;

/** One cancelable document-work owner per tab while this service worker is alive. */
export interface TabDocumentWorkScope {
	/** Browser tab that owns the work. */
	readonly tabId: number;
	/** Browser window that owned the tab when this scope began; diagnostics only, since tabs can move windows. */
	readonly windowId: number;
	/** Document URL this work is allowed to publish into. */
	readonly expectedUrl: string;
	/** Monotonic local generation used only for diagnostics. */
	readonly generation: number;
	/** Offscreen lifecycle lease shared by initial and enrichment matcher jobs. */
	readonly lifecycleId: string;
	/** Cancellation authority propagated into collection and matcher scheduling. */
	readonly controller: AbortController;
	/** Why the scope was aborted, recorded on matcher jobs that lose publication rights. */
	abortReason?: MatcherJobTerminalReason;
}

/** Lifecycle events that revoke a matcher's right to publish into the visible session. */
export type MatcherCancellationReason = 'navigation' | 'tab-closed' | 'newer-job';

/** Partial matcher state used to turn worker partition completions into side-panel revisions. */
export interface ActiveMatcherProgressContext {
	/** Stable visible session that owns the matcher job. */
	readonly visibleSessionId: VisibleSessionId;
	/** Superseding job generation this matcher work belongs to. */
	readonly visibleSessionOwnerJobId: string;
	/** Tab and URL identity that owns the matcher job. */
	readonly tab: InspectableTab;
	/** Full observation batch for deterministic partial candidate refinement. */
	readonly batch: ObservationBatch;
	/** Rule-free runtime registry used by the coordinator after worker shards emit matches. */
	readonly compiledRegistryArtifact: CompiledRegistry;
	/** Cache status attached to partial side-panel outputs. */
	readonly snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'];
	/** Active observation session, when the side panel asked for live updates. */
	readonly session?: observe.StateType;
	/** Matcher executor path known for partial snapshot revisions. */
	matcherExecutor: DetectionSessionSnapshot['matcherExecutor'];
	/** Evidence completeness attached to partial and final snapshot writes. */
	readonly evidence?: DetectionEvidenceState;
	/** Matcher mode attached to this job for diagnostics. */
	readonly matcherMode: MatcherJobMode;
	/** Completed partition results accumulated in original completion order. */
	readonly partitions: MatcherPartitionResult[];
	/** Last time a partial detector revision was written for side-panel consumption. */
	lastVisibleRevisionAt: number;
	/** Result count written in the last visible detector revision. */
	lastVisibleResultCount: number;
}

/** Ordered evidence work sharing the current document cancellation and matcher lease. */
export interface IncrementalEvidencePassRun {
	/** Tab and document identity that owns the staged enrichment work. */
	readonly tab: InspectableTab;
	/** First cheap observation batch already queued for matching. */
	readonly baseBatch: ObservationBatch;
	/** Follow-up collection passes that must not block the first matcher revision. */
	readonly passes: readonly CollectionEvidencePass[];
	/** Compiled registry artifact reused for matching every enriched batch. */
	readonly compiledRegistryArtifact: CompiledRegistry;
	/** Snapshot reuse state attached to the visible analysis response. */
	readonly snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'];
	/** Observation session that remains active while enrichment gathers later evidence. */
	readonly session?: observe.StateType;
	/** Timing trace shared with the initial side-panel command. */
	readonly timingTraceId: string;
	/** Cancelable document owner and matcher lifecycle lease shared with the initial pass. */
	readonly workScope: TabDocumentWorkScope;
	/** Matcher completion that enrichment matching must not overlap. */
	readonly waitForPreviousMatcherCompletion?: Promise<void>;
}

/**
 * Why a matcher run exists and which evidence it owns.
 *
 * The discriminant controls replay storage. An initial pass with later enrichment
 * waits for that enrichment to create the visible replay; dirty refreshes update
 * the existing scan. These fields also retain the diagnostic event names.
 */
export type MatcherRunReason =
	| {
		/** First collection for a user-visible scan. */
		readonly refreshKind: 'queued-continuous-initial';
		readonly matcherMode: 'complete';
		readonly collectionPassId: CollectionEvidencePassId;
		readonly collectionPassCount: number;
		readonly hasFollowUpEnrichment: boolean;
	}
	| {
		/** Later evidence for the same scan, after its previous matcher has settled. */
		readonly refreshKind: 'enrichment-pass';
		readonly matcherMode: 'evidence-pass';
		readonly collectionPassIds: readonly CollectionEvidencePassId[];
		readonly collectionPassCount: number;
	}
	| {
		/** A dirty observation window, or one restored after service-worker replacement. */
		readonly refreshKind: 'incremental' | 'recovered';
		readonly matcherMode: 'complete';
		readonly queuedCount: number;
		readonly lateObservationCount: number;
	};

/** One executor dispatch with its document owner and diagnostic context. */
export type MatcherRunType = {
	readonly tab: InspectableTab;
	readonly job: MatcherJobRecord;
	readonly mode: MatcherJobMode;
	readonly batch: ObservationBatch;
	readonly registry: CompiledRegistry;
	readonly details: MatcherRunReason;
	readonly timingContext: TimingContext;
	readonly timingTraceId?: string;
	readonly workScope: TabDocumentWorkScope;
};

/** Completed matcher output that may publish while its exact owner remains current. */
export type MatcherSaveType = {
	readonly tab: InspectableTab;
	readonly job: MatcherJobRecord;
	readonly mode: MatcherJobMode;
	readonly result: MatcherJobRunResult;
	readonly observationCount: number;
	readonly snapshotStatus: AnalyzeVisibleTabOutput['snapshot']['status'];
	readonly session?: observe.StateType;
	readonly details: MatcherRunReason;
	readonly enrichment?: AnalysisEnrichmentState;
	readonly evidence?: DetectionEvidenceState;
	readonly timingContext: TimingContext;
	readonly timingTraceId?: string;
	/** Test the registered owner before starting the next publication. */
	readonly ownsPublication: () => boolean;
};
