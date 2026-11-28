import type { CategoryId, TechnologyProfileType } from "@deepscope/registry/types";
import type { ResolveRelationshipsInput, CandidateNode } from "./types.ts";
import { createRelationshipContext, recordRejection } from "./rejections.ts";
import { getMissingDirectRequirementIds } from "./relationships.ts";
import type { EvidenceCandidateBatch, EvidenceCandidate, EvidenceCandidateTechnology } from "../types.ts";
import type { EvidenceCandidateRefinementPolicy } from "../refinement.ts";
import { toConfidenceScore } from "./policy.ts";
import { cloneTarget } from "./copy.ts";
import type { ObservationTarget } from "../../observations/index.ts";
import type { EvidenceEntry } from "../../evidence/index.ts";

const UNKNOWN_CATEGORIES: readonly CategoryId[] = ['unknown'];

/** Add supported implications from the current accepted set while honoring exclusions, direct requirements and unknown-target diagnostics. */
export function expandImpliedCandidates(input: ResolveRelationshipsInput): boolean {
	let changed = false;

	for (const sourceId of Array.from(input.accepted.keys())) {
		const sourceNode = input.accepted.get(sourceId);
		if (!sourceNode) {
			continue;
		}

		for (const impliedId of input.relationships.impliesBySource.get(sourceId) ?? []) {
			if (input.suppressedImpliedCandidateIds.has(impliedId)) {
				continue;
			}

			if (input.accepted.has(impliedId)) {
				continue;
			}

			const impliedDefinition = input.definitionsById.get(impliedId);
			const relationship = createRelationshipContext('implies', sourceId, impliedId);
			if (!impliedDefinition) {
				recordRejection(input.recorder, {
					candidate: createUnknownRelationshipCandidate(input.batch, sourceNode.candidate, impliedId, input.policy),
					reason: 'unknown-implied-technology',
					relationship,
				});
				continue;
			}

			const missingRequirementIds = getMissingDirectRequirementIds(
				impliedId,
				input.accepted,
				input.relationships,
			);
			const candidate = createImpliedCandidate({
				batch: input.batch,
				definition: impliedDefinition,
				sourceCandidate: sourceNode.candidate,
				policy: input.policy,
			});

			if (missingRequirementIds.length > 0) {
				recordRejection(input.recorder, {
					candidate,
					reason: 'missing-requirement',
					relationship,
					missingRequirementIds,
				});
				continue;
			}

			const candidateNode: CandidateNode = {
				candidate,
				inferred: true,
				registryOrder: input.registryOrderById.get(impliedId) ?? Number.MAX_SAFE_INTEGER,
			};

			input.accepted.set(impliedId, candidateNode);
			input.relationshipEvidence.push(...candidate.evidence);
			changed = true;
		}
	}

	return changed;
}

/** Build a relationship-only candidate with policy confidence and provenance from its accepted source. */
function createImpliedCandidate(input: {
	batch: EvidenceCandidateBatch;
	definition: TechnologyProfileType;
	sourceCandidate: EvidenceCandidate;
	policy: EvidenceCandidateRefinementPolicy;
}): EvidenceCandidate {
	const observedAt = input.sourceCandidate.lastObservedAt || input.batch.observedAt;
	const confidence = toConfidenceScore(input.policy.impliedConfidence);
	const evidence = createRelationshipEvidenceEntry({
		target: input.batch.target,
		technologyId: input.definition.id,
		sourceCandidate: input.sourceCandidate,
		confidence: confidence.value,
		observedAt,
	});

	return {
		target: cloneTarget(input.batch.target),
		technology: createCandidateTechnology(input.definition.id, input.definition),
		source: 'relationship',
		confidence,
		versions: [],
		kinds: ['relationship'],
		directEvidenceCount: 0,
		relationshipEvidenceCount: 1,
		evidenceCount: 1,
		firstObservedAt: observedAt,
		lastObservedAt: observedAt,
		evidence: [evidence],
	};
}

/** Retain an explainable rejection payload for a missing registry target without accepting that technology. */
function createUnknownRelationshipCandidate(
	batch: EvidenceCandidateBatch,
	sourceCandidate: EvidenceCandidate,
	technologyId: string,
	policy: EvidenceCandidateRefinementPolicy,
): EvidenceCandidate {
	const confidence = toConfidenceScore(policy.impliedConfidence);
	const observedAt = sourceCandidate.lastObservedAt || batch.observedAt;
	const evidence = createRelationshipEvidenceEntry({
		target: batch.target,
		technologyId,
		sourceCandidate,
		confidence: confidence.value,
		observedAt,
	});

	return {
		target: cloneTarget(batch.target),
		technology: { id: technologyId, categories: UNKNOWN_CATEGORIES },
		source: 'relationship',
		confidence,
		versions: [],
		kinds: ['relationship'],
		directEvidenceCount: 0,
		relationshipEvidenceCount: 1,
		evidenceCount: 1,
		firstObservedAt: observedAt,
		lastObservedAt: observedAt,
		evidence: [evidence],
	};
}

/** Record the source technology and implication as non-direct evidence for later explanation. */
function createRelationshipEvidenceEntry(input: {
	target: ObservationTarget;
	technologyId: string;
	sourceCandidate: EvidenceCandidate;
	confidence: number;
	observedAt: number;
}): EvidenceEntry {
	const sourceName = input.sourceCandidate.technology.name ?? input.sourceCandidate.technology.id;
	const matchedValue = `Implied by ${sourceName}`;

	return {
		id: createRelationshipEvidenceId(input.target.url, input.sourceCandidate.technology.id, input.technologyId),
		target: cloneTarget(input.target),
		technologyId: input.technologyId,
		kind: 'relationship',
		source: 'relationship',
		confidence: input.confidence,
		matchedValue,
		observedAt: input.observedAt,
		direct: false,
		ruleDescription: matchedValue,
		sourceTechnologyId: input.sourceCandidate.technology.id,
	};
}

/** Encode URL and both technology IDs separately so separators inside identifiers cannot collapse provenance. */
function createRelationshipEvidenceId(targetUrl: string, sourceTechnologyId: string, targetTechnologyId: string): string {
	return [targetUrl, sourceTechnologyId, 'implies', targetTechnologyId]
		.map((part) => encodeURIComponent(part))
		.join(':');
}

/** Attach known target metadata and use the explicit unknown category when no definition exists. */
function createCandidateTechnology(
	technologyId: string,
	definition?: TechnologyProfileType,
): EvidenceCandidateTechnology {
	return {
		id: technologyId,
		name: definition?.name,
		website: definition?.website,
		description: definition?.description,
		icon: definition?.icon,
		categories: definition?.categories ?? UNKNOWN_CATEGORIES,
	};
}
