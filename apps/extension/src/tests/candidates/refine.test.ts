import { fc, test } from '@fast-check/vitest';
import { describe, expect, it } from 'vitest';

import type { TechnologyDefinition } from '@/lib/detection/types';
import type { EvidenceEntry } from '@/lib/evidence';
import { createEvidenceCandidateBatch, refineEvidenceCandidateBatch } from '@/lib/candidates';
import { createCompiledDetectionRegistry } from '@/lib/detection/registry-graph';

const TEST_NOW = 1_700_000_000_000;

const TARGET = {
	url: 'https://example.com/',
	hostname: 'example.com',
};

function makeEvidenceEntry(overrides: Partial<EvidenceEntry> = {}): EvidenceEntry {
	return {
		id: overrides.id ?? `evidence:${overrides.technologyId ?? 'react'}:${overrides.kind ?? 'scriptSrc'}:${overrides.observedAt ?? TEST_NOW}`,
		target: overrides.target ?? TARGET,
		technologyId: overrides.technologyId ?? 'react',
		kind: overrides.kind ?? 'scriptSrc',
		source: overrides.source ?? 'observation',
		confidence: overrides.confidence ?? 70,
		matchedValue: overrides.matchedValue ?? 'react.production.min.js',
		observedAt: overrides.observedAt ?? TEST_NOW,
		direct: overrides.direct ?? true,
		...overrides,
	};
}

function makeTechnology(overrides: Partial<TechnologyDefinition> & Pick<TechnologyDefinition, 'id'>): TechnologyDefinition {
	return {
		name: overrides.id,
		website: `https://${overrides.id}.example`,
		categories: ['framework'],
		rules: [],
		...overrides,
	};
}

function createRefinedIds(registry: TechnologyDefinition[], evidence: EvidenceEntry[]): string[] {
	const candidates = createEvidenceCandidateBatch({ registry, evidence });
	const refined = refineEvidenceCandidateBatch({
		batch: candidates,
		compiledRegistry: createCompiledDetectionRegistry(registry),
	});

	return refined.candidates.map((candidate) => candidate.technology.id);
}

