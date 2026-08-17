import type { CategoryId, ConfidenceScore, DetectionKind, Evidence, SiteAnalysis } from '../detection/types';
import type {
	DetectionPipelineEventDetails,
	DetectionPipelineMode,
	DetectionPipelineRuntimeEvent,
	DetectionPipelineRuntimeResult,
	DetectionPipelineStage,
} from './runtime';

/** Schema version for serialized replay traces produced by this module. */
export const DETECTION_REPLAY_TRACE_SCHEMA_VERSION = 1 as const;

/** Version marker for the replay trace contract. */
export type DetectionReplayTraceSchemaVersion = typeof DETECTION_REPLAY_TRACE_SCHEMA_VERSION;

/** Scalar diagnostics copied from runtime events into replay traces. */
export type DetectionReplayEventDetails = DetectionPipelineEventDetails;

/**
 * Target page represented by a replay trace.
 *
 * The trace stores only the analyzed document URL and hostname. Collector payloads
 * such as HTML, cookies, request bodies, or source contents stay outside this
 * shape until a later persistence phase defines explicit redaction rules.
 */
export interface DetectionReplayTarget {
	/** URL of the analyzed document. */
	readonly url: string;
	/** Hostname derived from the analyzed document URL. */
	readonly hostname: string;
}

/**
 * Public-safe replay event for one pipeline stage.
 *
 * Runtime events are copied into this shape with a stable `sequence` so replay UI,
 * test snapshots, and future storage records can reconstruct stage order without
 * reading private coordinator arrays by reference.
 */
export interface DetectionReplayTraceEvent {
	/** Zero-based order of the event inside the replay trace. */
	readonly sequence: number;
	/** Runtime stage represented by this event. */
	readonly stage: DetectionPipelineStage;
	/** Target document associated with the event. */
	readonly target: DetectionReplayTarget;
	/** Millisecond timestamp associated with the event. */
	readonly occurredAt: number;
	/** Stage item count, such as observation count or emitted result count. */
	readonly count: number;
	/** Optional scalar diagnostics copied from the runtime event. */
	readonly details?: DetectionReplayEventDetails;
}

/** Summary of one evidence entry safe for explanation output. */
export interface DetectionExplanationEvidenceSummary {
	/** Detector surface that supplied this evidence. */
	readonly kind: DetectionKind;
	/** Confidence contribution recorded on the emitted evidence entry. */
	readonly confidence: number;
	/** Whether the evidence came from direct rule support rather than graph inference. */
	readonly direct: boolean;
	/** Bounded public matched value emitted by the detector, when one exists. */
	readonly matchedValue?: string;
	/** Rule note preserved by the detector, when one exists. */
	readonly ruleDescription?: string;
	/** Version captured by this evidence entry, when one exists. */
	readonly version?: string;
	/** Relationship source technology for graph-derived evidence. */
	readonly sourceTechnologyId?: string;
	/** Observation lookup key, such as a header name, meta name, global path, or storage key. */
	readonly observationKey?: string;
	/** Scalar observation context that helps explain property-based evidence. */
	readonly attributes?: Readonly<Record<string, string | number | boolean>>;
}

/** Human-readable explanation for one emitted detection result. */
export interface DetectionExplanation {
	/** Stable technology identifier from the emitted result. */
	readonly technologyId: string;
	/** Display name from the emitted result. */
	readonly name: string;
	/** Categories used by side panel grouping and future reports. */
	readonly categories: readonly CategoryId[];
	/** Final detector confidence from the emitted result. */
	readonly confidence: ConfidenceScore;
	/** Selected technology version, when emission found one. */
	readonly version?: string;
	/** Whether the result was created only through relationship inference. */
	readonly inferred: boolean;
	/** Total public evidence entries attached to the emitted result. */
	readonly evidenceCount: number;
	/** Number of public evidence entries from direct rule support. */
	readonly directEvidenceCount: number;
	/** Number of public evidence entries from graph relationship support. */
	readonly relationshipEvidenceCount: number;
	/** Short explanation phrases suitable for side panel or replay summaries. */
	readonly reasons: readonly string[];
	/** Public evidence summaries copied from the emitted result. */
	readonly evidence: readonly DetectionExplanationEvidenceSummary[];
	/** Detector warnings attached to the result, when any exist. */
	readonly warnings: readonly string[];
}

