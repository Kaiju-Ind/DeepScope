#!/usr/bin/env node
// Drive a real Safari (or Safari Technology Preview) with the built DeepScope
// extension and run the same scenarios as firefox.mjs.
// See tools/verify/README.md for usage and the one-time Safari settings.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
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
const zip = join(workDir, 'deepscope.zip');
execFileSync('zip', ['-qr', zip, '.'], { cwd: extensionDir });

/**
 * Install the build with the W3C "Web Extensions" classic command
 * (`POST /session/{id}/webextension`, Safari 26+ on macOS). The draft spec is
 * inconsistent about the key that carries a path, so both are tried; the
 * archive and base64 forms are fallbacks.
 */
async function installExtension() {
	const attempts = [
		{ type: 'path', path: extensionDir },
		{ type: 'path', value: extensionDir },
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
	const handle = await session.newWindow(type);
	await session.switchTo(handle);
	const url = `${extensionBase}/${path}`;
	try {
		await session.navigate(url);
	} catch (error) {
		if (!/timeout/i.test(error.message)) throw error;
	}
	const at = await session.exec('return { href: location.href, api: typeof browser !== "undefined" && typeof browser.runtime?.getURL === "function" }');
	if (!at.api) throw new Error(`extension page ${url} did not load with extension APIs (at ${at.href})`);
	return handle;
}

/** Keep the control page in its own window so switching to it does not activate a target tab. */
async function openControlWindow() {
	controlHandle = await openExtensionTab('options.html', 'window');
	await delay(1000);
}

async function ensureControl() {
	if ((await session.handles()).includes(controlHandle)) return;
	await openControlWindow();
}

harness = createHarness(ext);
const { record } = harness;
const want = (name) => !options.only || options.only.split(',').includes(name);

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
	if (!extensionBase && extensionId) extensionBase = /^safari-web-extension:/.test(extensionId) ? extensionId.replace(/\/$/, '') : `safari-web-extension://${extensionId}`;
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
	record('host-access-granted', permissions.local && permissions.example, { note: 'Safari > Settings > Extensions > DeepScope > "Always Allow on Every Website" if false', ...permissions });
	const tabs = await ext(`async () => (await browser.tabs.query({})).map((t) => ({ id: t.id, url: t.url, active: t.active, windowId: t.windowId }))`);

	await runScenarios(session, harness, {
		origin,
		installedAt,
		wpTab: tabs.find((t) => t.url?.endsWith('/wp.html')),
		exampleTab: tabs.find((t) => t.url?.startsWith('https://example.com')),
		want,
		idleMs: Number(options['idle-timeout']),
		stressRounds: Number(options['stress-rounds']),
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
				extensionBase = /^safari-web-extension:/.test(extensionId) ? extensionId.replace(/\/$/, '') : `safari-web-extension://${extensionId}`;
				await delay(2000);
				await openControlWindow();
			} : undefined,
			// Pages where Safari does not run extension scripts.
			restrictedUrls: ['https://apps.apple.com/us/app/xcode/id497799835', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'],
		},
	});
} catch (error) {
	record('driver', false, { error: String(error.stack ?? error) });
} finally {
	if (extensionId) await session.cmd('DELETE', `/webextension/${encodeURIComponent(extensionId)}`).catch(() => undefined);
	await session.quit();
	cleanup();
	console.log(`safaridriver log: ${join(workDir, 'safaridriver.log')}${options.diagnose ? ' (diagnostics: ~/Library/Logs/com.apple.WebDriver/)' : ''}`);
	finish();
}
