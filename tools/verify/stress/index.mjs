import { setTimeout as delay } from 'node:timers/promises';

import * as schedule from './schedule.mjs';
import * as models from './model.mjs';
import * as documents from './pages.mjs';
import * as reports from './report.mjs';
import * as mutations from './actions.mjs';
import * as samples from './observations.mjs';
import * as checks from './checks.mjs';

/**
 * Exercise heavy tab/window use and emit the existing stress result records.
 * One model, random stream and report live for this invocation. Actions and
 * observations share those owners, then settled checks inspect current pages,
 * closed-tab cleanup, private persistence and optional browser memory.
 *
 * The caller owns the browser session and its cleanup. Optional hooks provide
 * sidebar/restore actions, private-window support, background state and memory.
 */
export async function verify(harness, context) {
	const { ext, record } = harness;
	const { origin, hooks } = context;
	const plan = schedule.plan(context.stress);
	const random = schedule.random(plan.seed);
	const report = reports.create(plan);
	const control = await ext(`async () => { const w = await browser.windows.getCurrent(); return { windowId: w.id }; }`);
	const model = models.create();
	const pages = documents.create(origin, plan, random);
	const observations = samples.create(ext, control, model, pages, report, hooks);
	const actions = mutations.create(ext, control, plan, random, model, pages, report, hooks);

	console.log(`  stress seed=${plan.seed} duration=${Math.round(plan.durationMs / 1000)}s maxTabs=${plan.maxTabs} maxWindows=${plan.maxWindows} real=${plan.real} idle=${plan.idle} private=${Boolean(hooks.privateWindows)}`);
	// Start from a clean journal view: earlier scenarios are not this run's problems.
	const memoryStart = await observations.sampleMemory('start');

	// Seed windows and tabs.
	const existing = await actions.call('seed', `async (controlWindowId) => (await browser.tabs.query({})).filter((t) => t.windowId !== controlWindowId && /^https?:/.test(t.url || '')).map((t) => ({ id: t.id, windowId: t.windowId, incognito: t.incognito, pinned: t.pinned, url: t.url }))`, control.windowId) ?? [];
	// Safari keeps windows from earlier automation sessions; close what this run did not open.
	const foreign = existing.filter((t) => !pages.isOurs(t.url));
	if (foreign.length) {
		await actions.call('close-leftovers', `async (ids) => { await browser.tabs.remove(ids); }`, foreign.map((t) => t.id));
		report.info.counts['closed-leftover-tabs'] = foreign.length;
	}
	for (const t of existing.filter((x) => pages.isOurs(x.url))) model.addTab(t, t.url);
	while (model.normalWindows().length < Math.min(2, plan.maxWindows)) await actions.newWindow();
	for (let i = model.tabs.size; i < Math.ceil(plan.maxTabs * 0.6); i++) await actions.openTab();

	const idleAt = plan.idle ? [0.5, ...(plan.durationMs > 8 * 60_000 ? [0.8] : [])].map((f) => f * plan.durationMs) : [];
	let lastCheck = Date.now();
	let lastJournal = Date.now();
	let lastMemory = Date.now();
	let lastSync = Date.now();
	while (report.now() < plan.durationMs) {
		await actions.act(5);
		if (Date.now() - lastSync > 20_000) { await actions.syncModel('periodic'); lastSync = Date.now(); }
		if (Date.now() - lastCheck > 5_000) { await observations.continuousCheck(); lastCheck = Date.now(); }
		if (Date.now() - lastJournal > 5_000) { await observations.pollJournal(); lastJournal = Date.now(); }
		if (Date.now() - lastMemory > 60_000) { await observations.sampleMemory('during'); lastMemory = Date.now(); }
		if (idleAt.length && report.now() >= idleAt[0]) {
			idleAt.shift();
			await observations.pollJournal();
			// Leave the extension alone long enough for the background to unload.
			const idleStart = Date.now();
			report.step('idle', { ms: context.idleMs });
			let state;
			if (hooks.backgroundState) {
				const wait = Date.now() + context.idleMs + 40_000;
				do {
					await delay(2000);
					state = await hooks.backgroundState().catch(() => 'unknown');
				} while (state === 'running' && Date.now() < wait);
			} else {
				await delay(context.idleMs + 10_000);
				state = 'unknown (no hook)';
			}
			const memoryIdle = await observations.sampleMemory('idle');
			report.info.idle.push({ t: report.now(), waitedMs: Date.now() - idleStart, backgroundState: state, residentMiB: memoryIdle });
			// Hammer it straight after it wakes.
			report.step('hammer');
			for (let i = 0; i < 3; i++) await actions.burst();
			await actions.act(10);
		}
	}

	const summary = await checks.settle(context.hostAccess, model, pages, report, observations, actions, random, memoryStart);
	report.publish(record, model, summary);
}
