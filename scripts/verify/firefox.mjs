#!/usr/bin/env node
// Drive a real Firefox with the built DeepScope add-on and check that the
// background reaches the content script in the situations users hit.
// See scripts/verify/README.md for usage.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { parseArgs } from 'node:util';

import { startFixtureServer } from './fixtures.mjs';
import { Session, startDriver } from './webdriver.mjs';

const { values: options } = parseArgs({
	options: {
		extension: { type: 'string', default: '.output/firefox-mv3' },
		firefox: { type: 'string', default: process.platform === 'darwin' ? '/Applications/Firefox.app/Contents/MacOS/firefox' : 'firefox' },
		geckodriver: { type: 'string', default: process.env.GECKODRIVER ?? 'geckodriver' },
		headed: { type: 'boolean', default: false },
		only: { type: 'string' },
		'idle-timeout': { type: 'string', default: '30000' },
		'stress-rounds': { type: 'string', default: '12' },
		out: { type: 'string' },
		port: { type: 'string', default: '4444' },
	},
});

const ADDON_ID = 'deepscope@openarsenal.github.io';
const UUID = 'd5e3b0c0-0000-4000-8000-00000000d5e3';
const EXT = `moz-extension://${UUID}`;
const workDir = mkdtempSync(join(tmpdir(), 'deepscope-verify-'));
const xpi = join(workDir, 'deepscope.xpi');
const extensionDir = resolve(options.extension);
if (!existsSync(join(extensionDir, 'manifest.json'))) throw new Error(`No build at ${extensionDir}; run wxt build -b firefox`);
execFileSync('zip', ['-qr', xpi, '.'], { cwd: extensionDir });

const results = [];
const { server, origin } = await startFixtureServer();
const { child: driver, base } = await startDriver(options.geckodriver, ['--port', options.port, '--allow-system-access', '--log', 'info'], {
	port: Number(options.port),
	logPath: join(workDir, 'geckodriver.log'),
});
console.log(`work dir: ${workDir}\nfixtures: ${origin}`);

const session = await Session.create(base, {
	alwaysMatch: {
		browserName: 'firefox',
		'moz:firefoxOptions': {
			binary: options.firefox,
			args: options.headed ? [] : ['-headless'],
			prefs: {
				'extensions.webextensions.uuids': JSON.stringify({ [ADDON_ID]: UUID }),
				'extensions.background.idle.timeout': Number(options['idle-timeout']),
				'devtools.console.stdout.content': true,
				'browser.dom.window.dump.enabled': true,
			},
		},
	},
});
await session.setTimeouts({ script: 180_000 });

let controlHandle;
let mainHandle;

/** Run `body` (an async function source) inside the extension's control page. */
async function ext(body, ...args) {
	await session.switchTo(controlHandle);
	const value = await session.execAsync(
		`const done = arguments[arguments.length - 1];
		 const fn = ${body};
		 fn(...Array.from(arguments).slice(0, -1)).then((v) => done({ ok: true, v }), (e) => done({ ok: false, e: String(e && e.message || e) }));`,
		args,
	);
	if (!value.ok) throw new Error(`extension script failed: ${value.e}`);
	return value.v;
}

async function chrome(body, ...args) {
	await session.cmd('POST', '/moz/context', { context: 'chrome' });
	try {
		const value = await session.execAsync(
			`const done = arguments[arguments.length - 1];
			 const fn = ${body};
			 fn(...Array.from(arguments).slice(0, -1)).then((v) => done({ ok: true, v }), (e) => done({ ok: false, e: String(e && e.message || e) }));`,
			args,
		);
		if (!value.ok) throw new Error(`chrome script failed: ${value.e}`);
		return value.v;
	} finally {
		await session.cmd('POST', '/moz/context', { context: 'content' });
	}
}

/** Open an extension URL in a new tab of the most recent window. WebDriver refuses moz-extension navigation. */
async function openExtensionTab(path) {
	const before = await session.handles();
	await chrome(`async (url) => {
		const win = Services.wm.getMostRecentWindow('navigator:browser');
		win.gBrowser.selectedTab = win.gBrowser.addTab(url, { triggeringPrincipal: Services.scriptSecurityManager.getSystemPrincipal() });
	}`, `${EXT}/${path}`);
	for (let i = 0; i < 50; i++) {
		const handle = (await session.handles()).find((h) => !before.includes(h));
		if (handle) return handle;
		await delay(100);
	}
	throw new Error(`extension tab ${path} did not open`);
}

