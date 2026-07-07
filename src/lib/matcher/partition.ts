import type { DetectionPipelineEventDetails, DetectionPipelineRuntimeEvent } from '../pipeline';
import type { ObservationPatternMatchBatch } from '../detection/observation-match-types';
import type { DetectionRunOptions, SiteAnalysis, TechnologyDefinition } from '../detection/types';
import { createEvidenceCandidateBatch, refineEvidenceCandidateBatch } from '../candidates';
import { createCompiledDetectionRegistry, type CompiledDetectionRegistry } from '../detection/registry-graph';
import { emitSiteAnalysisFromRefinedCandidates } from '../emission';
import type { CompiledTechnologyRegistryArtifact } from '../registry';
import type {
	NormalizedObservation,
	NormalizedObservationKind,
	ObservationBatch,
} from '../observations';
import type {
	MatcherJobIdentity,
	MatcherPartitionMatch,
	MatcherPartitionPriority,
	MatcherPartitionResult,
	MatcherPartitionTask,
} from './contracts';

/** Sort order that lets cheap evidence publish before slower source-heavy work. */
const KIND_PRIORITIES = Object.freeze({
	url: 1,
	htmlMatch: 1,
	meta: 1,
	dom: 1,
	header: 2,
	responseHeader: 2,
	link: 2,
	cookie: 2,
	storage: 2,
	jsGlobal: 2,
	scriptSrc: 3,
	stylesheetHref: 3,
	resourceUrl: 3,
	requestUrl: 3,
	requestHeader: 3,
	html: 4,
	text: 4,
	scriptContent: 4,
	stylesheetContent: 4,
	robots: 4,
	dns: 4,
	certIssuer: 4,
	probe: 4,
} satisfies Record<NormalizedObservationKind, MatcherPartitionPriority>);

/** Default partition size for cheap evidence kinds with low fan-out. */
const DEFAULT_PARTITION_CHUNK_SIZE = 128;

/**
 * High-fan-out surfaces are chunked so the popup receives real revisions.
 *
 * A single Vercel page can expose hundreds or thousands of resource and request
 * URL observations. Treating that whole kind as one partition recreates the old
 * long quiet wait. Smaller chunks let worker progress messages publish partial
 * detector snapshots while the rest of the same kind continues matching.
 */
const KIND_PARTITION_CHUNK_SIZES = Object.freeze({
	scriptSrc: 16,
	stylesheetHref: 16,
	resourceUrl: 16,
	requestUrl: 16,
	html: 4,
	text: 4,
	scriptContent: 4,
	stylesheetContent: 4,
	htmlMatch: 8,
	dom: 16,
} satisfies Partial<Record<NormalizedObservationKind, number>>) as Partial<Record<NormalizedObservationKind, number>>;

/** Input for splitting one observation batch into kind-routed matcher tasks. */
export interface CreateMatcherPartitionTasksInput {
	/** Job identity shared by every partition. */
	readonly job: MatcherJobIdentity;
	/** Full observation batch collected for the target document. */
	readonly batch: ObservationBatch;
	/** Optional detector flags such as disabled kinds. */
	readonly options?: DetectionRunOptions;
}

/** Input for merging partition results into the normal event-pipeline result. */
export interface CreateMatcherPipelineResultInput {
	/** Original batch used for target, timestamp, and event metadata. */
	readonly batch: ObservationBatch;
	/** Ordered registry used by downstream candidate and graph stages. */
	readonly registry: readonly TechnologyDefinition[];
	/** Optional compiled relationship graph reused after partitioned matching. */
	readonly compiledRegistryArtifact?: Pick<CompiledTechnologyRegistryArtifact, 'relationshipGraph'>;
	/** Partition results emitted by workers. */
	readonly partitions: readonly MatcherPartitionResult[];
	/** Optional timestamp override for emitted `SiteAnalysis`. */
	readonly analyzedAt?: number;
	/** Source marker written to the emitted analysis. */
	readonly source?: SiteAnalysis['source'];
	/** Optional event sink for runtime diagnostics. */
	readonly onEvent?: (event: DetectionPipelineRuntimeEvent) => void;
}

/**
 * Split an observation batch into independent matcher tasks by observation kind.
 *
 * A page can expose thousands of script and resource URL observations while its
 * URL, meta, DOM, and header evidence is tiny. Kind partitions let the scheduler
 * send cheap facts first, then keep source-heavy content scans moving in parallel
 * without blocking the background service worker message loop.
 */
export function createMatcherPartitionTasks(
	input: CreateMatcherPartitionTasksInput,
): readonly MatcherPartitionTask[] {
	const grouped = new Map<NormalizedObservationKind, {
		readonly priority: MatcherPartitionPriority;
		readonly observations: NormalizedObservation[];
		readonly indexes: number[];
	}>();

	input.batch.observations.forEach((observation, index) => {
		const priority = getMatcherPartitionPriority(observation.kind);
		const bucket = grouped.get(observation.kind);
		if (bucket) {
			bucket.observations.push(observation);
			bucket.indexes.push(index);
			return;
		}

		grouped.set(observation.kind, {
			priority,
			observations: [observation],
			indexes: [index],
		});
	});

	let ordinal = 0;
	const tasks: MatcherPartitionTask[] = [];
	const sortedGroups = [...grouped].sort((left, right) => {
		const priorityDelta = left[1].priority - right[1].priority;
		return priorityDelta === 0 ? left[0].localeCompare(right[0]) : priorityDelta;
	});

	for (const [kind, bucket] of sortedGroups) {
		const chunkSize = getMatcherPartitionChunkSize(kind);
		for (let offset = 0; offset < bucket.observations.length; offset += chunkSize) {
			const observations = bucket.observations.slice(offset, offset + chunkSize);
			const indexes = bucket.indexes.slice(offset, offset + chunkSize);
			tasks.push({
				job: input.job,
				partitionId: `${input.job.jobId}:${ordinal}:${kind}:${offset}`,
				kind,
				priority: bucket.priority,
				batch: {
					target: input.batch.target,
					interface: input.batch.interface,
					observedAt: input.batch.observedAt,
					observations,
				},
				observationIndexes: indexes,
				...(input.options ? { options: input.options } : {}),
			});
			ordinal += 1;
		}
	}

	return tasks;
}

