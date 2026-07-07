import { describe, expect, it } from 'vitest';

import {
	createDirectDetectionCandidate,
	createRelationshipDetectionCandidate,
	detectionCandidateToResult,
} from '@/lib/detection/candidates';
import type { ConfidenceScore, Evidence, TechnologyDefinition } from '@/lib/detection/types';

const confidence: ConfidenceScore = { value: 95, level: 'high' };

function technology(id: string): TechnologyDefinition {
	return {
		id,
		name: id,
		website: `https://example.com/${id}`,
		categories: ['unknown'],
		rules: [],
	};
}

describe('detection candidates', () => {
	it('materializes direct candidates into the current public result shape', () => {
		const evidence: Evidence[] = [
			{
				kind: 'html',
				confidence: 95,
				matchedValue: 'Framework 2.0.0',
				version: '2.0.0',
				direct: true,
			},
		];
		const candidate = createDirectDetectionCandidate(
			technology('framework'),
			evidence,
			confidence,
			'2.0.0',
		);

		expect(detectionCandidateToResult(candidate)).toEqual({
			technologyId: 'framework',
			name: 'framework',
			website: 'https://example.com/framework',
			description: undefined,
			icon: undefined,
			categories: ['unknown'],
			confidence,
			version: '2.0.0',
			evidence,
			inferred: undefined,
		});
	});

	it('materializes relationship candidates with implied evidence metadata', () => {
		const candidate = createRelationshipDetectionCandidate(
			technology('runtime'),
			technology('framework'),
			{ value: 55, level: 'medium' },
		);

		expect(detectionCandidateToResult(candidate)).toEqual({
			technologyId: 'runtime',
			name: 'runtime',
			website: 'https://example.com/runtime',
			description: undefined,
			icon: undefined,
			categories: ['unknown'],
			confidence: { value: 55, level: 'medium' },
			evidence: [
				{
					kind: 'relationship',
					confidence: 55,
					ruleDescription: 'Implied by framework',
					matchedValue: 'Implied by framework',
					direct: false,
					sourceTechnologyId: 'framework',
				},
			],
			inferred: true,
			version: undefined,
		});
	});
});
