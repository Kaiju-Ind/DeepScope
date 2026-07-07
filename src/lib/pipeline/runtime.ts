import { createEvidenceCandidateBatch, refineEvidenceCandidateBatch } from '../candidates';
import { matchIndexedObservationBatch } from '../detection/observation-matcher-index';
import { createCompiledDetectionRegistry } from '../detection/registry-graph';
import type {
	DetectionRunOptions,
	PageSignals,
	SiteAnalysis,
	TechnologyDefinition,
} from '../detection/types';
import {
	emitSiteAnalysisFromRefinedCandidates,
	type FinalDetectionEmissionMetadata,
} from '../emission';
import {
	normalizePageSignals,
	type ObservationInterface,
	type ObservationTarget,
} from '../observations';
import type { CompiledTechnologyRegistryArtifact } from '../registry';

/** Runtime detector paths available to extension callers. */
export const DETECTION_PIPELINE_MODES = ['event'] as const;

/** Runtime detector path selected for one analysis pass. */
export type DetectionPipelineMode = typeof DETECTION_PIPELINE_MODES[number];

/** Stable stage names emitted by the event runtime coordinator. */
export type DetectionPipelineStage =
	| 'normalized-observations'
	| 'pattern-matched'
	| 'evidence-created'
	| 'candidates-created'
	| 'candidates-refined'
	| 'detections-emitted';

/** Scalar diagnostics attached to coordinator events without storing page content. */
export type DetectionPipelineEventDetails = Record<string, string | number | boolean>;

/**
 * Public-safe event emitted by the deterministic runtime coordinator.
 *
 * These events describe stage progress and counts only. They intentionally avoid
 * raw observations, matched values, HTML, cookies, and source contents. Replay
 * traces can persist this shape without copying private page payloads.
 */
export interface DetectionPipelineRuntimeEvent {
	/** Stage that produced this coordinator event. */
	readonly stage: DetectionPipelineStage;
	/** Target document associated with the analysis pass. */
	readonly target: ObservationTarget;
	/** Deterministic timestamp associated with the analysis pass. */
	readonly occurredAt: number;
	/** Number of items produced or consumed by the stage. */
	readonly count: number;
	/** Optional scalar diagnostics that are safe to log or assert in tests. */
	readonly details?: DetectionPipelineEventDetails;
}

/** Input for adapting a page-signal snapshot into the event pipeline. */
export interface RunDetectionPipelineInput {
	/** Page signal snapshot collected by an adapter or fixture. */
	readonly signals: PageSignals;
	/** Ordered technology registry used for matching and relationship reasoning. */
	readonly registry: readonly TechnologyDefinition[];
	/** Optional compiler artifact that lets matching and refinement reuse prebuilt indexes. */
	readonly compiledRegistryArtifact?: Pick<CompiledTechnologyRegistryArtifact, 'matcherIndex' | 'relationshipGraph'>;
	/** Optional detector compatibility flags shared with matching stages. */
	readonly options?: DetectionRunOptions;
	/** Timestamp override used by deterministic tests and replay fixtures. */
	readonly analyzedAt?: number;
	/** Source marker written to the emitted analysis when the caller needs an override. */
	readonly source?: SiteAnalysis['source'];
	/** Interface label assigned while adapting `PageSignals` into observations. */
	readonly observationInterface?: ObservationInterface;
	/** Optional event sink used by tests and runtime instrumentation. */
	readonly onEvent?: (event: DetectionPipelineRuntimeEvent) => void;
}

/** Output from one event detector pass. */
export interface DetectionPipelineRuntimeResult {
	/** Final analysis object compatible with storage, messaging, and popup rendering. */
	readonly analysis: SiteAnalysis;
	/** Path the caller asked the coordinator to use. */
	readonly requestedMode: DetectionPipelineMode;
	/** Path that produced the final analysis. */
	readonly completedMode: DetectionPipelineMode;
	/** Ordered public-safe coordinator events for this analysis pass. */
	readonly events: readonly DetectionPipelineRuntimeEvent[];
	/** Emission metadata from final detection emission. */
	readonly emission: FinalDetectionEmissionMetadata;
}

/** Internal callback used by the coordinator to append a stage event. */
interface DetectionPipelineEventRecorder {
	/** Record a public-safe stage count with optional scalar diagnostics. */
	(stage: DetectionPipelineStage, count: number, details?: DetectionPipelineEventDetails): void;
}

/**
 * Run one detector pass through the event pipeline from a snapshot adapter.
 *
 * Some tests and compatibility fixtures still start with `PageSignals` because
 * that is the shape the content collector already knows how to produce safely.
 * The old direct analyzer is no longer part of this coordinator: snapshots are
 * immediately normalized into observations, then rule matches become evidence,
 * evidence becomes candidates, graph rules refine those candidates, and final
 * detections are emitted for storage and popup rendering.
 */
export function runDetectionPipeline(input: RunDetectionPipelineInput): DetectionPipelineRuntimeResult {
	const events: DetectionPipelineRuntimeEvent[] = [];
	const record = createEventRecorder(input, events);
	const observations = normalizePageSignals(input.signals, {
		interface: input.observationInterface ?? 'extension',
		observedAt: input.signals.collectedAt,
	});
	record('normalized-observations', observations.observations.length);

	const matches = matchIndexedObservationBatch({
		registry: input.registry,
		batch: observations,
		index: input.compiledRegistryArtifact?.matcherIndex,
		options: input.options,
	});
	record('pattern-matched', matches.matches.length);
	record('evidence-created', matches.evidenceBatch.entries.length);

	const candidates = createEvidenceCandidateBatch({
		registry: input.registry,
		evidence: matches.evidenceBatch,
	});
	record('candidates-created', candidates.candidates.length);

	const refined = refineEvidenceCandidateBatch({
		batch: candidates,
		compiledRegistry: input.compiledRegistryArtifact?.relationshipGraph ?? createCompiledDetectionRegistry(input.registry),
	});
	record('candidates-refined', refined.candidates.length, {
		rejectionCount: refined.rejections.length,
		relationshipEvidenceCount: refined.relationshipEvidence.length,
	});

	const emitted = emitSiteAnalysisFromRefinedCandidates({
		batch: refined,
		analyzedAt: input.analyzedAt,
		source: input.source,
	});
	record('detections-emitted', emitted.analysis.results.length, {
		filteredCandidateCount: emitted.metadata.filteredCandidateCount,
	});

	return {
		analysis: emitted.analysis,
		requestedMode: 'event',
		completedMode: 'event',
		events,
		emission: emitted.metadata,
	};
}

/**
 * Create the stage recorder shared by the snapshot adapter stages.
 *
 * Raw collected values are deliberately excluded here. The coordinator is
 * allowed to expose counts and scalar stage metadata only, preserving the same
 * privacy rule used by stored replay traces.
 */
function createEventRecorder(
	input: RunDetectionPipelineInput,
	events: DetectionPipelineRuntimeEvent[],
): DetectionPipelineEventRecorder {
	const target = createTarget(input.signals);
	const occurredAt = input.analyzedAt ?? input.signals.collectedAt;

	return (stage, count, details) => {
		const event: DetectionPipelineRuntimeEvent = details && Object.keys(details).length > 0
			? { stage, target, occurredAt, count, details }
			: { stage, target, occurredAt, count };

		events.push(event);
		input.onEvent?.(event);
	};
}

/** Copy the analyzed document target out of `PageSignals` for event metadata. */
function createTarget(signals: PageSignals): ObservationTarget {
	return {
		url: signals.url,
		hostname: signals.hostname,
	};
}
