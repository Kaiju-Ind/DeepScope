import { afterEach, describe, expect, it, vi } from 'vitest';

async function loadHarness() {
	vi.resetModules();
	let listener: ((message: unknown) => unknown) | undefined;
	const sendMessage = vi.fn(async (_message: unknown) => undefined);
	vi.doMock('wxt/browser', () => ({
		browser: {
			runtime: {
				onMessage: {
					addListener(next: (message: unknown) => unknown) {
						listener = next;
					},
				},
				sendMessage,
			},
		},
	}));

	const [{ Host }, { MATCHER_OFFSCREEN_CHANNEL }] = await Promise.all([
		import('@/lib/matcher/offscreen/host'),
		import('@/lib/matcher/contracts'),
	]);
	const host = new Host();
	host.start();
	if (!listener) throw new Error('Matcher host did not register its runtime message listener.');
	return { listener, sendMessage, channel: MATCHER_OFFSCREEN_CHANNEL };
}

async function command(listener: (message: unknown) => unknown, message: unknown): Promise<unknown> {
	return await listener(message);
}

afterEach(() => {
	vi.useRealTimers();
	vi.doUnmock('wxt/browser');
	vi.resetModules();
});

describe('offscreen matcher host lifecycle watchdog', { concurrent: false }, () => {
	it('expires lifecycle leases independently instead of clearing recently touched work', async () => {
		vi.useFakeTimers();
		vi.setSystemTime(1_700_000_000_000);
		const harness = await loadHarness();

		await command(harness.listener, {
			channel: harness.channel,
			type: 'matcher.lifecycle-touch',
			lifecycleId: 'lifecycle-a',
			tabId: 7,
		});
		await vi.advanceTimersByTimeAsync(20_000);
		await command(harness.listener, {
			channel: harness.channel,
			type: 'matcher.lifecycle-touch',
			lifecycleId: 'lifecycle-b',
			tabId: 8,
		});

		await vi.advanceTimersByTimeAsync(10_000);
		expect(harness.sendMessage).not.toHaveBeenCalled();

		await vi.advanceTimersByTimeAsync(20_000);
		expect(harness.sendMessage).toHaveBeenCalledTimes(1);
		expect(harness.sendMessage).toHaveBeenCalledWith(expect.objectContaining({
			channel: harness.channel,
			type: 'matcher.host-idle',
		}));
	});

	it('becomes disposable immediately after the final lifecycle is explicitly released', async () => {
		vi.useFakeTimers();
		const harness = await loadHarness();

		await command(harness.listener, {
			channel: harness.channel,
			type: 'matcher.lifecycle-touch',
			lifecycleId: 'lifecycle-a',
			tabId: 7,
		});
		await command(harness.listener, {
			channel: harness.channel,
			type: 'matcher.lifecycle-release',
			lifecycleId: 'lifecycle-a',
		});

		expect(harness.sendMessage).toHaveBeenCalledTimes(1);
		expect(vi.getTimerCount()).toBe(0);
	});

	it('reports an earlier idle generation as stale after new lifecycle work', async () => {
		vi.useFakeTimers();
		const harness = await loadHarness();
		const touch = (lifecycleId: string) => command(harness.listener, {
			channel: harness.channel,
			type: 'matcher.lifecycle-touch',
			lifecycleId,
			tabId: 7,
		});

		await touch('lifecycle-a');
		await command(harness.listener, { channel: harness.channel, type: 'matcher.lifecycle-release', lifecycleId: 'lifecycle-a' });
		const notice = harness.sendMessage.mock.calls.at(-1)?.[0] as unknown as { type: string; generation: number };
		expect(notice).toMatchObject({ type: 'matcher.host-idle', generation: expect.any(Number) });
		await expect(command(harness.listener, { channel: harness.channel, type: 'matcher.idle-query', generation: notice.generation }))
			.resolves.toMatchObject({ ok: true, idle: true, generation: notice.generation });

		// The next staged pass touches its lifecycle before the background acts on the notice.
		await touch('lifecycle-b');
		await expect(command(harness.listener, { channel: harness.channel, type: 'matcher.idle-query', generation: notice.generation }))
			.resolves.toMatchObject({ ok: true, idle: false });
	});
});
