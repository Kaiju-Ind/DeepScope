import type { EvidenceCandidate, EvidenceCandidateBatch } from "../types.ts";
import type { EvidenceCandidateRejection, EvidenceCandidateRefinementPolicy } from "../refinement.ts";
import type { TechnologyProfileType } from "@deepscope/registry/types";
import type { EvidenceEntry } from "../../evidence/index.ts";

export interface CandidateNode {
	candidate: EvidenceCandidate;
	inferred: boolean;
	registryOrder: number;
}

export interface RelationshipIndex {
	impliesBySource: Map<string, readonly string[]>;
	requiresBySource: Map<string, readonly string[]>;
	excludesBySource: Map<string, readonly string[]>;
	impliedSourcesByTarget: Map<string, readonly string[]>;
}

export interface RejectionRecorder {
	rejections: EvidenceCandidateRejection[];
	seen: Set<string>;
}

export interface ResolveRelationshipsInput {
	accepted: Map<string, CandidateNode>;
	batch: EvidenceCandidateBatch;
	definitionsById: ReadonlyMap<string, TechnologyProfileType>;
	registryOrderById: ReadonlyMap<string, number>;
	relationships: RelationshipIndex;
	policy: EvidenceCandidateRefinementPolicy;
	recorder: RejectionRecorder;
	relationshipEvidence: EvidenceEntry[];
	suppressedImpliedCandidateIds: Set<string>;
}
