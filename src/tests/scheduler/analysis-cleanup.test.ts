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
			urlHash: 'url',
			incognito: false,
		},
		mode: 'refresh',
		observe: 'none',
	};
}

async function load(removeClaim: ReturnType<typeof vi.fn>, analyze: ReturnType<typeof vi.fn>, log = vi.fn()) {
	vi.resetModules();
	let queued: AnalysisWorkType | undefined;
	vi.doMock('@/lib/scheduler/database', () => ({
		admitAnalysis: vi.fn(async (work: AnalysisWorkType) => {
			queued = work;
			return { accepted: true as const, created: true, work };
		}),
		claim: vi.fn(async () => {
			if (!queued) return undefined;
			const claimed: AnalysisWorkType = {
				...queued,
				schemaVersion: EXECUTION_SCHEMA_VERSION,
				state: 'claimed',
				attempt: queued.attempt + 1,
				claimOwner: 'analysis-owner',
				claimToken: 'claim-token',
			};
			queued = undefined;
			return claimed;
		}),
		recoverClaims: vi.fn(async () => []),
		remove: vi.fn(async () => undefined),
		removeClaim,
		removeOtherSessions: vi.fn(async () => 0),
		removeTabKind: vi.fn(async () => []),
		reprioritizeWindow: vi.fn(async () => 0),
		setPriority: vi.fn(async () => true),
	}));
	vi.doMock('@/lib/scheduler/session', () => ({
		createId: vi.fn(() => 'analysis-owner'),
		get: vi.fn(async () => 'browser-session'),
	}));
	const analysis = await import('@/lib/scheduler/analysis');
	const scheduler = analysis.create({
		resolveTarget: vi.fn(async () => ({ ok: true as const, value: input().target })),
		analyze,
		log,
	});
	return { scheduler, log };
}

afterEach(() => {
	vi.doUnmock('@/lib/scheduler/database');
	vi.doUnmock('@/lib/scheduler/session');
	vi.resetModules();
});

describe.sequential('analysis terminal cleanup', () => {
	it('retries transient claim cleanup without changing the successful result', async () => {
		const removeClaim = vi.fn()
			.mockRejectedValueOnce(new Error('temporary-idb-1'))
			.mockRejectedValueOnce(new Error('temporary-idb-2'))
			.mockResolvedValueOnce(true);
		const result = { ok: false as const, error: { code: 'VALIDATION_ERROR' as const, message: 'primary-result' } };
		const { scheduler } = await load(removeClaim, vi.fn(async () => result));

		await expect(scheduler.analyze(input(), 'automatic')).resolves.toEqual(result);
		expect(removeClaim).toHaveBeenCalledTimes(3);
	});

	it('keeps the primary analysis failure when durable cleanup exhausts its retries', async () => {
		const removeClaim = vi.fn(async () => { throw new Error('idb-offline'); });
		const log = vi.fn();
		const { scheduler } = await load(removeClaim, vi.fn(async () => { throw new Error('analysis-primary'); }), log);

		await expect(scheduler.analyze(input(), 'automatic')).resolves.toMatchObject({
			ok: false,
			error: { code: 'UNKNOWN', message: 'analysis-primary' },
		});
		expect(removeClaim).toHaveBeenCalledTimes(3);
		expect(log).toHaveBeenCalledWith('scheduler-analysis-failed', expect.objectContaining({ message: 'analysis-primary' }));
		expect(log).toHaveBeenCalledWith('scheduler-analysis-cleanup-failed', expect.objectContaining({ message: 'idb-offline' }));
	});
});
