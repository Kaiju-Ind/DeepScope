import { describe, expect, it } from 'vitest';

import {
	createEvidenceBatchFromAnalysis,
	createEvidenceRepository,
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

	it('returns defensive copies of stored entries', () => {
		const repository = createEvidenceRepository(makeEvidenceBatch().entries);
		const [entry] = repository.list({ technologyId: 'react' });

		entry.target.url = 'https://mutated.example/';

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
