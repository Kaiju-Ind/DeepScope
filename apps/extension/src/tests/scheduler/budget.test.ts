import { describe, expect, it } from 'vitest';

import * as budget from '../../lib/scheduler/budget.ts';

describe('scheduler transient budget', () => {
	const limit = { jobs: 2, bytes: 1_024 } as const;

	it('accepts work that fits both count and byte limits', () => {
		const pool = budget.create(limit);
		expect(budget.reserve(pool, 512)).toBeDefined();
		expect(budget.reserve(pool, 512)).toBeDefined();
		expect(budget.reserve(budget.create(limit), 1_024)).toBeDefined();
	});

	it('rejects the next item once the job-count limit is reached', () => {
		const pool = budget.create(limit);
		budget.reserve(pool, 0);
		budget.reserve(pool, 0);
		expect(budget.reserve(pool, 1)).toBeUndefined();
	});

	it('rejects one byte beyond the byte limit', () => {
		expect(budget.reserve(budget.create(limit), 1_025)).toBeUndefined();
		const pool = budget.create(limit);
		budget.reserve(pool, 900);
		expect(budget.reserve(pool, 125)).toBeUndefined();
	});

	it('returns capacity when a lease is released, once', () => {
		const pool = budget.create(limit);
		const lease = budget.reserve(pool, 1_000)!;
		expect(budget.reserve(pool, 100)).toBeUndefined();
		lease.release();
		lease.release();
		expect(budget.reserve(pool, 1_024)).toBeDefined();
		expect(budget.reserve(pool, 1)).toBeUndefined();
	});

	it('keeps the DeepScope limits', () => {
		expect(budget.LIMIT).toEqual({ jobs: 8, bytes: 12 * 1024 * 1024 });
	});
});
