import type { CategoryId, ConfidenceScore, TechnologyDefinition } from '../detection/types';
import type { EvidenceEntry } from '../evidence';
import type { ObservationAttributes, ObservationTarget } from '../observations';
import type { EvidenceCandidate, EvidenceCandidateBatch, EvidenceCandidateTechnology } from './types';
import type {
	EvidenceCandidateRefinementPolicy,
	EvidenceCandidateRelationshipContext,
	EvidenceCandidateRejection,
	EvidenceCandidateRejectionReason,
	RefineEvidenceCandidateBatchInput,
	RefinedEvidenceCandidateBatch,
} from './refinement-types';

/** Default policy for evidence candidate relationship refinement. */
export const DEFAULT_EVIDENCE_CANDIDATE_REFINEMENT_POLICY: EvidenceCandidateRefinementPolicy = Object.freeze({
	impliedConfidence: 55,
});

const UNKNOWN_CATEGORIES: readonly CategoryId[] = ['unknown'];
const MAX_EXACT_CONFLICT_COMPONENT_SIZE = 14;

interface CandidateNode {
	candidate: EvidenceCandidate;
	inferred: boolean;
	registryOrder: number;
}

interface RelationshipIndex {
	impliesBySource: Map<string, readonly string[]>;
	requiresBySource: Map<string, readonly string[]>;
	excludesBySource: Map<string, readonly string[]>;
	impliedSourcesByTarget: Map<string, readonly string[]>;
}

interface RejectionRecorder {
	rejections: EvidenceCandidateRejection[];
	seen: Set<string>;
}

/**
 * Apply compiled registry relationships to an evidence candidate batch.
 *
 * Relationship rules run after direct evidence has created candidates.
 * Implications create relationship-supported candidates, requirements must be
 * satisfied by independent evidence, and exclusions deterministically remove the
 * weaker side of a conflict until the accepted candidate set stabilizes.
 */
export function refineEvidenceCandidateBatch(
	input: RefineEvidenceCandidateBatchInput,
): RefinedEvidenceCandidateBatch {
	const policy = createRefinementPolicy(input.policy);
	const relationships = buildRelationshipIndex(input.compiledRegistry.relationshipEdges, input.compiledRegistry.registryOrderById);
	const accepted = createInitialCandidateNodes(input.batch, input.compiledRegistry.registryOrderById);
	const recorder: RejectionRecorder = { rejections: [], seen: new Set() };
	const relationshipEvidence: EvidenceEntry[] = [];

	resolveCandidateRelationshipsToFixedPoint({
		accepted,
		batch: input.batch,
		definitionsById: input.compiledRegistry.definitionsById,
		registryOrderById: input.compiledRegistry.registryOrderById,
		relationships,
		policy,
		recorder,
		relationshipEvidence,
		suppressedImpliedCandidateIds: new Set(),
	});

	return {
		target: cloneTarget(input.batch.target),
		observedAt: input.batch.observedAt,
		candidates: sortAcceptedCandidates(accepted, input.compiledRegistry.registryOrderById),
		rejections: recorder.rejections,
		relationshipEvidence,
	};
}

interface ResolveRelationshipsInput {
	accepted: Map<string, CandidateNode>;
	batch: EvidenceCandidateBatch;
	definitionsById: Map<string, TechnologyDefinition>;
	registryOrderById: Map<string, number>;
	relationships: RelationshipIndex;
	policy: EvidenceCandidateRefinementPolicy;
	recorder: RejectionRecorder;
	relationshipEvidence: EvidenceEntry[];
	suppressedImpliedCandidateIds: Set<string>;
}

function resolveCandidateRelationshipsToFixedPoint(input: ResolveRelationshipsInput): void {
	let changed = true;

	while (changed) {
		changed = false;
		changed = expandImpliedCandidates(input) || changed;
		changed = pruneUnsatisfiedRequirements(input) || changed;
		changed = pruneOrphanedRelationshipCandidates(input) || changed;
		changed = applyExclusions(input) || changed;
	}
}

