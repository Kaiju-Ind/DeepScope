import type { CategoryId, TechnologyProfileType } from "@deepscope/registry/types";
import type { ConfidenceScore } from "../types.ts";
import type { DetectionKind } from "@deepscope/registry/rules";
import type { EvidenceBatch, EvidenceEntry } from "../evidence/index.ts";
import type { ObservationAttributes, ObservationTarget } from "../observations/index.ts";
import type { EvidenceCandidate, EvidenceCandidateAggregationPolicy, EvidenceCandidateBatch, EvidenceCandidateSource, EvidenceCandidateTechnology } from "./types.ts";

/**
 * Default candidate confidence policy for evidence-derived candidates.
 *
 * The weights mirror the current detector: the strongest evidence receives full
 * value, repeated surfaces contribute less, and new surfaces contribute more.
 * The zero floor keeps this stage as candidate creation rather than final
 * display filtering.
 */
export const DEFAULT_EVIDENCE_CANDIDATE_POLICY: EvidenceCandidateAggregationPolicy = Object.freeze({
	sameSurfaceWeight: 0.35,
	distinctSurfaceWeight: 0.65,
	minimumConfidence: 0,
});

const UNKNOWN_CATEGORIES: readonly CategoryId[] = ['unknown'];

/** Input for aggregating evidence entries into candidate detections. */
export interface CreateEvidenceCandidateBatchInput {
	/** Registry used to attach names, websites, descriptions, icons, and categories. */
	readonly registry: readonly TechnologyProfileType[];
	/** Evidence entries or a full evidence batch to aggregate. */
	readonly evidence: EvidenceBatch | readonly EvidenceEntry[];
	/** Optional target override when aggregating a raw entry list. */
	readonly target?: ObservationTarget;
	/** Optional timestamp override for deterministic fixtures and replay segments. */
	readonly observedAt?: number;
	/** Optional scoring policy override for compatibility experiments. */
	readonly policy?: Partial<EvidenceCandidateAggregationPolicy>;
}

/**
 * Aggregate evidence entries into candidate detections without graph inference.
 *
 * Raw evidence becomes candidate technologies before graph refinement. The
 * matcher can find several pieces of evidence for the same technology, such as
 * React from a script URL and a page global. Those matches are grouped into one
 * candidate with confidence, version clues, category metadata, and registry
 * order preserved for deterministic emission.
 */
export function createEvidenceCandidateBatch(
	input: CreateEvidenceCandidateBatchInput,
): EvidenceCandidateBatch {
	const entries = getEvidenceEntries(input.evidence);
	const target = input.target ?? getEvidenceTarget(input.evidence, entries);
	const observedAt = input.observedAt ?? getObservedAt(input.evidence, entries);
	const registryOrder = buildRegistryOrder(input.registry);
	const definitionsById = buildDefinitionsById(input.registry);
	const policy = createCandidatePolicy(input.policy);
	const grouped = groupEntriesByTechnology(entries);
	const candidates = Array.from(grouped.entries())
		.map(([technologyId, candidateEntries]) => createEvidenceCandidate({
			technologyId,
			entries: candidateEntries,
			target,
			definition: definitionsById.get(technologyId),
			policy,
		}))
		.filter((candidate) => candidate.confidence.value >= policy.minimumConfidence)
		.sort((left, right) => compareCandidates(left, right, registryOrder));

	return {
		target,
		observedAt,
		candidates,
	};
}

interface CreateEvidenceCandidateInput {
	technologyId: string;
	entries: readonly EvidenceEntry[];
	target: ObservationTarget;
	definition?: TechnologyProfileType;
	policy: EvidenceCandidateAggregationPolicy;
}

/** Combine one technology's ordered evidence into an owned candidate, retaining direct/inferred counts and all version clues. */
function createEvidenceCandidate(input: CreateEvidenceCandidateInput): EvidenceCandidate {
	const sortedEntries = sortEvidenceEntries(input.entries);
	const directEvidenceCount = sortedEntries.filter((entry) => entry.direct).length;
	const relationshipEvidenceCount = sortedEntries.length - directEvidenceCount;
	const versions = uniqueDefined(sortedEntries.map((entry) => entry.version));
	const [version] = versions;

	return {
		target: cloneTarget(input.target),
		technology: createCandidateTechnology(input.technologyId, input.definition),
		source: getCandidateSource(directEvidenceCount, relationshipEvidenceCount),
		confidence: toConfidenceScore(combineEvidenceConfidence(sortedEntries, input.policy)),
		version,
		versions,
		kinds: uniqueKinds(sortedEntries),
		directEvidenceCount,
		relationshipEvidenceCount,
		evidenceCount: sortedEntries.length,
		firstObservedAt: sortedEntries[0]?.observedAt ?? 0,
		lastObservedAt: sortedEntries.at(-1)?.observedAt ?? 0,
		evidence: sortedEntries.map(cloneEvidenceEntry),
	};
}

