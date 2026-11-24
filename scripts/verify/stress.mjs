// The `stress` scenario: use DeepScope like a heavy, careless user would and
// check what the user sees. A seeded random schedule opens many tabs across
// several windows, switches between them faster than scans finish, closes and
// replaces tabs mid-scan, navigates and rewrites pages, opens the UI surfaces,
// lets the background go idle and hammers it again. Invariants are checked
// while it runs and after it stops; see scripts/verify/README.md.
//
// Every decision comes from the seeded generator and the harness's own model of
// the tabs it opened, so a seed replays the same sequence of actions. Timing
// still differs between runs, so a failure's recorded steps are the useful part.
import { setTimeout as delay } from 'node:timers/promises';

import { STRESS_FIXTURES, STRESS_MARKERS } from './fixtures.mjs';

/** Small, fast, seedable PRNG (mulberry32). */
export function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a = (a + 0x6D2B79F5) >>> 0;
		let t = a;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

// What `replace-contents` writes into a page. Not a fixture marker, so it may
// only appear on a document the harness rewrote.
const INJECTED_MARKER = { generator: 'mkdocs-1.5.3', name: 'MkDocs' };
const ALL_MARKERS = [...STRESS_MARKERS, INJECTED_MARKER.name];
// Real sites can show anything, except the fixture-only generators.
const REAL_FORBIDDEN = ALL_MARKERS.filter((name) => name !== 'WordPress' && name !== 'jQuery');
const REAL_SITES = ['https://example.com/', 'https://wordpress.org/', 'https://react.dev/', 'https://en.wikipedia.org/wiki/Firefox'];

// Journal events that are not failures in a run that closes and replaces
// documents on purpose (the scheduler cancels work for documents that left).
const EXPECTED = /canceled|cancelled|navigated away|no longer owns|inspectable URL yet|^tab-unavailable$|no longer matches its browser document/i;
const BAD_EVENT = /unavailable|failed|timeout|error|mismatch|crash|unhandled/i;
// Journal events that mean work ran for a tab. After a tab closes these
// should stop within a short grace period.
const WORK_EVENT = /^(dom-scan|content-runtime-inject|matcher-partition|matcher-job-(started|completed)|analysis-(started|completed)|\[timing\] (collector|matcher|background\.analy))/;

function badgeText(count) {
	return count <= 0 ? '' : count > 99 ? '99+' : String(count);
}

/** Parse duration and size options into a plan. */
export function stressPlan(options = {}) {
	const quick = Boolean(options.quick);
	const minutes = Number(options.minutes ?? (quick ? 1.5 : 5));
	return {
		seed: Number(options.seed ?? Date.now() % 1_000_000),
		quick,
		durationMs: Math.max(20_000, minutes * 60_000),
		maxTabs: Number(options.tabs ?? (quick ? 10 : 24)),
		maxWindows: Number(options.windows ?? (quick ? 2 : 4)),
		real: options.real !== false,
		idle: options.idle ?? !quick,
	};
}

/**
 * Run the stress scenario. `context` is the scenario context from
 * runScenarios plus `stress` (see stressPlan) and these optional hooks:
 * `toggleSidebar(index)`, `undoCloseTab()`, `privateWindows` (true when the
 * build may run in private windows).
 */