/** Return the scheduler priority assigned to an observation kind. */
export function getMatcherPartitionPriority(kind: NormalizedObservationKind): MatcherPartitionPriority {
	return KIND_PRIORITIES[kind] ?? 4;
}

/** Return the maximum observation count assigned to one worker task. */
export function getMatcherPartitionChunkSize(kind: NormalizedObservationKind): number {
	return KIND_PARTITION_CHUNK_SIZES[kind] ?? DEFAULT_PARTITION_CHUNK_SIZE;
}

/**
 * Merge worker partition matches and run candidate, graph, and emission stages.
 *
 * Workers only decide which rules matched which observations. Final technology
 * cards still come from one deterministic coordinator pass so `requires`,
 * `implies`, `excludes`, confidence thresholds, and version selection see the
 * complete candidate set for the current snapshot.
 */
export function createMatcherPipelineResult(
	input: CreateMatcherPipelineResultInput,
) {
	const events: DetectionPipelineRuntimeEvent[] = [];
	const record = createPartitionEventRecorder(input, events);
	const matchBatch = createObservationPatternMatchBatch(input.batch, input.partitions);
	record('pattern-matched', matchBatch.matches.length, {
		partitionCount: input.partitions.length,
		candidateRuleCount: input.partitions.reduce((total, partition) => (
			total + partition.diagnostics.candidateRuleCount
		), 0),
	});
	record('evidence-created', matchBatch.evidenceBatch.entries.length);

	const candidates = createEvidenceCandidateBatch({
		registry: input.registry,
		evidence: matchBatch.evidenceBatch,
	});
	record('candidates-created', candidates.candidates.length);

	const refined = refineEvidenceCandidateBatch({
		batch: candidates,
		compiledRegistry: resolvePartitionRelationshipGraph(input),
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
		requestedMode: 'event' as const,
		completedMode: 'event' as const,
		events,
		emission: emitted.metadata,
	};
}

/**
 * Return a relationship graph with live lookup maps for candidate refinement.
 *
 * Browser runtime messages serialize plain JSON rather than preserving every
 * JavaScript object shape. When the background sends a compiled graph to the
 * offscreen document, its `Map` fields can arrive as ordinary objects. Graph
 * refinement depends on `.get(...)` lookups, so serialized graphs are rebuilt
 * from the registry before detections are emitted.
 */
function resolvePartitionRelationshipGraph(
	input: CreateMatcherPipelineResultInput,
): CompiledDetectionRegistry {
	const graph = input.compiledRegistryArtifact?.relationshipGraph;
	if (isUsableRelationshipGraph(graph)) {
		return graph;
	}

	return createCompiledDetectionRegistry(input.registry);
}

/** Relationship graphs are usable only when their lookup tables survived intact. */
function isUsableRelationshipGraph(
	graph: CompiledDetectionRegistry | undefined,
): graph is CompiledDetectionRegistry {
	return Boolean(
		graph &&
		Array.isArray(graph.technologies) &&
		graph.definitionsById instanceof Map &&
		graph.registryOrderById instanceof Map &&
		Array.isArray(graph.relationshipEdges),
	);
}

/** Merge partition matches into the same shape used by downstream pipeline stages. */
function createObservationPatternMatchBatch(
	batch: ObservationBatch,
	partitions: readonly MatcherPartitionResult[],
): ObservationPatternMatchBatch {
	const matches = partitions
		.flatMap((partition) => partition.matches)
		.sort(comparePartitionMatches)
		.map((entry) => entry.match);

	return {
		target: batch.target,
		observedAt: batch.observedAt,
		matches,
		evidenceBatch: {
			target: batch.target,
			observedAt: batch.observedAt,
			entries: matches.map((match) => match.evidence),
		},
	};
}

/** Preserve original observation order before comparing match order inside a partition. */
function comparePartitionMatches(left: MatcherPartitionMatch, right: MatcherPartitionMatch): number {
	const observationDelta = left.observationIndex - right.observationIndex;
	return observationDelta === 0 ? left.matchIndex - right.matchIndex : observationDelta;
}

type PartitionPipelineStage = 'pattern-matched' | 'evidence-created' | 'candidates-created' | 'candidates-refined' | 'detections-emitted';

function createPartitionEventRecorder(
	input: CreateMatcherPipelineResultInput,
	events: DetectionPipelineRuntimeEvent[],
) {
	const target = input.batch.target;
	const occurredAt = input.analyzedAt ?? input.batch.observedAt;

	return (stage: PartitionPipelineStage, count: number, details?: DetectionPipelineEventDetails): void => {
		const event = details && Object.keys(details).length > 0
			? { stage, target, occurredAt, count, details }
			: { stage, target, occurredAt, count };

		events.push(event);
		input.onEvent?.(event);
	};
}
