import { bench, do_not_optimize, summary } from 'mitata';

import { createEvidenceCandidateBatch, refineEvidenceCandidateBatch } from '@/lib/candidates';
import { emitSiteAnalysisFromRefinedCandidates } from '@/lib/emission';
import { matchIndexedObservationBatch } from '@/lib/detection/observation-matcher-index';
import { createCompiledDetectionRegistry } from '@/lib/detection/registry-graph';
import type { DetectionRule, MatcherTechnologyType, TechnologyDefinition } from '@/lib/detection/types';
import { createMatcherPartitionTasks, createMatcherPipelineResult } from '@/lib/matcher';
import { createObservationKindTechnologyRegistry } from '@/lib/registry';
import { normalizePageSignals, type NormalizedObservationKind, type ObservationBatch } from '@/lib/observations';
import { createObservationMatcherIndex } from '@/lib/detection/observation-matcher-index';
import { makePageSignals } from '../tests/support/factories';

/** Number of generated technologies used to approximate the shipped registry scale. */
const LARGE_REGISTRY_SIZE = 1_000;

/** Keep the measured result observable to the JIT. */
function consumeResultCount(count: number): void {
	do_not_optimize(count);
}

/** Create a mixed registry with cheap key routes and expensive URL/content routes. */
function createBenchmarkRegistry(): TechnologyDefinition[] {
	return Array.from({ length: LARGE_REGISTRY_SIZE }, (_item, index) => {
		const rules: DetectionRule[] = [
			{ kind: 'meta', key: `generator-${index}`, valuePattern: /matched-generator/ },
			{ kind: 'dom', selector: `[data-tech-${index}]` },
			{ kind: 'scriptSrc', pattern: new RegExp(`tech-${index}\\.js`) },
			{ kind: 'resourceUrl', pattern: new RegExp(`resource-${index}\\.js`) },
			{ kind: 'scriptContent', pattern: new RegExp(`__TECH_${index}__`) },
		];

		return {
			id: `tech-${index}`,
			name: `Tech ${index}`,
			website: `https://tech-${index}.example`,
			categories: ['framework'],
			rules,
		};
	});
}

/** Create a heavy page snapshot that mixes fast metadata with many asset URLs. */
function createBenchmarkBatch(): ObservationBatch {
	return normalizePageSignals(makePageSignals({
		meta: { 'generator-10': ['matched-generator'] },
		dom: { selectors: { '[data-tech-20]': true } },
		scripts: Array.from({ length: 500 }, (_item, index) => `https://cdn.example/tech-${index}.js`),
		resources: Array.from({ length: 500 }, (_item, index) => ({
			url: `https://cdn.example/resource-${index}.js`,
			initiatorType: 'script',
		})),
		scriptContents: Array.from({ length: 25 }, (_item, index) => `window.__TECH_${index}__ = true;`),
	}));
}

const registry = createBenchmarkRegistry();
const matcherIndex = createObservationMatcherIndex(registry);
const shardArtifactByKind = new Map<NormalizedObservationKind, { readonly registry: readonly MatcherTechnologyType[]; readonly index: ReturnType<typeof createObservationMatcherIndex> }>();
const relationshipGraph = createCompiledDetectionRegistry(registry);
const batch = createBenchmarkBatch();
const job = {
	jobId: 'benchmark-job',
	tabId: 1,
	windowId: 1,
	expectedUrl: batch.target.url,
} as const;

/** Run the non-partitioned indexed matcher through the same final emission stage as partitioned cases. */
function runWholeIndexedMatcher(): number {
	const matches = matchIndexedObservationBatch({ registry, batch, index: matcherIndex });
	const candidates = createEvidenceCandidateBatch({ registry, evidence: matches.evidenceBatch });
	const refined = refineEvidenceCandidateBatch({ batch: candidates, compiledRegistry: relationshipGraph });
	return emitSiteAnalysisFromRefinedCandidates({
		batch: refined,
		analyzedAt: batch.observedAt,
		source: 'fresh',
	}).analysis.results.length;
}

function getShardArtifact(kind: NormalizedObservationKind) {
	const existing = shardArtifactByKind.get(kind);
	if (existing) {
		return existing;
	}

	const shardRegistry = createObservationKindTechnologyRegistry(registry, kind);
	const artifact = {
		registry: shardRegistry,
		index: createObservationMatcherIndex(shardRegistry),
	};
	shardArtifactByKind.set(kind, artifact);
	return artifact;
}

/** Run the partitioned merge path without worker overhead to isolate scheduler cost. */
function runPartitionedMatcherMerge(): number {
	const partitions = createMatcherPartitionTasks({ job, batch }).map((task) => {
		const indexed = matchIndexedObservationBatch({ registry, batch: task.batch, index: matcherIndex });
		const observationIndexes = new Map(task.batch.observations.map((observation, index) => [
			observation,
			task.observationIndexes[index] ?? index,
		]));

		return {
			job: task.job,
			partitionId: task.partitionId,
			kind: task.kind,
			priority: task.priority,
			observationCount: task.batch.observations.length,
			matches: indexed.matches.map((match, matchIndex) => ({
				observationIndex: observationIndexes.get(match.observation) ?? matchIndex,
				matchIndex,
				match,
			})),
			diagnostics: indexed.diagnostics,
			completedAt: batch.observedAt,
		};
	});
	const result = createMatcherPipelineResult({
		batch,
		registry,
		relationshipGraph,
		partitions,
	});
	return result.analysis.results.length;
}

/** Run the partitioned path with the same kind-sharded registries workers load. */
function runKindShardedPartitionedMatcher(): number {
	const partitions = createMatcherPartitionTasks({ job, batch }).map((task) => {
		const shard = getShardArtifact(task.kind);
		const indexed = matchIndexedObservationBatch({ registry: shard.registry, batch: task.batch, index: shard.index });
		const observationIndexes = new Map(task.batch.observations.map((observation, index) => [
			observation,
			task.observationIndexes[index] ?? index,
		]));

		return {
			job: task.job,
			partitionId: task.partitionId,
			kind: task.kind,
			priority: task.priority,
			observationCount: task.batch.observations.length,
			matches: indexed.matches.map((match, matchIndex) => ({
				observationIndex: observationIndexes.get(match.observation) ?? matchIndex,
				matchIndex,
				match,
			})),
			diagnostics: indexed.diagnostics,
			completedAt: batch.observedAt,
		};
	});
	const result = createMatcherPipelineResult({
		batch,
		registry,
		relationshipGraph,
		partitions,
	});
	return result.analysis.results.length;
}

/**
 * Compare the current whole-batch matcher with the partition merge path.
 *
 * Worker parallelism is intentionally not included here because this benchmark runs in a Node process, while the extension pool runs in Chrome. The benchmark protects
 * the deterministic partition and merge overhead so future worker-pool tuning
 * can compare browser timings against a stable in-process baseline.
 */
summary(() => {
	bench('whole indexed matcher baseline', () => {
		consumeResultCount(runWholeIndexedMatcher());
	});

	bench('partitioned matcher merge', () => {
		consumeResultCount(runPartitionedMatcherMerge());
	});

	bench('kind-sharded partitioned matcher merge', () => {
		consumeResultCount(runKindShardedPartitionedMatcher());
	});
});
