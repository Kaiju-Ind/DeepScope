import { expect, it, vi } from 'vitest';
import { timeAsyncSpan, timeSyncSpan } from '@/lib/diagnostics/timing';

const debug = vi.hoisted(() => vi.fn());
vi.mock('@/lib/diagnostics/logging', () => ({ get: () => ({ debug }) }));

it.each([false, true])('logs timed failures according to the matcher privacy flag: %s', async (incognito) => {
	const original = new Error('Matcher failed at https://failure.example/private/source');
	const context = { incognito, surface: 'pipeline' as const, traceId: 'timing-fixture' };
	debug.mockClear();
	expect(() => timeSyncSpan('matcher.sync', context, () => { throw original; })).toThrow(original);
	await expect(timeAsyncSpan('matcher.async', context, async () => { throw original; })).rejects.toBe(original);
	expect(debug).toHaveBeenCalledTimes(2);
	for (const [, properties] of debug.mock.calls) {
		expect(properties).toMatchObject({ failed: true, traceId: 'timing-fixture' });
		if (incognito) {
			expect(properties).toMatchObject({ errorType: 'Error' });
			expect(properties).not.toHaveProperty('message');
		} else {
			expect(properties).toHaveProperty('message', original.message);
		}
	}
});
