import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/detection/rules', () => ({
	SOURCE_LIMITS: { evidenceValueChars: 160 },
}));

import type { TechnologyDefinition } from '@/lib/detection/types';
import { runDetectionPipeline, runObservationBatchPipeline } from '@/lib/pipeline';
import { normalizePageSignals } from '@/lib/observations';
import { compileTechnologyRegistry } from '@/lib/registry';
import { makePageSignals, TEST_NOW } from '../support/factories';

/**
 * Build a compact technology definition for pipeline coordinator tests.
 *
 * The runtime tests need real registry metadata and relationship fields, but each
 * case should still only state the rule surface it is verifying.
 */
function makeTechnology(
	overrides: Partial<TechnologyDefinition> & Pick<TechnologyDefinition, 'id'>,
): TechnologyDefinition {
	return {
		id: overrides.id,
		name: overrides.name ?? overrides.id,
		website: overrides.website ?? `https://${overrides.id}.example`,
		description: overrides.description,
		icon: overrides.icon,
		categories: overrides.categories ?? ['framework'],
		rules: overrides.rules ?? [],
		implies: overrides.implies,
		requires: overrides.requires,
		excludes: overrides.excludes,
		relationships: overrides.relationships,
		priority: overrides.priority,
		metadata: overrides.metadata,
	};
}

describe('event pipeline runtime coordinator', () => {
	it('defaults snapshot inputs to the event pipeline', () => {
		const result = runDetectionPipeline({
			signals: makePageSignals(),
			registry: [],
		});

		expect(result).toMatchObject({
			requestedMode: 'event',
			completedMode: 'event',
		});
		expect(result.events.map((event) => event.stage)).toEqual([
			'normalized-observations',
			'pattern-matched',
			'evidence-created',
			'candidates-created',
			'candidates-refined',
			'detections-emitted',
		]);
	});

	it('runs PageSignals through the event pipeline and emits SiteAnalysis output', () => {
		const registry = [
			makeTechnology({
				id: 'react',
				name: 'React',
				website: 'https://react.dev',
				categories: ['ui-library'],
				rules: [
					{
						kind: 'scriptSrc',
						pattern: /react(?:\.production)?(?:\.min)?\.js/i,
						confidence: 90,
					},
				],
			}),
		];
		const signals = makePageSignals({
			scripts: ['https://cdn.example.com/react.production.min.js'],
		});

		const result = runDetectionPipeline({
			signals,
			registry,
			analyzedAt: TEST_NOW,
		});

		expect(result).toMatchObject({
			requestedMode: 'event',
			completedMode: 'event',
			analysis: {
				url: 'https://example.com/products',
				hostname: 'example.com',
				analyzedAt: TEST_NOW,
				source: 'fresh',
				results: [
					expect.objectContaining({
						technologyId: 'react',
						name: 'React',
					}),
				],
			},
			emission: {
				candidateCount: 1,
				emittedResultCount: 1,
				filteredCandidateCount: 0,
				rejectionCount: 0,
				relationshipEvidenceCount: 0,
			},
		});
	});


	it('uses a precompiled registry artifact when one is supplied', () => {
		const registry = [
			makeTechnology({
				id: 'artifact-tech',
				name: 'Artifact Tech',
				website: 'https://artifact.example',
				rules: [{ kind: 'meta', key: 'generator', valuePattern: /Artifact Tech/, confidence: 90 }],
			}),
		];
		const artifact = compileTechnologyRegistry({ technologies: registry });

		const result = runDetectionPipeline({
			signals: makePageSignals({ meta: { generator: ['Artifact Tech'] } }),
			registry,
			compiledRegistryArtifact: artifact,
			analyzedAt: TEST_NOW,
		});

		expect(result.completedMode).toBe('event');
		expect(result.analysis.results).toEqual([
			expect.objectContaining({ technologyId: 'artifact-tech' }),
		]);
	});


	it('runs event stages from a normalized observation batch', () => {
		const registry = [
			makeTechnology({
				id: 'batch-tech',
				name: 'Batch Tech',
				website: 'https://batch.example',
				rules: [{ kind: 'scriptSrc', pattern: /batch-tech\.js/, confidence: 95 }],
			}),
		];
		const artifact = compileTechnologyRegistry({ technologies: registry });
		const batch = normalizePageSignals(makePageSignals({
			scripts: ['https://cdn.example/batch-tech.js'],
			collectedAt: 123,
		}));

		const result = runObservationBatchPipeline({
			batch,
			registry,
			compiledRegistryArtifact: artifact,
			analyzedAt: 456,
		});

		expect(result).toMatchObject({
			requestedMode: 'event',
			completedMode: 'event',
		});
		expect(result.analysis).toMatchObject({
			url: 'https://example.com/products',
			analyzedAt: 456,
			results: [expect.objectContaining({ technologyId: 'batch-tech' })],
		});
		expect(result.events.map((event) => event.stage)).toEqual([
			'pattern-matched',
			'evidence-created',
			'candidates-created',
			'candidates-refined',
			'detections-emitted',
		]);
	});

	it('records ordered public-safe stage events for the event path', () => {
		const registry = [
			makeTechnology({
				id: 'vite',
				rules: [{ kind: 'scriptSrc', pattern: /@vite\/client/i, confidence: 85 }],
			}),
		];
		const observedEvents: string[] = [];

		const result = runDetectionPipeline({
			signals: makePageSignals({ scripts: ['https://example.com/@vite/client'] }),
			registry,
			analyzedAt: TEST_NOW,
			onEvent: (event) => observedEvents.push(event.stage),
		});

		const expectedStages = [
			'normalized-observations',
			'pattern-matched',
			'evidence-created',
			'candidates-created',
			'candidates-refined',
			'detections-emitted',
		];

		expect(result.events.map((event) => event.stage)).toEqual(expectedStages);
		expect(observedEvents).toEqual(expectedStages);
		expect(result.events.every((event) => !('observation' in event))).toBe(true);
	});

});
