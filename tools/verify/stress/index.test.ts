import { afterEach, describe, expect, it, vi } from 'vitest';

import { runScenarios } from '../scenarios.mjs';

const clock = vi.hoisted(() => ({ now: 1_000_000 }));
vi.mock('node:timers/promises', () => ({
	setTimeout: async (ms: number) => { clock.now += ms; },
}));

afterEach(() => vi.restoreAllMocks());

describe('stress scenario integration', () => {
	it('reaches settled checks and the existing report contract through the scenario dispatcher', async () => {
		clock.now = 1_000_000;
		vi.spyOn(Date, 'now').mockImplementation(() => clock.now);
		vi.spyOn(console, 'log').mockImplementation(() => undefined);
		const origin = 'http://127.0.0.1:9182';
		const tabs = [
			{ id: 1, windowId: 1, incognito: false, pinned: false, url: `${origin}/wp.html`, status: 'complete', snaps: [], badge: '' },
			{ id: 2, windowId: 2, incognito: false, pinned: false, url: `${origin}/hugo.html`, status: 'complete', snaps: [], badge: '' },
		];
		const record = vi.fn();
		const ext = vi.fn(async (body: string) => {
			if (body.includes('browser.windows.getCurrent')) return { windowId: 99 };
			if (body.includes('indexedDB.databases')) return { sessionKeys: [], activeJobs: [], closedJobs: [], privateHits: [], work: [], storageKiB: 0, unreadableKeys: [] };
			if (body.includes('diagnostics:record:')) return [];
			// Simulate a slow initial read so this test reaches quiescence without
			// simulating browser mutations. Action scheduling has its own oracle.
			if (body.includes('/^https?:/')) clock.now += 20_000;
			return tabs;
		});

		await runScenarios(undefined, { ext, record }, {
			origin, wpTab: tabs[0], want: (name: string) => name === 'stress', hooks: {},
			hostAccess: false, stress: { seed: 42, minutes: 0.1, tabs: 2, windows: 2, real: false, idle: false },
		});

		expect(record).toHaveBeenCalledTimes(9);
		expect(record).toHaveBeenCalledWith('stress inv1-current-document-results', true, {
			seed: 42, note: 'not measured: the browser did not grant host access', failures: 0, examples: [],
		});
		expect(record).toHaveBeenCalledWith('stress summary', true, expect.objectContaining({
			seed: 42, activityMs: 20_000, actions: 1, tabsOpened: 2, windowsOpened: 2,
			privateTabs: 0, openAtEnd: 2, drainMs: 0, failures: [],
			finalVisits: { ok: 0, total: 0, slowestMs: 0 },
			log: [{ n: 0, t: 20_000, action: 'stop' }],
		}));
	});
});
