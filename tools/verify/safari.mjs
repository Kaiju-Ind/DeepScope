#!/usr/bin/env node
// Drive a real Safari (or Safari Technology Preview) with the built DeepScope
// extension and run the same scenarios as firefox.mjs.
// See tools/verify/README.md for usage and the one-time Safari settings.
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { parseArgs } from 'node:util';

import { startFixtureServer } from './fixtures.mjs';
import { asyncScript, createHarness, runScenarios } from './scenarios.mjs';
import { Session, startDriver } from './webdriver.mjs';

const STP_DRIVER = '/Applications/Safari Technology Preview.app/Contents/MacOS/safaridriver';

const { values: options } = parseArgs({
	options: {
		extension: { type: 'string', default: '.output/safari-mv3' },
		stp: { type: 'boolean', default: false },
		driver: { type: 'string' },
		'base-url': { type: 'string' },
		'check-only': { type: 'boolean', default: false },
		diagnose: { type: 'boolean', default: false },
		only: { type: 'string' },
		// WebKit unloads idle background content after 30 s
		// (WebExtensionContext::scheduleBackgroundContentToUnload).
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
		port: { type: 'string', default: '4445' },
	},
});

const workDir = mkdtempSync(join(tmpdir(), 'deepscope-verify-safari-'));
const extensionDir = resolve(options.extension);
if (!existsSync(join(extensionDir, 'manifest.json'))) throw new Error(`No build at ${extensionDir}; run wxt build -b safari`);

// Results recorded before the control page exists; the harness adds the rest.
const staticResults = [];
let harness;
function recordStatic(scenario, pass, details) {
	staticResults.push({ scenario, pass, ...details });
	console.log(`${pass ? 'PASS' : 'FAIL'} ${scenario} ${JSON.stringify(details).slice(0, 600)}`);
}
function finish(code) {
	const out = options.out ?? join(workDir, 'results.json');
	const all = [...staticResults, ...(harness?.results ?? [])];
	writeFileSync(out, JSON.stringify(all, null, 2));
	console.log(`results: ${out}`);
	process.exitCode = code ?? (all.some((r) => !r.pass) ? 1 : 0);
}

