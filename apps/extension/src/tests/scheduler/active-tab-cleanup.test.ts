import { afterEach, describe, expect, it, vi } from 'vitest';

import type { AnalyzeVisibleTabInput } from "../../lib/messaging/analysis.ts";

function input(tabId: number): AnalyzeVisibleTabInput {
	return {
		target: {
			windowId: 1,
			tabId,
			frameId: 0,
			url: `https://tab-${tabId}.example/`,
			hostname: `tab-${tabId}.example`,
			originHash: `origin-${tabId}`,
			urlHash: `url-${tabId}`,
			incognito: false,
		},
		mode: 'refresh',
		observe: 'none',
	};
}

afterEach(() => {
	vi.doUnmock('../../lib/scheduler/database.ts');
	vi.doUnmock('../../lib/scheduler/session.ts');
	vi.resetModules();
});

describe('scheduler active-tab cleanup', { concurrent: false }, () => {
	it('forgets a closed active tab before prioritizing later work in that window', async () => {
		let admittedPriority: string | undefined;
		vi.doMock('../../lib/scheduler/database.ts', () => ({
			admitAnalysis: vi.fn(async (work: { priority: string }) => {
				admittedPriority = work.priority;
				return { accepted: false as const };
			}),
			claim: vi.fn(async () => undefined),
			recoverClaims: vi.fn(async () => []),
			remove: vi.fn(async () => undefined),
			removeClaim: vi.fn(async () => true),
			removeOtherSessions: vi.fn(async () => 0),
			removeTabKind: vi.fn(async () => []),
			reprioritizeWindow: vi.fn(async () => 0),
			setPriority: vi.fn(async () => true),
		}));
		vi.doMock('../../lib/scheduler/session.ts', () => ({
			createId: vi.fn(() => 'analysis-owner'),
			get: vi.fn(async () => 'browser-session'),
		}));

		const analysis = await import('../../lib/scheduler/analysis.ts');
		const scheduler = analysis.create({
			resolveTarget: vi.fn(),
			analyze: vi.fn(),
		});
		await scheduler.activateTab(7, 1);
		await scheduler.cancelTab(7);
		await scheduler.analyze(input(8), 'automatic');

		expect(admittedPriority).toBe('foreground');
	});
});
