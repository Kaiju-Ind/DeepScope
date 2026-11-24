import { afterEach, describe, expect, it, vi } from 'vitest';

import { EXECUTION_SCHEMA_VERSION, type AnalysisWorkType } from '@/lib/scheduler/schema';
import { settle } from '../support/settle';

/** One claimed foreground analysis that the mocked database hands out once. */
function foregroundWork(): AnalysisWorkType {
	return {
		schemaVersion: EXECUTION_SCHEMA_VERSION,
		id: 'foreground',
		kind: 'analysis',
		browserSessionId: 'browser-session-1',
		windowId: 1,
		tabId: 7,
		priority: 'foreground',
		priorityRank: 1,
		state: 'claimed',
		createdAt: 1,
		updatedAt: 1,
		attempt: 1,
		claimOwner: 'analysis-owner',
		claimToken: 'claim-foreground',
		frameId: 0,
		originHash: 'origin',
		urlHash: 'url',
		mode: 'refresh',
		observe: 'none',
		source: 'automatic',
	};
}

async function load() {
	vi.resetModules();
	let foregroundQueued = true;
	const order: string[] = [];
	vi.doMock('@/lib/scheduler/database', () => ({
		claim: vi.fn(async (input: { minPriorityRank?: number }) => {
			if (foregroundQueued && (input.minPriorityRank ?? 0) <= 1) {
				foregroundQueued = false;
				return foregroundWork();
			}
			return undefined;
		}),
		removeClaim: vi.fn(async () => true),
		removeTabKind: vi.fn(async () => []),
		recoverClaims: vi.fn(async () => []),
		removeOtherSessions: vi.fn(async () => 0),
	}));
	vi.doMock('@/lib/scheduler/session', () => ({
		createId: vi.fn(() => 'analysis-owner'),
		get: vi.fn(async () => 'browser-session-1'),
	}));
	const analysis = await import('@/lib/scheduler/analysis');
	const log = vi.fn();
	const scheduler = analysis.create({
		resolveTarget: vi.fn(async () => ({ ok: true as const, value: {} as never })),
		analyze: vi.fn(async () => {
			order.push('foreground-analysis');
			return { ok: false as const, failure: { code: 'VALIDATION_ERROR' as const, message: 'fixture' } };
		}),
		log,
	});
	return { scheduler, order, log };
}

afterEach(() => {
	vi.doUnmock('@/lib/scheduler/database');
	vi.doUnmock('@/lib/scheduler/session');
	vi.resetModules();
});

describe('analysis scheduler background tasks', { concurrent: false }, () => {
	it('runs live observation refreshes behind foreground analyses on the same lane', async () => {
		const { scheduler, order } = await load();
		await scheduler.reconcile();

		const refresh = scheduler.runBackground({ key: 'refresh:7', tabId: 7, run: async () => { order.push('refresh'); } });
		const duplicate = scheduler.runBackground({ key: 'refresh:7', tabId: 7, run: async () => { order.push('duplicate'); } });
		scheduler.resume();
		await Promise.all([refresh, duplicate]);

		expect(order).toEqual(['foreground-analysis', 'refresh']);
	});

	it('reports a failed refresh to its caller and keeps the lane running', async () => {
		const { scheduler, order, log } = await load();
		const failure = new Error('refresh failed');

		await expect(scheduler.runBackground({ key: 'bad', tabId: 7, run: async () => { throw failure; } })).rejects.toBe(failure);
		await scheduler.runBackground({ key: 'good', tabId: 7, run: async () => { order.push('good'); } });

		expect(order).toContain('good');
		expect(log).toHaveBeenCalledWith('scheduler-background-task-failed', expect.objectContaining({ key: 'bad', errorType: 'Error' }));
	});

	it('drops a queued refresh when its tab is canceled', async () => {
		const { scheduler, order } = await load();
		await scheduler.reconcile();
		const refresh = scheduler.runBackground({ key: 'refresh:8', tabId: 8, run: async () => { order.push('refresh'); } });

		await scheduler.cancelTab(8);
		scheduler.resume();
		await refresh;
		await settle();

		expect(order).not.toContain('refresh');
	});
});
