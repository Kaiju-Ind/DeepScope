import { afterEach, describe, expect, it, vi } from 'vitest';
import { defineProxy, type Adapter, type Message, type MessageMeta } from 'comctx';
import type { Browser } from 'wxt/browser';

import { BACKGROUND_RPC_NAMESPACE, createBackgroundClientAdapter } from '../../lib/messaging/adapters/background.ts';
import { CONTENT_RPC_NAMESPACE, createContentClientAdapter } from '../../lib/messaging/adapters/content.ts';

/** Browser reply subscriptions retained by the real messaging adapters. */
type Listener = (message: unknown, sender: Browser.runtime.MessageSender) => void;

/** Replace only browser delivery so the installed RPC implementation owns each request. */
const transport = vi.hoisted(() => ({
	listeners: new Set<Listener>(),
	runtime: vi.fn(),
	tab: vi.fn(),
}));

vi.mock('wxt/browser', () => ({
	browser: {
		runtime: {
			sendMessage: transport.runtime,
			onMessage: {
				addListener: (listener: Listener) => transport.listeners.add(listener),
				removeListener: (listener: Listener) => transport.listeners.delete(listener),
			},
		},
		tabs: { sendMessage: transport.tab },
	},
}));

/** Two independent requests let a failed delivery overlap a live reply subscription. */
interface Api {
	query(): Promise<string>;
	hold(): Promise<string>;
}

/** Use the same heartbeat and transfer options as both production client factories. */
function client<Meta extends MessageMeta>(adapter: Adapter<Meta>, namespace: string): Api {
	const [, inject] = defineProxy(() => ({}) as Api, { namespace, heartbeatCheck: false, transfer: false });
	return inject(adapter);
}

/** Return a provider response through the browser listener, including the pinned content document. */
function reply(request: Message, result: { data?: string; error?: string }): void {
	const sender = { tab: { id: 7 }, frameId: 0, documentId: 'document-7' } as Browser.runtime.MessageSender;
	for (const listener of transport.listeners) {
		listener({ ...request, sender: { type: 'provider' }, ...result }, sender);
	}
}

/** Route both browser APIs through one test delivery owner without replacing either adapter. */
function deliver(send: (message: Message) => Promise<void>): void {
	transport.runtime.mockImplementation(send);
	transport.tab.mockImplementation((_tabId: number, message: Message) => send(message));
}

afterEach(() => {
	transport.listeners.clear();
	vi.resetAllMocks();
});

describe.each([
	{ name: 'background', create: () => client(createBackgroundClientAdapter('sidepanel'), BACKGROUND_RPC_NAMESPACE) },
	{ name: 'content', create: () => client(createContentClientAdapter(7, 0, 'document-7'), CONTENT_RPC_NAMESPACE) },
])('$name RPC request subscriptions', ({ create }) => {
	it('releases every failed request and preserves the original transport error', async () => {
		const error = new Error('Receiving end does not exist.');
		deliver(async () => { throw error; });
		const api = create();
		for (let attempt = 0; attempt < 3; attempt += 1) {
			await expect(api.query()).rejects.toBe(error);
			expect(transport.listeners.size).toBe(0);
		}
	});

	it('keeps a concurrent request subscribed when another delivery fails', async () => {
		const held = Promise.withResolvers<Message>();
		const error = new Error('Extension context invalidated.');
		deliver(async (message) => {
			if (message.path[0] === 'hold') held.resolve(message);
			else throw error;
		});
		const api = create();
		const pending = api.hold();
		const request = await held.promise;
		await expect(api.query()).rejects.toBe(error);
		expect(transport.listeners.size).toBe(1);
		reply(request, { data: 'still listening' });
		await expect(pending).resolves.toBe('still listening');
		expect(transport.listeners.size).toBe(0);
	});

	it.each([
		{ result: { data: 'received' }, error: false },
		{ result: { error: 'Provider rejected the request.' }, error: true },
	])('releases a provider response with error=$error', async ({ result, error }) => {
		deliver(async (message) => { reply(message, result); });
		const operation = create().query();
		if (error) await expect(operation).rejects.toThrow('Provider rejected the request.');
		else await expect(operation).resolves.toBe('received');
		expect(transport.listeners.size).toBe(0);
	});
});
