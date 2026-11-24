import { describe, expect, it } from 'vitest';

import { evidenceRank, type DetectionEvidenceState } from '@/lib/storage/session';

describe('evidence rank', () => {
	it('orders coverage from unknown to full', () => {
		const levels = ['unknown', 'recovered-initial', 'initial', 'incremental', 'enriched', 'full'] as const;
		const state = (level: DetectionEvidenceState['level']): DetectionEvidenceState =>
			({ level, completedPassIds: [], requiredPassIds: [], complete: false, updatedAt: 0 });
		expect(levels.map((level) => evidenceRank(state(level)))).toEqual([0, 1, 2, 3, 4, 5]);
		expect(evidenceRank(undefined)).toBe(0);
	});
});
