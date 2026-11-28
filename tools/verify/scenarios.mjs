// Browser-neutral parts of the real-browser verification: reading DeepScope's
// state from an extension page, judging it, and the scenario matrix itself.
// Each driver (firefox.mjs, safari.mjs) installs the build, opens a control
// page, and passes the browser-specific operations in as hooks.
import { setTimeout as delay } from 'node:timers/promises';

import { runStress } from './stress.mjs';

const BAD_EVENT = /unavailable|failed|timeout|error|mismatch/i;
// Work for a document the tab already left is canceled by design; so is an
// identity lookup while the tab is between documents.
const EXPECTED = /canceled|navigated away|no longer owns|inspectable URL yet|^tab-unavailable$/i;
// Logged once each time the background page or worker starts.
const BACKGROUND_START_EVENT = 'matcher-executor-selected';

export const SCENARIOS = ['preinstall', 'active-load', 'background-tab', 'spa', 'real-sites', 'busy-page', 'navigate-mid-scan', 'close-mid-scan', 'idle-wake', 'panel-page', 'reinstall', 'restricted', 'heavy', 'history', 'nav-loop', 'reload-storm', 'spa-self-navigate', 'stress', 'permission-revoked'];

/**
 * In-page helper every control-page script can call: the stored entries whose
 * keys start with one of `prefixes`. Safari refuses storage.local.get(null)
 * once storage holds about 1 MiB ("exceeded maximum data size allowed per
 * call"), so it lists keys with getKeys() and reads them in batches, halving
 * a batch that is still too large. Values over the limit on their own are
 * reported under `__unreadable`.
 */
const READ_STORAGE = `async function readStorage(prefixes = ['']) {
	const area = browser.storage.local;
	const wanted = (key) => prefixes.some((prefix) => key.startsWith(prefix));
	if (typeof area.getKeys !== 'function') {
		return Object.fromEntries(Object.entries(await area.get(null)).filter(([key]) => wanted(key)));
	}
	const keys = (await area.getKeys()).filter(wanted);
	const out = {};
	const unreadable = [];
	const read = async (batch) => {
		try { Object.assign(out, await area.get(batch)); } catch (error) {
			if (batch.length === 1) { unreadable.push(batch[0]); return; }
			const mid = batch.length >> 1;
			await read(batch.slice(0, mid));
			await read(batch.slice(mid));
		}
	};
	for (let i = 0; i < keys.length; i += 40) await read(keys.slice(i, i + 40));
	if (unreadable.length) Object.defineProperty(out, '__unreadable', { value: unreadable, enumerable: false });
	return out;
}`;

/** Wrap an async function source so `execAsync` runs it and reports its result or error. */
export function asyncScript(body) {
	return `const done = arguments[arguments.length - 1];
		 ${READ_STORAGE}
		 const fn = ${body};
		 fn(...Array.from(arguments).slice(0, -1)).then((v) => done({ ok: true, v }), (e) => done({ ok: false, e: String(e && e.message || e) }));`;
}

/** Select warning, error and known failure events while excluding the harness's documented expected shutdown cases. */
export function problems(state) {
	return state.events.filter((e) => (e.level === 'error' || e.level === 'warning' || BAD_EVENT.test(e.event ?? '') || e.code === 'CONTENT_SCRIPT_UNAVAILABLE')
		&& !EXPECTED.test(e.message ?? '') && !EXPECTED.test(e.event ?? ''));
}

/** Poll a scenario until its completion condition or deadline; timeout returns the last observation with an explicit marker. */
export async function waitFor(check, timeoutMs = 30_000, intervalMs = 500) {
	const start = Date.now();
	let last;
	while (Date.now() - start < timeoutMs) {
		last = await check();
		if (last.done) return last;
		await delay(intervalMs);
	}
	return { ...last, timedOut: true };
}