function expandImpliedCandidates(input: ResolveRelationshipsInput): boolean {
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

function pruneUnsatisfiedRequirements(input: ResolveRelationshipsInput): boolean {
	let changed = false;

	for (const [technologyId, node] of Array.from(input.accepted.entries())) {
		const missingRequirementIds = getMissingDirectRequirementIds(
			technologyId,
			input.accepted,
			input.relationships,
		);
		if (missingRequirementIds.length === 0) {
			continue;
		}

		input.accepted.delete(technologyId);
		recordRejection(input.recorder, {
			candidate: node.candidate,
			reason: 'missing-requirement',
			relationship: createRelationshipContext('requires', technologyId, missingRequirementIds[0] ?? ''),
			missingRequirementIds,
		});
		changed = true;
	}

	return changed;
}

function pruneOrphanedRelationshipCandidates(input: ResolveRelationshipsInput): boolean {
	let changed = false;

	for (const [technologyId, node] of Array.from(input.accepted.entries())) {
		if (!node.inferred) {
			continue;
		}

		const hasAcceptedSource = (input.relationships.impliedSourcesByTarget.get(technologyId) ?? [])
			.some((sourceId) => input.accepted.has(sourceId));
		if (hasAcceptedSource) {
			continue;
		}

		input.accepted.delete(technologyId);
		recordRejection(input.recorder, {
			candidate: node.candidate,
			reason: 'orphaned-relationship',
		});
		changed = true;
	}

	return changed;
}

function applyExclusions(input: ResolveRelationshipsInput): boolean {
	let changed = false;
	const components = getExclusionConflictComponents(input);

	for (const component of components) {
		const selectedIds = component.length <= MAX_EXACT_CONFLICT_COMPONENT_SIZE
			? solveExactConflictComponent(component, input)
			: solveGreedyConflictComponent(component, input);

		for (const technologyId of component) {
			if (selectedIds.has(technologyId)) {
				continue;
			}

			const node = input.accepted.get(technologyId);
			if (!node) {
				continue;
			}

			input.accepted.delete(technologyId);
			if (node.inferred) {
				input.suppressedImpliedCandidateIds.add(technologyId);
			}

			recordRejection(input.recorder, {
				candidate: node.candidate,
				reason: 'excluded',
				relationship: createExclusionRejectionRelationship(technologyId, selectedIds, input.relationships),
				rejectedByTechnologyId: getExclusionRejectionWinner(technologyId, selectedIds, input),
			});
			changed = true;
		}
	}

	return changed;
}

/**
 * Exclusion conflicts are solved per connected component.
 *
 * Pairwise removal is deterministic but can keep a weaker overall explanation
 * when one candidate conflicts with a small cluster. Solving the component asks
 * a better question: which surviving subset keeps the most supported evidence
 * while obeying hard rules such as excludes, requirements, and live implication
 * sources?
 */
function getExclusionConflictComponents(input: ResolveRelationshipsInput): string[][] {
	const adjacency = new Map<string, Set<string>>();

	for (const [sourceId, excludedIds] of input.relationships.excludesBySource.entries()) {
		if (!input.accepted.has(sourceId)) {
			continue;
		}

		for (const excludedId of excludedIds) {
			if (!input.accepted.has(excludedId)) {
				continue;
			}

			pushConflictNeighbor(adjacency, sourceId, excludedId);
			pushConflictNeighbor(adjacency, excludedId, sourceId);
		}
	}

	const components: string[][] = [];
	const visited = new Set<string>();

	for (const technologyId of adjacency.keys()) {
		if (visited.has(technologyId)) {
			continue;
		}

		const component: string[] = [];
		const pending = [technologyId];
		visited.add(technologyId);

		while (pending.length > 0) {
			const currentId = pending.pop()!;
			component.push(currentId);

			for (const nextId of adjacency.get(currentId) ?? []) {
				if (visited.has(nextId)) {
					continue;
				}

				visited.add(nextId);
				pending.push(nextId);
			}
		}

		components.push(component.sort((left, right) => compareRegistryOrder(input.registryOrderById, left, right)));
	}

	return components;
}

function pushConflictNeighbor(adjacency: Map<string, Set<string>>, sourceId: string, targetId: string): void {
	const neighbors = adjacency.get(sourceId) ?? new Set<string>();
	neighbors.add(targetId);
	adjacency.set(sourceId, neighbors);
}

function solveExactConflictComponent(
	component: readonly string[],
	input: ResolveRelationshipsInput,
): Set<string> {
	let bestIds = new Set<string>();
	let bestScore: ConflictSubsetScore | null = null;
	const variantCount = 2 ** component.length;

	for (let mask = 1; mask < variantCount; mask += 1) {
		const selectedIds = new Set<string>();
		for (let index = 0; index < component.length; index += 1) {
			if ((mask & (1 << index)) !== 0) {
				selectedIds.add(component[index]!);
			}
		}

		if (!isValidConflictSubset(selectedIds, input)) {
			continue;
		}

		const score = scoreConflictSubset(selectedIds, input);
		if (!bestScore || compareConflictSubsetScore(score, bestScore) > 0) {
			bestIds = selectedIds;
			bestScore = score;
		}
	}

	return bestIds.size > 0 ? bestIds : new Set([component[0]!]);
}

function solveGreedyConflictComponent(
	component: readonly string[],
	input: ResolveRelationshipsInput,
): Set<string> {
	const selectedIds = new Set(component);
	let changed = true;

	while (changed) {
		changed = false;
		for (const sourceId of component) {
			if (!selectedIds.has(sourceId)) {
				continue;
			}

			for (const excludedId of input.relationships.excludesBySource.get(sourceId) ?? []) {
				if (!selectedIds.has(excludedId)) {
					continue;
				}

				const sourceNode = input.accepted.get(sourceId);
				const excludedNode = input.accepted.get(excludedId);
				if (!sourceNode || !excludedNode) {
					continue;
				}

				selectedIds.delete(chooseConflictLoser(sourceId, sourceNode, excludedId, excludedNode));
				changed = true;
			}
		}
	}

	for (const technologyId of [...selectedIds]) {
		if (!candidateHasValidDependencies(technologyId, selectedIds, input)) {
			selectedIds.delete(technologyId);
		}
	}

	return selectedIds.size > 0 ? selectedIds : new Set([component[0]!]);
}

interface ConflictSubsetScore {
	/** Direct candidates are weighted heavily so inferred support cannot replace observed evidence without stronger surrounding support. */
	directCount: number;
	/** Sum of detector confidence across the selected set. */
	confidence: number;
	/** Number of selected candidates, used after evidence strength to keep compatible technologies together. */
	candidateCount: number;
	/** Stable registry-order fingerprint for deterministic tie breaks. */
	orderFingerprint: string;
}

function scoreConflictSubset(
	selectedIds: ReadonlySet<string>,
	input: ResolveRelationshipsInput,
): ConflictSubsetScore {
	let directCount = 0;
	let confidence = 0;
	const orderedIds = [...selectedIds].sort((left, right) => compareRegistryOrder(input.registryOrderById, left, right));

	for (const technologyId of orderedIds) {
		const node = input.accepted.get(technologyId);
		if (!node) {
			continue;
		}

		if (!node.inferred) {
			directCount += 1;
		}
		confidence += node.candidate.confidence.value;
	}

	return {
		directCount,
		confidence,
		candidateCount: selectedIds.size,
		orderFingerprint: orderedIds.map((id) => String(input.registryOrderById.get(id) ?? Number.MAX_SAFE_INTEGER).padStart(8, '0')).join(':'),
	};
}

function compareConflictSubsetScore(left: ConflictSubsetScore, right: ConflictSubsetScore): number {
	return (
		left.directCount - right.directCount ||
		left.confidence - right.confidence ||
		left.candidateCount - right.candidateCount ||
		right.orderFingerprint.localeCompare(left.orderFingerprint)
	);
}

function isValidConflictSubset(
	selectedIds: ReadonlySet<string>,
	input: ResolveRelationshipsInput,
): boolean {
	for (const technologyId of selectedIds) {
		for (const excludedId of input.relationships.excludesBySource.get(technologyId) ?? []) {
			if (selectedIds.has(excludedId)) {
				return false;
			}
		}

		if (!candidateHasValidDependencies(technologyId, selectedIds, input)) {
			return false;
		}
	}

	return true;
}

function candidateHasValidDependencies(
	technologyId: string,
	selectedIds: ReadonlySet<string>,
	input: ResolveRelationshipsInput,
): boolean {
	const node = input.accepted.get(technologyId);
	if (!node) {
		return false;
	}

	for (const requiredId of input.relationships.requiresBySource.get(technologyId) ?? []) {
		const requiredNode = input.accepted.get(requiredId);
		if (!selectedIds.has(requiredId) || !requiredNode || requiredNode.inferred || requiredNode.candidate.directEvidenceCount === 0) {
			return false;
		}
	}

	if (!node.inferred) {
		return true;
	}

	return (input.relationships.impliedSourcesByTarget.get(technologyId) ?? [])
		.some((sourceId) => selectedIds.has(sourceId));
}

function createExclusionRejectionRelationship(
	technologyId: string,
	selectedIds: ReadonlySet<string>,
	relationships: RelationshipIndex,
): EvidenceCandidateRelationshipContext | undefined {
	for (const selectedId of selectedIds) {
		if (hasExclusionEdge(relationships, selectedId, technologyId)) {
			return createRelationshipContext('excludes', selectedId, technologyId);
		}
		if (hasExclusionEdge(relationships, technologyId, selectedId)) {
			return createRelationshipContext('excludes', technologyId, selectedId);
		}
	}

	return undefined;
}

function getExclusionRejectionWinner(
	technologyId: string,
	selectedIds: ReadonlySet<string>,
	input: ResolveRelationshipsInput,
): string | undefined {
	let winnerId: string | undefined;
	let winnerNode: CandidateNode | undefined;

	for (const selectedId of selectedIds) {
		if (!hasExclusionEdge(input.relationships, selectedId, technologyId) && !hasExclusionEdge(input.relationships, technologyId, selectedId)) {
			continue;
		}

		const selectedNode = input.accepted.get(selectedId);
		if (!selectedNode) {
			continue;
		}

		if (!winnerNode || chooseConflictLoser(winnerId!, winnerNode, selectedId, selectedNode) === winnerId) {
			winnerId = selectedId;
			winnerNode = selectedNode;
		}
	}

	return winnerId;
}

function createInitialCandidateNodes(
	batch: EvidenceCandidateBatch,
	registryOrderById: Map<string, number>,
): Map<string, CandidateNode> {
	const accepted = new Map<string, CandidateNode>();
	for (const candidate of batch.candidates) {
		accepted.set(candidate.technology.id, {
			candidate: cloneCandidate(candidate),
			inferred: isRelationshipOnlyCandidate(candidate),
			registryOrder: registryOrderById.get(candidate.technology.id) ?? Number.MAX_SAFE_INTEGER,
		});
	}

	return accepted;
}

function buildRelationshipIndex(
	edges: RefineEvidenceCandidateBatchInput['compiledRegistry']['relationshipEdges'],
	registryOrderById: Map<string, number>,
): RelationshipIndex {
	const impliesBySource = new Map<string, string[]>();
	const requiresBySource = new Map<string, string[]>();
	const excludesBySource = new Map<string, string[]>();
	const impliedSourcesByTarget = new Map<string, string[]>();

	for (const edge of edges) {
		switch (edge.kind) {
			case 'implies':
				pushRelationship(impliesBySource, edge.sourceId, edge.targetId);
				pushRelationship(impliedSourcesByTarget, edge.targetId, edge.sourceId);
				break;
			case 'requires':
				pushRelationship(requiresBySource, edge.sourceId, edge.targetId);
				break;
			case 'excludes':
				pushRelationship(excludesBySource, edge.sourceId, edge.targetId);
				break;
		}
	}

	sortRelationshipIndex(impliesBySource, registryOrderById);
	sortRelationshipIndex(requiresBySource, registryOrderById);
	sortRelationshipIndex(excludesBySource, registryOrderById);
	sortRelationshipIndex(impliedSourcesByTarget, registryOrderById);

	return {
		impliesBySource,
		requiresBySource,
		excludesBySource,
		impliedSourcesByTarget,
	};
}

function pushRelationship(map: Map<string, string[]>, key: string, value: string): void {
	const values = map.get(key) ?? [];
	if (!values.includes(value)) {
		values.push(value);
	}
	map.set(key, values);
}

function sortRelationshipIndex(map: Map<string, string[]>, registryOrderById: Map<string, number>): void {
	for (const [key, values] of map.entries()) {
		map.set(key, values.sort((left, right) => compareRegistryOrder(registryOrderById, left, right)));
	}
}

function getMissingDirectRequirementIds(
	technologyId: string,
	accepted: Map<string, CandidateNode>,
	relationships: RelationshipIndex,
): string[] {
	return (relationships.requiresBySource.get(technologyId) ?? [])
		.filter((requiredId) => !hasDirectRequirementEvidence(requiredId, accepted));
}

/**
 * Requirements are guards, not evidence producers.
 *
 * A relationship-only candidate cannot satisfy another candidate's requirement;
 * otherwise an implication chain could bootstrap itself into acceptance without
 * an independently observed supporting technology.
 */
function hasDirectRequirementEvidence(requiredId: string, accepted: Map<string, CandidateNode>): boolean {
	const node = accepted.get(requiredId);
	return Boolean(node && !node.inferred && node.candidate.directEvidenceCount > 0);
}

function hasExclusionEdge(relationships: RelationshipIndex, sourceId: string, targetId: string): boolean {
	return Boolean(relationships.excludesBySource.get(sourceId)?.includes(targetId));
}

function chooseConflictLoser(
	sourceId: string,
	sourceNode: CandidateNode,
	excludedId: string,
	excludedNode: CandidateNode,
): string {
	if (sourceNode.inferred !== excludedNode.inferred) {
		return sourceNode.inferred ? sourceId : excludedId;
	}

	const confidenceDifference = sourceNode.candidate.confidence.value - excludedNode.candidate.confidence.value;
	if (confidenceDifference !== 0) {
		return confidenceDifference > 0 ? excludedId : sourceId;
	}

	return sourceNode.registryOrder <= excludedNode.registryOrder ? excludedId : sourceId;
}

function createImpliedCandidate(input: {
	batch: EvidenceCandidateBatch;
	definition: TechnologyDefinition;
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

function createRelationshipEvidenceId(targetUrl: string, sourceTechnologyId: string, targetTechnologyId: string): string {
	return [targetUrl, sourceTechnologyId, 'implies', targetTechnologyId]
		.map((part) => encodeURIComponent(part))
		.join(':');
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

function createRefinementPolicy(
	policy: Partial<EvidenceCandidateRefinementPolicy> = {},
): EvidenceCandidateRefinementPolicy {
	return Object.assign({}, DEFAULT_EVIDENCE_CANDIDATE_REFINEMENT_POLICY, policy);
}

function sortAcceptedCandidates(
	accepted: Map<string, CandidateNode>,
	registryOrderById: Map<string, number>,
): EvidenceCandidate[] {
	return Array.from(accepted.values())
		.sort((left, right) => compareCandidateNodes(left, right, registryOrderById))
		.map((node) => cloneCandidate(node.candidate));
}

function compareCandidateNodes(
	left: CandidateNode,
	right: CandidateNode,
	registryOrderById: Map<string, number>,
): number {
	return (
		compareRegistryOrder(registryOrderById, left.candidate.technology.id, right.candidate.technology.id) ||
		left.candidate.technology.id.localeCompare(right.candidate.technology.id)
	);
}

function compareRegistryOrder(registryOrderById: Map<string, number>, left: string, right: string): number {
	return (
		(registryOrderById.get(left) ?? Number.MAX_SAFE_INTEGER) -
		(registryOrderById.get(right) ?? Number.MAX_SAFE_INTEGER)
	);
}

function isRelationshipOnlyCandidate(candidate: EvidenceCandidate): boolean {
	return candidate.directEvidenceCount === 0 && candidate.relationshipEvidenceCount > 0;
}

function createRelationshipContext(
	kind: EvidenceCandidateRelationshipContext['kind'],
	sourceTechnologyId: string,
	targetTechnologyId: string,
): EvidenceCandidateRelationshipContext {
	return { kind, sourceTechnologyId, targetTechnologyId };
}

function recordRejection(recorder: RejectionRecorder, rejection: EvidenceCandidateRejection): void {
	const key = createRejectionKey(rejection);
	if (recorder.seen.has(key)) {
		return;
	}

	recorder.seen.add(key);
	recorder.rejections.push({
		...rejection,
		candidate: cloneCandidate(rejection.candidate),
		missingRequirementIds: rejection.missingRequirementIds ? [...rejection.missingRequirementIds] : undefined,
		relationship: rejection.relationship ? { ...rejection.relationship } : undefined,
	});
}

function createRejectionKey(rejection: EvidenceCandidateRejection): string {
	return [
		rejection.reason,
		rejection.candidate.technology.id,
		rejection.relationship?.kind ?? '',
		rejection.relationship?.sourceTechnologyId ?? '',
		rejection.relationship?.targetTechnologyId ?? '',
		rejection.rejectedByTechnologyId ?? '',
		...(rejection.missingRequirementIds ?? []),
	].join(':');
}

function cloneCandidate(candidate: EvidenceCandidate): EvidenceCandidate {
	return {
		...candidate,
		target: cloneTarget(candidate.target),
		technology: {
			...candidate.technology,
			categories: [...candidate.technology.categories],
		},
		versions: [...candidate.versions],
		kinds: [...candidate.kinds],
		evidence: candidate.evidence.map(cloneEvidenceEntry),
	};
}

function cloneEvidenceEntry(entry: EvidenceEntry): EvidenceEntry {
	return {
		...entry,
		target: cloneTarget(entry.target),
		observation: entry.observation ? { ...entry.observation } : undefined,
		attributes: cloneAttributes(entry.attributes),
	};
}

function cloneTarget(target: ObservationTarget): ObservationTarget {
	return { ...target };
}

function cloneAttributes(attributes: EvidenceEntry['attributes']): ObservationAttributes | undefined {
	return attributes ? { ...attributes } : undefined;
}

function toConfidenceScore(value: number): ConfidenceScore {
	const clamped = Math.max(0, Math.min(100, Math.round(value)));
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