/** Attach available registry metadata; unknown technology IDs retain an explicit unknown category. */
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

/** Copy either input representation so aggregation never mutates evidence retained by its caller. */
function getEvidenceEntries(evidence: EvidenceBatch | readonly EvidenceEntry[]): EvidenceEntry[] {
	return isEvidenceBatch(evidence)
		? evidence.entries.map(cloneEvidenceEntry)
		: evidence.map(cloneEvidenceEntry);
}

/** Prefer the batch target, otherwise use the first entry; an empty raw list has an empty target. */
function getEvidenceTarget(
	evidence: EvidenceBatch | readonly EvidenceEntry[],
	entries: readonly EvidenceEntry[],
): ObservationTarget {
	if (isEvidenceBatch(evidence)) {
		return cloneTarget(evidence.target);
	}

	const [first] = entries;
	return first ? cloneTarget(first.target) : { url: '', hostname: '' };
}

/** Keep the batch timestamp or use the latest raw-entry timestamp, with zero for no observations. */
function getObservedAt(evidence: EvidenceBatch | readonly EvidenceEntry[], entries: readonly EvidenceEntry[]): number {
	if (isEvidenceBatch(evidence)) {
		return evidence.observedAt;
	}

	return entries.reduce((latest, entry) => Math.max(latest, entry.observedAt), 0);
}

/** Distinguish the two declared input shapes without interpreting evidence payloads. */
function isEvidenceBatch(evidence: EvidenceBatch | readonly EvidenceEntry[]): evidence is EvidenceBatch {
	return !Array.isArray(evidence);
}

/** Index borrowed registry definitions for candidate metadata; a later duplicate ID wins. */
function buildDefinitionsById(registry: readonly TechnologyProfileType[]): Map<string, TechnologyProfileType> {
	return new Map(registry.map((definition) => [definition.id, definition]));
}

/** Retain registry positions for stable output ordering; later duplicate IDs determine their position. */
function buildRegistryOrder(registry: readonly TechnologyProfileType[]): Map<string, number> {
	return new Map(registry.map((definition, index) => [definition.id, index]));
}

/** Apply explicit scoring overrides without mutating the shared default policy. */
function createCandidatePolicy(
	policy: Partial<EvidenceCandidateAggregationPolicy> = {},
): EvidenceCandidateAggregationPolicy {
	return {
		...DEFAULT_EVIDENCE_CANDIDATE_POLICY,
		...policy,
	};
}

/** Collect evidence per technology while retaining each input group's insertion order. */
function groupEntriesByTechnology(entries: readonly EvidenceEntry[]): Map<string, EvidenceEntry[]> {
	const grouped = new Map<string, EvidenceEntry[]>();
	for (const entry of entries) {
		const group = grouped.get(entry.technologyId) ?? [];
		group.push(entry);
		grouped.set(entry.technologyId, group);
	}

	return grouped;
}

/** Expose whether support is direct, relationship-derived or mixed without treating inference as direct evidence. */
function getCandidateSource(
	directEvidenceCount: number,
	relationshipEvidenceCount: number,
): EvidenceCandidateSource {
	if (directEvidenceCount > 0 && relationshipEvidenceCount > 0) {
		return 'mixed';
	}

	return relationshipEvidenceCount > 0 ? 'relationship' : 'direct';
}

/** Give the strongest match full weight, discount repeated surfaces and clamp the combined score to 100. */
function combineEvidenceConfidence(
	entries: readonly EvidenceEntry[],
	policy: EvidenceCandidateAggregationPolicy,
): number {
	const sortedByStrength = [...entries].sort(compareEvidenceByStrength);
	const [best, ...rest] = sortedByStrength;
	if (!best) {
		return 0;
	}

	const seenKinds = new Set<DetectionKind>([best.kind]);
	let score = Math.max(0, best.confidence);

	for (const entry of rest) {
		const weight = seenKinds.has(entry.kind)
			? policy.sameSurfaceWeight
			: policy.distinctSurfaceWeight;
		score += Math.max(0, entry.confidence) * weight;
		seenKinds.add(entry.kind);
	}

	return clampConfidence(score);
}