/** Create a bounded state summary, adding full event text only for timeout or explicitly verbose verification. */
export function summarize(state, timedOut = false) {
	const verbose = timedOut || process.env.VERIFY_VERBOSE;
	const injected = state.events.filter((e) => /^content-runtime/.test(e.event ?? '')).map((e) => e.event);
	const timings = state.events.map((e) => /\[timing\] (collector\.content-rpc\.collect-observation-batch|background\.content-runtime\.ensure) (\w+) in (\d+)ms/.exec(e.event ?? '')).filter(Boolean).map((m) => `${m[1].split('.').at(-1)} ${m[2]} ${m[3]}ms`);
	return { url: state.url, tabStatus: state.status, active: state.active, ...(state.snapshotUrl !== state.url ? { snapshotUrl: state.snapshotUrl } : {}), badge: state.badge, names: state.names.slice(0, 12), count: state.names.length, contentRuntime: [...new Set(injected)], timings: timings.slice(0, 6), problems: problems(state).slice(0, 8), ...(verbose ? { events: state.events.map((e) => `${e.t % 100000} ${e.surface} ${e.event}${e.code ? ' ' + e.code : ''}${e.message ? ' ' + e.message : ''}${e.stats ? ' ' + e.stats : ''}`) } : {}) };
}

/**
 * Helpers bound to one control page. `ext(body, ...args)` runs an async
 * function source in an extension page and returns its value.
 */
export function createHarness(ext) {
	const results = [];

	/** Tab, badge, stored results and journal events for one tab since `since`. */
	function tabState(tabId, since = 0) {
		return ext(`async (tabId, since) => {
			const all = await readStorage(['rd:session', 'diagnostics:record:']);
			const index = all['rd:session-index:' + tabId];
			const latest = index?.entries?.slice().sort((a, b) => b.updatedAt - a.updatedAt)[0];
			let names = [];
			let status;
			let source;
			let snapshotUrl;
			if (latest) {
				const key = 'rd:session:' + latest.key.tabId + ':' + latest.key.frameId + ':' + latest.key.documentId;
				const snapshot = all[key];
				names = (snapshot?.analysis?.results ?? []).map((r) => r.name);
				status = snapshot?.status;
				source = snapshot?.source;
				snapshotUrl = snapshot?.analysis?.url;
			}
			const events = Object.entries(all)
				.filter(([k, v]) => k.startsWith('diagnostics:record:') && v.timestamp >= since && (v.properties?.tabId === tabId || v.surface === 'content' || v.level === 'error' || v.level === 'warning'))
				.map(([, v]) => v)
				.sort((a, b) => a.timestamp - b.timestamp)
				.map((v) => ({ t: v.timestamp, surface: v.surface, level: v.level, event: v.properties?.event ?? v.message?.slice(0, 120), code: v.properties?.code, message: v.properties?.message ?? v.properties?.errorMessage, ...(v.properties?.event === 'dom-scan' ? { stats: ['elementCount', 'selectorCheckCount', 'routeCheckCount', 'matchCount', 'yieldCount', 'durationMs', 'scope'].map((k) => k + '=' + v.properties[k]).join(' ') } : {}) }));
			let tab;
			try { tab = await browser.tabs.get(tabId); } catch { tab = undefined; }
			const badge = tab ? await browser.action.getBadgeText({ tabId }) : undefined;
			return { url: tab?.url, active: tab?.active, status: tab?.status, badge, names, snapshotUrl, snapshotStatus: status, source, events };
		}`, tabId, since);
	}

	/** Number of background starts recorded in the journal since `since`. */
	function backgroundStarts(since = 0) {
		return ext(`async (since, event) => Object.entries(await readStorage(['diagnostics:record:']))
			.filter(([k, v]) => k.startsWith('diagnostics:record:') && v.timestamp >= since && v.surface === 'background' && v.properties?.event === event).length`, since, BACKGROUND_START_EVENT);
	}

	/** Wait until a tab shows results (badge and stored names), or report what it showed. */
	function waitForResults(tabId, since, { timeoutMs = 30_000, expect = [], url } = {}) {
		return waitFor(async () => {
			const state = await tabState(tabId, since);
			const hasExpected = expect.every((name) => state.names.includes(name));
			// Right after tabs.update the tab still reports the previous URL.
			const current = state.snapshotUrl === state.url && (!url || Boolean(state.url?.startsWith(url)));
			return { done: current && state.names.length > 0 && hasExpected && Boolean(state.badge), state };
		}, timeoutMs);
	}

	/** Append one scenario result with its evidence and print a bounded diagnostic summary. */
	function record(scenario, pass, details) {
		results.push({ scenario, pass, ...details });
		console.log(`${pass ? 'PASS' : 'FAIL'} ${scenario} ${JSON.stringify(details).slice(0, 600)}`);
	}

	/** Error and warning journal records with their properties, for VERIFY_VERBOSE diagnosis. */
	function errorRecords(limit = 20) {
		return ext(`async (limit) => Object.values(await readStorage(['diagnostics:record:']))
			.filter((v) => v && typeof v === 'object' && 'surface' in v && (v.level === 'error' || v.level === 'warning'))
			.sort((a, b) => b.timestamp - a.timestamp)
			.slice(0, limit)
			.map((v) => ({ t: v.timestamp, surface: v.surface, level: v.level, message: v.message, properties: v.properties }))`, limit);
	}

	return { ext, results, tabState, backgroundStarts, waitForResults, record, errorRecords };
}