/** Reopen the control page if Firefox closed it (add-on reload closes extension tabs). */
async function ensureControl() {
	const handles = await session.handles();
	if (handles.includes(controlHandle)) return;
	await openControlWindow();
}

/**
 * Keep the control page in its own window. WebDriver selects the tab it
 * switches to, so a control tab beside the target would steal activation.
 */
async function openControlWindow() {
	const handles = await session.handles();
	await session.switchTo(handles.includes(mainHandle) ? mainHandle : handles[0]);
	await session.switchTo(await session.newWindow('window'));
	controlHandle = await openExtensionTab('options.html');
	await delay(1000);
}

function backgroundState() {
	return chrome(`async (id) => {
		const { ExtensionParent } = ChromeUtils.importESModule('resource://gre/modules/ExtensionParent.sys.mjs');
		const extension = ExtensionParent.GlobalManager.extensionMap.get(id);
		return extension ? String(extension.backgroundState) : 'not-loaded';
	}`, ADDON_ID);
}

function extensionProcessMemory() {
	return chrome(`async () => {
		const info = await ChromeUtils.requestProcInfo();
		return info.children.filter((c) => c.type === 'extension').map((c) => ({ pid: c.pid, residentMiB: Math.round((c.memory || 0) / 1048576) }));
	}`);
}

/** Tab, badge, stored results and journal events for one tab since `since`. */
function tabState(tabId, since = 0) {
	return ext(`async (tabId, since) => {
		const all = await browser.storage.local.get(null);
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
			.map((v) => ({ t: v.timestamp, surface: v.surface, level: v.level, event: v.properties?.event ?? v.message?.slice(0, 120), code: v.properties?.code, message: v.properties?.message ?? v.properties?.errorMessage, ...(v.properties?.event === 'dom-scan' ? { stats: ['elementCount', 'selectorCheckCount', 'matchCount', 'yieldCount', 'durationMs', 'scope'].map((k) => k + '=' + v.properties[k]).join(' ') } : {}) }));
		let tab;
		try { tab = await browser.tabs.get(tabId); } catch { tab = undefined; }
		const badge = tab ? await browser.action.getBadgeText({ tabId }) : undefined;
		return { url: tab?.url, active: tab?.active, status: tab?.status, badge, names, snapshotUrl, snapshotStatus: status, source, events };
	}`, tabId, since);
}

const BAD_EVENT = /unavailable|failed|timeout|error|mismatch/i;
// Work for a document the tab already left is canceled by design; so is an
// identity lookup while the tab is between documents.
const EXPECTED = /canceled|navigated away|no longer owns|inspectable URL yet|^tab-unavailable$/i;
function problems(state) {
	return state.events.filter((e) => (e.level === 'error' || e.level === 'warning' || BAD_EVENT.test(e.event ?? '') || e.code === 'CONTENT_SCRIPT_UNAVAILABLE')
		&& !EXPECTED.test(e.message ?? '') && !EXPECTED.test(e.event ?? ''));
}

async function waitFor(check, timeoutMs = 30_000, intervalMs = 500) {
	const start = Date.now();
	let last;
	while (Date.now() - start < timeoutMs) {
		last = await check();
		if (last.done) return last;
		await delay(intervalMs);
	}
	return { ...last, timedOut: true };
}

/** Wait until a tab shows results (badge and stored names), or report what it showed. */
async function waitForResults(tabId, since, { timeoutMs = 30_000, expect = [], url } = {}) {
	return waitFor(async () => {
		const state = await tabState(tabId, since);
		const hasExpected = expect.every((name) => state.names.includes(name));
		// Right after tabs.update the tab still reports the previous URL.
		const current = state.snapshotUrl === state.url && (!url || Boolean(state.url?.startsWith(url)));
		return { done: current && state.names.length > 0 && hasExpected && Boolean(state.badge), state };
	}, timeoutMs);
}

function record(scenario, pass, details) {
	results.push({ scenario, pass, ...details });
	console.log(`${pass ? 'PASS' : 'FAIL'} ${scenario} ${JSON.stringify(details).slice(0, 600)}`);
}

