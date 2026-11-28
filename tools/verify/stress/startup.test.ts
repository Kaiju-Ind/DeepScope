import { afterEach, describe, expect, it, vi } from 'vitest';

import { runScenarios } from '../scenarios.mjs';

const clock = vi.hoisted(() => ({ now: 1_000_000 }));
vi.mock('node:timers/promises', () => ({
	setTimeout: async (ms: number) => { clock.now += ms; },
}));

afterEach(() => vi.restoreAllMocks());

describe('stress startup failure', () => {
	it('records the failed window creation and stops before an unbounded retry', async () => {
		clock.now = 1_000_000;
		vi.spyOn(Date, 'now').mockImplementation(() => clock.now);
		vi.spyOn(console, 'log').mockImplementation(() => undefined);
		const origin = 'http://127.0.0.1:9182';
		const tab = { id: 1, windowId: 4, incognito: false, pinned: false, url: `${origin}/wp.html`, status: 'complete', snaps: [], badge: '' };
		const record = vi.fn();
		let creations = 0;
		const ext = vi.fn(async (body: string) => {
			if (body.includes('browser.windows.getCurrent')) return { windowId: 99 };
			if (body.includes('browser.windows.create')) {
				creations += 1;
				if (creations === 1) throw new Error('window creation denied');
				// Permit a later attempt so the old implementation terminates and
				// fails this regression without hanging the test process.
				return { id: 4, incognito: false, tabs: [tab] };
			}
			if (body.includes('indexedDB.databases')) return { sessionKeys: [], activeJobs: [], closedJobs: [], privateHits: [], work: [], storageKiB: 0, unreadableKeys: [] };
			if (body.includes('diagnostics:record:')) return [];
			if (body.includes('/^https?:/')) { clock.now += 20_000; return []; }
			return [tab];
		});

		await runScenarios(undefined, { ext, record }, {
			origin, wpTab: tab, want: (name: string) => name === 'stress', hooks: {}, hostAccess: false,
			stress: { seed: 42, minutes: 0.1, tabs: 1, windows: 1, real: false, idle: false },
		});

		expect(creations).toBe(1);
		expect(record.mock.calls).toEqual([['stress startup', false, {
			seed: 42,
			reason: 'The browser did not create a normal window.',
			normalWindows: 0,
			requiredWindows: 1,
			actionErrors: { 'new-window: window creation denied': 1 },
		}]]);
	});
});
