import { describe, expect, it, vi } from 'vitest';

import * as fence from '@/utils/fence';

describe('keyed mutation fence', () => {
	it('serializes one key while independent keys can continue', async () => {
		let releaseFirst!: () => void;
		const first = fence.create<number>();
		const events: string[] = [];
		const one = first.run(7, async () => {
			events.push('first-start');
			await new Promise<void>((resolve) => { releaseFirst = resolve; });
			events.push('first-end');
		});
		const sameKey = first.run(7, async () => { events.push('same-key'); });
		const otherKey = first.run(8, async () => { events.push('other-key'); });

		await otherKey;
		expect(events).toEqual(['first-start', 'other-key']);
		releaseFirst();
		await Promise.all([one, sameKey]);
		expect(events).toEqual(['first-start', 'other-key', 'first-end', 'same-key']);
	});

	it('releases a key after a failed mutation', async () => {
		const keyed = fence.create<number>();
		await expect(keyed.run(7, async () => { throw new Error('failed'); })).rejects.toThrow('failed');
		const next = vi.fn(async () => undefined);
		await keyed.run(7, next);
		expect(next).toHaveBeenCalledOnce();
	});
});
