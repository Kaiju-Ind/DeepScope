// Vendored from Kaiju-Ind/Utils packages/pool/pressure.test.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
import { expect } from '@std/expect';
import { describe, it } from 'node:test';

import * as context from '@utils/context';
import * as pool from '@utils/pool';

describe('pool pressure', () => {
	it('never exceeds maximum ownership under concurrent acquisition pressure', async () => {
		await using owner = context.create({ id: 'pool-pressure' });
		let open = 0;
		let peak = 0;
		let next = 0;
		await using values = await pool.create({
			ctx: owner,
			maximum: 4,
			maximumWaiting: 100,
			async create() {
				open += 1;
				peak = Math.max(peak, open);
				await Promise.resolve();
				return { id: ++next };
			},
			close() {
				open -= 1;
			},
		});

		await Promise.all(Array.from({ length: 100 }, async () => {
			await using lease = await values.acquire(owner);
			await Promise.resolve(lease.value.id);
		}));

		expect(peak).toBeLessThanOrEqual(4);
		expect(values.stats()).toMatchObject({ leased: 0, creating: 0, waiting: 0 });
	});
});
