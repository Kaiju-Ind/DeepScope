/**
 * Retain one run's timeline and evidence. Model and observation owners append
 * facts here; only publish emits the existing harness result contract.
 */
export function create(plan) {
	const startedAt = Date.now();
	/** Express actions, observations and failures on one elapsed-ms timeline. */
	const now = () => Date.now() - startedAt;
	const failures = [];
	const info = { actionErrors: {}, counts: {}, disrupted: {}, lateMissing: [], privateResults: [], idle: [], memory: [] };
	const log = [];
	const journal = new Map(); // Persisted diagnostic key -> record from this run.
	let actionCount = 0;

	/** Assign an ordered action number and elapsed time while updating per-action counts for replay evidence. */
	function step(action, detail = {}) {
		const entry = { n: actionCount++, t: now(), action, ...detail };
		log.push(entry);
		info.counts[action] = (info.counts[action] ?? 0) + 1;
		return entry;
	}

	/** Retain the most recent actions involving a tab as context for an invariant failure. */
	function stepsFor(tabId, limit = 14) {
		return log.filter((e) => e.tabId === tabId || e.tabIds?.includes(tabId)).slice(-limit);
	}

	/** Record the failed invariant with seed, elapsed time and relevant tab actions before printing a bounded summary. */
	function fail(invariant, detail) {
		const entry = { invariant, seed: plan.seed, t: now(), ...detail, ...(detail.tabId !== undefined ? { steps: stepsFor(detail.tabId) } : {}) };
		failures.push(entry);
		console.log(`  stress FAIL ${invariant} t=${entry.t} ${JSON.stringify(detail).slice(0, 300)}`);
	}

	/** Attach diagnostic evidence and emit the invariant and summary records. */
	function publish(record, model, summary) {
		const { tabs, privateTabIds } = model;
		const nextTab = model.tabsOpened;
		const nextWindow = model.windowsOpened;
		const { activityEnded, finalTabs, drainMs, leftovers, scanning, memoryStart } = summary;
		// Attach what the journal saw for each failing tab, oldest first.
		for (const failure of failures) {
			if (failure.tabId === undefined || failure.journal) continue;
			failure.journal = [...journal.values()]
				.filter((r) => r.tabId === failure.tabId || (r.props ?? '').includes(`:${failure.tabId},`))
				.sort((a, b) => a.t - b.t)
				.slice(-60)
				.map((r) => `${r.t - startedAt} ${r.surface} ${r.level} ${r.event ?? r.message}${r.code ? ' ' + r.code : ''} ${r.props ?? ''}`.slice(0, 500));
		}

		const invariants = ['inv1-current-document-results', 'inv2-badge', 'inv3-closed-tab-cleanup', 'inv3-work-after-close', 'inv4-stuck-work', 'inv4-journal-errors', 'inv5-memory', 'inv6-private-not-persisted'];
		const memoryMeasured = memoryStart !== undefined;
		const privateMeasured = privateTabIds.size > 0;
		for (const invariant of invariants) {
			const hits = failures.filter((f) => f.invariant === invariant);
			const skipped = (invariant === 'inv5-memory' && !memoryMeasured) || (invariant === 'inv6-private-not-persisted' && !privateMeasured)
				|| (invariant === 'inv1-current-document-results' && !scanning);
			record(`stress ${invariant}`, hits.length === 0, { seed: plan.seed, ...(skipped ? { note: scanning ? 'not measured in this browser/run' : 'not measured: the browser did not grant host access' } : {}), failures: hits.length, examples: hits.slice(0, 6) });
		}
		record('stress summary', failures.length === 0, {
			seed: plan.seed,
			plan,
			activityMs: activityEnded,
			actions: actionCount,
			tabsOpened: nextTab,
			windowsOpened: nextWindow,
			privateTabs: privateTabIds.size,
			openAtEnd: tabs.size,
			finalVisits: { ok: finalTabs.filter((t) => t.verdict === 'ok').length, total: finalTabs.length, slowestMs: Math.max(0, ...finalTabs.map((t) => t.tookMs)) },
			drainMs,
			storageKiB: leftovers.storageKiB,
			unreadableKeys: leftovers.unreadableKeys,
			counts: info.counts,
			actionErrors: info.actionErrors,
			disruptedNoise: info.disrupted,
			lateContentMissing: info.lateMissing.slice(0, 10),
			idle: info.idle,
			memory: info.memory.map(({ label, t, residentMiB }) => ({ label, t, residentMiB })),
			journalRecordsSeen: journal.size,
			...(process.env.VERIFY_JOURNAL ? { journal: [...journal.values()].sort((a, b) => a.t - b.t).map((r) => `${r.t - startedAt} ${r.surface} ${r.level} ${r.event ?? r.message}${r.code ? ' ' + r.code : ''} ${r.props ?? ''}`.slice(0, 600)) } : {}),
			failures,
			log,
		});

	}

	return { startedAt, now, failures, info, log, journal, step, stepsFor, fail, publish };
}
