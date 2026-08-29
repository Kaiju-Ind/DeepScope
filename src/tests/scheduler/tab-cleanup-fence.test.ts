import { afterEach, describe, expect, it, vi } from 'vitest';

import { createCompiledDetectionGraph } from '@/lib/detection/registry-graph';
import type { AnalyzeVisibleTabInput } from '@/lib/messaging/analysis';
import type { RunMatcherJobRequest } from '@/lib/matcher/contracts';
import { normalizePageSignals } from '@/lib/observations';
import { makePageSignals } from '../support/factories';

function analysisInput(): AnalyzeVisibleTabInput {
	return {
		target: {
			windowId: 1,
			tabId: 7,
			frameId: 0,
			url: 'https://example.com/new',
			hostname: 'example.com',
			originHash: 'origin',
			urlHash: 'new-document',
			incognito: false,
		},
		mode: 'refresh',
		observe: 'none',
	};
}

function matcherRequest(): RunMatcherJobRequest {
	const batch = normalizePageSignals(makePageSignals({ url: 'https://example.com/new' }));
	return {
		job: { jobId: 'new-matcher', tabId: 7, windowId: 1, expectedUrl: batch.target.url },
		mode: 'complete',
		batch,
		registry: [],
		relationshipGraph: createCompiledDetectionGraph([], []),
	};
}

async function flush(): Promise<void> {
	await Promise.resolve();
	await Promise.resolve();
}

afterEach(() => {
	vi.doUnmock('@/lib/scheduler/database');
	vi.doUnmock('@/lib/scheduler/session');
	vi.resetModules();
});

describe.sequential('tab cleanup admission fence', () => {
	it('does not admit a new analysis document until old tab cleanup settles', async () => {
		let releaseCleanup!: () => void;
		const removeTabKind = vi.fn(() => new Promise<readonly unknown[]>((resolve) => { releaseCleanup = () => resolve([]); }));
		const admitAnalysis = vi.fn(async (work: unknown) => ({ accepted: true, created: true, work }));
		vi.doMock('@/lib/scheduler/database', () => ({
			admitAnalysis,
			claim: vi.fn(async () => undefined),
			recoverClaims: vi.fn(async () => []),
			remove: vi.fn(async () => undefined),
			removeClaim: vi.fn(async () => true),
			removeOtherSessions: vi.fn(async () => 0),
			removeTabKind,
			reprioritizeWindow: vi.fn(async () => 0),
			setPriority: vi.fn(async () => true),
		}));
		vi.doMock('@/lib/scheduler/session', () => ({
			createId: vi.fn(() => 'analysis-owner'),
			get: vi.fn(async () => 'browser-session-1'),
		}));

		const analysis = await import('@/lib/scheduler/analysis');
		const scheduler = analysis.create({ resolveTarget: vi.fn(), analyze: vi.fn() });
		const cleanup = scheduler.cancelTab(7);
		await flush();
		const admission = scheduler.analyze(analysisInput());
		await flush();
		expect(admitAnalysis).not.toHaveBeenCalled();
		releaseCleanup();
		await cleanup;
		await flush();
		expect(admitAnalysis).toHaveBeenCalledOnce();
		void admission;
	});

	it('does not persist a new matcher document until old tab cleanup settles', async () => {
		let releaseCleanup!: () => void;
		const removeTabKind = vi.fn(() => new Promise<readonly unknown[]>((resolve) => { releaseCleanup = () => resolve([]); }));
		const save = vi.fn(async () => undefined);
		vi.doMock('@/lib/scheduler/database', () => ({
			claimId: vi.fn(async () => undefined),
			listKind: vi.fn(async () => []),
			remove: vi.fn(async () => undefined),
			removeOtherSessions: vi.fn(async () => 0),
			removeTabKind,
			reprioritizeWindow: vi.fn(async () => 0),
			save,
			setPriority: vi.fn(async () => true),
		}));
		vi.doMock('@/lib/scheduler/session', () => ({
			createId: vi.fn(() => 'matcher-owner'),
			get: vi.fn(async () => 'browser-session-1'),
		}));

		const matcher = await import('@/lib/scheduler/matcher');
		const scheduler = matcher.create({
			capacity: 1,
			runPartition: vi.fn(),
			cancelJob: vi.fn(async () => undefined),
			cancelTab: vi.fn(async () => undefined),
			touchLifecycle: vi.fn(async () => undefined),
			releaseLifecycle: vi.fn(async () => undefined),
		});
		const cleanup = scheduler.cancelTab(7, 'navigation');
		await flush();
		const admission = scheduler.runJob(matcherRequest());
		await flush();
		expect(save).not.toHaveBeenCalled();
		releaseCleanup();
		await cleanup;
		await flush();
		expect(save).toHaveBeenCalledOnce();
		await scheduler.cancelJob('new-matcher');
		await expect(admission).rejects.toMatchObject({ reason: 'canceled' });
	});
});
