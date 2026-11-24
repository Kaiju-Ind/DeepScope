/**
 * Lifetime details of `withTimeout` beyond messages.test.ts: what it leaves on
 * the parent signal and on the operation's signal once the wait settles.
 */
import { describe, expect, it, vi } from 'vitest';

import { RpcTimeoutError, withTimeout } from '@/lib/messaging/rpc';

/** A parent signal that counts its live abort listeners. */
function counted() {
	const controller = new AbortController();
	let listeners = 0;
	const add = controller.signal.addEventListener.bind(controller.signal);
	const remove = controller.signal.removeEventListener.bind(controller.signal);
	controller.signal.addEventListener = ((type: string, listener: EventListener, options?: AddEventListenerOptions) => {
		if (type === 'abort') listeners += 1;
		add(type, listener, options);
	}) as typeof controller.signal.addEventListener;
	controller.signal.removeEventListener = ((type: string, listener: EventListener) => {
		if (type === 'abort') listeners -= 1;
		remove(type, listener);
	}) as typeof controller.signal.removeEventListener;
	return { controller, listeners: () => listeners };
}

describe('withTimeout lifetime', () => {
	it('removes its parent listener and leaves the operation signal untouched after success', async () => {
		const owner = counted();
		let child!: AbortSignal;
		await expect(withTimeout(async (signal) => {
			child = signal;
			return 'done';
		}, 1_000, 'Timed out.', { signal: owner.controller.signal })).resolves.toBe('done');

		expect(owner.listeners()).toBe(0);
		expect(child.aborted).toBe(false);
	});

	it('removes its parent listener after a timeout', async () => {
		vi.useFakeTimers();
		try {
			const owner = counted();
			const wait = withTimeout(new Promise(() => undefined), 50, 'Timed out.', { signal: owner.controller.signal });
			const assertion = expect(wait).rejects.toBeInstanceOf(RpcTimeoutError);
			await vi.advanceTimersByTimeAsync(50);
			await assertion;
			expect(owner.listeners()).toBe(0);
		} finally {
			vi.useRealTimers();
		}
	});

	it('wraps a non-Error parent reason once, for both the operation and the caller', async () => {
		const owner = counted();
		let child!: AbortSignal;
		const wait = withTimeout((signal) => {
			child = signal;
			return new Promise<never>(() => undefined);
		}, 1_000, 'Timed out.', { signal: owner.controller.signal });
		owner.controller.abort('tab closed');

		const error = await wait.catch((reason: unknown) => reason);
		expect(error).toBeInstanceOf(DOMException);
		expect(error).toMatchObject({ name: 'AbortError', message: 'tab closed' });
		expect(child.reason).toBe(error);
	});

	it('lets an already-settled promise win against an already-aborted parent', async () => {
		const owner = counted();
		owner.controller.abort(new Error('gone'));
		const done = Promise.resolve('done');
		await done;
		await expect(withTimeout(done, 1_000, 'Timed out.', { signal: owner.controller.signal })).resolves.toBe('done');
	});
});
