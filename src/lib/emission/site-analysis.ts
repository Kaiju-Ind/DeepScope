import type { EvidenceCandidate } from '../candidates';
import type { ConfidenceScore, DetectionResult, Evidence, SiteAnalysis } from '../detection/types';
import type { EvidenceEntry } from '../evidence';
import type {
	EmitSiteAnalysisFromCandidatesInput,
	FinalDetectionEmissionMetadata,
	FinalDetectionEmissionPolicy,
	FinalDetectionEmissionResult,
} from './types';

/** Final emission policy that mirrors today's detector display threshold. */
export const DEFAULT_FINAL_DETECTION_EMISSION_POLICY: FinalDetectionEmissionPolicy = Object.freeze({
	displayConfidenceThreshold: 50,
});

/**
 * Emit current `SiteAnalysis` output from relationship-refined candidates.
 *
 * Refined candidates become the same public shape that storage, messaging, and
 * popup rendering already understand. Richer emission metadata stays outside the
 * stored analysis object so replay can grow without changing `SiteAnalysis`.
 */
export function emitSiteAnalysisFromRefinedCandidates(
	input: EmitSiteAnalysisFromCandidatesInput,
): FinalDetectionEmissionResult {
	const policy = createEmissionPolicy(input.policy);
	const emittedCandidates = input.batch.candidates
		.filter((candidate) => candidate.confidence.value >= policy.displayConfidenceThreshold);
	const results = emittedCandidates
		.map(createDetectionResultFromCandidate)
		.sort(compareDetectionResults(input.batch.candidates));
	const analysis: SiteAnalysis = {
		url: input.batch.target.url,
		hostname: input.batch.target.hostname,
		analyzedAt: input.analyzedAt ?? Date.now(),
		source: input.source ?? 'fresh',
		results,
		errors: [],
	};

	return {
		analysis,
		metadata: createEmissionMetadata(input.batch, results.length),
	};
}

function createEmissionPolicy(
	policy: Partial<FinalDetectionEmissionPolicy> = {},
): FinalDetectionEmissionPolicy {
	return Object.assign({}, DEFAULT_FINAL_DETECTION_EMISSION_POLICY, policy);
}

function createDetectionResultFromCandidate(candidate: EvidenceCandidate): DetectionResult {
	const result: DetectionResult = {
		technologyId: candidate.technology.id,
		name: candidate.technology.name ?? candidate.technology.id,
		website: candidate.technology.website ?? '',
		description: candidate.technology.description,
		icon: candidate.technology.icon,
		categories: [...candidate.technology.categories],
		confidence: cloneConfidence(candidate.confidence),
		version: selectCandidateVersion(candidate),
		evidence: candidate.evidence.map(createDetectionEvidenceFromEntry),
		inferred: isInferredCandidate(candidate) ? true : undefined,
	};
	if (!candidate.technology.name || !candidate.technology.website) {
		result.warnings = ['missing-registry-metadata'];
	}

	return result;
}

function createDetectionEvidenceFromEntry(entry: EvidenceEntry): Evidence {
	const evidence: Evidence = {
		kind: entry.kind,
		ruleDescription: entry.ruleDescription,
		matchedValue: stringifyMatchedValue(entry.matchedValue),
		confidence: entry.confidence,
		direct: entry.direct,
	};

	if (entry.version !== undefined) {
		evidence.version = entry.version;
	}
	if (entry.sourceTechnologyId !== undefined) {
		evidence.sourceTechnologyId = entry.sourceTechnologyId;
	}
	if (entry.observation?.key !== undefined) {
		evidence.observationKey = entry.observation.key;
	}
	if (entry.attributes !== undefined) {
		evidence.attributes = Object.assign({}, entry.attributes);
	}

	return evidence;
}

/**
 * Select the version that the candidate stage preserved as first evidence order.
 *
 * Current detector output keeps the first version discovered while scanning a
 * technology's rules. Candidate aggregation stores that selected value on
 * `candidate.version`, so emission should not re-sort versions or choose the
 * highest semantic version here.
 */
function selectCandidateVersion(candidate: EvidenceCandidate): string | undefined {
	return candidate.version;
}

function stringifyMatchedValue(value: EvidenceEntry['matchedValue']): string | undefined {
	if (value === '') {
		return undefined;
	}

	return String(value);
}

function cloneConfidence(confidence: ConfidenceScore): ConfidenceScore {
	return { value: confidence.value, level: confidence.level };
}

function isInferredCandidate(candidate: EvidenceCandidate): boolean {
	return candidate.directEvidenceCount === 0 && candidate.relationshipEvidenceCount > 0;
}

function compareDetectionResults(candidates: readonly EvidenceCandidate[]) {
	const orderById = new Map(candidates.map((candidate, index) => [candidate.technology.id, index]));

	return (left: DetectionResult, right: DetectionResult): number =>
		right.confidence.value - left.confidence.value ||
		(orderById.get(left.technologyId) ?? Number.MAX_SAFE_INTEGER) -
			(orderById.get(right.technologyId) ?? Number.MAX_SAFE_INTEGER) ||
		left.name.localeCompare(right.name);
}

function createEmissionMetadata(
	batch: EmitSiteAnalysisFromCandidatesInput['batch'],
	emittedResultCount: number,
): FinalDetectionEmissionMetadata {
	return {
		candidateCount: batch.candidates.length,
		emittedResultCount,
		filteredCandidateCount: batch.candidates.length - emittedResultCount,
		rejectionCount: batch.rejections.length,
		relationshipEvidenceCount: batch.relationshipEvidence.length,
	};
}
