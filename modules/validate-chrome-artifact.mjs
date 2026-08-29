import { createHash } from 'node:crypto';
import { access, mkdtemp, readFile, readdir, rm, stat } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { basename, join, relative, resolve, sep } from 'node:path';
import { spawn } from 'node:child_process';

const DEFAULT_ARTIFACT_DIRECTORY = '.output/chrome-mv3';
const REGISTRY_DIRECTORY = 'kaiju-deepscope-registry';
const RUNTIME_REGISTRY = 'registry.runtime.json';
const KIND_PREFIX = 'registry.kind.';
const APP_VALIDATION_KEY = '__kaijuDeepScopeAppArtifactValidationV1';
const CONTENT_VALIDATION_KEY = '__kaijuDeepScopeContentArtifactValidationV1';
const STARTUP_TIMEOUT_MS = 15_000;
const PAGE_SETTLE_MS = 750;

const options = parseArgs(process.argv.slice(2));
if (options.help) {
	console.log(`Usage: node modules/validate-chrome-artifact.mjs [options]\n\nOptions:\n  --artifact=<path>  Generated Chrome artifact directory.\n  --chrome=<path>    Chrome or Chromium executable.\n  --static-only      Skip the browser startup checks.\n  --help             Show this message.`);
	process.exit(0);
}

const root = process.cwd();
const artifactDirectory = resolve(root, options.artifact ?? DEFAULT_ARTIFACT_DIRECTORY);
const report = await validateArtifact({ artifactDirectory, chrome: options.chrome, staticOnly: options.staticOnly });
console.log(JSON.stringify(report, null, 2));
if (!report.ok) process.exitCode = 1;

/** Validate the generated Chrome extension rather than the TypeScript source tree. */
async function validateArtifact(input) {
	const assertions = [];
	try {
		await assertDirectory(input.artifactDirectory);
		const manifest = JSON.parse(await readFile(join(input.artifactDirectory, 'manifest.json'), 'utf8'));
		const files = await listFiles(input.artifactDirectory);

		assertion(assertions, 'Chrome artifact manifest is MV3', manifest.manifest_version === 3, {
			manifestVersion: manifest.manifest_version,
		});
		assertion(assertions, 'Chrome artifact keeps the declared Chrome 119 minimum', manifest.minimum_chrome_version === '119', {
			minimumChromeVersion: manifest.minimum_chrome_version,
		});
		const hostPermissions = Array.isArray(manifest.host_permissions) ? manifest.host_permissions : [];
		assertion(assertions, 'Chrome artifact keeps HTTP and HTTPS host access for supported-page analysis',
			hostPermissions.includes('http://*/*') && hostPermissions.includes('https://*/*'),
			{ hostPermissions },
		);
		assertion(assertions, 'Chrome action does not reintroduce a popup UI', !manifest.action?.default_popup, {
			defaultPopup: manifest.action?.default_popup,
		});
		await validateRegistry(assertions, input.artifactDirectory, files);
		await validateFonts(assertions, files);
		await validateHtml(assertions, input.artifactDirectory, files, manifest);
		await validateProbeEmission(assertions, input.artifactDirectory, files);

		if (!input.staticOnly) {
			const chrome = await findChrome(input.chrome);
			assertion(assertions, 'Chrome or Chromium executable is available', Boolean(chrome), { chrome });
			if (chrome) {
				const runtime = await validateExtensionPages({ artifactDirectory: input.artifactDirectory, chrome, manifest });
				for (const result of runtime) assertions.push(result);
			}
		}
	} catch (error) {
		assertions.push({
			name: 'validator completed',
			pass: false,
			evidence: { error: error instanceof Error ? error.message : String(error) },
		});
	}

	return { ok: assertions.length > 0 && assertions.every((entry) => entry.pass), artifactDirectory: input.artifactDirectory, assertions };
}

