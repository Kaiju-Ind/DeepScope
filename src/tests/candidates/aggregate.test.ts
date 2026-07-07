import { fc, test } from '@fast-check/vitest';
import { describe, expect, it } from 'vitest';

import type { TechnologyDefinition } from '@/lib/detection/types';
import type { EvidenceEntry } from '@/lib/evidence';
import { createEvidenceCandidateBatch } from '@/lib/candidates';
import { matchObservationBatch } from '@/lib/detection/observation-matcher';
import { normalizePageSignals } from '@/lib/observations';
import { makePageSignals, TEST_NOW } from '../support/factories';

const TARGET = {
	url: 'https://example.com/products',
	hostname: 'example.com',
};

function makeEvidenceEntry(overrides: Partial<EvidenceEntry> = {}): EvidenceEntry {
	return {
		id: overrides.id ?? `evidence:${overrides.technologyId ?? 'react'}:${overrides.kind ?? 'scriptSrc'}:${overrides.observedAt ?? TEST_NOW}`,
		target: overrides.target ?? TARGET,
		technologyId: overrides.technologyId ?? 'react',
		kind: overrides.kind ?? 'scriptSrc',
		source: overrides.source ?? 'observation',
		confidence: overrides.confidence ?? 60,
		matchedValue: overrides.matchedValue ?? 'react.production.min.js',
		observedAt: overrides.observedAt ?? TEST_NOW,
		direct: overrides.direct ?? true,
		...overrides,
	};
}

function makeRegistry(): TechnologyDefinition[] {
	return [
		{
			id: 'react',
			name: 'React',
			website: 'https://react.dev',
			description: 'UI library',
			categories: ['ui-library'],
			rules: [],
		},
		{
			id: 'vite',
			name: 'Vite',
			website: 'https://vite.dev',
			categories: ['bundler'],
			rules: [],
		},
	];
}

describe('evidence candidate aggregation', () => {
	it('groups evidence by technology and mirrors detector confidence weighting', () => {
		const batch = createEvidenceCandidateBatch({
			registry: makeRegistry(),
			evidence: [
				makeEvidenceEntry({ id: '1', kind: 'scriptSrc', confidence: 60, observedAt: TEST_NOW }),
				makeEvidenceEntry({ id: '2', kind: 'scriptSrc', confidence: 20, observedAt: TEST_NOW + 1 }),
				makeEvidenceEntry({ id: '3', kind: 'meta', confidence: 20, observedAt: TEST_NOW + 2 }),
			],
		});

		expect(batch.candidates).toHaveLength(1);
		expect(batch.candidates[0]).toEqual(expect.objectContaining({
			technology: expect.objectContaining({
			id: 'react',
			name: 'React',
			categories: ['ui-library'],
		}),
			source: 'direct',
			confidence: { value: 80, level: 'high' },
			directEvidenceCount: 3,
			relationshipEvidenceCount: 0,
			evidenceCount: 3,
			kinds: ['scriptSrc', 'meta'],
			firstObservedAt: TEST_NOW,
			lastObservedAt: TEST_NOW + 2,
		}));
	});

	it('preserves captured versions and registry order across candidates', () => {
		const batch = createEvidenceCandidateBatch({
			registry: makeRegistry(),
			evidence: [
				makeEvidenceEntry({
					id: 'vite:1',
					technologyId: 'vite',
					kind: 'scriptSrc',
					matchedValue: 'vite/client',
					version: '5.0.0',
					observedAt: TEST_NOW + 2,
				}),
				makeEvidenceEntry({
					id: 'react:1',
					technologyId: 'react',
					version: '18.3.1',
					observedAt: TEST_NOW + 1,
				}),
				makeEvidenceEntry({
					id: 'react:2',
					technologyId: 'react',
					version: '18.2.0',
					observedAt: TEST_NOW + 3,
				}),
			],
		});

		expect(batch.candidates.map((candidate) => candidate.technology.id)).toEqual(['react', 'vite']);
		expect(batch.candidates[0]).toEqual(expect.objectContaining({
			version: '18.3.1',
			versions: ['18.3.1', '18.2.0'],
		}));
	});

	it('keeps relationship evidence visible without running relationship resolution', () => {
		const batch = createEvidenceCandidateBatch({
			registry: makeRegistry(),
			evidence: [
				makeEvidenceEntry({ id: 'direct', technologyId: 'vite', direct: true, confidence: 90 }),
				makeEvidenceEntry({
					id: 'relationship',
					technologyId: 'vite',
					kind: 'relationship',
					source: 'relationship',
					direct: false,
					confidence: 55,
					matchedValue: 'Implied by Vike',
					sourceTechnologyId: 'vike',
				}),
			],
		});

		expect(batch.candidates).toHaveLength(1);
		expect(batch.candidates[0]).toEqual(expect.objectContaining({
			source: 'mixed',
			directEvidenceCount: 1,
			relationshipEvidenceCount: 1,
		}));
	});

	it('aggregates observation-matcher evidence into candidate metadata', () => {
		const registry: TechnologyDefinition[] = [{
			id: 'react',
			name: 'React',
			website: 'https://react.dev',
			categories: ['ui-library'],
			rules: [{
				id: 'react:script-src',
				kind: 'scriptSrc',
				pattern: /react(?:\.production)?(?:\.min)?\.js/i,
				confidence: 90,
			}],
		}];
		const observations = normalizePageSignals(makePageSignals({
			scripts: ['https://cdn.example.com/react.production.min.js'],
		}));
		const matches = matchObservationBatch({ registry, batch: observations });

		const candidates = createEvidenceCandidateBatch({
			registry,
			evidence: matches.evidenceBatch,
		});

		expect(candidates.candidates).toEqual([
			expect.objectContaining({
				technology: expect.objectContaining({ id: 'react', name: 'React' }),
				confidence: { value: 90, level: 'high' },
				evidenceCount: 1,
			}),
		]);
	});

	it('copies evidence input before storing it on candidates', () => {
		const entry = makeEvidenceEntry();

		const batch = createEvidenceCandidateBatch({
			registry: makeRegistry(),
			evidence: [entry],
		});
		entry.target.url = 'https://mutated.example/';

		expect(batch.candidates[0]!.evidence[0]!.target.url).toBe('https://example.com/products');
	});

	test.prop([
		fc.array(fc.record({
			technologyId: fc.string({ minLength: 1 }).filter((value) => value.trim().length > 0),
			confidence: fc.integer({ min: 0, max: 100 }),
		}), { maxLength: 20 }),
	], { numRuns: 25 })(
		'creates at most one candidate for each technology with evidence',
		(records) => {
			const evidence = records.map((record, index) => makeEvidenceEntry({
				id: `entry:${index}`,
				technologyId: record.technologyId,
				confidence: record.confidence,
				observedAt: TEST_NOW + index,
			}));
			const batch = createEvidenceCandidateBatch({ registry: [], evidence });
			const uniqueTechnologyIds = new Set(records.map((record) => record.technologyId));

			expect(batch.candidates.map((candidate) => candidate.technology.id).sort()).toEqual(
				[...uniqueTechnologyIds].sort(),
			);
		},
	);
});
