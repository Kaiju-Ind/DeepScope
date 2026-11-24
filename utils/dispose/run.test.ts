// Vendored from Kaiju-Ind/Utils packages/dispose/run.test.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
import { describe, it } from 'node:test';
import { expect } from '@std/expect';
import { run, SuppressedError } from './mod.ts';

describe('bounded cleanup', () => {
	it('runs every cleanup in reverse order and retains primary failure identity', async () => {
		const primary = new Error('primary'), cleanup = new Error('cleanup');
		const order: number[] = [];
		const pending = run(() => Promise.reject(primary), [() => {
			order.push(1);
		}, () => {
			order.push(2);
			throw cleanup;
		}]);
		try {
			await pending;
			throw new Error('expected failure');
		} catch (error) {
			expect(error).toBeInstanceOf(SuppressedError);
			expect((error as SuppressedError).suppressed).toBe(primary);
			expect((error as SuppressedError).error).toBe(cleanup);
		}
		expect(order).toEqual([2, 1]);
	});
	it('continues after a cleanup timeout without claiming that callback stopped', async () => {
		let closed = false;
		await expect(run(() => Promise.resolve(1), [() => {
			closed = true;
		}, () => new Promise<void>(() => {})], 1)).rejects.toThrow(DOMException);
		expect(closed).toBe(true);
		await expect(run(() => Promise.reject(undefined), [])).rejects.toBeUndefined();
	});
});
