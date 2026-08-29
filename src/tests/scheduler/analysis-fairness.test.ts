import { afterEach, describe, expect, it, vi } from 'vitest';

import * as fairness from '@/lib/scheduler/fairness';
import { EXECUTION_SCHEMA_VERSION } from '@/lib/scheduler/schema';

const browserSessionId = 'browser-session-1';

function work(id: string, priority: 'foreground' | 'background') {
	return {
		schemaVersion: EXECUTION_SCHEMA_VERSION,
		id,
		kind: 'analysis' as const,
		browserSessionId,
		windowId: 1,
		tabId: priority === 'foreground' ? 7 : 8,
		priority,
		priorityRank: priority === 'foreground' ? 1 : 2,
		state: 'claimed' as const,
		createdAt: 1,
		updatedAt: 1,
		attempt: 1,
		claimOwner: 'analysis-scheduler-owner',
		claimToken: `claim-${id}`,
		frameId: 0,
		originHash: `origin-${id}`,
		urlHash: `url-${id}`,
		mode: 'refresh' as const,
		observe: 'none' as const,
		source: 'automatic' as const,
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

describe.sequential('analysis scheduler fairness', () => {
	it('attempts a lower-priority claim after the bounded foreground burst', async () => {
		vi.resetModules();
		let foregroundIndex = 0;
		let backgroundReturned = false;
		const claim = vi.fn(async (input: { minPriorityRank?: number; maxPriorityRank?: number }) => {
			if (input.minPriorityRank === 2) {
				if (backgroundReturned) return undefined;
				backgroundReturned = true;
				return work('background', 'background');
			}
			if (foregroundIndex < fairness.FOREGROUND_BURST_LIMIT) {
				foregroundIndex += 1;
				return work(`foreground-${foregroundIndex}`, 'foreground');
			}
			return undefined;
		});
		vi.doMock('@/lib/scheduler/database', () => ({
			admitAnalysis: vi.fn(),
			claim,
			recoverClaims: vi.fn(),
			remove: vi.fn(async () => undefined),
			removeClaim: vi.fn(async () => true),
			removeOtherSessions: vi.fn(),
			removeTabKind: vi.fn(),
			reprioritizeWindow: vi.fn(),
			setPriority: vi.fn(),
		}));
		vi.doMock('@/lib/scheduler/session', () => ({
			createId: vi.fn(() => 'analysis-scheduler-owner'),
			get: vi.fn(async () => browserSessionId),
		}));

		const analysis = await import('@/lib/scheduler/analysis');
		const analyze = vi.fn(async () => ({ ok: false as const, error: { code: 'VALIDATION_ERROR' as const, message: 'fixture' } }));
		const resolveTarget = vi.fn(async () => ({
			ok: true as const,
			value: {
				windowId: 1, tabId: 7, frameId: 0, url: 'https://example.com/', hostname: 'example.com',
				originHash: 'origin', urlHash: 'url', incognito: false,
			},
		}));
		const scheduler = analysis.create({ resolveTarget, analyze });
		scheduler.resume();
		await flush();

		expect(analyze).toHaveBeenCalledTimes(fairness.FOREGROUND_BURST_LIMIT + 1);
		const lowerClaimIndex = claim.mock.calls.findIndex(([input]) => input.minPriorityRank === 2 && input.maxPriorityRank === 3);
		expect(lowerClaimIndex).toBe(fairness.FOREGROUND_BURST_LIMIT);
	});
});