function summarize(state, timedOut = false) {
	const verbose = timedOut || process.env.VERIFY_VERBOSE;
	const injected = state.events.filter((e) => /^content-runtime/.test(e.event ?? '')).map((e) => e.event);
	const timings = state.events.map((e) => /\[timing\] (collector\.content-rpc\.collect-observation-batch|background\.content-runtime\.ensure) (\w+) in (\d+)ms/.exec(e.event ?? '')).filter(Boolean).map((m) => `${m[1].split('.').at(-1)} ${m[2]} ${m[3]}ms`);
	return { url: state.url, tabStatus: state.status, active: state.active, ...(state.snapshotUrl !== state.url ? { snapshotUrl: state.snapshotUrl } : {}), badge: state.badge, names: state.names.slice(0, 12), count: state.names.length, contentRuntime: [...new Set(injected)], timings: timings.slice(0, 6), problems: problems(state).slice(0, 8), ...(verbose ? { events: state.events.map((e) => `${e.t % 100000} ${e.surface} ${e.event}${e.code ? ' ' + e.code : ''}${e.message ? ' ' + e.message : ''}${e.stats ? ' ' + e.stats : ''}`) } : {}) };
}

const want = (name) => !options.only || options.only.split(',').includes(name);

try {
	mainHandle = await session.handle();

	// 1. Tabs open before the add-on is installed. The content script is runtime
	// injected, so nothing is in those pages until the background injects it.
	await session.navigate(`${origin}/wp.html`);
	const preHandle = await session.newWindow('tab');
	await session.switchTo(preHandle);
	await session.navigate('https://example.com/');
	await session.switchTo(mainHandle);

	const installedAt = Date.now();
	await session.cmd('POST', '/moz/addon/install', { addon: readFileSync(xpi).toString('base64'), temporary: true });
	await delay(1500);
	await openControlWindow();

	const permissions = await ext(`async () => ({
		all: await browser.permissions.getAll(),
		example: await browser.permissions.contains({ origins: ['https://example.com/*'] }),
		local: await browser.permissions.contains({ origins: ['http://127.0.0.1/*'] }),
		autoScan: (await browser.storage.local.get('kaiju-deepscope.settings.auto-scan-enabled.v1')),
	})`);
	console.log('permissions', JSON.stringify(permissions));
	const tabs = await ext(`async () => (await browser.tabs.query({})).map((t) => ({ id: t.id, url: t.url, active: t.active, windowId: t.windowId }))`);
	const wpTab = tabs.find((t) => t.url?.endsWith('/wp.html'));
	const exampleTab = tabs.find((t) => t.url?.startsWith('https://example.com'));
	const mainWindowId = wpTab.windowId;

	if (want('preinstall')) {
		// No event fires for an already-loaded active tab at install time.
		await delay(4000);
		const idle = await tabState(wpTab.id, installedAt);
		record('preinstall-active-tab-without-event', true, { note: 'informational: scanned without any trigger?', scanned: idle.names.length > 0, ...summarize(idle) });
		// Activating the pre-existing background tab must inject and scan it.
		const since = Date.now();
		await ext(`async (id) => { await browser.tabs.update(id, { active: true }); }`, exampleTab.id);
		const activated = await waitForResults(exampleTab.id, since);
		record('preinstall-tab-activated', !activated.timedOut, summarize(activated.state, activated.timedOut));
		const since2 = Date.now();
		await ext(`async (id) => { await browser.tabs.update(id, { active: true }); }`, wpTab.id);
		const back = await waitForResults(wpTab.id, since2, { expect: ['WordPress'] });
		record('preinstall-switch-back', !back.timedOut, summarize(back.state, back.timedOut));
	}

	if (want('active-load')) {
		const since = Date.now();
		await ext(`async (id, url) => { await browser.tabs.update(id, { url, active: true }); }`, wpTab.id, `${origin}/wp.html?load=1`);
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
		await ext(`async (id) => { await browser.tabs.update(id, { active: true }); }`, tab.id);
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
			await ext(`async (id, url) => { await browser.tabs.update(id, { url, active: true }); }`, wpTab.id, url);
			const loaded = await waitForResults(wpTab.id, since, { url: url, timeoutMs: 45_000 });
			record(`real-site ${url}`, !loaded.timedOut, summarize(loaded.state, loaded.timedOut));
		}
	}

	if (want('busy-page')) {
		const since = Date.now();
		await ext(`async (id, url) => { await browser.tabs.update(id, { url, active: true }); }`, wpTab.id, `${origin}/busy.html`);
		const loaded = await waitForResults(wpTab.id, since, { url: `${origin}/busy.html`, timeoutMs: 40_000, expect: ['WordPress'] });
		record('busy-main-thread-page', !loaded.timedOut, summarize(loaded.state, loaded.timedOut));
	}

	if (want('navigate-mid-scan')) {
		const since = Date.now();
		await ext(`async (id, url) => { await browser.tabs.update(id, { url, active: true }); }`, wpTab.id, 'https://react.dev/');
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
		const jobs = await ext(`async (tabId) => Object.values(await browser.storage.local.get(null)).filter((v) => v && v.jobId && v.tabId === tabId).map((v) => ({ status: v.status, reason: v.reason }))`, tab.id);
		const stuck = jobs.filter((job) => job.status === 'running' || job.status === 'queued');
		const state = await tabState(tab.id, since);
		record('close-tab-mid-scan', stuck.length === 0, { jobs, problems: problems(state).slice(0, 6) });
		await ext(`async (id) => { await browser.tabs.update(id, { active: true }); }`, wpTab.id);
	}

	if (want('idle-wake')) {
		const idleMs = Number(options['idle-timeout']);
		const before = await backgroundState();
		const memoryBefore = await extensionProcessMemory();
		// Close the control page's influence: it is an extension page but does not
		// hold the event page awake. Wait for suspension.
		const suspended = await waitFor(async () => {
			const state = await backgroundState();
			return { done: state !== 'running', state };
		}, idleMs + 40_000, 1_000);
		const memoryIdle = await extensionProcessMemory();
		const since = Date.now();
		await ext(`async (id, url) => { await browser.tabs.update(id, { url, active: true }); }`, wpTab.id, `${origin}/wp.html?wake=1`);
		const loaded = await waitForResults(wpTab.id, since, { url: `${origin}/wp.html?wake=1`, expect: ['WordPress'] });
		const after = await backgroundState();
		record('event-page-idle-unload-then-scan', !loaded.timedOut && !suspended.timedOut, {
			backgroundBefore: before, backgroundAfterIdle: suspended.state, backgroundAfterScan: after,
			memoryBefore, memoryIdle, memoryAfterScan: await extensionProcessMemory(),
			...summarize(loaded.state, loaded.timedOut),
		});
	}

	if (want('panel-page')) {
		const since = Date.now();
		const handle = await openExtensionTab(`panel.html?tab=${wpTab.id}`);
		await delay(6000);
		await session.switchTo(handle);
		const text = await session.exec('return document.body.innerText.slice(0, 1500)');
		const state = await tabState(wpTab.id, since);
		record('full-page-panel', /WordPress/.test(text) && !/CONTENT_SCRIPT_UNAVAILABLE/.test(text), { text: text.replace(/\s+/g, ' ').slice(0, 400), problems: problems(state).slice(0, 6) });
		await session.close();
		await ensureControl();
	}

	if (want('reinstall')) {
		// Upgrade in place (what `web-ext run` reload and an AMO update do).
		const since = Date.now();
		await session.cmd('POST', '/moz/addon/install', { addon: readFileSync(xpi).toString('base64'), temporary: true });
		await delay(2000);
		// The upgrade closes extension tabs (and so the control window), sometimes
		// after this point; reopen in a fresh window.
		await openControlWindow();
		const permissionsAfter = await ext(`async () => ({
			origins: (await browser.permissions.getAll()).origins,
			local: await browser.permissions.contains({ origins: ['http://127.0.0.1/*'] }),
		})`);
		console.log('permissions after reinstall', JSON.stringify(permissionsAfter));
		// Old pages keep the previous build's content script world only in Chrome;
		// Firefox removes it, so this load must re-inject.
		await ext(`async (id, url) => { await browser.tabs.update(id, { url, active: true }); }`, wpTab.id, `${origin}/wp.html?reinstalled=1`);
		const loaded = await waitForResults(wpTab.id, since, { url: `${origin}/wp.html?reinstalled=1`, expect: ['WordPress'] });
		record('reinstall-with-open-tabs-then-activate', !loaded.timedOut, { permissionsAfter, ...summarize(loaded.state, loaded.timedOut) });
	}

	if (want('restricted')) {
		// http(s) pages where Firefox refuses extension scripts.
		const pdf = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
		// Use a throwaway tab: headless pdf.js can hang its content process.
		for (const url of ['https://addons.mozilla.org/en-US/firefox/', pdf]) {
			const since = Date.now();
			const tab = await ext(`async (windowId, url) => browser.tabs.create({ windowId, url, active: true })`, mainWindowId, url);
			await delay(8000);
			const state = await tabState(tab.id, since);
			const direct = await ext(`async (id) => { try { await browser.scripting.executeScript({ target: { tabId: id }, func: () => 1 }); return 'injected'; } catch (e) { return String(e.message || e); } }`, tab.id);
			record(`restricted-page ${url}`, true, { note: 'informational: what the user sees', executeScriptError: direct, ...summarize(state, true) });
			await ext(`async (id) => { await browser.tabs.remove(id); }`, tab.id).catch(() => undefined);
		}
		await ext(`async (id) => { await browser.tabs.update(id, { active: true }); }`, wpTab.id);
	}

	if (want('heavy')) {
		for (const url of (process.env.HEAVY_URLS ?? 'https://en.wikipedia.org/wiki/United_States,https://github.com/mozilla/gecko-dev').split(',')) {
			const since = Date.now();
			await ext(`async (id, url) => { await browser.tabs.update(id, { url, active: true }); }`, wpTab.id, url);
			const loaded = await waitForResults(wpTab.id, since, { url: url, timeoutMs: 90_000 });
			record(`heavy-page ${url}`, !loaded.timedOut && problems(loaded.state).length === 0, summarize(loaded.state, loaded.timedOut));
		}
	}

	if (want('history')) {
		const since = Date.now();
		await ext(`async (id, url) => { await browser.tabs.update(id, { url, active: true }); }`, wpTab.id, `${origin}/wp.html?h=1`);
		await waitForResults(wpTab.id, since, { url: `${origin}/wp.html?h=1`, expect: ['WordPress'] });
		await ext(`async (id, url) => { await browser.tabs.update(id, { url }); }`, wpTab.id, `${origin}/spa.html?h=2`);
		await waitForResults(wpTab.id, since, { url: `${origin}/spa.html?h=2` });
		const back = Date.now();
		await ext(`async (id) => { await browser.tabs.goBack(id); }`, wpTab.id);
		const restored = await waitForResults(wpTab.id, back, { url: `${origin}/wp.html?h=1`, expect: ['WordPress'] });
		record('history-back (bfcache)', !restored.timedOut && problems(restored.state).length === 0, summarize(restored.state, restored.timedOut));
	}

	if (want('stress')) {
		const urls = [`${origin}/wp.html`, 'https://example.com/', `${origin}/busy.html`, 'https://wordpress.org/', `${origin}/spa.html`, 'https://react.dev/'];
		const rounds = Number(options['stress-rounds']);
		const failures = [];
		let ok = 0;
		for (let i = 0; i < rounds; i++) {
			const url = `${urls[i % urls.length]}${urls[i % urls.length].includes('?') ? '&' : '?'}r=${i}`;
			const since = Date.now();
			await ext(`async (id, url) => { await browser.tabs.update(id, { url, active: true }); }`, wpTab.id, url);
			const loaded = await waitForResults(wpTab.id, since, { url: url, timeoutMs: 40_000 });
			const bad = problems(loaded.state);
			if (loaded.timedOut || bad.length) failures.push({ url, timedOut: Boolean(loaded.timedOut), problems: bad.slice(0, 4), contentRuntime: summarize(loaded.state, loaded.timedOut).contentRuntime });
			else ok++;
		}
		record(`stress-navigation x${rounds}`, failures.length === 0, { ok, failures });
	}

	if (want('permission-revoked')) {
		// Runs last: the permission cannot be granted back without a user gesture.
		// What a user gets after turning off "access your data for all websites".
		const removed = await ext(`async () => browser.permissions.remove({ origins: ['http://*/*', 'https://*/*'] })`);
		const since = Date.now();
		await ext(`async (id, url) => { await browser.tabs.update(id, { url, active: true }); }`, wpTab.id, `${origin}/wp.html?perm=0`);
		await delay(8000);
		const state = await tabState(wpTab.id, since);
		record('host-permission-revoked', true, { note: 'informational', removed, contains: await ext(`async () => browser.permissions.contains({ origins: ['http://127.0.0.1/*'] })`), ...summarize(state, true) });
	}
} catch (error) {
	record('driver', false, { error: String(error.stack ?? error) });
} finally {
	const out = options.out ?? join(workDir, 'results.json');
	writeFileSync(out, JSON.stringify(results, null, 2));
	console.log(`results: ${out}\ngeckodriver/firefox log: ${join(workDir, 'geckodriver.log')}`);
	await session.quit();
	driver.kill();
	server.close();
	process.exitCode = results.some((r) => !r.pass) ? 1 : 0;
}
