import { describe, expect, it } from 'vitest';

import {
	createEvidenceBatchFromAnalysis,
	createEvidenceEntryFromObservation,
} from '@/lib/evidence';
import { normalizePageSignals } from '@/lib/observations';
import {
	makeAnalysis,
	makeDetection,
	makePageSignals,
	TEST_NOW,
} from '../support/factories';

describe('evidence builders', () => {
	it('builds direct evidence from a normalized observation', () => {
		const batch = normalizePageSignals(makePageSignals({
			scripts: ['https://cdn.example.com/react.production.min.js'],
		}), { observedAt: TEST_NOW + 10 });
		const observation = batch.observations.find((item) => item.kind === 'scriptSrc');

		expect(observation).toBeDefined();
		const entry = createEvidenceEntryFromObservation({
			technologyId: 'react',
			observation: observation!,
			confidence: 90,
			ruleId: 'react:script-src',
			ruleDescription: 'React production bundle script URL',
			version: '18.2.0',
		});

		expect(entry).toEqual(expect.objectContaining({
			technologyId: 'react',
			kind: 'scriptSrc',
			source: 'observation',
			confidence: 90,
			matchedValue: 'https://cdn.example.com/react.production.min.js',
			observedAt: TEST_NOW + 10,
			direct: true,
			ruleId: 'react:script-src',
			ruleDescription: 'React production bundle script URL',
			version: '18.2.0',
		}));
		expect(entry.target).toEqual({
			url: 'https://example.com/products',
			hostname: 'example.com',
		});
		expect(entry.observation).toEqual(expect.objectContaining({
			kind: 'scriptSrc',
			interface: 'extension',
			collector: 'content-snapshot',
		}));
	});

	it('normalizes html-match observations as html evidence', () => {
		const batch = normalizePageSignals(makePageSignals({
			htmlMatches: {
				'wordpress:0': {
					matchedValue: 'WordPress 6.5.0',
					captures: ['6.5.0'],
				},
			},
		}));
		const observation = batch.observations.find((item) => item.kind === 'htmlMatch');

		expect(observation).toBeDefined();
		expect(createEvidenceEntryFromObservation({
			technologyId: 'wordpress',
			observation: observation!,
			confidence: 100,
			matchedValue: 'WordPress 6.5.0',
		}).kind).toBe('html');
	});

	it('adapts final analysis evidence into compatibility evidence entries', () => {
		const analysis = makeAnalysis([
			makeDetection('react', ['ui-library'], {
				evidence: [{
					kind: 'scriptSrc',
					confidence: 100,
					matchedValue: 'react.production.min.js',
					ruleDescription: 'React script URL',
					direct: true,
					version: '18.2.0',
				}],
			}),
			makeDetection('vite', ['bundler'], {
				inferred: true,
				evidence: [{
					kind: 'relationship',
					confidence: 55,
					matchedValue: 'Implied by Vike',
					direct: false,
					sourceTechnologyId: 'vike',
				}],
			}),
		], { analyzedAt: TEST_NOW + 20 });

		const batch = createEvidenceBatchFromAnalysis({ analysis });

		expect(batch.target).toEqual({
			url: 'https://example.com/products',
			hostname: 'example.com',
		});
		expect(batch.observedAt).toBe(TEST_NOW + 20);
		expect(batch.entries).toEqual([
			expect.objectContaining({
				technologyId: 'react',
				kind: 'scriptSrc',
				source: 'detection-result',
				direct: true,
				version: '18.2.0',
			}),
			expect.objectContaining({
				technologyId: 'vite',
				kind: 'relationship',
				source: 'relationship',
				direct: false,
				sourceTechnologyId: 'vike',
			}),
		]);
	});

	it('creates one compatibility entry for each public evidence item', () => {
		const technologyIds = ['react', 'solidjs', 'vue'];
		const analysis = makeAnalysis(technologyIds.map((technologyId) => makeDetection(technologyId, ['framework'], {
			evidence: [{
				kind: 'html',
				confidence: 80,
				matchedValue: `<meta data-tech="${technologyId}">`,
				direct: true,
			}],
		})));

		expect(createEvidenceBatchFromAnalysis({ analysis }).entries).toHaveLength(technologyIds.length);
	});
});
