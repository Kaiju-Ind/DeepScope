#!/usr/bin/env node
// Drive a real Firefox with the built DeepScope add-on and check that the
// background reaches the content script in the situations users hit.
// See tools/verify/README.md for usage.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { parseArgs } from 'node:util';

import { startFixtureServer } from './fixtures.mjs';
import { asyncScript, createHarness, runScenarios } from './scenarios.mjs';
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
		seed: { type: 'string' },
		minutes: { type: 'string' },
		quick: { type: 'boolean', default: false },
		tabs: { type: 'string' },
		windows: { type: 'string' },
		'no-real': { type: 'boolean', default: false },
		'no-idle': { type: 'boolean', default: false },
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
	const value = await session.execAsync(asyncScript(body), args);
	if (!value.ok) throw new Error(`extension script failed: ${value.e}`);
	return value.v;
}

/** Run privileged Firefox inspection and always restore content context, propagating an explicit script failure to the harness. */
async function chrome(body, ...args) {
	await session.cmd('POST', '/moz/context', { context: 'chrome' });
	try {
		const value = await session.execAsync(asyncScript(body), args);
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

/** Inspect the installed add-on's current background lifecycle through Firefox's privileged extension registry. */
function backgroundState() {
	return chrome(`async (id) => {
		const { ExtensionParent } = ChromeUtils.importESModule('resource://gre/modules/ExtensionParent.sys.mjs');
		const extension = ExtensionParent.GlobalManager.extensionMap.get(id);
		return extension ? String(extension.backgroundState) : 'not-loaded';
	}`, ADDON_ID);
}

/** Toggle DeepScope's sidebar in the `index`-th browser window (WebDriver cannot click the toolbar). */
function toggleSidebar(index) {
	return chrome(`async (index, id) => {
		const wins = [...Services.wm.getEnumerator('navigator:browser')];
		const win = wins[index % wins.length];
		const controller = win.SidebarController ?? win.SidebarUI;
		await controller.toggle(id);
	}`, index, `${ADDON_ID.toLowerCase().replace(/[^a-z0-9_-]/g, '_')}-sidebar-action`);
}

/** Reopen the most recently closed tab, like Ctrl+Shift+T. */
function undoCloseTab() {
	return chrome(`async () => {
		const win = Services.wm.getMostRecentWindow('navigator:browser');
		const { SessionStore } = win;
		if (SessionStore.getClosedTabCountForWindow(win) > 0) SessionStore.undoCloseTab(win, 0);
		else if (SessionStore.getClosedWindowCount() > 0) SessionStore.undoCloseWindow(0);
		else throw new Error('nothing to restore');
	}`);
}

/** Sample Firefox extension-process resident memory for the runtime report without attributing it to an individual tab. */
function extensionProcessMemory() {
	return chrome(`async () => {
		const info = await ChromeUtils.requestProcInfo();
		return info.children.filter((c) => c.type === 'extension').map((c) => ({ pid: c.pid, residentMiB: Math.round((c.memory || 0) / 1048576) }));
	}`);
}

const harness = createHarness(ext);
const { results, record } = harness;
// `stress` runs for minutes, so it runs only when named.
const want = (name) => (options.only ? options.only.split(',').includes(name) : name !== 'stress');
const stressOptions = {
	seed: options.seed,
	minutes: options.minutes,
	quick: options.quick,
	tabs: options.tabs,
	windows: options.windows,
	real: !options['no-real'],
	...(options['no-idle'] ? { idle: false } : {}),
};

try {
	mainHandle = await session.handle();

	// Tabs open before the add-on is installed. The content script is runtime
	// injected, so nothing is in those pages until the background injects it.
	await session.navigate(`${origin}/wp.html`);
	const preHandle = await session.newWindow('tab');
	await session.switchTo(preHandle);
	// Both pre-install tabs are controlled fixtures, so local scenarios do not
	// depend on an external site's availability or certificate chain.
	await session.navigate(`${origin}/spa.html`);
	await session.switchTo(mainHandle);

	const installedAt = Date.now();
	await session.cmd('POST', '/moz/addon/install', { addon: readFileSync(xpi).toString('base64'), temporary: true, allowPrivateBrowsing: true });
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

	await runScenarios(session, harness, {
		origin,
		installedAt,
		wpTab: tabs.find((t) => t.url?.endsWith('/wp.html')),
		preinstallTab: tabs.find((t) => t.url === `${origin}/spa.html`),
		want,
		idleMs: Number(options['idle-timeout']),
		stressRounds: Number(options['stress-rounds']),
		stress: stressOptions,
		hooks: {
			backgroundState,
			memory: extensionProcessMemory,
			toggleSidebar,
			undoCloseTab,
			// Installed with allowPrivateBrowsing, so the stress scenario can use private windows.
			privateWindows: true,
			openExtensionTab,
			ensureControl,
			/** Exercise an in-place temporary add-on upgrade, then reopen the control surface that the upgrade may close. */
			async reinstall() {
				// Upgrade in place (what `web-ext run` reload and an AMO update do).
				await session.cmd('POST', '/moz/addon/install', { addon: readFileSync(xpi).toString('base64'), temporary: true, allowPrivateBrowsing: true });
				await delay(2000);
				// The upgrade closes extension tabs (and so the control window),
				// sometimes after this point; reopen in a fresh window.
				await openControlWindow();
			},
			// http(s) pages where Firefox refuses extension scripts. Headless
			// pdf.js can hang its content process, so each uses a throwaway tab.
			restrictedUrls: ['https://addons.mozilla.org/en-US/firefox/', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'],
		},
	});
} catch (error) {
	record('driver', false, { error: String(error.stack ?? error) });
} finally {
	if (process.env.VERIFY_VERBOSE) {
		const errors = await harness.errorRecords().catch((error) => [String(error)]);
		console.log('journal errors and warnings (newest first):', JSON.stringify(errors, null, 1).slice(0, 12_000));
	}
	const out = options.out ?? join(workDir, 'results.json');
	writeFileSync(out, JSON.stringify(results, null, 2));
	console.log(`results: ${out}\ngeckodriver/firefox log: ${join(workDir, 'geckodriver.log')}`);
	await session.quit();
	driver.kill();
	server.close();
	process.exitCode = results.some((r) => !r.pass) ? 1 : 0;
}
