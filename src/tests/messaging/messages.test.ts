import { describe, expect, it, vi } from 'vitest';

import {
	BACKGROUND_RPC_CHANNEL,
	BACKGROUND_RPC_NAMESPACE,
} from '@/lib/messaging/adapters/background';
import { CONTENT_RPC_CHANNEL, CONTENT_RPC_NAMESPACE } from '@/lib/messaging/adapters/content';
import { RpcTimeoutError, contentScriptFailure, withTimeout } from '@/lib/messaging/rpc';
import { errorResponse, ok } from '@/lib/shared/result';

describe('messaging contract helpers', () => {
	it('returns stable success envelopes', () => {
		expect(ok({ value: 42 })).toEqual({ ok: true, value: { value: 42 } });
	});

	it('returns stable error envelopes', () => {
		expect(errorResponse('CONTENT_SCRIPT_UNAVAILABLE', 'Missing')).toEqual({
			ok: false,
			error: {
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

	it('maps content RPC failures into typed unavailable errors', () => {
		expect(contentScriptFailure(new RpcTimeoutError('Timed out'))).toMatchObject({
			ok: false,
			error: {
				code: 'CONTENT_SCRIPT_UNAVAILABLE',
				message: 'Timed out',
			},
		});
	});

	it('uses stable namespaces and channels', () => {
		expect(BACKGROUND_RPC_NAMESPACE).toContain('background-rpc');
		expect(BACKGROUND_RPC_CHANNEL).toBe('background-rpc');
		expect(CONTENT_RPC_NAMESPACE).toContain('content-rpc');
		expect(CONTENT_RPC_CHANNEL).toBe('content-rpc');
	});
});
