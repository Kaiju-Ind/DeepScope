import { describe, expect, it } from 'vitest';

import * as generation from '@/utils/generation';

describe('keyed stale-work generation', () => {
	it('invalidates captured work and gives a reused key a different generation', () => {
		const generations = generation.create<number>();
		const first = generations.capture(7);

		expect(generations.capture(7)).toBe(first);
		expect(generations.isCurrent(7, first)).toBe(true);
		generations.invalidate(7);
		expect(generations.isCurrent(7, first)).toBe(false);

		const reused = generations.capture(7);
		expect(reused).not.toBe(first);
		expect(generations.isCurrent(7, reused)).toBe(true);
	});
});
