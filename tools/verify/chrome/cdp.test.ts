import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { connect } from './cdp.mjs';

/** Controllable transport for connection loss and deadlines without a browser process. */
class Socket extends EventTarget {
	static CLOSED = 3;
	static current: Socket;
	readyState = 0;
	send = vi.fn();
	close = vi.fn(() => {
		this.readyState = Socket.CLOSED;
		this.dispatchEvent(new Event('close'));
	});

	constructor() {
		super();
		Socket.current = this;
	}

	/** Finish the initial connection when the test permits browser delivery. */
	open(): void {
		this.readyState = 1;
		this.dispatchEvent(new Event('open'));
	}

	/** Deliver a protocol envelope through the same event interface as native WebSocket. */
	message(value: unknown): void {
		this.dispatchEvent(new MessageEvent('message', { data: JSON.stringify(value) }));
	}
}

/** Open one short-lived client so timeout assertions do not depend on wall-clock scheduling. */
async function opened() {
	const pending = connect('ws://127.0.0.1:9222/target', { timeoutMs: 100 });
	Socket.current.open();
	return pending;
}

beforeEach(() => {
	vi.useFakeTimers();
	vi.stubGlobal('WebSocket', Socket);
});

afterEach(() => {
	Socket.current.close();
	vi.useRealTimers();
	vi.unstubAllGlobals();
});

describe('Chrome target connection lifetime', () => {
	it('unwraps command results once and releases their deadlines', async () => {
		const client = await opened();
		const first = client.send('Runtime.enable');
		const second = client.send('Runtime.evaluate', { expression: '1' });
		Socket.current.message({ id: 2, result: { result: { value: 1 } } });
		Socket.current.message({ id: 1, result: {} });
		await expect(second).resolves.toEqual({ result: { value: 1 } });
		await expect(first).resolves.toEqual({});
		expect(vi.getTimerCount()).toBe(0);
	});

	it.each(['close', 'error'])('rejects all pending commands after transport %s', async (event) => {
		const client = await opened();
		const first = expect(client.send('Runtime.enable')).rejects.toThrow(/Chrome target connection/u);
		const second = expect(client.send('Log.enable')).rejects.toThrow(/Chrome target connection/u);
		Socket.current.dispatchEvent(new Event(event));
		await Promise.all([first, second]);
		expect(vi.getTimerCount()).toBe(0);
		await expect(client.send('Page.enable')).rejects.toThrow(/Chrome target connection/u);
		expect(Socket.current.send).toHaveBeenCalledTimes(2);
	});

	it('rejects a connection that never opens and closes its socket', async () => {
		const result = expect(connect('ws://127.0.0.1:9222/target', { timeoutMs: 100 })).rejects.toThrow('did not connect within 100ms');
		await vi.advanceTimersByTimeAsync(100);
		await result;
		expect(Socket.current.close).toHaveBeenCalledTimes(1);
		expect(vi.getTimerCount()).toBe(0);
	});

	it('bounds a silent command without dropping a different reply', async () => {
		const client = await opened();
		const stalled = expect(client.send('Runtime.enable')).rejects.toThrow('Runtime.enable did not respond within 100ms');
		const completed = client.send('Log.enable');
		Socket.current.message({ id: 2, result: {} });
		await expect(completed).resolves.toEqual({});
		await vi.advanceTimersByTimeAsync(100);
		await stalled;
		expect(vi.getTimerCount()).toBe(0);
	});

	it('rejects a provider error without retaining the command timer', async () => {
		const client = await opened();
		const result = expect(client.send('Runtime.enable')).rejects.toThrow('Unknown method.');
		Socket.current.message({ id: 1, error: { message: 'Unknown method.' } });
		await result;
		expect(vi.getTimerCount()).toBe(0);
	});

	it('preserves a synchronous send error and releases the command deadline', async () => {
		const client = await opened();
		const error = new Error('Socket became unavailable.');
		Socket.current.send.mockImplementationOnce(() => { throw error; });
		await expect(client.send('Runtime.enable')).rejects.toBe(error);
		expect(vi.getTimerCount()).toBe(0);
	});

	it('releases event subscriptions and pending commands when the caller closes', async () => {
		const client = await opened();
		const event = vi.fn();
		client.on('Runtime.exceptionThrown', event);
		Socket.current.message({ method: 'Runtime.exceptionThrown', params: { text: 'before' } });
		const pending = expect(client.send('Runtime.enable')).rejects.toThrow('closed by the validator');
		client.close();
		client.close();
		Socket.current.message({ method: 'Runtime.exceptionThrown', params: { text: 'after' } });
		await pending;
		expect(event).toHaveBeenCalledOnce();
		expect(Socket.current.close).toHaveBeenCalledTimes(1);
		expect(vi.getTimerCount()).toBe(0);
	});

	it('rejects outstanding work when Chrome returns malformed JSON', async () => {
		const client = await opened();
		const pending = expect(client.send('Runtime.enable')).rejects.toBeInstanceOf(SyntaxError);
		Socket.current.dispatchEvent(new MessageEvent('message', { data: '{broken' }));
		await pending;
		expect(vi.getTimerCount()).toBe(0);
	});
});