/** Rank stronger matches first and preserve deterministic evidence ordering for ties. */
function compareEvidenceByStrength(left: EvidenceEntry, right: EvidenceEntry): number {
	return right.confidence - left.confidence || compareEvidenceEntries(left, right);
}

/** Prefer comparable rule positions, then observation time and stable evidence ID. */
function compareEvidenceEntries(left: EvidenceEntry, right: EvidenceEntry): number {
	return compareOptionalRuleIndex(left, right) || left.observedAt - right.observedAt || left.id.localeCompare(right.id);
}

/** Use rule order only when both entries carry numeric positions; otherwise leave later tie breakers in charge. */
function compareOptionalRuleIndex(left: EvidenceEntry, right: EvidenceEntry): number {
	const leftRuleIndex = getRuleIndex(left);
	const rightRuleIndex = getRuleIndex(right);
	if (leftRuleIndex === undefined || rightRuleIndex === undefined) {
		return 0;
	}

	return leftRuleIndex - rightRuleIndex;
}

/** Read only numeric rule-position metadata; absent or foreign attribute values do not affect ordering. */
function getRuleIndex(entry: EvidenceEntry): number | undefined {
	const ruleIndex = entry.attributes?.ruleIndex;
	return typeof ruleIndex === 'number' ? ruleIndex : undefined;
}

/** Return an ordered copy so candidate assembly does not reorder the caller's evidence array. */
function sortEvidenceEntries(entries: readonly EvidenceEntry[]): EvidenceEntry[] {
	return [...entries].sort(compareEvidenceEntries);
}

/** Emit registry-known technologies first in registry order, with ID ordering for unknown entries and ties. */
function compareCandidates(
	left: EvidenceCandidate,
	right: EvidenceCandidate,
	registryOrder: Map<string, number>,
): number {
	const leftOrder = registryOrder.get(left.technology.id) ?? Number.MAX_SAFE_INTEGER;
	const rightOrder = registryOrder.get(right.technology.id) ?? Number.MAX_SAFE_INTEGER;

	return leftOrder - rightOrder || left.technology.id.localeCompare(right.technology.id);
}

/** Retain each evidence surface once in first-seen order for the candidate summary. */
function uniqueKinds(entries: readonly EvidenceEntry[]): DetectionKind[] {
	const kinds: DetectionKind[] = [];
	for (const entry of entries) {
		if (!kinds.includes(entry.kind)) {
			kinds.push(entry.kind);
		}
	}

	return kinds;
}

/** Retain distinct present version strings in first-seen order, including an explicitly empty string. */
function uniqueDefined(values: readonly (string | undefined)[]): string[] {
	const seen: string[] = [];
	for (const value of values) {
		if (value !== undefined && !seen.includes(value)) {
			seen.push(value);
		}
	}

	return seen;
}

/** Round and clamp the score before assigning the 50, 80 and 100 confidence bands. */
function toConfidenceScore(value: number): ConfidenceScore {
	const clamped = clampConfidence(value);
	if (clamped >= 100) {
		return { value: clamped, level: 'certain' };
	}
	if (clamped >= 80) {
		return { value: clamped, level: 'high' };
	}
	if (clamped >= 50) {
		return { value: clamped, level: 'medium' };
	}
	return { value: clamped, level: 'low' };
}

/** Keep displayed confidence as an integer from zero through 100. */
function clampConfidence(value: number): number {
	return Math.max(0, Math.min(100, Math.round(value)));
}

/** Detach the target record so a candidate does not share mutable identity fields with its input. */
function cloneTarget(target: ObservationTarget): ObservationTarget {
	return { ...target };
}

/** Copy the mutable nested records retained by a candidate; primitive evidence fields remain unchanged. */
function cloneEvidenceEntry(entry: EvidenceEntry): EvidenceEntry {
	return {
		...entry,
		target: cloneTarget(entry.target),
		observation: entry.observation ? { ...entry.observation } : undefined,
		attributes: cloneAttributes(entry.attributes),
	};
}

/** Detach optional attribute records while preserving the difference between absent and empty metadata. */
function cloneAttributes(attributes: EvidenceEntry['attributes']): ObservationAttributes | undefined {
	return attributes ? { ...attributes } : undefined;
}