describe('evidence candidate relationship refinement', () => {
	it('adds implied candidates with relationship evidence while preserving direct candidates', () => {
		const registry = [
			makeTechnology({ id: 'react', name: 'React', implies: ['vite'] }),
			makeTechnology({ id: 'vite', name: 'Vite', categories: ['bundler'] }),
		];
		const batch = createEvidenceCandidateBatch({
			registry,
			evidence: [makeEvidenceEntry({ technologyId: 'react', confidence: 90 })],
		});

		const refined = refineEvidenceCandidateBatch({
			batch,
			compiledRegistry: createCompiledDetectionRegistry(registry),
		});

		expect(refined.candidates.map((candidate) => candidate.technology.id)).toEqual(['react', 'vite']);
		expect(refined.relationshipEvidence).toHaveLength(1);
		expect(refined.candidates[1]).toEqual(expect.objectContaining({
			source: 'relationship',
			directEvidenceCount: 0,
			relationshipEvidenceCount: 1,
			confidence: { value: 55, level: 'medium' },
		}));
		expect(refined.candidates[1]!.evidence[0]).toEqual(expect.objectContaining({
			kind: 'relationship',
			direct: false,
			sourceTechnologyId: 'react',
			matchedValue: 'Implied by React',
		}));
	});

	it('requires independently direct evidence instead of implied candidates', () => {
		const registry = [
			makeTechnology({ id: 'theme', implies: ['wordpress'] }),
			makeTechnology({ id: 'wordpress' }),
			makeTechnology({ id: 'addon', requires: ['wordpress'] }),
		];
		const batch = createEvidenceCandidateBatch({
			registry,
			evidence: [
				makeEvidenceEntry({ id: 'theme', technologyId: 'theme', confidence: 90 }),
				makeEvidenceEntry({ id: 'addon', technologyId: 'addon', confidence: 80 }),
			],
		});

		const refined = refineEvidenceCandidateBatch({
			batch,
			compiledRegistry: createCompiledDetectionRegistry(registry),
		});

		expect(refined.candidates.map((candidate) => candidate.technology.id)).toEqual(['theme', 'wordpress']);
		expect(refined.rejections).toEqual(expect.arrayContaining([
			expect.objectContaining({
				reason: 'missing-requirement',
				missingRequirementIds: ['wordpress'],
				candidate: expect.objectContaining({
					technology: expect.objectContaining({ id: 'addon' }),
				}),
			}),
		]));
	});

	it('keeps the stronger direct candidate when exclusions conflict', () => {
		const registry = [
			makeTechnology({ id: 'wordpress', excludes: ['wix'] }),
			makeTechnology({ id: 'wix' }),
		];
		const batch = createEvidenceCandidateBatch({
			registry,
			evidence: [
				makeEvidenceEntry({ id: 'wordpress', technologyId: 'wordpress', confidence: 60 }),
				makeEvidenceEntry({ id: 'wix', technologyId: 'wix', confidence: 95 }),
			],
		});

		const refined = refineEvidenceCandidateBatch({
			batch,
			compiledRegistry: createCompiledDetectionRegistry(registry),
		});

		expect(refined.candidates.map((candidate) => candidate.technology.id)).toEqual(['wix']);
		expect(refined.rejections).toEqual(expect.arrayContaining([
			expect.objectContaining({
				reason: 'excluded',
				rejectedByTechnologyId: 'wix',
				candidate: expect.objectContaining({
					technology: expect.objectContaining({ id: 'wordpress' }),
				}),
			}),
		]));
	});


	it('resolves exclusion components by strongest consistent candidate set', () => {
		const registry = [
			makeTechnology({ id: 'cms-a', excludes: ['cms-b'] }),
			makeTechnology({ id: 'cms-b', excludes: ['plugin-c'] }),
			makeTechnology({ id: 'plugin-c' }),
		];
		const batch = createEvidenceCandidateBatch({
			registry,
			evidence: [
				makeEvidenceEntry({ id: 'cms-a', technologyId: 'cms-a', confidence: 70 }),
				makeEvidenceEntry({ id: 'cms-b', technologyId: 'cms-b', confidence: 95 }),
				makeEvidenceEntry({ id: 'plugin-c', technologyId: 'plugin-c', confidence: 70 }),
			],
		});

		const refined = refineEvidenceCandidateBatch({
			batch,
			compiledRegistry: createCompiledDetectionRegistry(registry),
		});

		expect(refined.candidates.map((candidate) => candidate.technology.id)).toEqual(['cms-a', 'plugin-c']);
		expect(refined.rejections).toEqual(expect.arrayContaining([
			expect.objectContaining({
				reason: 'excluded',
				candidate: expect.objectContaining({
					technology: expect.objectContaining({ id: 'cms-b' }),
				}),
			}),
		]));
	});

	it('prevents inferred candidates from replacing conflicting direct candidates', () => {
		const registry = [
			makeTechnology({ id: 'react', name: 'React', implies: ['preact'] }),
			makeTechnology({ id: 'preact', excludes: ['react'] }),
		];
		const batch = createEvidenceCandidateBatch({
			registry,
			evidence: [makeEvidenceEntry({ technologyId: 'react', confidence: 70 })],
		});

		const refined = refineEvidenceCandidateBatch({
			batch,
			compiledRegistry: createCompiledDetectionRegistry(registry),
		});

		expect(refined.candidates.map((candidate) => candidate.technology.id)).toEqual(['react']);
		expect(refined.rejections).toEqual(expect.arrayContaining([
			expect.objectContaining({
				reason: 'excluded',
				rejectedByTechnologyId: 'react',
				candidate: expect.objectContaining({
					technology: expect.objectContaining({ id: 'preact' }),
				}),
			}),
		]));
	});

	it('records skipped implications when the target is not present in the compiled registry', () => {
		const registry = [makeTechnology({ id: 'plugin', implies: ['missing-platform'] })];
		const batch = createEvidenceCandidateBatch({
			registry,
			evidence: [makeEvidenceEntry({ technologyId: 'plugin', confidence: 80 })],
		});

		const refined = refineEvidenceCandidateBatch({
			batch,
			compiledRegistry: createCompiledDetectionRegistry(registry),
		});

		expect(refined.candidates.map((candidate) => candidate.technology.id)).toEqual(['plugin']);
		expect(refined.rejections).toEqual([
			expect.objectContaining({
				reason: 'unknown-implied-technology',
				candidate: expect.objectContaining({
					technology: expect.objectContaining({ id: 'missing-platform' }),
				}),
			}),
		]);
	});

	test.prop([
		fc.array(fc.record({
			technologyId: fc.constantFrom('alpha', 'beta', 'gamma'),
			confidence: fc.integer({ min: 0, max: 100 }),
		}), { maxLength: 12 }),
	], { numRuns: 25 })(
		'returns no duplicate accepted candidate ids after graph refinement',
		(records) => {
			const registry = [
				makeTechnology({ id: 'alpha', implies: ['beta'] }),
				makeTechnology({ id: 'beta', excludes: ['gamma'] }),
				makeTechnology({ id: 'gamma' }),
			];
			const evidence = records.map((record, index) => makeEvidenceEntry({
				id: `entry:${index}`,
				technologyId: record.technologyId,
				confidence: record.confidence,
				observedAt: TEST_NOW + index,
			}));

			const ids = createRefinedIds(registry, evidence);
			expect(ids).toEqual([...new Set(ids)]);
		},
	);
});
