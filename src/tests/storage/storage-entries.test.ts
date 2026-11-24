import { describe, expect, it, vi } from 'vitest';

import { readStorageEntries, readStorageKeys } from '@/utils/storage-entries';

/** A storage area that refuses any `get` returning more than `limit` characters of JSON, like Safari's per-call cap. */
function cappedArea(values: Record<string, unknown>, limit: number, withGetKeys = true) {
	const get = vi.fn(async (keys?: null | string | readonly string[]) => {
		const wanted = keys === null || keys === undefined ? Object.keys(values) : typeof keys === 'string' ? [keys] : keys;
		const out = Object.fromEntries(wanted.filter((key) => key in values).map((key) => [key, values[key]]));
		if (JSON.stringify(out).length > limit) throw new Error('Invalid call to browser.storage.local.get(). It exceeded maximum data size allowed per call.');
		return out;
	});
	return { get, ...(withGetKeys ? { getKeys: vi.fn(async () => Object.keys(values)) } : {}) };
}

describe('readStorageEntries', () => {
	const values = Object.fromEntries([
		...Array.from({ length: 30 }, (_, i) => [`diagnostics:record:${i}`, 'r'.repeat(100)]),
		...Array.from({ length: 30 }, (_, i) => [`rd:session:${i}`, 's'.repeat(100)]),
		['diagnostics:record:huge', 'h'.repeat(5_000)],
	]);

	it('reads only wanted keys, in batches small enough for a capped area', async () => {
		const area = cappedArea(values, 2_000);
		await expect(area.get(null)).rejects.toThrow(/maximum data size/);
		area.get.mockClear();
		const unreadable: string[] = [];
		const entries = await readStorageEntries(area, (key) => key.startsWith('diagnostics:record:'), (key) => unreadable.push(key));
		expect(entries.map(([key]) => key).sort()).toEqual(Array.from({ length: 30 }, (_, i) => `diagnostics:record:${i}`).sort());
		expect(unreadable).toEqual(['diagnostics:record:huge']);
		expect(area.get).not.toHaveBeenCalledWith(null);
	});

	it('falls back to get(null) where the area cannot list keys', async () => {
		const area = cappedArea({ 'a:1': 1, 'b:1': 2 }, 1_000, false);
		await expect(readStorageEntries(area, (key) => key.startsWith('a:'))).resolves.toEqual([['a:1', 1]]);
		await expect(readStorageKeys(area, (key) => key.startsWith('b:'))).resolves.toEqual(['b:1']);
	});

	it('lists keys without reading values when it can', async () => {
		const area = cappedArea(values, 10);
		await expect(readStorageKeys(area, (key) => key === 'rd:session:3')).resolves.toEqual(['rd:session:3']);
		expect(area.get).not.toHaveBeenCalled();
	});
});
