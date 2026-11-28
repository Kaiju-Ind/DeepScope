import { afterEach, describe, expect, it, vi } from 'vitest';

import * as actions from './actions.mjs';
import * as models from './model.mjs';
import * as pages from './pages.mjs';
import * as reports from './report.mjs';
import * as schedule from './schedule.mjs';

// Advance only harness waits. The adapter below does not execute browser code;
// this test protects deterministic command selection, not browser behavior.
const clock = vi.hoisted(() => ({ now: 1_000_000 }));
vi.mock('node:timers/promises', () => ({
	setTimeout: async (ms: number) => { clock.now += ms; },
}));

afterEach(() => vi.restoreAllMocks());

describe('seeded browser actions', () => {
	it('preserves the recorded navigation, activation and closure sequence', async () => {
		clock.now = 1_000_000;
		vi.spyOn(Date, 'now').mockImplementation(() => clock.now);
		const origin = 'http://127.0.0.1:9182';
		const plan = schedule.plan({ seed: 42, real: true, quick: true });
		const random = schedule.random(plan.seed);
		const model = models.create();
		const documents = pages.create(origin, plan, random);
		const report = reports.create(plan);
		const ext = vi.fn(async () => undefined);
		const owner = actions.create(ext, { windowId: 99 }, plan, random, model, documents, report, {});
		for (let id = 1; id <= 8; id++) {
			model.addTab({ id, windowId: id <= 4 ? 1 : 2, incognito: false, pinned: false }, `${origin}/wp.html?initial=${id}`);
		}
		for (let index = 0; index < 20; index++) documents.randomUrl();

		await owner.act(7);

		// Recorded from the original owner before extraction. Each expected step
		// includes the target, payload and elapsed time that make a replay useful.
		expect(report.log).toEqual([
			{ n: 0, t: 0, action: 'navigate', tabId: 3, url: `${origin}/huge.html?n=50479&s=20` },
			{ n: 1, t: 42, action: 'switch-burst', tabIds: [6, 6, 6, 8], gaps: [7, 84, 38, 84] },
			{ n: 2, t: 165, action: 'panel-page', tabId: 3, stay: 838 },
			{ n: 3, t: 288, action: 'activate', tabId: 8 },
			{ n: 4, t: 425, action: 'move-window', tabId: 5, toWindow: 1, index: 1 },
			{ n: 5, t: 867, action: 'close-tab', tabId: 6, url: `${origin}/wp.html?initial=6` },
		]);
		expect([...model.closedTabIds]).toEqual([[6, 1_000_867]]);
		expect(model.tabLabels()).not.toContain('T5');
		expect(ext).toHaveBeenCalledTimes(7);
	});

	it('records a normalized action failure without claiming that a window exists', async () => {
		const plan = schedule.plan({ seed: 1 });
		const random = schedule.random(plan.seed);
		const model = models.create();
		const documents = pages.create('http://127.0.0.1:9182', plan, random);
		const report = reports.create(plan);
		const ext = vi.fn(async () => { throw new Error('window 42 was rejected'); });
		const owner = actions.create(ext, { windowId: 99 }, plan, random, model, documents, report, {});

		await owner.newWindow();

		expect(report.info.actionErrors).toEqual({ 'new-window: window N was rejected': 1 });
		expect(model.normalWindows()).toEqual([]);
		expect(model.tabsOpened).toBe(0);
		expect(report.log).toEqual([]);
	});
});
