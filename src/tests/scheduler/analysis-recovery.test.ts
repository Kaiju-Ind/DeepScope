import { afterEach, describe, expect, it, vi } from 'vitest';

const browserSessionId = 'browser-session-1';

async function loadHarness() {
	vi.resetModules();
	const removeOtherSessions = vi.fn(async () => 0);
	const recoverClaims = vi.fn(async () => []);
	const claim = vi.fn(async () => undefined);
	const analyze = vi.fn();
	const resolveTarget = vi.fn();

	vi.doMock('@/lib/scheduler/database', () => ({
		admitAnalysis: vi.fn(),
		claim,
		recoverClaims,
		remove: vi.fn(),
		removeClaim: vi.fn(),
		removeOtherSessions,
		removeTabKind: vi.fn(),
		reprioritizeWindow: vi.fn(),
		setPriority: vi.fn(),
	}));
	vi.doMock('@/lib/scheduler/session', () => ({
		createId: vi.fn(() => 'analysis-scheduler-owner'),
		get: vi.fn(async () => browserSessionId),
	}));

	const analysis = await import('@/lib/scheduler/analysis');
	const scheduler = analysis.create({ resolveTarget, analyze });
	return { scheduler, analyze, resolveTarget, claim, recoverClaims, removeOtherSessions };
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

describe.sequential('analysis scheduler recovery', () => {
	it('repairs durable claims without dispatching until the composition root resumes work', async () => {
		const harness = await loadHarness();

		await harness.scheduler.reconcile();
		await harness.scheduler.activateTab(7, 1);
		await flush();

		expect(harness.removeOtherSessions).toHaveBeenCalledWith(browserSessionId);
		expect(harness.recoverClaims).toHaveBeenCalledWith(
			browserSessionId,
			'analysis-scheduler-owner',
			'analysis',
		);
		expect(harness.claim).not.toHaveBeenCalled();
		expect(harness.resolveTarget).not.toHaveBeenCalled();
		expect(harness.analyze).not.toHaveBeenCalled();

		harness.scheduler.resume();
		await flush();

		expect(harness.claim).toHaveBeenCalledWith({
			browserSessionId,
			kind: 'analysis',
			owner: 'analysis-scheduler-owner',
		});
	});
});
