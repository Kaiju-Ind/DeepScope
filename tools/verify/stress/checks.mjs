import { setTimeout as delay } from 'node:timers/promises';

import { badgeText } from './observations.mjs';

// Journal events that are not failures in a run that closes and replaces
// documents on purpose (the scheduler cancels work for documents that left).
const EXPECTED = /canceled|cancelled|navigated away|no longer owns|inspectable URL yet|^tab-unavailable$|no longer matches its browser document/i;
const BAD_EVENT = /unavailable|failed|timeout|error|mismatch|crash|unhandled/i;
// Journal events that mean work ran for a tab. After a tab closes these
// should stop within a short grace period.
const WORK_EVENT = /^(dom-scan|content-runtime-inject|matcher-partition|matcher-job-(started|completed)|analysis-(started|completed)|\[timing\] (collector|matcher|background\.analy))/;

/**
 * Stop activity and inspect settled state. Tab visits, work draining, journal
 * grace periods and memory samples retain their separate deadlines and oracles.
 * The report owner receives these measurements after every check has finished.
 */
export async function settle(hostAccess, model, pages, report, observations, actions, random, memoryStart) {
	const { tabs, windows, closedTabIds, touchedAt, privateTabIds, tabLabels } = model;
	const { expectation } = pages;
	const { startedAt, now, info, failures, journal, step, fail } = report;
	const { readWorld, currentSnapshot, evaluateTab, pollJournal, sampleMemory, readLeftovers } = observations;
	const { call, syncModel } = actions;
	const { int } = random;

	const activityEnded = now();
	step('stop');
	await sampleMemory('activity-end');
	await syncModel('final');
	await delay(5000);
	await pollJournal();

	// Invariant 1 (and 2 per tab): visit every normal tab like a user checking
	// each one; it must show its current document's expected results and badge.
	// Without host access nothing can be scanned; the visits would only time out.
	const scanning = hostAccess !== false;
	const visitOrder = scanning ? tabLabels((t) => !t.private) : [];
	for (let i = visitOrder.length - 1; i > 0; i--) {
		const j = int(i + 1);
		[visitOrder[i], visitOrder[j]] = [visitOrder[j], visitOrder[i]];
	}
	const finalTabs = [];
	for (const label of visitOrder) {
		const model = tabs.get(label);
		if (!model) continue;
		const w = windows.get(model.windowLabel);
		if (w) await call('final-focus', `async (id) => { await browser.windows.update(id, { focused: true }); }`, w.id);
		await call('final-activate', `async (id) => { await browser.tabs.update(id, { active: true }); }`, model.id);
		const started = Date.now();
		let last;
		let verdict;
		const deadline = started + (/huge|wikipedia|react\.dev|wordpress\.org/.test(model.url ?? '') ? 75_000 : 45_000);
		while (Date.now() < deadline) {
			const world = await readWorld();
			last = world.find((t) => t.id === model.id);
			if (!last) { verdict = 'tab-gone'; break; }
			if (last.status !== 'complete') { await delay(700); continue; }
			const expect = expectation(last.url, model.extras);
			if (!expect) { verdict = 'not-http'; break; }
			const current = currentSnapshot(last);
			const names = current?.names ?? [];
			const missing = expect.must.filter((n) => !names.includes(n));
			const stale = names.filter((n) => expect.forbidden.includes(n));
			const badgeOk = last.badge === badgeText(names.length);
			if (current && names.length > 0 && missing.length === 0 && stale.length === 0 && badgeOk) {
				verdict = 'ok';
				const lateMissing = expect.late.filter((n) => !names.includes(n));
				if (lateMissing.length) info.lateMissing.push({ tabId: model.id, url: last.url, lateMissing, names });
				break;
			}
			verdict = { url: last.url, currentSnapshot: Boolean(current), names, missing, stale, badge: last.badge, expectedBadge: badgeText(names.length), newest: last.snaps[0] && { url: last.snaps[0].url, status: last.snaps[0].status, count: last.snaps[0].names.length } };
			await delay(800);
		}
		const tookMs = Date.now() - started;
		finalTabs.push({ tabId: model.id, url: last?.url, verdict: typeof verdict === 'string' ? verdict : 'failed', tookMs });
		if (verdict !== 'ok' && verdict !== 'tab-gone' && verdict !== 'not-http') {
			const real = expectation(last?.url ?? '')?.real;
			const bad = typeof verdict === 'object' ? verdict : { verdict };
			// A real site that never finished loading is the network, not DeepScope.
			if (real && last?.status !== 'complete') info.actionErrors['final: real site did not load'] = (info.actionErrors['final: real site did not load'] ?? 0) + 1;
			else fail(bad.stale?.length ? 'inv1-current-document-results' : (bad.currentSnapshot && !bad.missing?.length && bad.badge !== bad.expectedBadge ? 'inv2-badge' : 'inv1-current-document-results'), { phase: 'final-visit', tabId: model.id, ...bad, waitedMs: tookMs });
		}
	}

	// Invariant 2 across every tab without touching them: each badge is that tab's own count.
	await delay(2000);
	const sweep = await readWorld();
	const byId = new Map([...tabs.values()].map((t) => [t.id, t]));
	// A tab that failed its visit may have been slow rather than lost: say which.
	for (const failure of failures.filter((f) => f.phase === 'final-visit')) {
		const tab = sweep.find((t) => t.id === failure.tabId);
		const current = tab && currentSnapshot(tab);
		const expect = tab && expectation(tab.url, byId.get(tab.id)?.extras ?? []);
		failure.laterSweep = !tab ? 'tab gone' : current && expect && expect.must.every((n) => current.names.includes(n))
			? `results arrived after the visit timed out (badge ${tab.badge || 'blank'})`
			: 'still no results for the current document';
	}
	for (const tab of sweep) {
		if (!byId.has(tab.id) || tab.status !== 'complete') continue;
		for (const problem of evaluateTab(tab, byId.get(tab.id))) fail(problem.invariant, { phase: 'final-sweep', tabId: tab.id, url: tab.url, ...problem.detail });
	}

	// Invariant 3 and 4: work drains, nothing remains for closed tabs, nothing private persisted.
	const openIds = new Set(sweep.map((t) => t.id));
	let leftovers;
	const drainStart = Date.now();
	while (Date.now() - drainStart < 60_000) {
		leftovers = await readLeftovers();
		if (leftovers.work.length === 0 && leftovers.activeJobs.length === 0) break;
		await delay(2000);
	}
	const drainMs = Date.now() - drainStart;
	await pollJournal();
	const privateIds = new Set([...closedTabIds.keys(), ...[...tabs.values()].map((t) => t.id)].filter((id) => privateTabIds.has(id)));
	const closedIds = [...closedTabIds.keys()].filter((id) => !openIds.has(id));
	for (const key of leftovers.sessionKeys) {
		const tabId = Number(/^rd:(?:session-index|session|content-session):(\d+)/.exec(key)?.[1]);
		if (privateIds.has(tabId)) fail('inv6-private-not-persisted', { phase: 'final', tabId, key });
		else if (!openIds.has(tabId)) fail('inv3-closed-tab-cleanup', { phase: 'final', tabId, key, closedAt: closedTabIds.has(tabId) ? closedTabIds.get(tabId) - startedAt : 'not closed by harness' });
	}
	for (const job of leftovers.activeJobs) fail('inv4-stuck-work', { phase: 'final', kind: 'matcher-job-record', tabId: job.tabId, job, drainMs });
	for (const work of leftovers.work) fail(openIds.has(work.tabId) ? 'inv4-stuck-work' : 'inv3-closed-tab-cleanup', { phase: 'final', kind: 'scheduler-work', tabId: work.tabId, work, drainMs });
	for (const hit of leftovers.privateHits) fail('inv6-private-not-persisted', { phase: 'final', ...hit });
	for (const job of leftovers.closedJobs.filter((j) => closedIds.includes(j.tabId) && (j.status === 'running' || j.status === 'queued'))) fail('inv3-closed-tab-cleanup', { phase: 'final', kind: 'matcher-job-running-for-closed-tab', tabId: job.tabId, job });

	// Invariant 3 (work for closed tabs) and 4 (errors) from the journal.
	const graceMs = 8_000;
	for (const record of journal.values()) {
		const closedAt = closedTabIds.get(record.tabId);
		if (closedAt && record.t > closedAt + graceMs && WORK_EVENT.test(record.event ?? record.message ?? '')) {
			fail('inv3-work-after-close', { phase: 'journal', tabId: record.tabId, event: record.event ?? record.message, afterCloseMs: record.t - closedAt });
		}
		// Debug records narrate expected outcomes (a tab between documents, a
		// non-http page); only warnings, errors and lost content scripts count.
		const isProblem = record.level === 'error' || record.level === 'fatal' || record.level === 'warning'
			|| (record.level !== 'debug' && BAD_EVENT.test(record.event ?? ''))
			|| record.code === 'CONTENT_SCRIPT_UNAVAILABLE';
		if (!isProblem) continue;
		if (EXPECTED.test(record.errorMessage ?? '') || EXPECTED.test(record.event ?? '') || EXPECTED.test(record.reason ?? '')) continue;
		const touches = touchedAt.get(record.tabId) ?? [];
		const disrupted = (closedAt && record.t >= closedAt - 1000) || touches.some((t) => record.t >= t - 1000 && record.t <= t + graceMs);
		const name = `${record.surface}:${record.level}:${record.event ?? record.message}${record.code ? ':' + record.code : ''}`;
		if (disrupted && record.level !== 'error' && record.level !== 'fatal') {
			info.disrupted[name] = (info.disrupted[name] ?? 0) + 1;
		} else {
			fail('inv4-journal-errors', { phase: 'journal', tabId: record.tabId, at: record.t - startedAt, record, disrupted: Boolean(disrupted) });
		}
	}

	// Invariant 5: memory settles.
	await delay(20_000);
	const memorySettled1 = await sampleMemory('settled-1');
	await delay(30_000);
	const memorySettled2 = await sampleMemory('settled-2');
	const peak = Math.max(0, ...info.memory.map((m) => m.residentMiB ?? 0));
	if (memoryStart !== undefined && memorySettled2 !== undefined) {
		const ceiling = Math.max(memoryStart * 3, memoryStart + 400);
		const drift = memorySettled2 - memorySettled1;
		if (memorySettled2 > ceiling) fail('inv5-memory', { phase: 'settle', startMiB: memoryStart, peakMiB: peak, settledMiB: memorySettled2, ceilingMiB: ceiling });
		if (drift > Math.max(40, memorySettled1 * 0.15)) fail('inv5-memory', { phase: 'settle', note: 'still growing after activity stopped', settled1MiB: memorySettled1, settled2MiB: memorySettled2 });
	}

	return { activityEnded, finalTabs, drainMs, leftovers, scanning, memoryStart };
}