/**
 * Run the scenario matrix after the extension is installed and the control
 * page is open.
 *
 * `context` holds the fixture `origin`, the pre-install tabs `wpTab` and
 * `exampleTab`, `want(name)`, `idleMs`, `stressRounds`, and hooks:
 * - `backgroundState()` → a short string, or undefined when the browser
 *   cannot report it (then the journal's background starts are used);
 * - `memory()` → optional extension process memory;
 * - `openExtensionTab(path)` → a WebDriver handle for a new extension tab;
 * - `ensureControl()` → reopen the control page if the browser closed it;
 * - `reinstall()` → reinstall the build in place, or undefined to skip;
 * - `restrictedUrls` → pages where the browser refuses extension scripts.
 */
export async function runScenarios(session, harness, context) {
	const { ext, tabState, backgroundStarts, waitForResults, record } = harness;
	const { origin, wpTab, exampleTab, want, hooks } = context;
	const mainWindowId = wpTab.windowId;
	/** Activate an existing fixture tab through the extension control context without changing its URL. */
	const activate = (id) => ext(`async (id) => { await browser.tabs.update(id, { active: true }); }`, id);
	/** Navigate and activate the selected fixture tab through the extension control context. */
	const go = (id, url) => ext(`async (id, url) => { await browser.tabs.update(id, { url, active: true }); }`, id, url);

	if (want('preinstall')) {
		// No event fires for an already-loaded active tab at install time.
		await delay(4000);
		const idle = await tabState(wpTab.id, context.installedAt);
		record('preinstall-active-tab-without-event', true, { note: 'informational: scanned without any trigger?', scanned: idle.names.length > 0, ...summarize(idle) });
		// Activating the pre-existing background tab must inject and scan it.
		const since = Date.now();
		await activate(exampleTab.id);
		const activated = await waitForResults(exampleTab.id, since);
		record('preinstall-tab-activated', !activated.timedOut, summarize(activated.state, activated.timedOut));
		const since2 = Date.now();
		await activate(wpTab.id);
		const back = await waitForResults(wpTab.id, since2, { expect: ['WordPress'] });
		record('preinstall-switch-back', !back.timedOut, summarize(back.state, back.timedOut));
	}

	if (want('active-load')) {
		const since = Date.now();
		await go(wpTab.id, `${origin}/wp.html?load=1`);
		const loaded = await waitForResults(wpTab.id, since, { url: `${origin}/wp.html?load=1`, expect: ['WordPress', 'jQuery'] });
		record('active-tab-load', !loaded.timedOut, summarize(loaded.state, loaded.timedOut));
	}

	if (want('background-tab')) {
		const since = Date.now();
		const tab = await ext(`async (windowId, url) => browser.tabs.create({ windowId, url, active: false })`, mainWindowId, `${origin}/spa.html`);
		await delay(4000);
		const hidden = await tabState(tab.id, since);
		record('background-tab-load (no scan expected until active)', true, { scanned: hidden.names.length > 0, ...summarize(hidden) });
		const since2 = Date.now();
		await activate(tab.id);
		const shown = await waitForResults(tab.id, since2);
		record('background-tab-then-activated', !shown.timedOut, summarize(shown.state, shown.timedOut));

		if (want('spa')) {
			const since3 = Date.now();
			await ext(`async (id) => { await browser.scripting.executeScript({ target: { tabId: id }, world: 'MAIN', func: () => window.go('/spa.html?route=2') }); }`, tab.id);
			await delay(1500);
			const afterPush = await tabState(tab.id, since3);
			const recovered = await waitForResults(tab.id, since3, { timeoutMs: 15_000 });
			record('spa-pushState', true, { note: 'informational: badge after pushState', badgeRightAfter: afterPush.badge, ...summarize(recovered.state, recovered.timedOut), timedOut: Boolean(recovered.timedOut) });
		}
	}

	if (want('real-sites')) {
		for (const url of ['https://example.com/', 'https://wordpress.org/', 'https://react.dev/']) {
			const since = Date.now();
			await go(wpTab.id, url);
			const loaded = await waitForResults(wpTab.id, since, { url, timeoutMs: 45_000 });
			record(`real-site ${url}`, !loaded.timedOut, summarize(loaded.state, loaded.timedOut));
		}
	}

	if (want('busy-page')) {
		const since = Date.now();
		await go(wpTab.id, `${origin}/busy.html`);
		const loaded = await waitForResults(wpTab.id, since, { url: `${origin}/busy.html`, timeoutMs: 40_000, expect: ['WordPress'] });
		record('busy-main-thread-page', !loaded.timedOut, summarize(loaded.state, loaded.timedOut));
	}

	if (want('navigate-mid-scan')) {
		const since = Date.now();
		await go(wpTab.id, 'https://react.dev/');
		await delay(900);
		await ext(`async (id, url) => { await browser.tabs.update(id, { url }); }`, wpTab.id, `${origin}/wp.html?mid=1`);
		const loaded = await waitForResults(wpTab.id, since, { url: `${origin}/wp.html?mid=1`, expect: ['WordPress'] });
		record('navigate-mid-scan', !loaded.timedOut && loaded.state.url.includes('mid=1'), summarize(loaded.state, loaded.timedOut));
	}

	if (want('close-mid-scan')) {
		const since = Date.now();
		const tab = await ext(`async (windowId, url) => browser.tabs.create({ windowId, url, active: true })`, mainWindowId, 'https://wordpress.org/');
		await delay(1200);
		await ext(`async (id) => { await browser.tabs.remove(id); }`, tab.id);
		await delay(3000);
		const jobs = await ext(`async (tabId) => Object.values(await readStorage(['matcher-job:'])).filter((v) => v && v.jobId && v.tabId === tabId).map((v) => ({ status: v.status, reason: v.reason }))`, tab.id);
		const stuck = jobs.filter((job) => job.status === 'running' || job.status === 'queued');
		const state = await tabState(tab.id, since);
		record('close-tab-mid-scan', stuck.length === 0, { jobs, problems: problems(state).slice(0, 6) });
		await activate(wpTab.id);
	}

	if (want('idle-wake')) {
		const idleMs = context.idleMs;
		const before = await hooks.backgroundState?.();
		const memoryBefore = await hooks.memory?.();
		const idleStart = Date.now();
		let suspended;
		if (before !== undefined) {
			suspended = await waitFor(async () => {
				const state = await hooks.backgroundState();
				return { done: state !== 'running', state };
			}, idleMs + 40_000, 1_000);
		} else {
			// The browser cannot report the page state. Wait past its idle
			// timeout without touching the extension; a restart shows up as a
			// new background start once the next scan wakes it.
			await delay(idleMs + 10_000);
			suspended = { state: 'unknown (inferred from restart below)' };
		}
		const memoryIdle = await hooks.memory?.();
		const since = Date.now();
		await go(wpTab.id, `${origin}/wp.html?wake=1`);
		const loaded = await waitForResults(wpTab.id, since, { url: `${origin}/wp.html?wake=1`, expect: ['WordPress'] });
		const after = await hooks.backgroundState?.();
		const restarts = await backgroundStarts(idleStart);
		record('event-page-idle-unload-then-scan', !loaded.timedOut && !suspended.timedOut, {
			backgroundBefore: before, backgroundAfterIdle: suspended.state, backgroundAfterScan: after, backgroundStartsAfterIdle: restarts,
			memoryBefore, memoryIdle, memoryAfterScan: await hooks.memory?.(),
			...summarize(loaded.state, loaded.timedOut),
		});
	}

	if (want('panel-page')) {
		const since = Date.now();
		const handle = await hooks.openExtensionTab(`panel.html?tab=${wpTab.id}`);
		await delay(6000);
		await session.switchTo(handle);
		const text = await session.exec('return document.body.innerText.slice(0, 1500)');
		const state = await tabState(wpTab.id, since);
		record('full-page-panel', /WordPress/.test(text) && !/CONTENT_SCRIPT_UNAVAILABLE/.test(text), { text: text.replace(/\s+/g, ' ').slice(0, 400), problems: problems(state).slice(0, 6) });
		await session.close();
		await hooks.ensureControl();
	}

	if (want('reinstall') && hooks.reinstall) {
		const since = Date.now();
		await hooks.reinstall();
		const permissionsAfter = await ext(`async () => ({
			origins: (await browser.permissions.getAll()).origins,
			local: await browser.permissions.contains({ origins: ['http://127.0.0.1/*'] }),
		})`);
		console.log('permissions after reinstall', JSON.stringify(permissionsAfter));
		// Old pages may keep the previous build's content script world; this load must re-inject.
		await go(wpTab.id, `${origin}/wp.html?reinstalled=1`);
		const loaded = await waitForResults(wpTab.id, since, { url: `${origin}/wp.html?reinstalled=1`, expect: ['WordPress'] });
		record('reinstall-with-open-tabs-then-activate', !loaded.timedOut, { permissionsAfter, ...summarize(loaded.state, loaded.timedOut) });
	}

	if (want('restricted')) {
		for (const url of hooks.restrictedUrls ?? []) {
			const since = Date.now();
			const tab = await ext(`async (windowId, url) => browser.tabs.create({ windowId, url, active: true })`, mainWindowId, url);
			await delay(8000);
			const state = await tabState(tab.id, since);
			const direct = await ext(`async (id) => { try { await browser.scripting.executeScript({ target: { tabId: id }, func: () => 1 }); return 'injected'; } catch (e) { return String(e.message || e); } }`, tab.id);
			record(`restricted-page ${url}`, true, { note: 'informational: what the user sees', executeScriptError: direct, ...summarize(state, true) });
			await ext(`async (id) => { await browser.tabs.remove(id); }`, tab.id).catch(() => undefined);
		}
		await activate(wpTab.id);
	}

	if (want('heavy')) {
		for (const url of (process.env.HEAVY_URLS ?? 'https://en.wikipedia.org/wiki/United_States,https://github.com/mozilla/gecko-dev').split(',')) {
			const since = Date.now();
			await go(wpTab.id, url);
			const loaded = await waitForResults(wpTab.id, since, { url, timeoutMs: 90_000 });
			record(`heavy-page ${url}`, !loaded.timedOut && problems(loaded.state).length === 0, summarize(loaded.state, loaded.timedOut));
		}
	}

	if (want('history')) {
		const since = Date.now();
		await go(wpTab.id, `${origin}/wp.html?h=1`);
		await waitForResults(wpTab.id, since, { url: `${origin}/wp.html?h=1`, expect: ['WordPress'] });
		await ext(`async (id, url) => { await browser.tabs.update(id, { url }); }`, wpTab.id, `${origin}/spa.html?h=2`);
		await waitForResults(wpTab.id, since, { url: `${origin}/spa.html?h=2` });
		const back = Date.now();
		await ext(`async (id) => { await browser.tabs.goBack(id); }`, wpTab.id);
		const restored = await waitForResults(wpTab.id, back, { url: `${origin}/wp.html?h=1`, expect: ['WordPress'] });
		record('history-back (bfcache)', !restored.timedOut && problems(restored.state).length === 0, summarize(restored.state, restored.timedOut));
	}

	if (want('nav-loop')) {
		const urls = [`${origin}/wp.html`, 'https://example.com/', `${origin}/busy.html`, 'https://wordpress.org/', `${origin}/spa.html`, 'https://react.dev/'];
		const rounds = context.stressRounds;
		const failures = [];
		let ok = 0;
		for (let i = 0; i < rounds; i++) {
			const url = `${urls[i % urls.length]}${urls[i % urls.length].includes('?') ? '&' : '?'}r=${i}`;
			const since = Date.now();
			await go(wpTab.id, url);
			const loaded = await waitForResults(wpTab.id, since, { url, timeoutMs: 40_000 });
			const bad = problems(loaded.state);
			if (loaded.timedOut || bad.length) failures.push({ url, timedOut: Boolean(loaded.timedOut), problems: bad.slice(0, 4), contentRuntime: summarize(loaded.state, loaded.timedOut).contentRuntime });
			else ok++;
		}
		record(`nav-loop x${rounds}`, failures.length === 0, { ok, failures });
	}

	if (want('reload-storm')) {
		// Minimal reproduction from the stress runs: navigate the active tab, then
		// reload it a few times quickly. The last document must still get results
		// without the user switching away and back.
		const failures = [];
		for (let round = 0; round < 8; round++) {
			const url = `${origin}/ghost.html?storm=${round}`;
			const since = Date.now();
			await ext(`async (id, url, gaps) => {
				await browser.tabs.update(id, { url, active: true });
				for (const gap of gaps) {
					await new Promise((r) => setTimeout(r, gap));
					browser.tabs.reload(id).catch(() => undefined);
				}
			}`, wpTab.id, url, [120, 70, 130, 150].slice(0, 1 + (round % 4)));
			const loaded = await waitForResults(wpTab.id, since, { url, expect: ['Ghost'], timeoutMs: 25_000 });
			if (loaded.timedOut) failures.push({ round, reloads: 1 + (round % 4), ...summarize(loaded.state, true) });
		}
		record('reload-storm-then-wait', failures.length === 0, { rounds: 8, failures });
	}

	if (want('spa-self-navigate')) {
		// An app that changes its URL with pushState right after it loads (a
		// redirect to /home, a router normalizing the path). The user opens it
		// and waits; nothing else happens.
		const since = Date.now();
		await go(wpTab.id, `${origin}/spa-rewrite.html?views=2&every=300`);
		await delay(3000);
		const loaded = await waitForResults(wpTab.id, since, { url: `${origin}/spa-rewrite.html?view=2`, expect: ['Astro'], timeoutMs: 20_000 });
		record('spa-self-navigate-after-load', !loaded.timedOut, summarize(loaded.state, loaded.timedOut));
	}

	if (want('stress')) {
		// Heavy random use; see stress.mjs. Runs only when named in --only.
		await runStress(session, harness, context);
	}

	if (want('permission-revoked')) {
		// Runs last: the permission cannot be granted back without a user gesture.
		// What a user gets after turning off "access your data for all websites".
		const removed = await ext(`async () => browser.permissions.remove({ origins: ['http://*/*', 'https://*/*'] })`);
		const since = Date.now();
		await go(wpTab.id, `${origin}/wp.html?perm=0`);
		await delay(8000);
		const state = await tabState(wpTab.id, since);
		record('host-permission-revoked', true, { note: 'informational', removed, contains: await ext(`async () => browser.permissions.contains({ origins: ['http://127.0.0.1/*'] })`), ...summarize(state, true) });
	}
}
