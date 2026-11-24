import { describe, expect, it } from 'vitest';

import * as revision from '@/lib/background/revision';

describe('visible matcher revision policy', () => {
	it('publishes the first partial result immediately', () => {
		expect(revision.shouldPublish({ final: false, previousAt: 0, now: 1_000 })).toBe(true);
	});

	it('does not let a burst bypass the minimum visible-update interval', () => {
		expect(revision.shouldPublish({ final: false, previousAt: 1_000, now: 1_249 })).toBe(false);
		expect(revision.shouldPublish({ final: false, previousAt: 1_000, now: 1_250 })).toBe(true);
	});

	it('publishes final output immediately even inside the interval', () => {
		expect(revision.shouldPublish({ final: true, previousAt: 1_000, now: 1_001 })).toBe(true);
	});
});
