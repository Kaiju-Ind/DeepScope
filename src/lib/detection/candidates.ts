import type {
	ConfidenceScore,
	DetectionResult,
	Evidence,
	TechnologyDefinition,
} from './types';

/** Source that created a detector candidate before final graph filtering. */
export type DetectionCandidateSource = 'direct' | 'relationship';

/**
 * Internal technology candidate built from evidence before final output emission.
 *
 * Today this candidate is immediately converted back into `DetectionResult` so
 * popup and storage output stay unchanged. The separate shape gives the future
 * evidence pipeline a place to accumulate direct matches and relationship
 * matches before explanations or replay logs are added.
 */
export type DetectionCandidate = {
	/** Technology represented by this candidate. */
	definition: TechnologyDefinition;
	/** Whether direct rule evidence or a graph relationship created the candidate. */
	source: DetectionCandidateSource;
	/** Confidence already converted into the public score shape. */
	confidence: ConfidenceScore;
	/** Evidence entries that support this candidate. */
	evidence: Evidence[];
	/** First extracted version from supporting evidence, when any rule captured one. */
	version?: string;
};

/** Build a candidate from direct rule matches on page signals. */
export function createDirectDetectionCandidate(
	definition: TechnologyDefinition,
	evidence: Evidence[],
	confidence: ConfidenceScore,
	version?: string,
): DetectionCandidate {
	return {
		definition,
		source: 'direct',
		confidence,
		evidence,
		version,
	};
}

/** Build a candidate from an implication relationship. */
export function createRelationshipDetectionCandidate(
	definition: TechnologyDefinition,
	sourceDefinition: TechnologyDefinition,
	confidence: ConfidenceScore,
): DetectionCandidate {
	return {
		definition,
		source: 'relationship',
		confidence,
		evidence: [createRelationshipEvidence(sourceDefinition, confidence.value)],
	};
}

/** Create the evidence entry currently used for implied technologies. */
export function createRelationshipEvidence(
	sourceDefinition: TechnologyDefinition,
	confidence: number,
): Evidence {
	return {
		kind: 'relationship',
		confidence,
		ruleDescription: `Implied by ${sourceDefinition.name}`,
		matchedValue: `Implied by ${sourceDefinition.name}`,
		direct: false,
		sourceTechnologyId: sourceDefinition.id,
	};
}

/** Convert an internal candidate into the existing public result shape. */
export function detectionCandidateToResult(candidate: DetectionCandidate): DetectionResult {
	return {
		technologyId: candidate.definition.id,
		name: candidate.definition.name,
		website: candidate.definition.website,
		description: candidate.definition.description,
		icon: candidate.definition.icon,
		categories: candidate.definition.categories,
		confidence: candidate.confidence,
		version: candidate.version,
		evidence: candidate.evidence,
		inferred: candidate.source === 'relationship' ? true : undefined,
	};
}
