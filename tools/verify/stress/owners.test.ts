import { afterEach, describe, expect, it, vi } from 'vitest';

import * as models from './model.mjs';
import * as pages from './pages.mjs';
import * as schedule from './schedule.mjs';

const origin = 'http://127.0.0.1:9182';

afterEach(() => vi.restoreAllMocks());

describe('stress run ownership', () => {
	it('keeps ordinary and quick defaults and the minimum activity duration', () => {
		expect(schedule.plan({ seed: 42 })).toEqual({
			seed: 42, quick: false, durationMs: 300_000,
			maxTabs: 24, maxWindows: 4, real: true, idle: true,
		});
		expect(schedule.plan({ seed: '1', quick: true, minutes: '0.1', real: false })).toEqual({
			seed: 1, quick: true, durationMs: 20_000,
			maxTabs: 10, maxWindows: 2, real: false, idle: false,
		});
	});

	it('retains closed private identities after their window disappears', () => {
		const model = models.create();
		const first = model.addTab({ id: 4, windowId: 2, incognito: true }, `${origin}/wp.html?pv=1`);
		const second = model.addTab({ id: 5, windowId: 2, incognito: true }, `${origin}/hugo.html?pv=1`);
		const normal = model.addTab({ id: 6, windowId: 3, incognito: false }, `${origin}/ghost.html`);

		model.dropTab(first, 100);
		expect(model.windowLabelById(2)).toBe('W0');
		model.dropTab(second, 200);
		model.dropTab(second, 300);

		expect(model.windowLabelById(2)).toBeUndefined();
		expect([...model.closedTabIds]).toEqual([[4, 100], [5, 200]]);
		expect([...model.privateTabIds]).toEqual([4, 5]);
		expect(model.tabLabels()).toEqual([normal]);
		expect(model.normalWindows()).toEqual([{ label: 'W1', id: 3, private: false }]);
		expect(model.tabsOpened).toBe(3);
		expect(model.windowsOpened).toBe(2);
	});

	it('shares navigation and same-document URL counters without an extra random draw', () => {
		const plan = schedule.plan({ seed: 42, real: true, quick: true });
		const owner = pages.create(origin, plan, schedule.random(plan.seed));
		expect(owner.randomUrl()).toBe(`${origin}/drupal.html?s=0`);
		expect(owner.historyPath()).toBe('?push=1');
		expect(owner.randomUrl()).toBe(`${origin}/swap.html?s=2`);
		expect(owner.randomUrl()).toBe(`${origin}/drupal.html?s=3`);
	});

	it('allows a rewritten marker only on the document that was rewritten', () => {
		const plan = schedule.plan({ seed: 1 });
		const owner = pages.create(origin, plan, schedule.random(plan.seed));
		const original = owner.expectation(`${origin}/wp.html`)!;
		const rewritten = owner.expectation(`${origin}/wp.html`, ['MkDocs'])!;

		expect(original.must).toEqual(['WordPress', 'jQuery']);
		expect(original.forbidden).toContain('MkDocs');
		expect(rewritten.must).toEqual([]);
		expect(rewritten.forbidden).not.toContain('MkDocs');
		expect(rewritten.forbidden).toContain('Hugo');
		expect(owner.expectation('about:blank')).toBeUndefined();
		expect(owner.expectation('http://127.0.0.1:9999/wp.html')).toBeUndefined();
	});
});
