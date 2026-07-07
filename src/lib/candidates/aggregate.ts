import type {
	CategoryId,
	ConfidenceScore,
	DetectionKind,
	TechnologyDefinition,
} from '../detection/types';
import type { EvidenceBatch, EvidenceEntry } from '../evidence';
import type { ObservationAttributes, ObservationTarget } from '../observations';
import type {
	EvidenceCandidate,
	EvidenceCandidateAggregationPolicy,
	EvidenceCandidateBatch,
	EvidenceCandidateSource,
	EvidenceCandidateTechnology,
} from './types';

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
	readonly registry: readonly TechnologyDefinition[];
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
	definition?: TechnologyDefinition;
	policy: EvidenceCandidateAggregationPolicy;
}

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

function createCandidateTechnology(
	technologyId: string,
	definition?: TechnologyDefinition,
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

function getEvidenceEntries(evidence: EvidenceBatch | readonly EvidenceEntry[]): EvidenceEntry[] {
	return isEvidenceBatch(evidence)
		? evidence.entries.map(cloneEvidenceEntry)
		: evidence.map(cloneEvidenceEntry);
}

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

function getObservedAt(evidence: EvidenceBatch | readonly EvidenceEntry[], entries: readonly EvidenceEntry[]): number {
	if (isEvidenceBatch(evidence)) {
		return evidence.observedAt;
	}

	return entries.reduce((latest, entry) => Math.max(latest, entry.observedAt), 0);
}

function isEvidenceBatch(evidence: EvidenceBatch | readonly EvidenceEntry[]): evidence is EvidenceBatch {
	return !Array.isArray(evidence);
}

function buildDefinitionsById(registry: readonly TechnologyDefinition[]): Map<string, TechnologyDefinition> {
	return new Map(registry.map((definition) => [definition.id, definition]));
}

function buildRegistryOrder(registry: readonly TechnologyDefinition[]): Map<string, number> {
	return new Map(registry.map((definition, index) => [definition.id, index]));
}

function createCandidatePolicy(
	policy: Partial<EvidenceCandidateAggregationPolicy> = {},
): EvidenceCandidateAggregationPolicy {
	return {
		...DEFAULT_EVIDENCE_CANDIDATE_POLICY,
		...policy,
	};
}

function groupEntriesByTechnology(entries: readonly EvidenceEntry[]): Map<string, EvidenceEntry[]> {
	const grouped = new Map<string, EvidenceEntry[]>();
	for (const entry of entries) {
		const group = grouped.get(entry.technologyId) ?? [];
		group.push(entry);
		grouped.set(entry.technologyId, group);
	}

	return grouped;
}

function getCandidateSource(
	directEvidenceCount: number,
	relationshipEvidenceCount: number,
): EvidenceCandidateSource {
	if (directEvidenceCount > 0 && relationshipEvidenceCount > 0) {
		return 'mixed';
	}

	return relationshipEvidenceCount > 0 ? 'relationship' : 'direct';
}

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

function compareEvidenceByStrength(left: EvidenceEntry, right: EvidenceEntry): number {
	return right.confidence - left.confidence || compareEvidenceEntries(left, right);
}

function compareEvidenceEntries(left: EvidenceEntry, right: EvidenceEntry): number {
	return compareOptionalRuleIndex(left, right) || left.observedAt - right.observedAt || left.id.localeCompare(right.id);
}

function compareOptionalRuleIndex(left: EvidenceEntry, right: EvidenceEntry): number {
	const leftRuleIndex = getRuleIndex(left);
	const rightRuleIndex = getRuleIndex(right);
	if (leftRuleIndex === undefined || rightRuleIndex === undefined) {
		return 0;
	}

	return leftRuleIndex - rightRuleIndex;
}

function getRuleIndex(entry: EvidenceEntry): number | undefined {
	const ruleIndex = entry.attributes?.ruleIndex;
	return typeof ruleIndex === 'number' ? ruleIndex : undefined;
}

function sortEvidenceEntries(entries: readonly EvidenceEntry[]): EvidenceEntry[] {
	return [...entries].sort(compareEvidenceEntries);
}

function compareCandidates(
	left: EvidenceCandidate,
	right: EvidenceCandidate,
	registryOrder: Map<string, number>,
): number {
	const leftOrder = registryOrder.get(left.technology.id) ?? Number.MAX_SAFE_INTEGER;
	const rightOrder = registryOrder.get(right.technology.id) ?? Number.MAX_SAFE_INTEGER;

	return leftOrder - rightOrder || left.technology.id.localeCompare(right.technology.id);
}

function uniqueKinds(entries: readonly EvidenceEntry[]): DetectionKind[] {
	const kinds: DetectionKind[] = [];
	for (const entry of entries) {
		if (!kinds.includes(entry.kind)) {
			kinds.push(entry.kind);
		}
	}

	return kinds;
}

function uniqueDefined(values: readonly (string | undefined)[]): string[] {
	const seen: string[] = [];
	for (const value of values) {
		if (value !== undefined && !seen.includes(value)) {
			seen.push(value);
		}
	}

	return seen;
}

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

function clampConfidence(value: number): number {
	return Math.max(0, Math.min(100, Math.round(value)));
}

function cloneTarget(target: ObservationTarget): ObservationTarget {
	return { ...target };
}

function cloneEvidenceEntry(entry: EvidenceEntry): EvidenceEntry {
	return {
		...entry,
		target: cloneTarget(entry.target),
		observation: entry.observation ? { ...entry.observation } : undefined,
		attributes: cloneAttributes(entry.attributes),
	};
}

function cloneAttributes(attributes: EvidenceEntry['attributes']): ObservationAttributes | undefined {
	return attributes ? { ...attributes } : undefined;
}
