/** Derive the expected badge contract: empty for no findings and a capped label above 99 findings. */
export function badgeText(count) {
	return count <= 0 ? '' : count > 99 ? '99+' : String(count);
}

/**
 * Observe the extension without mutating browser contexts. Repeated violations
 * belong to this sampler; model touches keep active churn out of settled checks.
 * Serialized scripts run inside the extension and keep its real storage keys.
 */
export function create(ext, control, model, pages, report, hooks) {
	const { tabs, touchedAt, privateTabIds } = model;
	const { expectation } = pages;
	const { startedAt, now, info, journal, fail } = report;
	const pending = new Map(); // Invariant kind and tab ID -> unconfirmed sample.

	/** Every open tab with its badge and the stored snapshots for it, read in one round trip. */
	function readWorld() {
		return ext(`async (controlWindowId) => {
			const tabs = await browser.tabs.query({});
			const out = [];
			const indexKeys = tabs.map((t) => 'rd:session-index:' + t.id);
			const indexes = await browser.storage.local.get(indexKeys);
			const snapshotKeys = [];
			for (const t of tabs) {
				for (const entry of indexes['rd:session-index:' + t.id]?.entries ?? []) snapshotKeys.push('rd:session:' + entry.key.tabId + ':' + entry.key.frameId + ':' + entry.key.documentId);
			}
			const snapshots = snapshotKeys.length ? await browser.storage.local.get(snapshotKeys) : {};
			for (const t of tabs) {
				if (t.windowId === controlWindowId) continue;
				let badge;
				try { badge = await browser.action.getBadgeText({ tabId: t.id }); } catch (e) { badge = 'ERR ' + e.message; }
				const snaps = (indexes['rd:session-index:' + t.id]?.entries ?? [])
					.map((entry) => snapshots['rd:session:' + entry.key.tabId + ':' + entry.key.frameId + ':' + entry.key.documentId])
					.filter(Boolean)
					.map((s) => ({ url: s.analysis?.url, names: (s.analysis?.results ?? []).map((r) => r.name), status: s.status, updatedAt: s.updatedAt, revision: s.revision, documentId: s.key?.documentId, frameId: s.key?.frameId }))
					.sort((a, b) => b.updatedAt - a.updatedAt);
				out.push({ id: t.id, windowId: t.windowId, url: t.url, status: t.status, active: t.active, incognito: t.incognito, pinned: t.pinned, badge, snaps });
			}
			return out;
		}`, control.windowId);
	}

	/** The newest top-frame snapshot that describes the tab's current URL. */
	function currentSnapshot(tab) {
		return tab.snaps.find((s) => s.frameId === 0 && s.url === tab.url);
	}

	/** Check current-document markers and badge consistency only where the fixture defines an expectation. */
	function evaluateTab(tab, model) {
		const problemsFound = [];
		const expect = expectation(tab.url, model?.extras ?? []);
		if (!expect) return problemsFound;
		const current = currentSnapshot(tab);
		if (current) {
			const stale = current.names.filter((n) => expect.forbidden.includes(n));
			if (stale.length) problemsFound.push({ kind: 'stale-results', invariant: 'inv1-current-document-results', detail: { stale, names: current.names } });
		}
		const expectedBadge = current ? badgeText(current.names.length) : '';
		if (!tab.incognito && tab.badge && tab.badge !== expectedBadge) {
			problemsFound.push({ kind: 'badge', invariant: 'inv2-badge', detail: { badge: tab.badge, expectedBadge, currentSnapshot: Boolean(current), newest: tab.snaps[0] && { url: tab.snaps[0].url, count: tab.snaps[0].names.length, status: tab.snaps[0].status } } });
		}
		return problemsFound;
	}

	/** Sample every tab; confirm a violation only if it is still there on the next sample and nothing touched the tab since. */
	async function continuousCheck() {
		const world = await readWorld();
		const byId = new Map([...tabs.values()].map((t) => [t.id, t]));
		const seen = new Set();
		for (const tab of world) {
			if (tab.status !== 'complete') continue;
			for (const problem of evaluateTab(tab, byId.get(tab.id))) {
				const key = `${problem.kind}:${tab.id}`;
				seen.add(key);
				const previous = pending.get(key);
				const lastTouch = touchedAt.get(tab.id)?.at(-1) ?? 0;
				if (previous && previous.url === tab.url && lastTouch < previous.at && JSON.stringify(previous.detail) === JSON.stringify(problem.detail)) {
					if (!previous.reported) {
						fail(problem.invariant, { phase: 'continuous', tabId: tab.id, url: tab.url, ...problem.detail, persistedMs: Date.now() - previous.at });
						previous.reported = true;
					}
				} else if (!previous || previous.url !== tab.url || JSON.stringify(previous.detail) !== JSON.stringify(problem.detail)) {
					pending.set(key, { at: Date.now(), url: tab.url, detail: problem.detail });
				}
			}
		}
		for (const key of pending.keys()) if (!seen.has(key)) pending.delete(key);
		return world;
	}

	/** Collect bounded diagnostic records from this run and deduplicate them by their persisted journal keys. */
	async function pollJournal() {
		const records = await ext(`async (since) => Object.entries(await readStorage(['diagnostics:record:']))
			.filter(([k, v]) => k.startsWith('diagnostics:record:') && v && v.timestamp >= since)
			.map(([k, v]) => [k, { t: v.timestamp, surface: v.surface, level: v.level, message: typeof v.message === 'string' ? v.message.slice(0, 200) : undefined, event: v.properties?.event, code: v.properties?.code, tabId: v.properties?.tabId, errorMessage: v.properties?.message ?? v.properties?.errorMessage ?? v.properties?.errorType, reason: v.properties?.reason, props: JSON.stringify(v.properties ?? {}).slice(0, 400) }])`, startedAt);
		for (const [key, value] of records) journal.set(key, value);
	}

	/** Record optional browser-provided memory observations, retaining sampling errors without inventing a measurement. */
	async function sampleMemory(label) {
		const memory = await hooks.memory?.().catch((error) => ({ error: String(error) }));
		if (memory === undefined) return undefined;
		const residentMiB = Array.isArray(memory) ? memory.reduce((sum, p) => sum + (p.residentMiB ?? 0), 0) : undefined;
		info.memory.push({ label, t: now(), residentMiB, processes: memory });
		return residentMiB;
	}

	/** Storage and IndexedDB state that should be empty or only describe open tabs. */
	function readLeftovers() {
		return ext(`async (privateIds) => {
			const all = await readStorage();
			const sessionKeys = Object.keys(all).filter((k) => /^rd:(session-index|session|content-session):/.test(k));
			const jobs = Object.entries(all).filter(([k]) => k.startsWith('matcher-job:')).map(([, v]) => ({ jobId: v.jobId, tabId: v.tabId, status: v.status, reason: v.reason, updatedAt: v.updatedAt }));
			const activeJobs = jobs.filter((j) => j.status === 'queued' || j.status === 'running' || j.status === 'claimed');
			// The private URLs carry "pv=1"; no stored value may mention them.
			const privateHits = Object.entries(all).filter(([k, v]) => /pv=1/.test(JSON.stringify(v)) || privateIds.some((id) => k.includes(':' + id + ':') || k.endsWith(':' + id))).map(([k]) => ({ key: k }));
			let work = [];
			const names = indexedDB.databases ? (await indexedDB.databases()).map((d) => d.name) : ['kaiju-deepscope-execution'];
			if (names.includes('kaiju-deepscope-execution')) {
				const db = await new Promise((resolve, reject) => { const r = indexedDB.open('kaiju-deepscope-execution'); r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); });
				try {
					if (db.objectStoreNames.contains('work')) {
						work = await new Promise((resolve, reject) => { const r = db.transaction('work').objectStore('work').getAll(); r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); });
					}
				} finally { db.close(); }
			}
			return {
				storageKiB: Math.round(JSON.stringify(all).length / 1024),
				unreadableKeys: all.__unreadable ?? [],
				sessionKeys,
				activeJobs,
				closedJobs: jobs,
				privateHits,
				work: work.map((w) => ({ id: w.id, kind: w.kind, state: w.state, tabId: w.tabId, priority: w.priority, createdAt: w.createdAt, claimOwner: w.claimOwner, private: /pv=1/.test(JSON.stringify(w)) })),
			};
		}`, [...privateTabIds]);
	}

	return { readWorld, currentSnapshot, evaluateTab, continuousCheck, pollJournal, sampleMemory, readLeftovers };
}