// Checks that need no browser: what Safari will make of the build.
const manifest = JSON.parse(readFileSync(join(extensionDir, 'manifest.json'), 'utf8'));
recordStatic('manifest-background-page', Array.isArray(manifest.background?.scripts) && !manifest.background?.service_worker, {
	note: 'Safari needs a background page: a service worker cannot construct the matcher Workers',
	background: manifest.background,
});
recordStatic('manifest-no-persistent-key', !('persistent' in (manifest.background ?? {})), {
	note: 'WebKit treats V3 background pages as non-persistent; the packager warns about the key',
});
try {
	const output = execFileSync('xcrun', ['safari-web-extension-packager', extensionDir, '--project-location', join(workDir, 'xcode'),
		'--app-name', 'DeepScope', '--bundle-identifier', 'dev.openarsenal.DeepScope', '--macos-only', '--swift',
		'--no-open', '--no-prompt', '--copy-resources', '--force'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
	const warnings = output.split('\n').filter((line) => /^Warning|^\t\S/.test(line));
	recordStatic('safari-web-extension-packager', warnings.length === 0, { warnings });
} catch (error) {
	recordStatic('safari-web-extension-packager', false, { error: String(error.stderr || error.message).slice(0, 600) });
}
if (options['check-only']) {
	finish();
	process.exit();
}

const driverPath = options.driver ?? (options.stp ? STP_DRIVER : '/usr/bin/safaridriver');
const browserName = options.stp ? 'Safari Technology Preview' : 'safari';
const { server, origin } = await startFixtureServer();
const { child: driver, base } = await startDriver(driverPath, ['--port', options.port, ...(options.diagnose ? ['--diagnose'] : [])], {
	port: Number(options.port),
	logPath: join(workDir, 'safaridriver.log'),
});
console.log(`work dir: ${workDir}\nfixtures: ${origin}\ndriver: ${driverPath}`);

function cleanup() {
	driver.kill();
	server.close();
}

let session;
try {
	session = await Session.create(base, { alwaysMatch: { browserName } });
} catch (error) {
	const message = String(error.webdriver?.message ?? error.message);
	const automationOff = /allow remote automation/i.test(message);
	recordStatic('session', false, {
		error: message,
		...(automationOff ? {
			ownerAction: options.stp
				? 'Safari Technology Preview > Settings > Advanced: "Show features for web developers"; then Settings > Developer: "Allow remote automation" (or run once: "/Applications/Safari Technology Preview.app/Contents/MacOS/safaridriver" --enable, which asks for an admin password)'
				: 'Safari > Settings > Advanced: "Show features for web developers"; then Settings > Developer: "Allow remote automation" (or run once: safaridriver --enable, which asks for an admin password)',
		} : {}),
	});
	cleanup();
	// 2: blocked by a browser setting only the owner can change.
	finish(automationOff ? 2 : 1);
	process.exit();
}
await session.setTimeouts({ script: 180_000, pageLoad: 30_000 });

let extensionId;
let extensionBase = options['base-url']?.replace(/\/$/, '');
let controlHandle;
let mainHandle;
// WebDriver returns Safari's composed extension identifier, not the
// per-install UUID that safari-web-extension:// URLs use, and Safari refuses
// WebDriver navigation to those URLs (WebKit bug 252112). The driver installs
// a copy whose background also runs verify-probe-bg.js: once per browser
// session it opens options.html?verify-probe=1 in a new window. That page is
// the control page, and its URL carries the UUID. Nothing else changes.
const installDir = join(workDir, 'safari-mv3-probe');
cpSync(extensionDir, installDir, { recursive: true });
{
	const probeManifest = JSON.parse(readFileSync(join(installDir, 'manifest.json'), 'utf8'));
	probeManifest.background.scripts = [...probeManifest.background.scripts, 'verify-probe-bg.js'];
	writeFileSync(join(installDir, 'manifest.json'), JSON.stringify(probeManifest, null, 2));
	// Checks whether a worker can fetch packaged registry shards, as the matcher worker does.
	writeFileSync(join(installDir, 'verify-worker-probe.js'), `self.onmessage = async () => {
	const out = { href: location.href, origin: location.origin };
	for (const [label, base] of [['origin', location.origin + '/'], ['href', location.href]]) {
		try {
			const url = new URL('kaiju-deepscope-registry/registry.kind.dom.json', base).toString();
			const response = await fetch(url);
			out[label] = { url, ok: response.ok, status: response.status };
		} catch (error) {
			out[label] = { error: String(error) };
		}
	}
	postMessage(out);
};
`);
	writeFileSync(join(installDir, 'verify-probe-bg.js'), `(async () => {
	const api = globalThis.browser ?? globalThis.chrome;
	const key = 'verify:probe-opened';
	if ((await api.storage.session.get(key))[key]) return;
	await api.storage.session.set({ [key]: true });
	const url = api.runtime.getURL('options.html?verify-probe=1');
	// Windows the extension creates are not WebDriver windows, so open a tab
	// in the focused one: the driver focuses a window it made for this.
	await api.tabs.create({ url, active: true });
})();
`);
}
const zip = join(workDir, 'deepscope.zip');
execFileSync('zip', ['-qr', zip, '.'], { cwd: installDir });

/**
 * Install the build with the W3C "Web Extensions" classic command
 * (`POST /session/{id}/webextension`, Safari 26+ on macOS). The draft spec is
 * inconsistent about the key that carries a path, so both are tried; the
 * archive and base64 forms are fallbacks.
 */
async function installExtension() {
	const attempts = [
		{ type: 'path', path: installDir },
		{ type: 'path', value: installDir },
		{ type: 'archivePath', path: zip },
		{ type: 'archivePath', value: zip },
		{ type: 'base64', value: readFileSync(zip).toString('base64') },
	];
	const errors = [];
	for (const body of attempts) {
		try {
			const value = await session.cmd('POST', '/webextension', body);
			const id = typeof value === 'string' ? value : value?.extension ?? value?.id ?? value?.extensionId;
			return { id, raw: value, used: { type: body.type, key: 'path' in body ? 'path' : 'value' }, errors };
		} catch (error) {
			errors.push({ type: body.type, key: 'path' in body ? 'path' : 'value', error: error.webdriver?.error ?? error.message, message: error.webdriver?.message });
			// An unknown command will not start working with another body.
			if (/unknown command|unknown method/i.test(error.webdriver?.error ?? error.message)) break;
		}
	}
	return { id: undefined, errors };
}

/** Adopt the window verify-probe-bg.js opened as the control page and return the extension's base URL. */
async function probeExtensionBase() {
	// A window of its own for the control page, focused so the probe's tab opens there.
	const host = await session.newWindow('window');
	await session.switchTo(host);
	const known = new Set(await session.handles());
	for (let i = 0; i < 80; i++) {
		// Safari starts a non-persistent background lazily; a tab event wakes it.
		if (i % 12 === 0) {
			await session.switchTo(host).catch(() => undefined);
			await session.navigate(`${origin}/plain.html?wake=${i}`).catch(() => undefined);
		}
		for (const handle of (await session.handles()).filter((h) => !known.has(h))) {
			await session.switchTo(handle);
			const url = await session.url().catch(() => '');
			if (/^safari-web-extension:\/\/[^/]+\/options\.html\?verify-probe=1/.test(url)) {
				controlHandle = handle;
				return url.replace(/\/options\.html.*$/, '');
			}
		}
		await delay(250);
	}
	const seen = [];
	for (const handle of await session.handles()) {
		await session.switchTo(handle);
		seen.push(await session.url().catch((error) => `(${error.message})`));
	}
	console.log('probe: no control page among', JSON.stringify(seen));
	await session.switchTo(mainHandle);
	return undefined;
}

/** Run `body` (an async function source) inside the extension's control page. */
async function ext(body, ...args) {
	await session.switchTo(controlHandle);
	const value = await session.execAsync(asyncScript(body), args);
	if (!value.ok) throw new Error(`extension script failed: ${value.e}`);
	return value.v;
}

/**
 * Open an extension page in a new tab by navigating to it. WebKit bug 252112
 * reports WebDriver hanging on safari-web-extension: URLs, so the page-load
 * timeout above bounds that and the result is checked explicitly.
 */
async function openExtensionTab(path, type = 'tab') {
	// The control page opens it; WebDriver cannot navigate to extension URLs.
	const before = await session.handles();
	await ext(`async (path, type) => {
		const url = browser.runtime.getURL(path);
		if (type === 'window') await browser.windows.create({ url, focused: false });
		else await browser.tabs.create({ url, active: true });
	}`, path, type);
	for (let i = 0; i < 60; i++) {
		const handle = (await session.handles()).find((h) => !before.includes(h));
		if (handle) return handle;
		await delay(200);
	}
	throw new Error(`extension page ${path} did not open`);
}

/** The control page is the window the probe opened; reopen it from another extension page if it closed. */
async function openControlWindow() {
	if (controlHandle && (await session.handles()).includes(controlHandle)) return;
	throw new Error('control page closed and Safari cannot open extension pages through WebDriver; rerun');
}

async function ensureControl() {
	await openControlWindow();
}

harness = createHarness(ext);
const { record } = harness;
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
	const capabilities = await fetch(`${base}/session/${session.id}`).then((r) => r.json()).catch(() => undefined);
	console.log('session', session.id, capabilities?.value ? JSON.stringify(capabilities.value).slice(0, 300) : '');

	// Tabs open before the extension is installed. The content script is
	// runtime injected, so nothing is in those pages until the background injects it.
	await session.navigate(`${origin}/wp.html`);
	const preHandle = await session.newWindow('tab');
	await session.switchTo(preHandle);
	await session.navigate('https://example.com/');
	await session.switchTo(mainHandle);

	const installedAt = Date.now();
	const install = await installExtension();
	extensionId = install.id;
	record('webdriver-install-extension', Boolean(install.id), install);
	if (!extensionBase && extensionId) extensionBase = await probeExtensionBase() ?? (/^safari-web-extension:/.test(extensionId) ? extensionId.replace(/\/$/, '') : `safari-web-extension://${extensionId}`);
	if (!extensionBase) throw new Error('No extension base URL: WebDriver did not install the build. Install the packaged app (safari-package.sh), enable it, and pass --base-url safari-web-extension://<uuid> from its options page.');
	await delay(1500);
	await openControlWindow();

	const permissions = await ext(`async () => ({
		baseUrl: browser.runtime.getURL('/'),
		all: await browser.permissions.getAll(),
		example: await browser.permissions.contains({ origins: ['https://example.com/*'] }),
		local: await browser.permissions.contains({ origins: ['http://127.0.0.1/*'] }),
		autoScan: (await browser.storage.local.get('kaiju-deepscope.settings.auto-scan-enabled.v1')),
	})`);
	console.log('permissions', JSON.stringify(permissions));
	// Safari asks the user before an extension may read a site, even with
	// host_permissions; without the grant no scenario can pass.
	// Safari Technology Preview reports no granted origins for a WebDriver
	// install, yet the scenarios still inject and scan (checked November 2026),
	// so this is informational; the scenarios show whether access works.
	record('host-access-granted', true, { note: 'informational: if scans fail, Safari > Settings > Extensions > DeepScope > "Always Allow on Every Website"', granted: Boolean(permissions.local && permissions.example), ...permissions });
	const workerFetch = await ext(`async () => {
		const page = await fetch(browser.runtime.getURL('kaiju-deepscope-registry/registry.kind.dom.json')).then((r) => ({ ok: r.ok, status: r.status }), (e) => ({ error: String(e) }));
		const results = { page, pageOrigin: location.origin };
		for (const type of ['classic', 'module']) {
			results[type] = await new Promise((resolve) => {
				const worker = new Worker(browser.runtime.getURL('verify-worker-probe.js'), { type });
				const timer = setTimeout(() => resolve({ error: 'timeout' }), 5000);
				worker.onmessage = (event) => { clearTimeout(timer); worker.terminate(); resolve(event.data); };
				worker.onerror = (event) => { clearTimeout(timer); resolve({ error: event.message || 'worker error' }); };
				worker.postMessage('go');
			});
		}
		return results;
	}`).catch((error) => ({ error: String(error) }));
	record('safari-worker-fetch', true, { note: 'informational: can a worker fetch packaged registry shards (the matcher worker must)', ...workerFetch });
	if (want('storage-limit')) {
		// How much stored data storage.local.get(null) returns before Safari
		// refuses the call. DeepScope enumerates its keys that way.
		const limit = await ext(`async () => {
			const chunk = 'x'.repeat(256 * 1024);
			const steps = [];
			for (let i = 0; i < 256; i++) {
				await browser.storage.local.set({ ['verify:fill:' + i]: chunk });
				try { await browser.storage.local.get(null); } catch (error) { steps.push({ failedAtMiB: ((i + 1) * 256) / 1024, error: String(error.message || error) }); break; }
			}
			const keys = Array.from({ length: 256 }, (_, i) => 'verify:fill:' + i);
			await browser.storage.local.remove(keys);
			return { ...(steps[0] ?? { failedAtMiB: null, note: 'no failure up to 64 MiB' }), getKeys: typeof browser.storage.local.getKeys };
		}`);
		record('storage-get-all-limit', true, { note: 'informational', ...limit });
	}
	const tabs = await ext(`async () => (await browser.tabs.query({})).map((t) => ({ id: t.id, url: t.url, active: t.active, windowId: t.windowId }))`);

	await runScenarios(session, harness, {
		origin,
		installedAt,
		wpTab: tabs.find((t) => t.url?.endsWith('/wp.html')),
		exampleTab: tabs.find((t) => t.url?.startsWith('https://example.com')),
		want,
		idleMs: Number(options['idle-timeout']),
		stressRounds: Number(options['stress-rounds']),
		stress: stressOptions,
		hooks: {
			// Safari exposes no background state or process memory to WebDriver;
			// the idle-wake scenario infers an unload from a background restart.
			openExtensionTab,
			ensureControl,
			reinstall: extensionId && !options['base-url'] ? async () => {
				await session.cmd('DELETE', `/webextension/${encodeURIComponent(extensionId)}`);
				const again = await installExtension();
				if (!again.id) throw new Error(`reinstall failed: ${JSON.stringify(again.errors)}`);
				extensionId = again.id;
				// The new install's background opens a new control window.
				controlHandle = undefined;
				extensionBase = await probeExtensionBase();
				if (!extensionBase) throw new Error('reinstalled extension did not open its control page');
			} : undefined,
			// Pages where Safari does not run extension scripts.
			restrictedUrls: ['https://apps.apple.com/us/app/xcode/id497799835', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'],
		},
	});
} catch (error) {
	record('driver', false, { error: String(error.stack ?? error) });
} finally {
	if (process.env.VERIFY_VERBOSE) {
		const errors = await harness.errorRecords().catch((error) => [String(error)]);
		console.log('journal errors and warnings (newest first):', JSON.stringify(errors, null, 1).slice(0, 12_000));
	}
	if (extensionId) await session.cmd('DELETE', `/webextension/${encodeURIComponent(extensionId)}`).catch(() => undefined);
	await session.quit();
	cleanup();
	console.log(`safaridriver log: ${join(workDir, 'safaridriver.log')}${options.diagnose ? ' (diagnostics: ~/Library/Logs/com.apple.WebDriver/)' : ''}`);
	finish();
}