/** Production packages contain only validated rule-free runtime Registry data and matcher shards. */
async function validateRegistry(assertions, artifactDirectory, files) {
	const registryPaths = files.filter((path) => path.startsWith(`${REGISTRY_DIRECTORY}/`) && path.endsWith('.json')).sort();
	const registryFiles = registryPaths.map((path) => basename(path));
	const unexpected = registryFiles.filter((name) => name !== RUNTIME_REGISTRY && !(name.startsWith(KIND_PREFIX) && name.endsWith('.json')));
	assertion(assertions, 'packaged Registry contains the rule-free runtime artifact', registryFiles.includes(RUNTIME_REGISTRY), { registryFiles });
	assertion(assertions, 'packaged Registry contains matcher kind shards', registryFiles.some((name) => name.startsWith(KIND_PREFIX)), {
		kindShardCount: registryFiles.filter((name) => name.startsWith(KIND_PREFIX)).length,
	});
	assertion(assertions, 'packaged Registry excludes build-only products', unexpected.length === 0, { unexpected });

	const products = [];
	for (const path of registryPaths) {
		const source = await readFile(join(artifactDirectory, path), 'utf8');
		const value = JSON.parse(source);
		products.push({ path, source, value });
	}
	const schemaVersions = [...new Set(products.map(({ value }) => value?.schemaVersion).filter(Number.isInteger))];
	assertion(assertions, 'packaged Registry products use one integer schema version', products.length > 0 && schemaVersions.length === 1, { schemaVersions });
	const nonCompact = products.filter(({ source, value }) => source.trim() !== JSON.stringify(value)).map(({ path }) => path);
	assertion(assertions, 'packaged Registry JSON remains compact canonical output', nonCompact.length === 0, { nonCompact });
	const obsoleteRegexMarkers = products.filter(({ source }) => source.includes('$kaijuDeepScopeRegExp')).map(({ path }) => path);
	assertion(assertions, 'packaged Registry excludes the obsolete RegExp serialization marker', obsoleteRegexMarkers.length === 0, { obsoleteRegexMarkers });

	const runtime = products.find(({ path }) => basename(path) === RUNTIME_REGISTRY)?.value;
	const runtimeTechnologies = Array.isArray(runtime?.technologies) ? runtime.technologies : [];
	const runtimeRuleOwners = runtimeTechnologies.filter((technology) => technology && typeof technology === 'object' && 'rules' in technology).length;
	assertion(assertions, 'packaged runtime Registry technology records are rule-free', Boolean(runtime) && runtimeRuleOwners === 0, {
		technologyCount: runtimeTechnologies.length,
		runtimeRuleOwners,
	});

	const invalidShards = products
		.filter(({ path }) => basename(path).startsWith(KIND_PREFIX))
		.filter(({ value }) => value?.kind !== 'kind-shard' || typeof value?.observationKind !== 'string')
		.map(({ path }) => path);
	assertion(assertions, 'packaged matcher Registry files are observation-kind shards', invalidShards.length === 0, { invalidShards });
}

/** Verify Fontless owns generated font assets and legacy public paths stay absent. */
async function validateFonts(assertions, files) {
	const generated = files.filter((path) => path.startsWith('assets/_fonts/'));
	const legacy = files.filter((path) => path.startsWith('fonts/american-kestrel/'));
	assertion(assertions, 'generated artifact contains Fontless-owned font assets', generated.length > 0, { generatedCount: generated.length });
	assertion(assertions, 'generated artifact excludes legacy public American Kestrel font paths', legacy.length === 0, { legacy });
}

