import { afterEach, describe, expect, it, vi } from 'vitest';

/** Host-side answer to `matcher.idle-query`; tests flip it to model a host that took new work. */
type IdleAnswer = { readonly idle: boolean; readonly generation: number };

async function loadHarness(idleAnswer: IdleAnswer = { idle: true, generation: 1 }) {
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
		if (message.type === 'matcher.idle-query') return Promise.resolve({ ok: true, ...idleAnswer });
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
	const hostIdle = (generation: number) => listener!({
		channel: contracts.MATCHER_OFFSCREEN_CHANNEL,
		type: 'matcher.host-idle',
		idleAt: Date.now(),
		generation,
	});
	return { client, contracts, closeDocument, sendMessage, hostIdle, resolvePartition };
}

/** A partition request whose only meaningful field for the client is its job identity. */
function partitionRequest() {
	return {
		task: {
			job: { jobId: 'job-1', tabId: 7, windowId: 1, expectedUrl: 'https://example.com' },
			partitionId: 'url-0',
			kind: 'url',
		},
		workerIndex: 0,
	} as Parameters<Awaited<ReturnType<typeof loadHarness>>['client']['runPartition']>[0];
}

afterEach(() => {
	vi.doUnmock('wxt/browser');
	vi.resetModules();
});

describe('offscreen matcher client lifecycle', { concurrent: false }, () => {
	it('remembers host-idle while a partition request is active and closes after the host confirms idleness', async () => {
		const harness = await loadHarness({ idle: true, generation: 4 });
		const run = harness.client.runPartition(partitionRequest());
		await vi.waitFor(() => expect(harness.sendMessage).toHaveBeenCalledWith(expect.objectContaining({ type: 'matcher.run-partition' })));

		harness.hostIdle(4);
		expect(harness.closeDocument).not.toHaveBeenCalled();

		harness.resolvePartition({ ok: true, value: { partitionId: 'url-0', completedAt: Date.now() } });
		await run;

		await vi.waitFor(() => expect(harness.closeDocument).toHaveBeenCalledTimes(1));
		expect(harness.sendMessage).toHaveBeenCalledWith(expect.objectContaining({ type: 'matcher.idle-query', generation: 4 }));
	});

	it('keeps a host whose idle notice went stale because it accepted new work', async () => {
		// The host became idle at generation 1, then a lifecycle touch for the next
		// staged pass moved it to generation 2 before the notice arrived.
		const harness = await loadHarness({ idle: false, generation: 2 });

		harness.hostIdle(1);

		await vi.waitFor(() => expect(harness.sendMessage).toHaveBeenCalledWith(
			expect.objectContaining({ type: 'matcher.idle-query', generation: 1 }),
		));
		// Let the close attempt finish its decision before asserting nothing closed.
		await new Promise((resolve) => setTimeout(resolve, 0));
		expect(harness.closeDocument).not.toHaveBeenCalled();
	});

});