export async function runStress(session, harness, context) {
	const { ext, record } = harness;
	const { origin, hooks } = context;
	const plan = stressPlan(context.stress);
	const rnd = mulberry32(plan.seed);
	const startedAt = Date.now();
	const now = () => Date.now() - startedAt;
	const int = (n) => Math.floor(rnd() * n);
	const chance = (p) => rnd() < p;
	const pick = (list) => list[int(list.length)];

	const failures = [];
	const info = { actionErrors: {}, counts: {}, disrupted: {}, lateMissing: [], privateResults: [], idle: [], memory: [] };
	const log = [];
	const tabs = new Map(); // label -> model tab
	const windows = new Map(); // label -> model window
	const closedTabIds = new Map(); // browser tab id -> close time
	const touchedAt = new Map(); // browser tab id -> [times of disruptive actions]
	const pending = new Map(); // `${kind}:${tabId}` -> candidate violation awaiting confirmation
	const journal = new Map(); // storage key -> record
	const privateTabIds = new Set();
	let nextTab = 0;
	let nextWindow = 0;
	let urlCounter = 0;
	let actionCount = 0;

	const control = await ext(`async () => { const w = await browser.windows.getCurrent(); return { windowId: w.id }; }`);

	// --- model -----------------------------------------------------------------

	function addWindow(id, isPrivate = false) {
		const label = `W${nextWindow++}`;
		windows.set(label, { label, id, private: isPrivate });
		return label;
	}
	function windowLabelById(id) {
		for (const w of windows.values()) if (w.id === id) return w.label;
		return undefined;
	}
	function addTab(tab, url) {
		const label = `T${nextTab++}`;
		let windowLabel = windowLabelById(tab.windowId);
		if (!windowLabel) windowLabel = addWindow(tab.windowId, Boolean(tab.incognito));
		if (tab.incognito) privateTabIds.add(tab.id);
		tabs.set(label, { label, id: tab.id, windowLabel, private: Boolean(tab.incognito), url: url ?? tab.url, pinned: Boolean(tab.pinned), extras: [] });
		return label;
	}
	function dropTab(label, at = Date.now()) {
		const tab = tabs.get(label);
		if (!tab) return;
		closedTabIds.set(tab.id, at);
		tabs.delete(label);
		const w = windows.get(tab.windowLabel);
		if (w && ![...tabs.values()].some((t) => t.windowLabel === w.label)) windows.delete(w.label);
	}
	function touch(tabId) {
		if (!touchedAt.has(tabId)) touchedAt.set(tabId, []);
		touchedAt.get(tabId).push(Date.now());
	}
	function step(action, detail = {}) {
		const entry = { n: actionCount++, t: now(), action, ...detail };
		log.push(entry);
		info.counts[action] = (info.counts[action] ?? 0) + 1;
		return entry;
	}
	function stepsFor(tabId, limit = 14) {
		return log.filter((e) => e.tabId === tabId || e.tabIds?.includes(tabId)).slice(-limit);
	}
	function fail(invariant, detail) {
		const entry = { invariant, seed: plan.seed, t: now(), ...detail, ...(detail.tabId !== undefined ? { steps: stepsFor(detail.tabId) } : {}) };
		failures.push(entry);
		console.log(`  stress FAIL ${invariant} t=${entry.t} ${JSON.stringify(detail).slice(0, 300)}`);
	}
	const normalTabs = () => [...tabs.values()].filter((t) => !t.private);
	const normalWindows = () => [...windows.values()].filter((w) => !w.private);
	const tabLabels = (filter = () => true) => [...tabs.values()].filter(filter).map((t) => t.label);

	// --- URLs ------------------------------------------------------------------

	function fixtureUrl() {
		const paths = ['/wp.html', '/hugo.html', '/ghost.html', '/drupal.html', '/joomla.html', '/swap.html', '/spa-rewrite.html', '/huge.html', '/replace.html', '/busy.html'];
		const weights = [3, 3, 3, 3, 3, 2, 2, 1, 2, 0.5];
		let r = rnd() * weights.reduce((a, b) => a + b, 0);
		let path = paths.at(-1);
		for (let i = 0; i < paths.length; i++) {
			r -= weights[i];
			if (r <= 0) { path = paths[i]; break; }
		}
		const s = `s=${urlCounter++}`;
		if (path === '/huge.html') return `${origin}${path}?n=${20_000 + int(60_000)}&${s}`;
		if (path === '/replace.html') {
			const to = `${pick(['/hugo.html', '/ghost.html', '/drupal.html', '/joomla.html', '/wp.html'])}?${s}r`;
			return `${origin}${path}?to=${encodeURIComponent(to)}&after=${int(1200)}&${s}`;
		}
		return `${origin}${path}?${s}`;
	}
	function randomUrl() {
		if (plan.real && chance(plan.quick ? 0.08 : 0.15)) {
			const site = pick(REAL_SITES);
			return `${site}${site.includes('?') ? '&' : '?'}ds=${urlCounter++}`;
		}
		return fixtureUrl();
	}

	/** A page this run opened: the current fixture server or a real site, not a leftover from an earlier session. */
	function isOurs(url) {
		try {
			const parsed = new URL(url);
			if (parsed.origin === origin) return true;
			return /^https:$/.test(parsed.protocol) && REAL_SITES.some((site) => new URL(site).origin === parsed.origin);
		} catch {
			return false;
		}
	}

	/** What a document at `url` may and must show. */
	function expectation(url, extras = []) {
		let parsed;
		try { parsed = new URL(url); } catch { return undefined; }
		if (!/^https?:$/.test(parsed.protocol)) return undefined;
		if (/^(127\.0\.0\.1|localhost)$/.test(parsed.hostname) && parsed.origin !== origin) return undefined;
		if (parsed.origin !== origin) return { real: true, must: [], late: [], forbidden: REAL_FORBIDDEN.filter((n) => !extras.includes(n)) };
		const fixture = STRESS_FIXTURES[parsed.pathname];
		if (!fixture) return { must: [], late: [], forbidden: [] };
		const allowed = new Set([...fixture.must, ...(fixture.late ?? []), ...extras]);
		// A rewritten document may have lost its markers before any scan saw them.
		const rewritten = extras.includes(INJECTED_MARKER.name);
		return { must: rewritten ? [] : fixture.must, late: fixture.late ?? [], forbidden: ALL_MARKERS.filter((n) => !allowed.has(n)) };
	}

	// --- reading the extension ---------------------------------------------------

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

	async function pollJournal() {
		const records = await ext(`async (since) => Object.entries(await readStorage(['diagnostics:record:']))
			.filter(([k, v]) => k.startsWith('diagnostics:record:') && v && v.timestamp >= since)
			.map(([k, v]) => [k, { t: v.timestamp, surface: v.surface, level: v.level, message: typeof v.message === 'string' ? v.message.slice(0, 200) : undefined, event: v.properties?.event, code: v.properties?.code, tabId: v.properties?.tabId, errorMessage: v.properties?.message ?? v.properties?.errorMessage ?? v.properties?.errorType, reason: v.properties?.reason, props: JSON.stringify(v.properties ?? {}).slice(0, 400) }])`, startedAt);
		for (const [key, value] of records) journal.set(key, value);
	}

	async function sampleMemory(label) {
		const memory = await hooks.memory?.().catch((error) => ({ error: String(error) }));
		if (memory === undefined) return undefined;
		const residentMiB = Array.isArray(memory) ? memory.reduce((sum, p) => sum + (p.residentMiB ?? 0), 0) : undefined;
		info.memory.push({ label, t: now(), residentMiB, processes: memory });
		return residentMiB;
	}

	// --- actions -----------------------------------------------------------------

	async function call(action, body, ...args) {
		try {
			return await ext(body, ...args);
		} catch (error) {
			const message = String(error.message ?? error).replace(/\d+/g, 'N').slice(0, 160);
			const key = `${action}: ${message}`;
			info.actionErrors[key] = (info.actionErrors[key] ?? 0) + 1;
			return undefined;
		}
	}

	async function openTab() {
		const w = pick(normalWindows());
		if (!w) return newWindow();
		const url = randomUrl();
		const active = chance(0.6);
		const tab = await call('open', `async (windowId, url, active) => { const t = await browser.tabs.create({ windowId, url, active }); return { id: t.id, windowId: t.windowId, incognito: t.incognito, pinned: t.pinned }; }`, w.id, url, active);
		if (!tab) return;
		addTab(tab, url);
		touch(tab.id);
		step('open', { tabId: tab.id, url, active });
	}

	async function activate(label = pick(tabLabels())) {
		const tab = tabs.get(label);
		if (!tab) return;
		step('activate', { tabId: tab.id });
		await call('activate', `async (id) => { await browser.tabs.update(id, { active: true }); }`, tab.id);
	}

	async function burst() {
		const n = 4 + int(12);
		const ids = [];
		for (let i = 0; i < n; i++) {
			const label = pick(tabLabels());
			if (!label) return;
			ids.push(tabs.get(label).id);
		}
		const gaps = ids.map(() => int(90));
		step('switch-burst', { tabIds: ids, gaps });
		await call('switch-burst', `async (ids, gaps) => {
			for (let i = 0; i < ids.length; i++) {
				browser.tabs.update(ids[i], { active: true }).catch(() => undefined);
				await new Promise((r) => setTimeout(r, gaps[i]));
			}
		}`, ids, gaps);
	}

	async function focusWindow() {
		const w = pick([...windows.values()]);
		if (!w) return;
		step('focus-window', { windowId: w.id });
		await call('focus-window', `async (id) => { await browser.windows.update(id, { focused: true }); }`, w.id);
	}

	async function moveTab() {
		const label = pick(tabLabels((t) => !t.private));
		const targets = normalWindows();
		if (!label || targets.length < 1) return;
		const tab = tabs.get(label);
		const target = pick(targets);
		const index = chance(0.5) ? -1 : int(6);
		step(target.label === tab.windowLabel ? 'reorder' : 'move-window', { tabId: tab.id, toWindow: target.id, index });
		const moved = await call('move', `async (id, windowId, index) => { const r = await browser.tabs.move(id, { windowId, index }); const t = Array.isArray(r) ? r[0] : r; return t && { windowId: t.windowId }; }`, tab.id, target.id, index);
		if (moved) {
			const from = tab.windowLabel;
			tab.windowLabel = windowLabelById(moved.windowId) ?? target.label;
			if (from !== tab.windowLabel && ![...tabs.values()].some((t) => t.windowLabel === from)) windows.delete(from);
		}
	}

	async function closeTab(label) {
		// Prefer a tab that is probably mid-scan: one touched in the last few seconds.
		const recent = tabLabels((t) => (touchedAt.get(t.id)?.at(-1) ?? 0) > Date.now() - 3000);
		label ??= recent.length && chance(0.6) ? pick(recent) : pick(tabLabels());
		const tab = tabs.get(label);
		if (!tab || tabs.size <= 3) return;
		// Never close the last tab of the last normal window.
		if (normalTabs().length <= 1 && !tab.private) return;
		touch(tab.id);
		step('close-tab', { tabId: tab.id, url: tab.url });
		await call('close-tab', `async (id) => { await browser.tabs.remove(id); }`, tab.id);
		dropTab(label);
	}

	async function closeWindow() {
		const candidates = [...windows.values()].filter((w) => w.private || normalWindows().length > 1);
		const w = pick(candidates);
		if (!w) return;
		const members = [...tabs.values()].filter((t) => t.windowLabel === w.label);
		for (const t of members) touch(t.id);
		step('close-window', { windowId: w.id, tabIds: members.map((t) => t.id), private: w.private });
		await call('close-window', `async (id) => { await browser.windows.remove(id); }`, w.id);
		for (const t of members) dropTab(t.label);
		windows.delete(w.label);
	}

	async function newWindow(isPrivate = false) {
		const urls = Array.from({ length: 1 + int(3) }, () => isPrivate ? `${fixtureUrl()}&pv=1` : randomUrl());
		const focused = chance(0.5);
		const created = await call(isPrivate ? 'private-window' : 'new-window', `async (url, focused, incognito) => {
			const w = await browser.windows.create({ url, focused, ...(incognito ? { incognito: true } : {}) });
			const tabs = w.tabs ?? await browser.tabs.query({ windowId: w.id });
			return { id: w.id, incognito: w.incognito, tabs: tabs.map((t) => ({ id: t.id, windowId: t.windowId, incognito: t.incognito, pinned: t.pinned })) };
		}`, urls, focused, isPrivate);
		if (!created) return;
		if (isPrivate && !created.incognito) info.privateResults.push({ note: 'windows.create({ incognito: true }) returned a normal window' });
		addWindow(created.id, Boolean(created.incognito));
		created.tabs.forEach((t, i) => { addTab(t, urls[i]); touch(t.id); });
		step(isPrivate ? 'private-window' : 'new-window', { windowId: created.id, tabIds: created.tabs.map((t) => t.id), urls });
	}

	function navTarget(preferActive) {
		if (preferActive) {
			const recent = log.filter((e) => e.action === 'activate' || e.action === 'open').slice(-3).map((e) => e.tabId);
			const label = tabLabels((t) => recent.includes(t.id));
			if (label.length) return pick(label);
		}
		return pick(tabLabels());
	}

	async function navigate(label = navTarget(chance(0.5)), action = 'navigate') {
		const tab = tabs.get(label);
		if (!tab) return;
		const url = tab.private ? `${fixtureUrl()}&pv=1` : randomUrl();
		touch(tab.id);
		tab.url = url;
		tab.extras = [];
		step(action, { tabId: tab.id, url });
		await call(action, `async (id, url) => { await browser.tabs.update(id, { url }); }`, tab.id, url);
	}

	async function navigateMidScan() {
		const label = pick(tabLabels());
		const tab = tabs.get(label);
		if (!tab) return;
		await activate(label);
		await delay(50 + int(600));
		await navigate(label, 'navigate-mid-scan');
	}

	async function scriptReplace() {
		const label = navTarget(true);
		const tab = tabs.get(label);
		if (!tab) return;
		const url = tab.private ? `${fixtureUrl()}&pv=1` : fixtureUrl();
		touch(tab.id);
		tab.url = url;
		tab.extras = [];
		step('location-replace', { tabId: tab.id, url });
		await call('location-replace', `async (id, url) => { await browser.scripting.executeScript({ target: { tabId: id }, func: (u) => location.replace(u), args: [url] }); }`, tab.id, url);
	}

	async function historyHop() {
		const tab = tabs.get(navTarget(true));
		if (!tab) return;
		const moves = Array.from({ length: 2 + int(5) }, () => chance(0.6) ? 'back' : 'forward');
		const gaps = moves.map(() => int(250));
		touch(tab.id);
		// Back and forward may stay inside one document (pushState entries), so a
		// rewrite's marker stays allowed.
		step('back-forward', { tabId: tab.id, moves });
		await call('back-forward', `async (id, moves, gaps) => {
			for (let i = 0; i < moves.length; i++) {
				await (moves[i] === 'back' ? browser.tabs.goBack(id) : browser.tabs.goForward(id)).catch(() => undefined);
				await new Promise((r) => setTimeout(r, gaps[i]));
			}
		}`, tab.id, moves, gaps);
		// The harness no longer knows which entry is showing; the checks read the tab's URL.
		tab.url = undefined;
	}

	async function reloadStorm() {
		const tab = tabs.get(navTarget(true));
		if (!tab) return;
		const n = 3 + int(5);
		const gaps = Array.from({ length: n }, () => int(200));
		touch(tab.id);
		step('reload-storm', { tabId: tab.id, n, gaps });
		await call('reload-storm', `async (id, gaps) => {
			for (const gap of gaps) {
				browser.tabs.reload(id).catch(() => undefined);
				await new Promise((r) => setTimeout(r, gap));
			}
		}`, tab.id, gaps);
	}

	async function pushState() {
		const tab = tabs.get(navTarget(true));
		if (!tab) return;
		const path = `?push=${urlCounter++}`;
		touch(tab.id);
		step('push-state', { tabId: tab.id, path });
		await call('push-state', `async (id, path) => { await browser.scripting.executeScript({ target: { tabId: id }, world: 'MAIN', func: (p) => history.pushState({}, '', location.pathname + p), args: [path] }); }`, tab.id, path);
	}

	async function replaceContents() {
		const tab = tabs.get(navTarget(true));
		if (!tab) return;
		touch(tab.id);
		tab.extras = [...new Set([...tab.extras, INJECTED_MARKER.name])];
		step('replace-contents', { tabId: tab.id });
		await call('replace-contents', `async (id, generator) => {
			await browser.scripting.executeScript({ target: { tabId: id }, world: 'MAIN', args: [generator], func: (g) => {
				document.documentElement.innerHTML = '<head><title>Replaced</title><meta name="generator" content="' + g + '"></head><body><main>' + '<p>replaced</p>'.repeat(300) + '</main></body>';
			} });
		}`, tab.id, INJECTED_MARKER.generator);
	}

	async function duplicate() {
		const tab = tabs.get(pick(tabLabels()));
		if (!tab || tabs.size >= plan.maxTabs) return;
		const dup = await call('duplicate', `async (id) => { const t = await browser.tabs.duplicate(id); return t && { id: t.id, windowId: t.windowId, incognito: t.incognito, pinned: t.pinned, url: t.url }; }`, tab.id);
		if (!dup) return;
		const label = addTab(dup, tab.url);
		tabs.get(label).extras = [];
		touch(dup.id);
		step('duplicate', { tabId: tab.id, tabIds: [tab.id, dup.id] });
	}

	async function pin() {
		const tab = tabs.get(pick(tabLabels()));
		if (!tab) return;
		tab.pinned = !tab.pinned;
		step(tab.pinned ? 'pin' : 'unpin', { tabId: tab.id });
		await call('pin', `async (id, pinned) => { await browser.tabs.update(id, { pinned }); }`, tab.id, tab.pinned);
	}

	async function openPanel() {
		const tab = tabs.get(pick(tabLabels((t) => !t.private)));
		const w = pick(normalWindows());
		if (!tab || !w) return;
		const stay = 300 + int(3000);
		step('panel-page', { tabId: tab.id, stay });
		await call('panel-page', `async (tabId, windowId, stay) => {
			const panel = await browser.tabs.create({ windowId, url: browser.runtime.getURL('panel.html?tab=' + tabId), active: true });
			await new Promise((r) => setTimeout(r, stay));
			await browser.tabs.remove(panel.id);
		}`, tab.id, w.id, stay);
	}

	async function sidebar() {
		const index = int(4);
		step('toggle-sidebar', { index });
		try {
			await hooks.toggleSidebar(index);
		} catch (error) {
			info.actionErrors[`toggle-sidebar: ${String(error.message).slice(0, 120)}`] = (info.actionErrors[`toggle-sidebar: ${String(error.message).slice(0, 120)}`] ?? 0) + 1;
		}
	}

	async function restoreClosed() {
		step('undo-close-tab');
		try {
			await hooks.undoCloseTab();
		} catch (error) {
			info.actionErrors[`undo-close-tab: ${String(error.message).slice(0, 120)}`] = (info.actionErrors[`undo-close-tab: ${String(error.message).slice(0, 120)}`] ?? 0) + 1;
		}
		await delay(300);
		await syncModel('restored');
	}

	async function privateAction() {
		const privateWindow = [...windows.values()].find((w) => w.private);
		if (!privateWindow) return newWindow(true);
		const privateTabs = tabLabels((t) => t.private);
		if (chance(0.3)) {
			const w = privateWindow;
			const members = [...tabs.values()].filter((t) => t.windowLabel === w.label);
			for (const t of members) touch(t.id);
			step('close-window', { windowId: w.id, tabIds: members.map((t) => t.id), private: true });
			await call('close-window', `async (id) => { await browser.windows.remove(id); }`, w.id);
			for (const t of members) dropTab(t.label);
			windows.delete(w.label);
			return;
		}
		if (privateTabs.length && chance(0.6)) return navigate(pick(privateTabs), 'navigate-private');
		const url = `${fixtureUrl()}&pv=1`;
		const tab = await call('open-private', `async (windowId, url) => { const t = await browser.tabs.create({ windowId, url, active: true }); return { id: t.id, windowId: t.windowId, incognito: t.incognito, pinned: t.pinned }; }`, privateWindow.id, url);
		if (!tab) return;
		addTab(tab, url);
		touch(tab.id);
		step('open-private', { tabId: tab.id, url });
	}

	/** Reconcile the model with the browser after operations that create tabs the harness did not name. */
	async function syncModel(reason) {
		// Every tab still open, whatever it shows: a tab between documents can
		// briefly report about:blank and must not be mistaken for a closed one.
		const live = await call('sync', `async (controlWindowId) => (await browser.tabs.query({})).filter((t) => t.windowId !== controlWindowId).map((t) => ({ id: t.id, windowId: t.windowId, incognito: t.incognito, pinned: t.pinned, url: t.url || t.pendingUrl || '' }))`, control.windowId);
		if (!live) return;
		const liveIds = new Set(live.map((t) => t.id));
		for (const t of [...tabs.values()]) if (!liveIds.has(t.id)) dropTab(t.label);
		const known = new Set([...tabs.values()].map((t) => t.id));
		for (const t of live.sort((a, b) => a.id - b.id)) {
			if (known.has(t.id) || !isOurs(t.url)) continue;
			const label = addTab(t, t.url);
			touch(t.id);
			step('adopt-tab', { tabId: t.id, url: t.url, reason });
			void label;
		}
		for (const t of live.filter((x) => known.has(x.id) || isOurs(x.url))) {
			const model = [...tabs.values()].find((m) => m.id === t.id);
			if (model) {
				const w = windowLabelById(t.windowId) ?? addWindow(t.windowId, Boolean(t.incognito));
				model.windowLabel = w;
			}
		}
		for (const w of [...windows.values()]) if (![...tabs.values()].some((t) => t.windowLabel === w.label)) windows.delete(w.label);
	}

	const actions = [
		{ name: 'open', weight: 10, when: () => tabs.size < plan.maxTabs, run: openTab },
		{ name: 'activate', weight: 14, when: () => tabs.size > 0, run: () => activate() },
		{ name: 'switch-burst', weight: 8, when: () => tabs.size > 1, run: burst },
		{ name: 'focus-window', weight: 4, when: () => windows.size > 1, run: focusWindow },
		{ name: 'move', weight: 6, when: () => tabs.size > 1, run: moveTab },
		{ name: 'close-tab', weight: 6, when: () => tabs.size > 4, run: () => closeTab() },
		{ name: 'close-window', weight: 1.5, when: () => normalWindows().length > 1, run: closeWindow },
		{ name: 'new-window', weight: 2, when: () => normalWindows().length < plan.maxWindows && tabs.size < plan.maxTabs - 2, run: () => newWindow() },
		{ name: 'navigate', weight: 12, when: () => tabs.size > 0, run: () => navigate() },
		{ name: 'navigate-mid-scan', weight: 6, when: () => tabs.size > 0, run: navigateMidScan },
		{ name: 'location-replace', weight: 4, when: () => tabs.size > 0, run: scriptReplace },
		{ name: 'back-forward', weight: 5, when: () => tabs.size > 0, run: historyHop },
		{ name: 'reload-storm', weight: 3, when: () => tabs.size > 0, run: reloadStorm },
		{ name: 'push-state', weight: 4, when: () => tabs.size > 0, run: pushState },
		{ name: 'replace-contents', weight: 4, when: () => tabs.size > 0, run: replaceContents },
		{ name: 'panel-page', weight: 3, when: () => tabs.size > 0, run: openPanel },
		{ name: 'toggle-sidebar', weight: 2, when: () => Boolean(hooks.toggleSidebar), run: sidebar },
		{ name: 'duplicate', weight: 2, when: () => tabs.size > 0 && tabs.size < plan.maxTabs, run: duplicate },
		{ name: 'pin', weight: 2, when: () => tabs.size > 0, run: pin },
		{ name: 'undo-close-tab', weight: 2, when: () => Boolean(hooks.undoCloseTab) && closedTabIds.size > 0 && tabs.size < plan.maxTabs, run: restoreClosed },
		{ name: 'private', weight: 2, when: () => Boolean(hooks.privateWindows), run: privateAction },
	];

	function chooseAction() {
		const available = actions.filter((a) => a.when());
		let r = rnd() * available.reduce((sum, a) => sum + a.weight, 0);
		for (const a of available) {
			r -= a.weight;
			if (r <= 0) return a;
		}
		return available.at(-1);
	}

	async function act(n) {
		for (let i = 0; i < n; i++) {
			const action = chooseAction();
			await action.run();
			// Users are fast: most gaps are shorter than a scan.
			const gap = chance(0.7) ? int(150) : int(1500);
			if (gap) await delay(gap);
		}
	}

	// --- run -----------------------------------------------------------------------

	console.log(`  stress seed=${plan.seed} duration=${Math.round(plan.durationMs / 1000)}s maxTabs=${plan.maxTabs} maxWindows=${plan.maxWindows} real=${plan.real} idle=${plan.idle} private=${Boolean(hooks.privateWindows)}`);
	// Start from a clean journal view: earlier scenarios are not this run's problems.
	const memoryStart = await sampleMemory('start');

	// Seed windows and tabs.
	const existing = await call('seed', `async (controlWindowId) => (await browser.tabs.query({})).filter((t) => t.windowId !== controlWindowId && /^https?:/.test(t.url || '')).map((t) => ({ id: t.id, windowId: t.windowId, incognito: t.incognito, pinned: t.pinned, url: t.url }))`, control.windowId) ?? [];
	// Safari keeps windows from earlier automation sessions; close what this run did not open.
	const foreign = existing.filter((t) => !isOurs(t.url));
	if (foreign.length) {
		await call('close-leftovers', `async (ids) => { await browser.tabs.remove(ids); }`, foreign.map((t) => t.id));
		info.counts['closed-leftover-tabs'] = foreign.length;
	}
	for (const t of existing.filter((x) => isOurs(x.url))) addTab(t, t.url);
	while (normalWindows().length < Math.min(2, plan.maxWindows)) await newWindow();
	for (let i = tabs.size; i < Math.ceil(plan.maxTabs * 0.6); i++) await openTab();

	const idleAt = plan.idle ? [0.5, ...(plan.durationMs > 8 * 60_000 ? [0.8] : [])].map((f) => f * plan.durationMs) : [];
	let lastCheck = Date.now();
	let lastJournal = Date.now();
	let lastMemory = Date.now();
	let lastSync = Date.now();
	while (now() < plan.durationMs) {
		await act(5);
		if (Date.now() - lastSync > 20_000) { await syncModel('periodic'); lastSync = Date.now(); }
		if (Date.now() - lastCheck > 5_000) { await continuousCheck(); lastCheck = Date.now(); }
		if (Date.now() - lastJournal > 5_000) { await pollJournal(); lastJournal = Date.now(); }
		if (Date.now() - lastMemory > 60_000) { await sampleMemory('during'); lastMemory = Date.now(); }
		if (idleAt.length && now() >= idleAt[0]) {
			idleAt.shift();
			await pollJournal();
			// Leave the extension alone long enough for the background to unload.
			const idleStart = Date.now();
			step('idle', { ms: context.idleMs });
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
			const memoryIdle = await sampleMemory('idle');
			info.idle.push({ t: now(), waitedMs: Date.now() - idleStart, backgroundState: state, residentMiB: memoryIdle });
			// Hammer it straight after it wakes.
			step('hammer');
			for (let i = 0; i < 3; i++) await burst();
			await act(10);
		}
	}

	// --- quiesce and final checks ------------------------------------------------------

	const activityEnded = now();
	step('stop');
	await sampleMemory('activity-end');
	await syncModel('final');
	await delay(5000);
	await pollJournal();

	// Invariant 1 (and 2 per tab): visit every normal tab like a user checking
	// each one; it must show its current document's expected results and badge.
	// Without host access nothing can be scanned; the visits would only time out.
	const scanning = context.hostAccess !== false;
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

	// --- report --------------------------------------------------------------------------

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
}
