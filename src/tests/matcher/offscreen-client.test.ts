import { afterEach, describe, expect, it, vi } from 'vitest';

async function loadHarness() {
	vi.resetModules();
	let listener: ((message: unknown) => unknown) | undefined;
	let documentExists = true;
	let resolvePartition!: (value: unknown) => void;
	const partitionResponse = new Promise<unknown>((resolve) => {
		resolvePartition = resolve;
	});
	const closeDocument = vi.fn(async () => {
		documentExists = false;
	});
	const sendMessage = vi.fn((message: { type?: string }) => {
		if (message.type === 'matcher.run-partition') return partitionResponse;
		return Promise.resolve({ ok: true });
	});

	vi.doMock('wxt/browser', () => ({
		browser: {
			runtime: {
				onMessage: {
					addListener(next: (message: unknown) => unknown) {
						listener = next;
					},
				},
				sendMessage,
				getURL: vi.fn((path: string) => `chrome-extension://deepscope${path}`),
			},
			offscreen: {
				Reason: { WORKERS: 'WORKERS' },
				createDocument: vi.fn(async () => {
					documentExists = true;
				}),
				closeDocument,
				hasDocument: vi.fn(async () => documentExists),
			},
		},
	}));

	const [client, contracts] = await Promise.all([
		import('@/lib/matcher/offscreen/client'),
		import('@/lib/matcher/contracts'),
	]);
	client.start();
	if (!listener) throw new Error('Offscreen client did not register its host-idle listener.');
	return { client, contracts, closeDocument, listener, resolvePartition };
}

async function flush(): Promise<void> {
	await Promise.resolve();
	await Promise.resolve();
}

afterEach(() => {
	vi.doUnmock('wxt/browser');
	vi.resetModules();
});

describe.sequential('offscreen matcher client lifecycle', () => {
	it('remembers host-idle while the final partition request is active and closes after release', async () => {
		const harness = await loadHarness();
		const request = {
			task: {
				job: { jobId: 'job-1', tabId: 7, windowId: 1, expectedUrl: 'https://example.com' },
				partitionId: 'url-0',
				kind: 'url',
			},
			workerIndex: 0,
		} as Parameters<typeof harness.client.runPartition>[0];
		const run = harness.client.runPartition(request);
		await flush();

		harness.listener({
			channel: harness.contracts.MATCHER_OFFSCREEN_CHANNEL,
			type: 'matcher.host-idle',
			idleAt: Date.now(),
		});
		await flush();
		expect(harness.closeDocument).not.toHaveBeenCalled();

		harness.resolvePartition({
			ok: true,
			value: { partitionId: 'url-0', completedAt: Date.now() },
		});
		await run;
		await flush();

		expect(harness.closeDocument).toHaveBeenCalledTimes(1);
	});
});