/**
 * Redacted replay trace for one detector pipeline run.
 *
 * The trace combines coordinator events with emitted `SiteAnalysis` output.
 * Storage and side panel contracts keep it separate from detector output so replay
 * detail can evolve without widening `SiteAnalysis`.
 */
export interface DetectionReplayTrace {
	/** Matcher run id that produced this trace, when available. */
	readonly runId?: string;
	/** Replay schema version for future migrations. */
	readonly schemaVersion: DetectionReplayTraceSchemaVersion;
	/** Target document represented by the analysis. */
	readonly target: DetectionReplayTarget;
	/** Pipeline mode requested by the caller. */
	readonly requestedMode: DetectionPipelineMode;
	/** Pipeline mode that produced the final analysis. */
	readonly completedMode: DetectionPipelineMode;
	/** Millisecond timestamp from the final analysis envelope. */
	readonly analyzedAt: number;
	/** Number of emitted detections in the final analysis. */
	readonly resultCount: number;
	/** Ordered public-safe stage events. */
	readonly events: readonly DetectionReplayTraceEvent[];
	/** Explanation records derived from emitted detection results. */
	readonly explanations: readonly DetectionExplanation[];
	/** Final emission metadata from event runs, when available. */
	readonly emission?: DetectionPipelineRuntimeResult['emission'];
}

/** Input for creating a replay trace from one pipeline result. */
export interface CreateDetectionReplayTraceInput {
	/** Runtime coordinator output to convert into a replay trace. */
	readonly result: DetectionPipelineRuntimeResult;
	/** Stable matcher run id used to join snapshots to their replay trace. */
	readonly runId?: string;
}

/** Create a redacted replay trace from one pipeline coordinator result. */
export function createDetectionReplayTrace(
	input: CreateDetectionReplayTraceInput,
): DetectionReplayTrace {
	const { result } = input;
	const baseTrace: DetectionReplayTrace = {
		...(input.runId ? { runId: input.runId } : {}),
		schemaVersion: DETECTION_REPLAY_TRACE_SCHEMA_VERSION,
		target: createReplayTarget(result.analysis),
		requestedMode: result.requestedMode,
		completedMode: result.completedMode,
		analyzedAt: result.analysis.analyzedAt,
		resultCount: result.analysis.results.length,
		events: result.events.map(createTraceEvent),
		explanations: createDetectionExplanations(result.analysis),
	};

	return {
		...baseTrace,
		...(result.emission ? { emission: { ...result.emission } } : {}),
	};
}

/** Create explanation records from emitted `SiteAnalysis` results. */
export function createDetectionExplanations(analysis: SiteAnalysis): DetectionExplanation[] {
	return analysis.results.map(createDetectionExplanation);
}

/** Copy the final analysis target into the replay contract. */
function createReplayTarget(analysis: SiteAnalysis): DetectionReplayTarget {
	return {
		url: analysis.url,
		hostname: analysis.hostname,
	};
}

/** Copy one runtime event and add a stable replay sequence number. */
function createTraceEvent(
	event: DetectionPipelineRuntimeEvent,
	sequence: number,
): DetectionReplayTraceEvent {
	return {
		sequence,
		stage: event.stage,
		target: { ...event.target },
		occurredAt: event.occurredAt,
		count: event.count,
		...(event.details ? { details: cloneEventDetails(event.details) } : {}),
	};
}

