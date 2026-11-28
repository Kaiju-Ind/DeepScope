import { afterEach, describe, expect, it, vi } from 'vitest';

import { settle } from "../support/settle.ts";

const browserSessionId = 'browser-session-1';

async function loadHarness() {
	vi.resetModules();
	const removeOtherSessions = vi.fn(async () => 0);
	const recoverClaims = vi.fn(async () => []);
	const claim = vi.fn(async () => undefined);
	const analyze = vi.fn();
	const resolveTarget = vi.fn();

	vi.doMock('../../lib/scheduler/database.ts', () => ({
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
	vi.doMock('../../lib/scheduler/session.ts', () => ({
		createId: vi.fn(() => 'analysis-scheduler-owner'),
		get: vi.fn(async () => browserSessionId),
	}));

	const analysis = await import('../../lib/scheduler/analysis.ts');
	const scheduler = analysis.create({ resolveTarget, analyze });
	return { scheduler, analyze, resolveTarget, claim, recoverClaims, removeOtherSessions };
}


afterEach(() => {
	vi.doUnmock('../../lib/scheduler/database.ts');
	vi.doUnmock('../../lib/scheduler/session.ts');
	vi.resetModules();
});

describe('analysis scheduler recovery', { concurrent: false }, () => {
	it('repairs durable claims without dispatching until the composition root resumes work', async () => {
		const harness = await loadHarness();

		await harness.scheduler.reconcile();
		await harness.scheduler.activateTab(7, 1);
		await settle();

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

		// Interactive and foreground work (ranks 0-1) is claimed first.
		await vi.waitFor(() => expect(harness.claim).toHaveBeenCalledWith({
			browserSessionId,
			kind: 'analysis',
			owner: 'analysis-scheduler-owner',
			minPriorityRank: 0,
			maxPriorityRank: 1,
		}));
	});
});
