import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/detection/rules', () => ({
	SOURCE_LIMITS: { evidenceValueChars: 160 },
}));

import type { SiteAnalysis, TechnologyDefinition } from '@/lib/detection/types';
import {
	DETECTION_REPLAY_TRACE_SCHEMA_VERSION,
	createDetectionExplanations,
	createDetectionReplayTrace,
	runDetectionPipeline,
} from '@/lib/pipeline';
import { makeAnalysis, makeDetection, makePageSignals, TEST_NOW } from '../support/factories';

/**
 * Build a minimal technology definition for replay tests.
 *
 * The trace builder should be exercised through the same public coordinator path
 * used by the event pipeline, while each test keeps registry setup focused on the
 * rule or relationship detail that matters for replay output.
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

describe('pipeline replay trace', () => {
	it('creates a redacted replay trace from an event pipeline result', () => {
		const result = runDetectionPipeline({
			signals: makePageSignals({ scripts: ['https://cdn.example.com/react.production.min.js'] }),
			registry: [makeTechnology({
				id: 'react',
				name: 'React',
				website: 'https://react.dev',
				categories: ['ui-library'],
				rules: [{ kind: 'scriptSrc', pattern: /react/i, confidence: 90 }],
			})],
			analyzedAt: TEST_NOW,
		});

		const trace = createDetectionReplayTrace({ result });

		expect(trace).toMatchObject({
			schemaVersion: DETECTION_REPLAY_TRACE_SCHEMA_VERSION,
			target: {
				url: 'https://example.com/products',
				hostname: 'example.com',
			},
			requestedMode: 'event',
			completedMode: 'event',
			analyzedAt: TEST_NOW,
			resultCount: 1,
			emission: {
				emittedResultCount: 1,
			},
			explanations: [expect.objectContaining({
				technologyId: 'react',
				evidenceCount: 1,
				directEvidenceCount: 1,
				relationshipEvidenceCount: 0,
			})],
		});
		expect(trace.events.map((event) => event.sequence)).toEqual([0, 1, 2, 3, 4, 5]);
		expect(trace.events.every((event) => !('observation' in event))).toBe(true);
	});

	it('summarizes direct relationship version and warning explanations', () => {
		const analysis = makeAnalysis([
			makeDetection('direct-tech', ['framework'], {
				name: 'Direct Tech',
				version: '1.2.3',
				evidence: [{
					kind: 'scriptSrc',
					matchedValue: 'direct-tech.js',
					confidence: 90,
					direct: true,
					ruleDescription: 'Detected Direct Tech asset',
					version: '1.2.3',
				}],
			}),
			makeDetection('implied-tech', ['framework'], {
				name: 'Implied Tech',
				inferred: true,
				warnings: ['missing-registry-metadata'],
				evidence: [{
					kind: 'relationship',
					matchedValue: 'direct-tech implies implied-tech',
					confidence: 55,
					direct: false,
					sourceTechnologyId: 'direct-tech',
				}],
			}),
		]);

		const explanations = createDetectionExplanations(analysis);

		expect(explanations[0]).toMatchObject({
			technologyId: 'direct-tech',
			directEvidenceCount: 1,
			relationshipEvidenceCount: 0,
			reasons: ['Matched scriptSrc evidence', 'Selected version 1.2.3'],
		});
		expect(explanations[1]).toMatchObject({
			technologyId: 'implied-tech',
			inferred: true,
			directEvidenceCount: 0,
			relationshipEvidenceCount: 1,
			reasons: [
				'Inferred from direct-tech',
				'Registry metadata emitted warnings',
			],
		});
	});

	it('creates an explicit explanation when a result has no public evidence', () => {
		const analysis: SiteAnalysis = makeAnalysis([
			makeDetection('metadata-only', ['framework'], { evidence: [] }),
		]);

		expect(createDetectionExplanations(analysis)[0]?.reasons).toEqual([
			'Emitted without public evidence entries',
		]);
	});
});
