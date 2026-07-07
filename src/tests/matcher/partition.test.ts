import { describe, expect, it } from 'vitest';

import { matchIndexedObservationBatch } from '@/lib/detection/observation-matcher-index';
import { createObservationMatcherIndex } from '@/lib/detection/observation-matcher-index';
import { createCompiledDetectionRegistry } from '@/lib/detection/registry-graph';
import type { TechnologyDefinition } from '@/lib/detection/types';
import { createMatcherPartitionTasks, createMatcherPipelineResult } from '@/lib/matcher';
import type { MatcherPartitionResult } from '@/lib/matcher';
import { normalizePageSignals, type ObservationBatch } from '@/lib/observations';
import { createObservationKindTechnologyRegistry } from '@/lib/registry';
import { makePageSignals } from '../support/factories';

const job = {
	jobId: 'job-1',
	tabId: 7,
	expectedUrl: 'https://example.com/products',
} as const;

describe('matcher partitions', () => {
	/**
	 * Cheap document facts need to run before high-fan-out asset and source-content
	 * evidence so the popup can paint useful results while deeper work continues.
	 */
	it('orders cheap page facts before asset and content-heavy observations', () => {
		const batch = normalizePageSignals(makePageSignals({
			url: 'https://example.com/products',
			meta: { generator: ['Example CMS'] },
			scripts: ['https://cdn.example/runtime.js'],
			scriptContents: ['window.__heavy = true'],
		}));

		const partitions = createMatcherPartitionTasks({ job, batch });

		expect(partitions.map((partition) => [partition.kind, partition.priority])).toEqual([
			['meta', 1],
			['url', 1],
			['scriptSrc', 3],
			['html', 4],
			['scriptContent', 4],
		]);
	});

	/**
	 * Large URL-like surfaces must produce multiple progress events. A single
	 * kind-sized partition would recreate the old quiet wait where Vercel-style
	 * resource fan-out blocked popup revisions until the whole kind completed.
	 */
	it('chunks high-fan-out resource observations into smaller matcher tasks', () => {
		const batch: ObservationBatch = {
			target: { url: 'https://example.com/', hostname: 'example.com' },
			interface: 'extension',
			observedAt: 1,
			observations: Array.from({ length: 130 }, (_item, index) => ({
				kind: 'resourceUrl' as const,
				interface: 'extension' as const,
				collector: 'content-snapshot',
				target: { url: 'https://example.com/', hostname: 'example.com' },
				value: `https://cdn.example/assets/${index}.js`,
				observedAt: 1,
			})),
		};

		const partitions = createMatcherPartitionTasks({ job, batch });

		expect(partitions).toHaveLength(9);
		expect(partitions.map((partition) => partition.batch.observations.length)).toEqual([16, 16, 16, 16, 16, 16, 16, 16, 2]);
		expect(partitions.every((partition) => partition.kind === 'resourceUrl')).toBe(true);
	});

	/** HTML probe observations use full-registry rule indexes as their lookup key. */
	it('matches html probes after a shard preserves full-registry rule indexes', () => {
		const registry: readonly TechnologyDefinition[] = [{
			id: 'html-probed-tech',
			name: 'HTML Probed Tech',
			website: 'https://html-probed-tech.example',
			categories: ['developer-tooling'],
			rules: [
				{ kind: 'url', pattern: /html-probed-tech/ },
				{ kind: 'html', pattern: /data-html-probed-tech/ },
			],
		}];
		const batch: ObservationBatch = {
			target: { url: 'https://example.com/', hostname: 'example.com' },
			interface: 'extension',
			observedAt: 1,
			observations: [{
				kind: 'htmlMatch',
				interface: 'extension',
				collector: 'content-snapshot',
				target: { url: 'https://example.com/', hostname: 'example.com' },
				key: 'html-probed-tech:1',
				value: 'data-html-probed-tech',
				observedAt: 1,
			}],
		};
		const shardRegistry = createObservationKindTechnologyRegistry(registry, 'htmlMatch');
		const shardIndex = createObservationMatcherIndex(shardRegistry);
		const indexed = matchIndexedObservationBatch({ registry: shardRegistry, batch, index: shardIndex });

		expect(shardRegistry[0]?.rules[0]?.sourceRuleIndex).toBe(1);
		expect(indexed.matches).toHaveLength(1);
		expect(indexed.matches[0]?.technologyId).toBe('html-probed-tech');
		expect(indexed.matches[0]?.ruleIndex).toBe(1);
	});

	/**
	 * Kind shards must preserve the same final detections as the complete registry.
	 *
	 * Workers only receive the narrowed rules for their observation kind. The
	 * coordinator still merges all evidence against the full registry graph, so
	 * splitting matcher assets must not change the final technology set.
	 */
	it('merges kind-sharded partition results back to complete-registry detections', () => {
		const registry: readonly TechnologyDefinition[] = [
			{
				id: 'meta-cms',
				name: 'Meta CMS',
				website: 'https://meta-cms.example',
				categories: ['platform-cms-builder'],
				rules: [{ kind: 'meta', key: 'generator', valuePattern: /Meta CMS/ }],
			},
			{
				id: 'script-runtime',
				name: 'Script Runtime',
				website: 'https://script-runtime.example',
				categories: ['framework'],
				rules: [{ kind: 'scriptSrc', pattern: /runtime\.js/ }],
			},
			{
				id: 'resource-tool',
				name: 'Resource Tool',
				website: 'https://resource-tool.example',
				categories: ['developer-tooling'],
				rules: [{ kind: 'resourceUrl', pattern: /resource-tool\.js/ }],
			},
		];
		const batch = normalizePageSignals(makePageSignals({
			meta: { generator: ['Meta CMS'] },
			scripts: ['https://cdn.example/runtime.js'],
			resources: [{ url: 'https://cdn.example/resource-tool.js', initiatorType: 'script' }],
		}));
		const relationshipGraph = createCompiledDetectionRegistry(registry);
		const partitions: MatcherPartitionResult[] = createMatcherPartitionTasks({ job, batch }).map((task) => {
			const shardRegistry = createObservationKindTechnologyRegistry(registry, task.kind);
			const shardIndex = createObservationMatcherIndex(shardRegistry);
			const indexed = matchIndexedObservationBatch({ registry: shardRegistry, batch: task.batch, index: shardIndex });
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
			compiledRegistryArtifact: { relationshipGraph },
			partitions,
		});

		expect(result.analysis.results.map((detection) => detection.technologyId).sort()).toEqual([
			'meta-cms',
			'resource-tool',
			'script-runtime',
		]);
	});

	/**
	 * Chrome runtime messages do not preserve `Map` instances inside compiled
	 * relationship graphs. The offscreen matcher can receive a JSON-shaped graph,
	 * then must rebuild live lookup maps before candidate refinement applies
	 * `implies`, `requires`, and `excludes` relationships.
	 */
	it('rebuilds serialized relationship graphs before candidate refinement', () => {
		const registry: readonly TechnologyDefinition[] = [
			{
				id: 'source-runtime',
				name: 'Source Runtime',
				website: 'https://source-runtime.example',
				categories: ['framework'],
				implies: ['implied-runtime'],
				rules: [{ kind: 'meta', key: 'generator', valuePattern: /Source Runtime/ }],
			},
			{
				id: 'implied-runtime',
				name: 'Implied Runtime',
				website: 'https://implied-runtime.example',
				categories: ['framework'],
				rules: [],
			},
		];
		const batch = normalizePageSignals(makePageSignals({
			meta: { generator: ['Source Runtime'] },
		}));
		const relationshipGraph = createCompiledDetectionRegistry(registry);
		const serializedRelationshipGraph = JSON.parse(JSON.stringify(relationshipGraph)) as unknown as ReturnType<typeof createCompiledDetectionRegistry>;
		const partitions: MatcherPartitionResult[] = createMatcherPartitionTasks({ job, batch }).map((task) => {
			const shardRegistry = createObservationKindTechnologyRegistry(registry, task.kind);
			const shardIndex = createObservationMatcherIndex(shardRegistry);
			const indexed = matchIndexedObservationBatch({ registry: shardRegistry, batch: task.batch, index: shardIndex });

			return {
				job: task.job,
				partitionId: task.partitionId,
				kind: task.kind,
				priority: task.priority,
				observationCount: task.batch.observations.length,
				matches: indexed.matches.map((match, matchIndex) => ({
					observationIndex: task.observationIndexes[matchIndex] ?? matchIndex,
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
			compiledRegistryArtifact: { relationshipGraph: serializedRelationshipGraph },
			partitions,
		});

		expect(result.analysis.results.map((detection) => detection.technologyId).sort()).toEqual([
			'implied-runtime',
			'source-runtime',
		]);
	});

});
