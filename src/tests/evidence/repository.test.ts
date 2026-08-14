import { describe, expect, it } from 'vitest';

import {
	addEvidenceBatch,
	addEvidenceEntry,
	clearEvidenceRepositoryState,
	createEvidenceBatchFromAnalysis,
	createEvidenceRepository,
	createEvidenceRepositoryState,
	listEvidenceEntries,
	summarizeEvidenceByTechnology,
} from '@/lib/evidence';
import {
	makeAnalysis,
	makeDetection,
	TEST_NOW,
} from '../support/factories';

function makeEvidenceBatch() {
	return createEvidenceBatchFromAnalysis({
		analysis: makeAnalysis([
			makeDetection('react', ['ui-library'], {
				evidence: [{
					kind: 'scriptSrc',
					confidence: 100,
					matchedValue: 'react.production.min.js',
					direct: true,
				}],
			}),
			makeDetection('vite', ['bundler'], {
				evidence: [{
					kind: 'relationship',
					confidence: 55,
					matchedValue: 'Implied by Vike',
					direct: false,
					sourceTechnologyId: 'vike',
				}],
			}),
		], { analyzedAt: TEST_NOW + 1 }),
	});
}

describe('functional evidence repository state', () => {
	it('adds entries and batches without mutating previous states or retaining input references', () => {
		const batch = makeEvidenceBatch();
		const initial = createEvidenceRepositoryState();
		const source = batch.entries[0]!;
		const target = { ...source.target };
		const first = addEvidenceEntry(initial, { ...source, target });
		const second = addEvidenceBatch(first.state, {
			...batch,
			entries: batch.entries.slice(1),
		});

		target.url = 'https://mutated.example/';

		expect(initial.entries).toEqual([]);
		expect(first.state.entries.map((entry) => entry.technologyId)).toEqual(['react']);
		expect(first.state.entries[0]!.target.url).toBe('https://example.com/products');
		expect(second.state.entries.map((entry) => entry.technologyId)).toEqual(['react', 'vite']);
		expect(second.addedCount).toBe(1);
	});

	it('queries immutable state without exposing stored references or reordering state', () => {
		const batch = makeEvidenceBatch();
		const state = createEvidenceRepositoryState([...batch.entries].reverse());
		const listed = listEvidenceEntries(state);
		const mutableTarget = listed[0]!.target as { url: string; hostname: string };

		mutableTarget.url = 'https://mutated.example/';

		expect(state.entries.map((entry) => entry.technologyId)).toEqual(['vite', 'react']);
		expect(listEvidenceEntries(state).map((entry) => entry.technologyId)).toEqual(['react', 'vite']);
		expect(listEvidenceEntries(state)[0]!.target.url).toBe('https://example.com/products');
		expect(summarizeEvidenceByTechnology(state)).toEqual([
			expect.objectContaining({ technologyId: 'react', entryCount: 1 }),
			expect.objectContaining({ technologyId: 'vite', entryCount: 1 }),
		]);
	});

	it('clears by returning new empty state', () => {
		const populated = createEvidenceRepositoryState(makeEvidenceBatch().entries);
		const cleared = clearEvidenceRepositoryState(populated);

		expect(populated.entries).toHaveLength(2);
		expect(cleared.entries).toEqual([]);
	});
});

describe('evidence repository', () => {
	it('stores batches and lists entries in deterministic order', () => {
		const repository = createEvidenceRepository();
		const batch = makeEvidenceBatch();

		expect(repository.addBatch(batch)).toBe(2);
		expect(repository.list().map((entry) => entry.technologyId)).toEqual(['react', 'vite']);
		expect(repository.list({ technologyId: 'react' })).toEqual([
			expect.objectContaining({ technologyId: 'react', direct: true }),
		]);
		expect(repository.list({ direct: false })).toEqual([
			expect.objectContaining({ technologyId: 'vite', source: 'relationship' }),
		]);
	});

	it('does not retain caller-owned target references', () => {
		const source = makeEvidenceBatch().entries.find((entry) => entry.technologyId === 'react')!;
		const target = { ...source.target };
		const repository = createEvidenceRepository([{ ...source, target }]);

		target.url = 'https://mutated.example/';

		expect(repository.list({ technologyId: 'react' })[0].target.url).toBe('https://example.com/products');
	});

	it('summarizes evidence by technology without choosing final detections', () => {
		const repository = createEvidenceRepository(makeEvidenceBatch().entries);

		expect(repository.summarizeByTechnology()).toEqual([
			{
				technologyId: 'react',
				entryCount: 1,
				directCount: 1,
				relationshipCount: 0,
				maxConfidence: 100,
			},
			{
				technologyId: 'vite',
				entryCount: 1,
				directCount: 0,
				relationshipCount: 1,
				maxConfidence: 55,
			},
		]);
	});

	it('clears accumulated entries', () => {
		const repository = createEvidenceRepository(makeEvidenceBatch().entries);

		repository.clear();

		expect(repository.list()).toEqual([]);
		expect(repository.summarizeByTechnology()).toEqual([]);
	});
});
