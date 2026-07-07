import { createEvidenceCandidateBatch, refineEvidenceCandidateBatch } from '../candidates';
import { matchIndexedObservationBatch } from '../detection/observation-matcher-index';
import { createCompiledDetectionRegistry } from '../detection/registry-graph';
import type { DetectionRunOptions, SiteAnalysis, TechnologyDefinition } from '../detection/types';
import { emitSiteAnalysisFromRefinedCandidates } from '../emission';
import type { ObservationBatch } from '../observations';
import type { CompiledTechnologyRegistryArtifact } from '../registry';
import { timeSyncSpan, type TimingContext } from '../diagnostics/timing';
import type {
	DetectionPipelineEventDetails,
	DetectionPipelineRuntimeEvent,
	DetectionPipelineRuntimeResult,
	DetectionPipelineStage,
} from './runtime';

/** Input for running the event pipeline from pre-normalized observation events. */
export interface RunObservationBatchPipelineInput {
	/** Bounded normalized observations emitted by a collector or test fixture. */
	readonly batch: ObservationBatch;
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
	/** Optional timing context used by extension diagnostics without changing pipeline output. */
	readonly timingContext?: TimingContext;
	/** Optional event sink used by tests and later runtime instrumentation. */
	readonly onEvent?: (event: DetectionPipelineRuntimeEvent) => void;
}

/** Event stages produced by an already-normalized observation batch. */
type ObservationBatchPipelineStage = Extract<
	DetectionPipelineStage,
	| 'pattern-matched'
	| 'evidence-created'
	| 'candidates-created'
	| 'candidates-refined'
	| 'detections-emitted'
>;

/** Internal callback used to append public-safe observation-batch stage events. */
interface ObservationBatchEventRecorder {
	/** Record a stage count with optional scalar diagnostics. */
	(stage: ObservationBatchPipelineStage, count: number, details?: DetectionPipelineEventDetails): void;
}

/**
 * Run the event detector stages from an already-normalized observation batch.
 *
 * Pipeline-level timing is optional so tests and shared engine callers can run
 * without configuring diagnostics. Extension entrypoints pass a timing context
 * when investigating visible-tab latency, which makes matcher, candidate,
 * refinement, and emission costs visible as separate spans.
 */
export function runObservationBatchPipeline(
	input: RunObservationBatchPipelineInput,
): DetectionPipelineRuntimeResult {
	const events: DetectionPipelineRuntimeEvent[] = [];
	const record = createObservationBatchEventRecorder(input, events);
	const matches = timePipelineStage(
		'pipeline.match-indexed-observation-batch',
		input,
		() => matchIndexedObservationBatch({
			registry: input.registry,
			batch: input.batch,
			index: input.compiledRegistryArtifact?.matcherIndex,
			options: input.options,
		}),
		(result) => ({
			matchCount: result.matches.length,
			evidenceCount: result.evidenceBatch.entries.length,
			observationCount: result.diagnostics.observationCount,
			skippedObservationCount: result.diagnostics.skippedObservationCount,
			candidateRuleCount: result.diagnostics.candidateRuleCount,
			keyedRuleCount: result.diagnostics.keyedRuleCount,
			literalRuleCount: result.diagnostics.literalRuleCount,
			literalRejectedRuleCount: result.diagnostics.literalRejectedRuleCount,
			fallbackRuleCount: result.diagnostics.fallbackRuleCount,
			observationsByKind: result.diagnostics.observationsByKind,
			skippedObservationsByKind: result.diagnostics.skippedObservationsByKind,
			candidateRulesByKind: result.diagnostics.candidateRulesByKind,
		}),
	);
	record('pattern-matched', matches.matches.length, {
		observationCount: matches.diagnostics.observationCount,
		skippedObservationCount: matches.diagnostics.skippedObservationCount,
		candidateRuleCount: matches.diagnostics.candidateRuleCount,
		literalRejectedRuleCount: matches.diagnostics.literalRejectedRuleCount,
		fallbackRuleCount: matches.diagnostics.fallbackRuleCount,
		observationsByKind: stringifyCounts(matches.diagnostics.observationsByKind),
		skippedObservationsByKind: stringifyCounts(matches.diagnostics.skippedObservationsByKind),
		candidateRulesByKind: stringifyCounts(matches.diagnostics.candidateRulesByKind),
	});
	record('evidence-created', matches.evidenceBatch.entries.length);

	const candidates = timePipelineStage(
		'pipeline.create-evidence-candidates',
		input,
		() => createEvidenceCandidateBatch({
			registry: input.registry,
			evidence: matches.evidenceBatch,
		}),
		(result) => ({ candidateCount: result.candidates.length }),
	);
	record('candidates-created', candidates.candidates.length);

	const refined = timePipelineStage(
		'pipeline.refine-evidence-candidates',
		input,
		() => refineEvidenceCandidateBatch({
			batch: candidates,
			compiledRegistry: input.compiledRegistryArtifact?.relationshipGraph ?? createCompiledDetectionRegistry(input.registry),
		}),
		(result) => ({
			candidateCount: result.candidates.length,
			rejectionCount: result.rejections.length,
			relationshipEvidenceCount: result.relationshipEvidence.length,
		}),
	);
	record('candidates-refined', refined.candidates.length, {
		rejectionCount: refined.rejections.length,
		relationshipEvidenceCount: refined.relationshipEvidence.length,
	});

	const emitted = timePipelineStage(
		'pipeline.emit-site-analysis',
		input,
		() => emitSiteAnalysisFromRefinedCandidates({
			batch: refined,
			analyzedAt: input.analyzedAt,
			source: input.source,
		}),
		(result) => ({
			resultCount: result.analysis.results.length,
			filteredCandidateCount: result.metadata.filteredCandidateCount,
		}),
	);
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

function stringifyCounts(counts: Readonly<Record<string, number>>): string {
	return JSON.stringify(counts);
}

/** Run a pipeline sub-stage with timing only when the caller supplied context. */
function timePipelineStage<T>(
	spanName: string,
	input: RunObservationBatchPipelineInput,
	operation: () => T,
	summarize: (value: T) => Record<string, unknown>,
): T {
	if (!input.timingContext) {
		return operation();
	}

	return timeSyncSpan(spanName, input.timingContext, operation, summarize);
}

/** Create the stage recorder shared by observation-batch pipeline stages. */
function createObservationBatchEventRecorder(
	input: RunObservationBatchPipelineInput,
	events: DetectionPipelineRuntimeEvent[],
): ObservationBatchEventRecorder {
	const target = input.batch.target;
	const occurredAt = input.analyzedAt ?? input.batch.observedAt;

	return (stage, count, details) => {
		const event: DetectionPipelineRuntimeEvent = details && Object.keys(details).length > 0
			? { stage, target, occurredAt, count, details }
			: { stage, target, occurredAt, count };

		events.push(event);
		input.onEvent?.(event);
	};
}
