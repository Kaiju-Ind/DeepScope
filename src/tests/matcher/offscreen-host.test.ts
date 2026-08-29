import { afterEach, describe, expect, it, vi } from 'vitest';

async function loadHarness() {
	vi.resetModules();
	let listener: ((message: unknown) => unknown) | undefined;
	const sendMessage = vi.fn(async () => undefined);
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

describe.sequential('offscreen matcher host lifecycle watchdog', () => {
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
});
