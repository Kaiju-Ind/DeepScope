import { describe, expect, it } from 'vitest';

import { accepts } from '@/lib/scheduler/budget';

describe('scheduler transient budget', () => {
	const limit = { count: 2, bytes: 1_024 } as const;

	it('accepts work that fits both count and byte limits', () => {
		expect(accepts({ count: 0, bytes: 0 }, 1_024, limit)).toBe(true);
		expect(accepts({ count: 1, bytes: 512 }, 512, limit)).toBe(true);
	});

	it('rejects the next item once the job-count limit is reached', () => {
		expect(accepts({ count: 2, bytes: 0 }, 1, limit)).toBe(false);
	});

	it('rejects one byte beyond the byte limit', () => {
		expect(accepts({ count: 0, bytes: 0 }, 1_025, limit)).toBe(false);
		expect(accepts({ count: 1, bytes: 900 }, 125, limit)).toBe(false);
	});
});
