import { afterEach, describe, expect, it, vi } from 'vitest';

import * as models from './model.mjs';
import * as observations from './observations.mjs';
import * as pages from './pages.mjs';
import * as reports from './report.mjs';
import * as schedule from './schedule.mjs';

afterEach(() => vi.restoreAllMocks());

/** A foreign marker on the current page; its badge agrees so only identity fails. */
function fixture() {
	let now = 1_000;
	vi.spyOn(Date, 'now').mockImplementation(() => now);
	vi.spyOn(console, 'log').mockImplementation(() => undefined);
	const origin = 'http://127.0.0.1:9182';
	const url = `${origin}/wp.html`;
	const plan = schedule.plan({ seed: 1 });
	const model = models.create();
	model.addTab({ id: 7, windowId: 2, incognito: false }, url);
	const documents = pages.create(origin, plan, schedule.random(plan.seed));
	const report = reports.create(plan);
	const snapshot = { frameId: 0, url, names: ['Hugo'] };
	const tab = { id: 7, url, status: 'complete', incognito: false, badge: '1', snaps: [snapshot] };
	const owner = observations.create(async () => [tab], { windowId: 99 }, model, documents, report, {});
	return { owner, model, report, tab, snapshot, at: (time: number) => { now = time; } };
}

describe('settled stress observations', () => {
	it('reports one persistent violation after two unchanged samples', async () => {
		const test = fixture();
		await test.owner.continuousCheck();
		expect(test.report.failures).toEqual([]);
		test.at(2_000);
		await test.owner.continuousCheck();
		test.at(3_000);
		await test.owner.continuousCheck();
		expect(test.report.failures).toEqual([expect.objectContaining({
			invariant: 'inv1-current-document-results', phase: 'continuous', tabId: 7,
			stale: ['Hugo'], persistedMs: 1_000,
		})]);
	});

	it('requires another pair of samples after the page recovers', async () => {
		const test = fixture();
		await test.owner.continuousCheck();
		test.at(2_000);
		test.snapshot.names = ['WordPress', 'jQuery'];
		test.tab.badge = '2';
		await test.owner.continuousCheck();
		test.at(3_000);
		test.snapshot.names = ['Hugo'];
		test.tab.badge = '1';
		await test.owner.continuousCheck();
		expect(test.report.failures).toEqual([]);
		test.at(4_000);
		await test.owner.continuousCheck();
		expect(test.report.failures).toHaveLength(1);
		expect(test.report.failures[0]).toMatchObject({ stale: ['Hugo'], persistedMs: 1_000 });
	});

	it('restarts confirmation after an action touches an unchanged bad result', async () => {
		const test = fixture();
		await test.owner.continuousCheck();
		test.at(2_000);
		test.model.touch(7);
		test.at(3_000);
		await test.owner.continuousCheck();
		expect(test.report.failures).toEqual([]);
		test.at(4_000);
		await test.owner.continuousCheck();
		expect(test.report.failures).toEqual([expect.objectContaining({
			invariant: 'inv1-current-document-results', phase: 'continuous', tabId: 7,
			stale: ['Hugo'], persistedMs: 1_000,
		})]);
	});
});
