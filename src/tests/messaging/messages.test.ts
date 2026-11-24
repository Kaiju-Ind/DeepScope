import { describe, expect, it, vi } from 'vitest';

import {
	BACKGROUND_RPC_CHANNEL,
	BACKGROUND_RPC_NAMESPACE,
} from '@/lib/messaging/adapters/background';
import { CONTENT_RPC_CHANNEL, CONTENT_RPC_NAMESPACE } from '@/lib/messaging/adapters/content';
import { RpcTimeoutError, contentScriptFailure, injectionFailure, withLivenessDeadline, withTimeout } from '@/lib/messaging/rpc';
import {
	SIDE_PANEL_ACTION_NOTIFICATION_TYPE,
	SIDE_PANEL_TAB_NOTIFICATION_TYPE,
	isSidePanelActionNotification,
	isSidePanelTabNotification,
	isSidePanelTabUpdateChange,
} from '@/lib/messaging';
import { errorResponse, ok } from '@/lib/messaging/result';

describe('messaging contract helpers', () => {
	it('returns stable success envelopes', () => {
		expect(ok({ value: 42 })).toEqual({ ok: true, value: { value: 42 } });
	});

	it('returns stable error envelopes', () => {
		expect(errorResponse('CONTENT_SCRIPT_UNAVAILABLE', 'Missing')).toEqual({
			ok: false,
			failure: {
				code: 'CONTENT_SCRIPT_UNAVAILABLE',
				message: 'Missing',
				stack: undefined,
			},
		});
	});

	it('times out stalled content script RPC calls', async () => {
		vi.useFakeTimers();
		try {
			const operation = withTimeout(
				new Promise<string>(() => undefined),
				100,
				'Content script did not respond before the messaging timeout.',
			);

			const assertion = expect(operation).rejects.toMatchObject({
				name: 'RpcTimeoutError',
				message: 'Content script did not respond before the messaging timeout.',
			});

			await vi.advanceTimersByTimeAsync(100);
			await assertion;
		} finally {
			vi.useRealTimers();
		}
	});

	it('aborts a cancelable operation when its deadline expires', async () => {
		vi.useFakeTimers();
		try {
			let abortedWith: unknown;
			const operation = withTimeout(
				(signal) => new Promise<string>((_resolve, reject) => {
					signal.addEventListener('abort', () => {
						abortedWith = signal.reason;
						reject(signal.reason);
					}, { once: true });
				}),
				100,
				'Cancelable operation timed out.',
			);
			const assertion = expect(operation).rejects.toMatchObject({
				name: 'RpcTimeoutError',
				message: 'Cancelable operation timed out.',
			});

			await vi.advanceTimersByTimeAsync(100);
			await assertion;
			expect(abortedWith).toMatchObject({ name: 'RpcTimeoutError' });
		} finally {
			vi.useRealTimers();
		}
	});

	it('relays parent cancellation into a cancelable operation', async () => {
		const controller = new AbortController();
		let childSignal: AbortSignal | undefined;
		const operation = withTimeout(
			(signal) => {
				childSignal = signal;
				return new Promise<string>((_resolve, reject) => {
					signal.addEventListener('abort', () => reject(signal.reason), { once: true });
				});
			},
			1_000,
			'Operation timed out.',
			{ signal: controller.signal },
		);
		const reason = new DOMException('Tab closed.', 'AbortError');
		controller.abort(reason);

		await expect(operation).rejects.toBe(reason);
		expect(childSignal?.aborted).toBe(true);
		expect(childSignal?.reason).toBe(reason);
	});

	describe('withLivenessDeadline', () => {
		it('keeps waiting for a busy receiver that answers liveness probes', async () => {
			vi.useFakeTimers();
			try {
				let finish!: (value: string) => void;
				const operation = new Promise<string>((resolve) => { finish = resolve; });
				// Like a content script mid-scan: the probe is answered when the work ends.
				const isAlive = vi.fn(() => operation.then(() => true));
				const extended = vi.fn();
				const result = withLivenessDeadline(operation, 'Timed out.', { timeoutMs: 100, maxMs: 1_000, isAlive, onExtended: extended });

				await vi.advanceTimersByTimeAsync(250);
				finish('collected');
				await expect(result).resolves.toBe('collected');
				expect(isAlive).toHaveBeenCalledTimes(1);
			} finally {
				vi.useRealTimers();
			}
		});

		it('fails as a timeout when the receiver is gone', async () => {
			vi.useFakeTimers();
			try {
				const result = withLivenessDeadline(new Promise<string>(() => undefined), 'Timed out.', {
					timeoutMs: 100,
					maxMs: 1_000,
					isAlive: async () => false,
				});
				const assertion = expect(result).rejects.toBeInstanceOf(RpcTimeoutError);
				await vi.advanceTimersByTimeAsync(100);
				await assertion;
			} finally {
				vi.useRealTimers();
			}
		});

		it('stops at the hard cap even while probes keep succeeding', async () => {
			vi.useFakeTimers();
			try {
				const result = withLivenessDeadline(new Promise<string>(() => undefined), 'Timed out.', {
					timeoutMs: 100,
					maxMs: 350,
					isAlive: async () => true,
				});
				const assertion = expect(result).rejects.toBeInstanceOf(RpcTimeoutError);
				await vi.advanceTimersByTimeAsync(400);
				await assertion;
			} finally {
				vi.useRealTimers();
			}
		});

		it('passes through the receiver error and parent cancellation', async () => {
			await expect(withLivenessDeadline(Promise.reject(new Error('boom')), 'Timed out.', {
				timeoutMs: 100, maxMs: 1_000, isAlive: async () => true,
			})).rejects.toThrow('boom');

			const controller = new AbortController();
			const result = withLivenessDeadline(new Promise<string>(() => undefined), 'Timed out.', {
				timeoutMs: 1_000, maxMs: 5_000, isAlive: async () => true, signal: controller.signal,
			});
			const reason = new DOMException('Tab navigated.', 'AbortError');
			controller.abort(reason);
			await expect(result).rejects.toBe(reason);
		});
	});

	it('maps a browser refusal to script the page to a permission error', () => {
		expect(injectionFailure(new Error('Missing host permission for the tab'))).toMatchObject({
			ok: false,
			failure: { code: 'PERMISSION_DENIED' },
		});
		expect(injectionFailure(new Error('Cannot access contents of url "https://chromewebstore.google.com/".'))).toMatchObject({
			failure: { code: 'PERMISSION_DENIED' },
		});
		expect(injectionFailure(new Error('No tab with id: 4'))).toMatchObject({
			failure: { code: 'CONTENT_SCRIPT_UNAVAILABLE', message: 'No tab with id: 4' },
		});
	});

	it('maps content RPC failures into typed unavailable errors', () => {
		expect(contentScriptFailure(new RpcTimeoutError('Timed out'))).toMatchObject({
			ok: false,
			failure: {
				code: 'CONTENT_SCRIPT_UNAVAILABLE',
				message: 'Timed out',
			},
		});
	});

	it('validates side-panel action notifications', () => {
		expect(isSidePanelActionNotification({
			type: SIDE_PANEL_ACTION_NOTIFICATION_TYPE,
			tabId: 7,
			windowId: 3,
		})).toBe(true);
		expect(isSidePanelActionNotification({
			type: SIDE_PANEL_ACTION_NOTIFICATION_TYPE,
			tabId: '7',
			windowId: 3,
		})).toBe(false);
		expect(isSidePanelActionNotification({
			type: SIDE_PANEL_ACTION_NOTIFICATION_TYPE,
			tabId: 7,
		})).toBe(false);
		expect(isSidePanelActionNotification({ type: 'other', tabId: 7, windowId: 3 })).toBe(false);
	});

	it('validates side-panel tab lifecycle notifications', () => {
		expect(isSidePanelTabNotification({
			type: SIDE_PANEL_TAB_NOTIFICATION_TYPE,
			tabId: 9,
			windowId: 4,
			reason: 'activated',
		})).toBe(true);
		expect(isSidePanelTabNotification({
			type: SIDE_PANEL_TAB_NOTIFICATION_TYPE,
			tabId: 9,
			windowId: 4,
			reason: 'updated',
		})).toBe(true);
		expect(isSidePanelTabNotification({
			type: SIDE_PANEL_TAB_NOTIFICATION_TYPE,
			tabId: 9,
			windowId: 4,
			reason: 'removed',
		})).toBe(false);
		expect(isSidePanelTabNotification({
			type: SIDE_PANEL_TAB_NOTIFICATION_TYPE,
			tabId: '9',
			windowId: 4,
			reason: 'activated',
		})).toBe(false);
	});

	it('recognizes side-panel page identity updates', () => {
		expect(isSidePanelTabUpdateChange({ url: 'https://example.com/next' })).toBe(true);
		expect(isSidePanelTabUpdateChange({ status: 'loading' })).toBe(true);
		expect(isSidePanelTabUpdateChange({ status: 'complete' })).toBe(true);
		expect(isSidePanelTabUpdateChange({ status: 'unloaded' })).toBe(false);
		expect(isSidePanelTabUpdateChange({})).toBe(false);
	});

	it('uses stable namespaces and channels', () => {
		expect(BACKGROUND_RPC_NAMESPACE).toContain('background-rpc');
		expect(BACKGROUND_RPC_CHANNEL).toBe('background-rpc');
		expect(CONTENT_RPC_NAMESPACE).toContain('content-rpc');
		expect(CONTENT_RPC_CHANNEL).toBe('content-rpc');
	});
});