/** Convert one emitted detection result into a replay explanation. */
function createDetectionExplanation(result: SiteAnalysis['results'][number]): DetectionExplanation {
	const evidence = result.evidence.map(createEvidenceSummary);
	const directEvidenceCount = evidence.filter((entry) => entry.direct).length;
	const relationshipEvidenceCount = evidence.length - directEvidenceCount;

	return {
		technologyId: result.technologyId,
		name: result.name,
		categories: [...result.categories],
		confidence: { ...result.confidence },
		version: result.version,
		inferred: result.inferred === true,
		evidenceCount: evidence.length,
		directEvidenceCount,
		relationshipEvidenceCount,
		reasons: createReasonSummaries(result, evidence),
		evidence,
		warnings: [...(result.warnings ?? [])],
	};
}

/** Copy the public evidence shape into the smaller explanation evidence contract. */
function createEvidenceSummary(evidence: Evidence): DetectionExplanationEvidenceSummary {
	return {
		kind: evidence.kind,
		confidence: evidence.confidence,
		direct: evidence.direct !== false,
		...(evidence.matchedValue ? { matchedValue: evidence.matchedValue } : {}),
		...(evidence.ruleDescription ? { ruleDescription: evidence.ruleDescription } : {}),
		...(evidence.version ? { version: evidence.version } : {}),
		...(evidence.sourceTechnologyId ? { sourceTechnologyId: evidence.sourceTechnologyId } : {}),
		...(evidence.observationKey ? { observationKey: evidence.observationKey } : {}),
		...(evidence.attributes ? { attributes: { ...evidence.attributes } } : {}),
	};
}

/** Build short explanation phrases without exposing raw collector payloads. */
function createReasonSummaries(
	result: SiteAnalysis['results'][number],
	evidence: readonly DetectionExplanationEvidenceSummary[],
): string[] {
	const reasons: string[] = [];
	const directKinds = uniqueStrings(evidence.filter((entry) => entry.direct).map((entry) => entry.kind));
	const relationshipSources = uniqueStrings(
		evidence
			.filter((entry) => !entry.direct)
			.map((entry) => entry.sourceTechnologyId)
			.filter(isDefined),
	);

	if (directKinds.length > 0) {
		reasons.push(`Matched ${directKinds.join(', ')} evidence`);
	}
	if (relationshipSources.length > 0) {
		reasons.push(`Inferred from ${relationshipSources.join(', ')}`);
	} else if (result.inferred) {
		reasons.push('Inferred through registry relationships');
	}
	if (result.version) {
		reasons.push(`Selected version ${result.version}`);
	}
	if ((result.warnings ?? []).length > 0) {
		reasons.push('Registry metadata emitted warnings');
	}
	if (reasons.length === 0) {
		reasons.push('Emitted without public evidence entries');
	}

	return reasons;
}

/** Clone scalar event details so callers cannot mutate stored trace diagnostics. */
function cloneEventDetails(details: DetectionPipelineEventDetails): DetectionPipelineEventDetails {
	return Object.fromEntries(Object.entries(details));
}


/** Return unique string values while preserving first-seen order. */
function uniqueStrings(values: readonly string[]): string[] {
	return Array.from(new Set(values));
}

/** Narrow optional strings after array filtering. */
function isDefined(value: string | undefined): value is string {
	return value !== undefined;
}


/** Return whether a replay trace belongs to the supplied analysis envelope. */
export function isDetectionReplayTraceForAnalysis(
	trace: DetectionReplayTrace,
	analysis: SiteAnalysis,
): boolean {
	return (
		trace.target.url === analysis.url &&
		trace.resultCount === analysis.results.length &&
		trace.analyzedAt === analysis.analyzedAt
	);
}

/** Filter replay histories so origin-level storage cannot explain the wrong visible run. */
export function filterReplayHistoryForAnalysis(
	history: readonly DetectionReplayTrace[] | undefined,
	analysis: SiteAnalysis,
): DetectionReplayTrace[] {
	return (history ?? []).filter((trace) => isDetectionReplayTraceForAnalysis(trace, analysis));
}
