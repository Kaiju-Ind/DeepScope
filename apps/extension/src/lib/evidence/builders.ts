import type { SiteAnalysis, DetectionResult, Evidence } from '../detection/types';
import type { NormalizedObservation, ObservationAttributes, ObservationTarget } from '../observations';
import type {
	EvidenceBatch,
	EvidenceEntry,
	EvidenceEntrySource,
} from './types';

/**
 * Input for creating direct evidence from a normalized observation.
 *
 * Pattern matching calls this after a registry rule matches an observation. The
 * builder keeps evidence records stable across direct observations, replay
 * traces, and final explanation summaries.
 */
export interface CreateObservationEvidenceEntryInput {
	/** Technology that the matched observation supports. */
	readonly technologyId: string;
	/** Observation that matched a registry rule. */
	readonly observation: NormalizedObservation;
	/** Confidence contribution assigned by the matching rule. */
	readonly confidence: number;
	/** Rule identifier from the compiled registry, when available. */
	readonly ruleId?: string;
	/** Human-readable rule note used later by explanations. */
	readonly ruleDescription?: string;
	/** Version captured from the observation match, when available. */
	readonly version?: string;
	/** Override for the value recorded in evidence. Defaults to the observation value. */
	readonly matchedValue?: EvidenceEntry['matchedValue'];
	/** Extra scalar context to merge with observation attributes. */
	readonly attributes?: ObservationAttributes;
}

/**
 * Input for adapting today's final analysis output into evidence entries.
 *
 * This compatibility path exists so tests and future persistence work can use
 * the evidence repository before the detector consumes observations directly.
 */
export interface CreateEvidenceBatchFromAnalysisInput {
	/** Existing detector output to adapt into evidence entries. */
	readonly analysis: SiteAnalysis;
	/** Optional timestamp override for deterministic replay fixtures. */
	readonly observedAt?: number;
}

/** Build a direct evidence entry from a matched normalized observation. */
export function createEvidenceEntryFromObservation(
	input: CreateObservationEvidenceEntryInput,
): EvidenceEntry {
	const attributes = mergeAttributes(input.observation.attributes, input.attributes);

	return {
		id: createEvidenceEntryId([
			input.observation.target.url,
			input.technologyId,
			input.observation.kind,
			input.observation.key ?? '',
			String(input.matchedValue ?? input.observation.value),
			input.ruleId ?? '',
		]),
		target: { ...input.observation.target },
		technologyId: input.technologyId,
		kind: input.observation.kind === 'htmlMatch' ? 'html' : input.observation.kind,
		source: 'observation',
		confidence: input.confidence,
		matchedValue: input.matchedValue ?? input.observation.value,
		observedAt: input.observation.observedAt,
		direct: true,
		...(input.ruleId !== undefined ? { ruleId: input.ruleId } : {}),
		...(input.ruleDescription !== undefined ? { ruleDescription: input.ruleDescription } : {}),
		...(input.version !== undefined ? { version: input.version } : {}),
		observation: {
			kind: input.observation.kind,
			...(input.observation.key !== undefined ? { key: input.observation.key } : {}),
			interface: input.observation.interface,
			collector: input.observation.collector,
			observedAt: input.observation.observedAt,
		},
		...(attributes ? { attributes } : {}),
	};
}

/**
 * Adapt existing `SiteAnalysis` evidence into the new evidence-entry shape.
 *
 * The adapter is intentionally lossy in the same places as stored analysis: it
 * records public detector evidence already chosen for display, not raw page
 * payloads or all possible rule matches.
 */
export function createEvidenceBatchFromAnalysis(
	input: CreateEvidenceBatchFromAnalysisInput,
): EvidenceBatch {
	const target: ObservationTarget = {
		url: input.analysis.url,
		hostname: input.analysis.hostname,
	};
	const observedAt = input.observedAt ?? input.analysis.analyzedAt;
	const entries = input.analysis.results.flatMap((result, resultIndex) =>
		result.evidence.map((evidence, evidenceIndex) => createEvidenceEntryFromDetectionEvidence({
			target,
			observedAt,
			result,
			evidence,
			ordinal: `${resultIndex}:${evidenceIndex}`,
		})),
	);

	return { target, observedAt, entries };
}

interface CreateDetectionEvidenceEntryInput {
	readonly target: ObservationTarget;
	readonly observedAt: number;
	readonly result: DetectionResult;
	readonly evidence: Evidence;
	readonly ordinal: string;
}

function createEvidenceEntryFromDetectionEvidence(
	input: CreateDetectionEvidenceEntryInput,
): EvidenceEntry {
	const source = getDetectionEvidenceSource(input.evidence);

	return {
		id: createEvidenceEntryId([
			input.target.url,
			input.result.technologyId,
			input.evidence.kind,
			getEvidenceMatchedValue(input.evidence),
			input.ordinal,
		]),
		target: { ...input.target },
		technologyId: input.result.technologyId,
		kind: input.evidence.kind,
		source,
		confidence: input.evidence.confidence,
		matchedValue: getEvidenceMatchedValue(input.evidence),
		observedAt: input.observedAt,
		direct: input.evidence.direct ?? source !== 'relationship',
		...(input.evidence.ruleDescription !== undefined ? { ruleDescription: input.evidence.ruleDescription } : {}),
		...(input.evidence.version !== undefined ? { version: input.evidence.version } : {}),
		...(input.evidence.sourceTechnologyId !== undefined
			? { sourceTechnologyId: input.evidence.sourceTechnologyId }
			: {}),
	};
}

function getDetectionEvidenceSource(evidence: Evidence): EvidenceEntrySource {
	return evidence.kind === 'relationship' ? 'relationship' : 'detection-result';
}

function getEvidenceMatchedValue(evidence: Evidence): string {
	return evidence.matchedValue ?? '';
}

function mergeAttributes(
	left: ObservationAttributes | undefined,
	right: ObservationAttributes | undefined,
): ObservationAttributes | undefined {
	if (!left && !right) {
		return undefined;
	}

	return Object.assign({}, left, right);
}

function createEvidenceEntryId(parts: readonly string[]): string {
	return parts.map(encodeEvidenceIdPart).join(':');
}

/**
 * Escape separators used by generated evidence identifiers.
 *
 * These ids are deterministic handles for tests, replay, and in-memory grouping.
 * They are not cryptographic hashes, so the only invariant is that a part cannot
 * escape its boundary by containing the `:` separator itself.
 */
function encodeEvidenceIdPart(value: string): string {
	return encodeURIComponent(value);
}
