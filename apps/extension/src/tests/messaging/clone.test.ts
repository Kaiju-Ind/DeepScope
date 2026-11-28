/**
 * Results cross extension contexts through comctx and the browser's structured
 * clone. `@utils/result` freezes `ok` and `fail` values; this pins that a frozen
 * result arrives on the other side as the same plain `{ ok, value | failure }`.
 */
import { defineProxy, type Adapter, type Message } from 'comctx';
import { describe, expect, it } from 'vitest';

import { errorResponse, ok, type ExtensionResult } from "../../lib/messaging/result.ts";

type Listener = (message: Partial<Message>) => void;

/** Two adapters joined by an asynchronous structured-clone hop, like `runtime.sendMessage`. */
function link(): readonly [Adapter, Adapter] {
	const ends = [new Set<Listener>(), new Set<Listener>()] as const;
	const adapter = (self: 0 | 1): Adapter => ({
		sendMessage(message) {
			const copy = structuredClone(message);
			queueMicrotask(() => {
				for (const listener of ends[self === 0 ? 1 : 0]) listener(copy);
			});
		},
		onMessage(callback) {
			ends[self].add(callback);
			return () => {
				ends[self].delete(callback);
			};
		},
	});
	return [adapter(0), adapter(1)];
}

interface Api {
	succeed(): Promise<ExtensionResult<{ readonly count: number }>>;
	reject(): Promise<ExtensionResult<never>>;
}

describe('results over comctx', () => {
	it('arrive as plain success and failure objects', async () => {
		const [provide, inject] = defineProxy((): Api => ({
			succeed: async () => ok({ count: 2 }),
			reject: async () => errorResponse('NO_ACTIVE_TAB', 'No tab.'),
		}), { namespace: 'test.clone', heartbeatCheck: false, transfer: false });
		const [server, client] = link();
		provide(server);
		const api = inject(client);

		const success = await api.succeed();
		const failure = await api.reject();

		expect(Object.isFrozen(ok({ count: 2 }))).toBe(true);
		expect(success).toEqual({ ok: true, value: { count: 2 } });
		expect(failure).toEqual({ ok: false, failure: { code: 'NO_ACTIVE_TAB', message: 'No tab.' } });
		expect(failure).not.toHaveProperty('error');
	});
});
