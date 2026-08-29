import { afterEach, describe, expect, it, vi } from 'vitest';

import type { AnalyzeVisibleTabInput } from '@/lib/messaging/analysis';
import { EXECUTION_SCHEMA_VERSION, type AnalysisWorkType } from '@/lib/scheduler/schema';

function input(): AnalyzeVisibleTabInput {
	return {
		target: {
			windowId: 1,
			tabId: 7,
			frameId: 0,
			url: 'https://example.com/',
			hostname: 'example.com',
			originHash: 'origin',
			urlHash: 'same-document',
			incognito: false,
		},
		mode: 'refresh',
		observe: 'none',
	};
}

async function flush(): Promise<void> {
	for (let index = 0; index < 20; index += 1) await Promise.resolve();
}

afterEach(() => {
	vi.doUnmock('@/lib/scheduler/database');
	vi.doUnmock('@/lib/scheduler/session');
	vi.resetModules();
});

describe.sequential('analysis claim fencing', () => {
	it('prevents a canceled old execution from deleting or resolving reused work identity', async () => {
		let durable: AnalysisWorkType | undefined;
		let claimSequence = 0;
		const removeClaim = vi.fn(async (id: string, token: string) => {
			if (!durable || durable.id !== id || durable.claimToken !== token) return false;
			durable = undefined;
			return true;
		});
		vi.doMock('@/lib/scheduler/database', () => ({
			admitAnalysis: vi.fn(async (work: AnalysisWorkType) => {
				if (durable) return { accepted: true as const, created: false, work: durable };
				durable = work;
				return { accepted: true as const, created: true, work };
			}),
			claim: vi.fn(async () => {
				if (!durable || durable.state !== 'queued') return undefined;
				claimSequence += 1;
				durable = {
					...durable,
					schemaVersion: EXECUTION_SCHEMA_VERSION,
					state: 'claimed',
					attempt: durable.attempt + 1,
					claimOwner: 'analysis-owner',
					claimToken: `claim-${claimSequence}`,
				};
				return durable;
			}),
			recoverClaims: vi.fn(async () => []),
			remove: vi.fn(async (id: string) => {
				if (durable?.id === id) durable = undefined;
			}),
			removeClaim,
			removeOtherSessions: vi.fn(async () => 0),
			removeTabKind: vi.fn(async (_sessionId: string, tabId: number) => {
				if (!durable || durable.tabId !== tabId) return [];
				const removed = [durable];
				durable = undefined;
				return removed;
			}),
			reprioritizeWindow: vi.fn(async () => 0),
			setPriority: vi.fn(async () => true),
		}));
		vi.doMock('@/lib/scheduler/session', () => ({
			createId: vi.fn(() => 'analysis-owner'),
			get: vi.fn(async () => 'browser-session'),
		}));

		const analysis = await import('@/lib/scheduler/analysis');
		let finishOld!: (value: { ok: false; error: { code: 'VALIDATION_ERROR'; message: string } }) => void;
		const oldResult = new Promise<{ ok: false; error: { code: 'VALIDATION_ERROR'; message: string } }>((resolve) => {
			finishOld = resolve;
		});
		const freshResult = { ok: false as const, error: { code: 'VALIDATION_ERROR' as const, message: 'fresh-result' } };
		const analyze = vi.fn()
			.mockImplementationOnce(async () => await oldResult)
			.mockImplementationOnce(async () => freshResult);
		const resolveTarget = vi.fn(async () => ({ ok: true as const, value: input().target }));
		const scheduler = analysis.create({ resolveTarget, analyze });

		const first = scheduler.analyze(input());
		await flush();
		expect(analyze).toHaveBeenCalledTimes(1);
		expect(durable?.claimToken).toBe('claim-1');

		await scheduler.cancelTab(7);
		await expect(first).resolves.toMatchObject({ ok: false });

		const second = scheduler.analyze(input());
		await flush();
		expect(durable?.state).toBe('queued');

		finishOld({ ok: false, error: { code: 'VALIDATION_ERROR', message: 'stale-result' } });
		await flush();

		await expect(second).resolves.toEqual(freshResult);
		expect(analyze).toHaveBeenCalledTimes(2);
		expect(removeClaim).toHaveBeenNthCalledWith(1, expect.any(String), 'claim-1');
		expect(removeClaim).toHaveBeenNthCalledWith(2, expect.any(String), 'claim-2');
	});
});