/** Generated pages must keep root ownership and must not reintroduce preload warnings. */
async function validateHtml(assertions, artifactDirectory, files, manifest) {
	const htmlFiles = files.filter((path) => path.endsWith('.html'));
	const preload = [];
	for (const path of htmlFiles) {
		const html = await readFile(join(artifactDirectory, path), 'utf8');
		if (/<link\b[^>]*\brel=["'](?:modulepreload|preload)["']/iu.test(html)) preload.push(path);
	}
	assertion(assertions, 'generated HTML excludes preload and modulepreload links', preload.length === 0, { preload });

	for (const page of extensionPages(manifest)) {
		const path = normalizeArtifactPath(page.path);
		const exists = files.includes(path);
		assertion(assertions, `${page.name} page exists`, exists, { path });
		if (!exists) continue;
		const html = await readFile(join(artifactDirectory, path), 'utf8');
		assertion(assertions, `${page.name} page owns a root element`, /\bid=["']root["']/u.test(html), { path });
	}
}

/** Keep the emitted validation probes available so release checks cannot silently regress to source-only validation. */
async function validateProbeEmission(assertions, artifactDirectory, files) {
	const javascript = files.filter((path) => path.endsWith('.js'));
	let appProbeFiles = 0;
	let contentProbeFiles = 0;
	for (const path of javascript) {
		const source = await readFile(join(artifactDirectory, path), 'utf8');
		if (source.includes(APP_VALIDATION_KEY)) appProbeFiles += 1;
		if (source.includes(CONTENT_VALIDATION_KEY)) contentProbeFiles += 1;
	}
	assertion(assertions, 'generated app runtime retains its artifact-validation probe', appProbeFiles > 0, { matchingFiles: appProbeFiles });
	assertion(assertions, 'generated content runtime retains its artifact-validation probe', contentProbeFiles > 0, { matchingFiles: contentProbeFiles });
}

/**
 * Load generated extension pages in Chrome and reject startup/runtime errors.
 *
 * The browser process owns the temporary profile. The validator always stops it
 * and removes the profile, including when a generated page fails to start.
 */
async function validateExtensionPages(input) {
	const userDataDirectory = await mkdtemp(join(tmpdir(), 'kaiju-deepscope-chrome-'));
	const port = await availablePort();
	const child = launchChrome({ ...input, port, userDataDirectory });
	try {
		const version = await waitForJson(`http://127.0.0.1:${port}/json/version`, STARTUP_TIMEOUT_MS);
		const extensionId = extensionIdForPath(input.artifactDirectory);
		const results = [];
		for (const page of extensionPages(input.manifest)) {
			const url = `chrome-extension://${extensionId}/${normalizeArtifactPath(page.path)}`;
			results.push(await validatePage({ port, page: page.name, url }));
		}
		return [
			{ name: 'Chrome DevTools endpoint started', pass: Boolean(version.webSocketDebuggerUrl), evidence: { chrome: input.chrome } },
			...results,
		];
	} catch (error) {
		return [{
			name: 'generated extension pages start in Chrome',
			pass: false,
			evidence: { error: error instanceof Error ? error.message : String(error), chrome: input.chrome, hint: 'Use Chromium or Chrome for Testing when a Chrome-branded build refuses unpacked --load-extension.' },
		}];
	} finally {
		child.kill('SIGTERM');
		await waitForExit(child, 2_000).catch(() => child.kill('SIGKILL'));
		await rm(userDataDirectory, { recursive: true, force: true });
	}
}

/** Validate one generated extension page through Chrome DevTools Protocol. */
async function validatePage({ port, page, url }) {
	const target = await fetchJson(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
	if (!target.webSocketDebuggerUrl) {
		return { name: `${page} generated startup`, pass: false, evidence: { url, error: 'Chrome did not expose a page debugger target.' } };
	}

	const client = await connectCdp(target.webSocketDebuggerUrl);
	const exceptions = [];
	try {
		client.on('Runtime.exceptionThrown', (params) => exceptions.push(params.exceptionDetails?.text ?? 'Runtime exception'));
		client.on('Log.entryAdded', (params) => {
			if (params.entry?.level === 'error') exceptions.push(params.entry.text ?? 'Chrome log error');
		});
		await client.send('Runtime.enable');
		await client.send('Log.enable');
		await client.send('Page.enable');
		await delay(PAGE_SETTLE_MS);
		const root = await client.send('Runtime.evaluate', {
			expression: `({ hasDocument: typeof document === 'object', hasGetElementById: typeof document?.getElementById === 'function', hasRoot: Boolean(document?.getElementById?.('root')), href: location.href })`,
			returnByValue: true,
		});
		const value = root.result?.result?.value ?? {};
		const pageLoaded = value.href === url && value.hasDocument && value.hasGetElementById && value.hasRoot;
		const generatedCollision = exceptions.some((message) => message.includes('getElementById is not a function'));
		return {
			name: `${page} generated startup`,
			pass: pageLoaded && exceptions.length === 0 && !generatedCollision,
			evidence: { url, root: value, exceptions },
		};
	} finally {
		client.close();
	}
}

function extensionPages(manifest) {
	const pages = [];
	if (manifest.side_panel?.default_path) pages.push({ name: 'side panel', path: manifest.side_panel.default_path });
	const options = manifest.options_ui?.page ?? manifest.options_page;
	if (options) pages.push({ name: 'options', path: options });
	return pages;
}

function launchChrome({ artifactDirectory, chrome, port, userDataDirectory }) {
	const args = [
		`--remote-debugging-port=${port}`,
		`--user-data-dir=${userDataDirectory}`,
		`--disable-extensions-except=${artifactDirectory}`,
		`--load-extension=${artifactDirectory}`,
		'--no-first-run',
		'--no-default-browser-check',
		'--disable-background-networking',
		'--disable-component-update',
		'--disable-sync',
		'--disable-gpu',
		'--headless=new',
		'about:blank',
	];
	if (typeof process.getuid === 'function' && process.getuid() === 0) args.unshift('--no-sandbox');
	return spawn(chrome, args, { stdio: 'ignore' });
}

async function findChrome(explicit) {
	const candidates = [
		explicit,
		process.env.CHROME_BIN,
		process.platform === 'darwin' ? '/Applications/Chromium.app/Contents/MacOS/Chromium' : undefined,
		process.platform === 'darwin' ? '/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing' : undefined,
		process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined,
		process.platform === 'win32' ? join(process.env.PROGRAMFILES ?? 'C:\\Program Files', 'Chromium/Application/chrome.exe') : undefined,
		process.platform === 'win32' ? join(process.env.PROGRAMFILES ?? 'C:\\Program Files', 'Google/Chrome for Testing/Application/chrome.exe') : undefined,
		process.platform === 'win32' ? join(process.env.PROGRAMFILES ?? 'C:\\Program Files', 'Google/Chrome/Application/chrome.exe') : undefined,
		'/usr/bin/chromium',
		'/usr/bin/chromium-browser',
		'/usr/bin/google-chrome-for-testing',
		'/usr/bin/google-chrome',
		'/usr/bin/google-chrome-stable',
	].filter(Boolean);
	for (const candidate of candidates) {
		try {
			await access(candidate, fsConstants.X_OK);
			return candidate;
		} catch {
			// Try the next browser location.
		}
	}
	return undefined;
}

function extensionIdForPath(path) {
	let normalized = resolve(path);
	if (process.platform === 'win32' && /^[a-z]:/u.test(normalized)) normalized = `${normalized[0].toUpperCase()}${normalized.slice(1)}`;
	const pathBytes = Buffer.from(normalized, process.platform === 'win32' ? 'utf16le' : 'utf8');
	const bytes = createHash('sha256').update(pathBytes).digest().subarray(0, 16);
	let id = '';
	for (const byte of bytes) id += String.fromCharCode(97 + (byte >> 4), 97 + (byte & 15));
	return id;
}

async function listFiles(root) {
	const files = [];
	async function walk(directory) {
		for (const entry of await readdir(directory, { withFileTypes: true })) {
			const path = join(directory, entry.name);
			if (entry.isDirectory()) await walk(path);
			else if (entry.isFile()) files.push(relative(root, path).split(sep).join('/'));
		}
	}
	await walk(root);
	return files.sort();
}

async function assertDirectory(path) {
	const info = await stat(path);
	if (!info.isDirectory()) throw new TypeError(`Chrome artifact is not a directory: ${path}`);
}

function normalizeArtifactPath(path) {
	return path.replace(/^\/+/, '');
}

function assertion(assertions, name, pass, evidence) {
	assertions.push({ name, pass: Boolean(pass), evidence });
}

function parseArgs(args) {
	const output = { artifact: undefined, chrome: undefined, staticOnly: false, help: false };
	for (const arg of args) {
		if (arg === '--static-only') output.staticOnly = true;
		else if (arg === '--help' || arg === '-h') output.help = true;
		else if (arg.startsWith('--artifact=')) output.artifact = arg.slice('--artifact='.length);
		else if (arg.startsWith('--chrome=')) output.chrome = arg.slice('--chrome='.length);
		else throw new TypeError(`Unknown argument: ${arg}`);
	}
	return output;
}

async function availablePort() {
	return await new Promise((resolvePort, reject) => {
		const server = createServer();
		server.once('error', reject);
		server.listen(0, '127.0.0.1', () => {
			const address = server.address();
			if (!address || typeof address === 'string') {
				server.close(() => reject(new Error('Could not reserve a Chrome debugging port.')));
				return;
			}
			server.close((error) => error ? reject(error) : resolvePort(address.port));
		});
	});
}

async function waitForJson(url, timeoutMs) {
	const started = Date.now();
	let lastError;
	while (Date.now() - started < timeoutMs) {
		try {
			return await fetchJson(url);
		} catch (error) {
			lastError = error;
			await delay(100);
		}
	}
	throw new Error(`Chrome did not expose DevTools within ${timeoutMs}ms: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

async function fetchJson(url, init) {
	const response = await fetch(url, init);
	if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
	return await response.json();
}

function connectCdp(url) {
	return new Promise((resolveClient, reject) => {
		const socket = new WebSocket(url);
		const pending = new Map();
		const listeners = new Map();
		let sequence = 0;

		socket.addEventListener('open', () => resolveClient({
			send(method, params = {}) {
				const id = ++sequence;
				return new Promise((resolve, rejectRequest) => {
					pending.set(id, { resolve, reject: rejectRequest });
					socket.send(JSON.stringify({ id, method, params }));
				});
			},
			on(method, listener) {
				const current = listeners.get(method) ?? [];
				current.push(listener);
				listeners.set(method, current);
			},
			close() { socket.close(); },
		}));
		socket.addEventListener('error', () => reject(new Error(`Could not connect to Chrome target: ${url}`)));
		socket.addEventListener('message', (event) => {
			const message = JSON.parse(String(event.data));
			if (message.id) {
				const request = pending.get(message.id);
				if (!request) return;
				pending.delete(message.id);
				if (message.error) request.reject(new Error(message.error.message ?? 'Chrome DevTools request failed.'));
				else request.resolve(message.result);
				return;
			}
			for (const listener of listeners.get(message.method) ?? []) listener(message.params ?? {});
		});
	});
}

function waitForExit(child, timeoutMs) {
	return new Promise((resolveExit, reject) => {
		if (child.exitCode !== null) return resolveExit(child.exitCode);
		const timeout = setTimeout(() => reject(new Error('Chrome did not stop within the cleanup deadline.')), timeoutMs);
		child.once('exit', (code) => {
			clearTimeout(timeout);
			resolveExit(code);
		});
	});
}

function delay(ms) {
	return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}
