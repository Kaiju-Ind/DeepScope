import { Buffer } from 'node:buffer';
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { parseArgs } from 'node:util';

const CONTENT_VALIDATION_KEY = '__kaijuDeepScopeContentArtifactValidationV1';
const APP_VALIDATION_KEY = '__kaijuDeepScopeAppArtifactValidationV1';
const DEFAULT_OUTPUT_ROOT = '.output/chrome-mv3';
const STARTUP_TIMEOUT_MS = 15_000;
const CDP_TIMEOUT_MS = 30_000;
/** Validate the generated Chrome artifact and exit non-zero when any generated runtime seam fails. */
async function main() {
	const { values } = parseArgs({
		options: {
			root: { type: 'string', default: DEFAULT_OUTPUT_ROOT },
			chrome: { type: 'string' },
		},
	});

	const outputRoot = resolve(values.root);
	const contentBundlePath = join(outputRoot, 'content-scripts', 'content.js');
	if (!existsSync(contentBundlePath)) {
		throw new Error(`Generated content script not found: ${contentBundlePath}`);
	}
	const appBundlePath = findAppChunk(outputRoot);
	const sidepanelBundlePath = findHtmlModule(outputRoot, 'sidepanel.html');
	const optionsBundlePath = findHtmlModule(outputRoot, 'options.html');
	const contentBundle = readFileSync(contentBundlePath, 'utf8');
	const preloads = validateHtmlPreloads(outputRoot);
	const appModuleUrl = createModuleUrl(appBundlePath);
	const sidepanelStartupUrl = createStartupUrl(sidepanelBundlePath, 'Kaiju DeepScope side-panel root is missing.');
	const optionsStartupUrl = createStartupUrl(optionsBundlePath, 'Kaiju DeepScope diagnostics root is missing.');

	const chromePath = values.chrome ?? findChrome();
	if (!chromePath) {
		throw new Error(
			'Chrome or Chromium was not found. Set CHROME_BIN or pass --chrome=/path/to/chrome so the generated Chrome artifact can be executed.',
		);
	}

	const profileDirectory = await mkdtemp(join(tmpdir(), 'kaiju-deepscope-chrome-artifact-'));
	const debuggingPort = await reservePort();
	const chromeArgs = [
		'--headless=new',
		'--disable-gpu',
		'--disable-background-networking',
		'--disable-component-update',
		'--disable-default-apps',
		'--disable-sync',
		'--metrics-recording-only',
		'--no-first-run',
		'--no-proxy-server',
		'--remote-allow-origins=*',
		`--remote-debugging-port=${debuggingPort}`,
		`--user-data-dir=${profileDirectory}`,
		'about:blank',
	];
	if (typeof process.getuid === 'function' && process.getuid() === 0) {
		chromeArgs.unshift('--no-sandbox');
	}

	const chrome = spawn(chromePath, chromeArgs, {
		env: { ...process.env, TERM: process.env.TERM ?? 'xterm' },
		stdio: ['ignore', 'ignore', 'pipe'],
	});
	let chromeErrorOutput = '';
	chrome.stderr?.on('data', (chunk) => {
		chromeErrorOutput += String(chunk);
		if (chromeErrorOutput.length > 20_000) {
			chromeErrorOutput = chromeErrorOutput.slice(-20_000);
		}
	});

	let cdp;
	try {
		const target = await waitForPage(debuggingPort);
		cdp = await CdpClient.connect(target.webSocketDebuggerUrl);
		await cdp.call('Runtime.enable');

		await cdp.evaluate(createBrowserMockScript());
		await cdp.evaluate(contentBundle);
		await delay(150);

		const content = await cdp.evaluate(createContentProbe(), {
			awaitPromise: true,
			returnByValue: true,
			timeoutMs: CDP_TIMEOUT_MS,
		});
		const app = await cdp.evaluate(createAppProbe(appModuleUrl), {
			awaitPromise: true,
			returnByValue: true,
			timeoutMs: CDP_TIMEOUT_MS,
		});
		const ui = {
			sidepanel: await validateUiRoot(debuggingPort, sidepanelStartupUrl, 'sidepanel'),
			options: await validateUiRoot(debuggingPort, optionsStartupUrl, 'options'),
		};
		ui.ok = ui.sidepanel.ok === true && ui.options.ok === true;

		if (!content || typeof content !== 'object') {
			throw new Error('Generated content-script validation returned no result object.');
		}
		if (!app || typeof app !== 'object') {
			throw new Error('Generated side-panel model validation returned no result object.');
		}
		if (!ui.sidepanel || !ui.options) {
			throw new Error('Generated UI root validation returned no result object.');
		}

		const result = {
			ok: content.ok === true && app.ok === true && ui.ok === true && preloads.ok === true,
			content,
			app,
			ui,
			preloads,
		};
		console.log(JSON.stringify(result, null, 2));
		if (!result.ok) process.exitCode = 1;
	} catch (error) {
		if (chromeErrorOutput) {
			console.error('\nChrome stderr (tail):\n' + chromeErrorOutput.trim());
		}
		throw error;
	} finally {
		cdp?.close();
		chrome.kill('SIGTERM');
		await Promise.race([
			new Promise((resolveExit) => chrome.once('exit', resolveExit)),
			delay(2_000),
		]);
		if (chrome.exitCode === null) chrome.kill('SIGKILL');
		await rm(profileDirectory, { recursive: true, force: true });
	}
}

/** Create the browser-extension API shim used by generated runtime checks in an ordinary Chromium page. */
function createBrowserMockScript() {
	return String.raw`(() => {
		const runtimeListeners = new Set();
		const storageListeners = new Set();
		const extensionStore = Object.create(null);
		const clone = (value) => value === undefined ? undefined : structuredClone(value);
		const runtimeMessages = [];
		const errors = [];

		addEventListener('error', (event) => {
			errors.push({
				type: 'error',
				message: String(event.message),
				stack: event.error?.stack,
			});
		});
		addEventListener('unhandledrejection', (event) => {
			const reason = event.reason;
			errors.push({
				type: 'unhandledrejection',
				message: reason instanceof Error ? reason.message : String(reason),
				stack: reason?.stack,
			});
		});

		const createStorageArea = () => {
			const values = new Map();
			return {
				get length() { return values.size; },
				key(index) { return [...values.keys()][index] ?? null; },
				getItem(key) { return values.get(String(key)) ?? null; },
				setItem(key, value) { values.set(String(key), String(value)); },
				removeItem(key) { values.delete(String(key)); },
				clear() { values.clear(); },
			};
		};
		Object.defineProperty(globalThis, 'localStorage', {
			configurable: true,
			value: createStorageArea(),
		});
		Object.defineProperty(globalThis, 'sessionStorage', {
			configurable: true,
			value: createStorageArea(),
		});
		let cookieValue = '';
		Object.defineProperty(document, 'cookie', {
			configurable: true,
			get() { return cookieValue; },
			set(value) {
				const pair = String(value).split(';', 1)[0];
				cookieValue = cookieValue ? cookieValue + '; ' + pair : pair;
			},
		});

		globalThis.__kaijuContentArtifactHarness = {
			errors,
			runtimeListeners,
			runtimeMessages,
		};
		globalThis.${CONTENT_VALIDATION_KEY} = {
			runtime: undefined,
			publish(runtime) {
				this.runtime = runtime;
			},
		};
		globalThis.${APP_VALIDATION_KEY} = {
			runtime: undefined,
			publish(runtime) {
				this.runtime = runtime;
			},
		};

		if (typeof globalThis.crypto.randomUUID !== 'function') {
			Object.defineProperty(globalThis.crypto, 'randomUUID', {
				configurable: true,
				value: () => '00000000-0000-4000-8000-000000000001',
			});
		}

		const noopEvent = {
			addListener() {},
			removeListener() {},
			hasListener() { return false; },
		};
		const asyncNoop = async () => undefined;
		const runtime = {
			id: 'kaiju-deepscope-content-artifact-test',
			getManifest() {
				return { name: 'Kaiju DeepScope artifact test', version: '0.1.0' };
			},
			getURL(path = '') {
				return new URL(String(path).replace(/^\//, ''), location.origin + '/').href;
			},
			async sendMessage(message) {
				runtimeMessages.push(clone(message));
				if (message?.channel === 'kaiju-deepscope.dom-selector-offscreen.v1') {
					return { ok: true, selectors: {} };
				}
				return undefined;
			},
			onMessage: {
				addListener(listener) { runtimeListeners.add(listener); },
				removeListener(listener) { runtimeListeners.delete(listener); },
			},
			onConnect: noopEvent,
			async getContexts() { return []; },
		};

		globalThis.chrome = {
			runtime,
			storage: {
				local: {
					async get(keys) {
						if (keys == null) return clone(extensionStore);
						if (typeof keys === 'string') {
							return Object.prototype.hasOwnProperty.call(extensionStore, keys)
								? { [keys]: clone(extensionStore[keys]) }
								: {};
						}
						if (Array.isArray(keys)) {
							return Object.fromEntries(
								keys
									.filter((key) => Object.prototype.hasOwnProperty.call(extensionStore, key))
									.map((key) => [key, clone(extensionStore[key])]),
							);
						}
						if (typeof keys === 'object') {
							return Object.fromEntries(
								Object.entries(keys).map(([key, fallback]) => [
									key,
									Object.prototype.hasOwnProperty.call(extensionStore, key)
										? clone(extensionStore[key])
										: clone(fallback),
								]),
							);
						}
						return {};
					},
					async set(values) {
						const previous = clone(extensionStore);
						Object.assign(extensionStore, clone(values));
						const changes = Object.fromEntries(
							Object.keys(values).map((key) => [key, {
								oldValue: previous[key],
								newValue: clone(extensionStore[key]),
							}]),
						);
						for (const listener of storageListeners) listener(changes, 'local');
					},
					async remove(keys) {
						for (const key of (Array.isArray(keys) ? keys : [keys])) delete extensionStore[key];
					},
					async clear() {
						for (const key of Object.keys(extensionStore)) delete extensionStore[key];
					},
				},
				onChanged: {
					addListener(listener) { storageListeners.add(listener); },
					removeListener(listener) { storageListeners.delete(listener); },
				},
			},
			tabs: {
				async query() { return []; },
				async get() { return {}; },
				sendMessage: asyncNoop,
				onActivated: noopEvent,
				onUpdated: noopEvent,
			},
			windows: {
				async getCurrent() { return { id: 1 }; },
				onFocusChanged: noopEvent,
			},
			scripting: {
				async executeScript() { return []; },
			},
			sidePanel: {
				open: asyncNoop,
				setOptions: asyncNoop,
			},
			offscreen: {},
			action: { onClicked: noopEvent },
		};
	})();`;
}

/** Create the Chromium expression that drives the generated content collector through its full lifecycle. */
function createContentProbe() {
	return String.raw`(async () => {
		const assertions = [];
		const details = {};
		const assert = (name, pass, evidence) => {
			assertions.push({ name, pass: Boolean(pass), evidence });
		};
		const countKinds = (observations) => observations.reduce((counts, observation) => {
			counts[observation.kind] = (counts[observation.kind] ?? 0) + 1;
			return counts;
		}, {});
		const totalChars = (values) => values.reduce((total, value) => total + value.length, 0);

		const harness = globalThis.__kaijuContentArtifactHarness;
		const probe = globalThis.${CONTENT_VALIDATION_KEY};
		const runtime = probe?.runtime;
		assert('generated content runtime publishes the artifact-validation probe', Boolean(runtime?.contentApi && runtime?.collectPageSignals), {
			runtimePublished: Boolean(runtime),
			contentApiPublished: Boolean(runtime?.contentApi),
			rawCollectorPublished: Boolean(runtime?.collectPageSignals),
		});
		assert('generated content runtime starts without an unhandled error', (harness?.errors?.length ?? 0) === 0, harness?.errors ?? []);
		if (!runtime?.contentApi || !runtime?.collectPageSignals) {
			return { ok: false, assertions, details, errors: harness?.errors ?? [] };
		}

		document.head.innerHTML = '<meta name="generator" content="Kaiju DeepScope artifact fixture"><style>.fixture{display:block}</style>';
		document.body.innerHTML = '<div class="fixture">DeepScope generated content-script validation</div><img src="/fixture-image.png" alt="fixture"><script type="application/json">{"fixture":true}</script><a href="/next">Next</a>';
		localStorage.setItem('fixture-local-key', 'private-value');
		sessionStorage.setItem('fixture-session-key', 'private-value');
		document.cookie = 'fixture-cookie=private-value; SameSite=Lax';
		for (let index = 0; index < 260; index += 1) {
			const script = document.createElement('script');
			script.type = 'application/json';
			script.dataset.fixtureScript = String(index);
			script.textContent = JSON.stringify({ index, payload: 's'.repeat(4_950) });
			document.body.append(script);

			const style = document.createElement('style');
			style.dataset.fixtureStyle = String(index);
			style.textContent = '.fixture-' + index + "{--payload:'" + 'x'.repeat(2_950) + "';}";
			document.head.append(style);
		}

		const input = {
			tier: 'enrichment',
			selectorProbeList: [],
			htmlProbeList: [],
			includeHtml: true,
			includeText: true,
			includeScriptContent: true,
			includeStylesheetContent: true,
			includeStorageKeys: true,
			timingTraceId: 'content-artifact-validation',
		};
		let signals;
		try {
			signals = await runtime.collectPageSignals(input);
			assert('generated bounded page collector executes', true, {
				url: signals.url,
				hostname: signals.hostname,
			});
		} catch (error) {
			assert('generated bounded page collector executes', false, {
				name: error?.name,
				message: error?.message ?? String(error),
				stack: error?.stack,
			});
		}

		if (signals) {
			details.signals = {
				url: signals.url,
				hostname: signals.hostname,
				images: signals.images.length,
				scripts: signals.scripts.length,
				scriptContents: signals.scriptContents.length,
				scriptContentChars: totalChars(signals.scriptContents),
				stylesheetContents: signals.stylesheetContents.length,
				stylesheetContentChars: totalChars(signals.stylesheetContents),
				metaKeys: Object.keys(signals.meta).length,
				textChars: signals.text.length,
				localStorageKeys: Object.keys(signals.storage.localStorage),
				sessionStorageKeys: Object.keys(signals.storage.sessionStorage),
				cookieNames: Object.keys(signals.cookies),
			};
			assert('image source collection executes', signals.images.length > 0, details.signals);
			assert('inline script collection executes', signals.scriptContents.length > 0, details.signals);
			assert('inline script item count stays bounded', signals.scriptContents.length <= 200, details.signals);
			assert('inline script total chars stay bounded', totalChars(signals.scriptContents) <= 320_000, details.signals);
			assert('stylesheet collection executes', signals.stylesheetContents.length > 0, details.signals);
			assert('stylesheet item count stays bounded', signals.stylesheetContents.length <= 200, details.signals);
			assert('stylesheet total chars stay bounded', totalChars(signals.stylesheetContents) <= 240_000, details.signals);
			assert('meta collection executes', signals.meta.generator?.length > 0, details.signals);
			assert('visible-text collection executes', signals.text.includes('DeepScope generated content-script validation'), details.signals);
			assert('local storage keys are collected without values', signals.storage.localStorage['fixture-local-key'] === true, details.signals);
			assert('session storage keys are collected without values', signals.storage.sessionStorage['fixture-session-key'] === true, details.signals);
			assert('cookie names are collected without values', signals.cookies['fixture-cookie'] === true, details.signals);
		}

		const collection = await runtime.contentApi.collectObservationBatch(input);
		const reachedPayloadValidation = collection?.ok === true || (
			collection?.ok === false &&
			collection.error?.code === 'PAYLOAD_TOO_LARGE' &&
			collection.error?.message === 'Invalid URL in page signals'
		);
		assert('public content collection reaches payload validation instead of crashing', reachedPayloadValidation, collection);
		if (collection?.ok) {
			const observations = collection.value.batch.observations;
			const initialKinds = countKinds(observations);
			details.initial = { observationCount: observations.length, kinds: initialKinds };
			for (const kind of ['url', 'meta', 'imageSrc', 'scriptContent', 'stylesheetContent', 'text', 'storage', 'cookie']) {
				assert('content collection emits ' + kind + ' observations', (initialKinds[kind] ?? 0) > 0, initialKinds);
			}
		} else {
			details.initial = {
				validationOnlyFailure: collection?.error,
				note: 'The headless harness runs at about:blank; the raw collector above verifies the generated DOM path before URL validation.',
			};
		}

		const start = await runtime.contentApi.beginObservationSession({
			sessionId: 'content-artifact-validation-session',
			expectedUrl: location.href,
			policy: {
				durationMs: 60_000,
				throttleMs: 25,
				maxPendingNodes: 100,
				maxMutations: 1_000,
			},
			includeScriptContent: true,
			includeStylesheetContent: true,
		});
		assert('live observation session starts', start?.ok === true && start.value.status === 'observing', start);

		const lateScript = document.createElement('script');
		lateScript.type = 'application/json';
		lateScript.textContent = '{"late-script":true}';
		document.body.append(lateScript);
		const lateStyle = document.createElement('style');
		lateStyle.textContent = '.late-style{display:block}';
		document.head.append(lateStyle);
		await new Promise((resolve) => setTimeout(resolve, 25));

		const flush = await runtime.contentApi.flushObservationBatch();
		assert('live observation flush succeeds', flush?.ok === true, flush);
		const lateObservations = flush?.ok ? (flush.value.batch?.observations ?? []) : [];
		const lateKinds = countKinds(lateObservations);
		details.late = {
			observationCount: lateObservations.length,
			kinds: lateKinds,
			stats: flush?.ok ? flush.value.stats : undefined,
		};
		assert('late script content reaches the observation batch', (lateKinds.scriptContent ?? 0) > 0, lateKinds);
		assert('late stylesheet content reaches the observation batch', (lateKinds.stylesheetContent ?? 0) > 0, lateKinds);

		const stop = await runtime.contentApi.stopObservationSession({
			sessionId: 'content-artifact-validation-session',
			expectedUrl: location.href,
		});
		assert('live observation session stops cleanly', stop?.ok === true && stop.value.status === 'stopped', stop);
		runtime.dispose('invalidated');
		assert('content runtime completes without an unhandled error', (harness?.errors?.length ?? 0) === 0, harness?.errors ?? []);

		return {
			ok: assertions.every((assertion) => assertion.pass) && (harness?.errors?.length ?? 0) === 0,
			assertions,
			details,
			errors: harness?.errors ?? [],
		};
	})()`;
}


/** Create the Chromium expression that imports and exercises the generated side-panel analysis model. */
function createAppProbe(appModuleUrl) {
	return String.raw`(async () => {
		const assertions = [];
		const details = {};
		const assert = (name, pass, evidence) => {
			assertions.push({ name, pass: Boolean(pass), evidence });
		};
		const harness = globalThis.__kaijuContentArtifactHarness;
		const errorCountBeforeImport = harness?.errors?.length ?? 0;
		let imported = false;
		try {
			await import(${JSON.stringify(appModuleUrl)});
			imported = true;
			assert('generated side-panel module imports without throwing', true, {});
		} catch (error) {
			assert('generated side-panel module imports without throwing', false, {
				name: error?.name,
				message: error?.message ?? String(error),
				stack: error?.stack,
			});
		}

		const probe = globalThis.${APP_VALIDATION_KEY};
		const runtime = probe?.runtime;
		assert('generated side-panel model publishes the artifact-validation probe', Boolean(runtime?.buildAnalysisUpdate), {
			moduleImported: imported,
			runtimePublished: Boolean(runtime),
			buildAnalysisUpdatePublished: typeof runtime?.buildAnalysisUpdate === 'function',
		});

		if (typeof runtime?.buildAnalysisUpdate === 'function') {
			const analysis = {
				url: 'https://example.com/products',
				hostname: 'example.com',
				analyzedAt: 1_700_000_000_000,
				results: [],
			};
			try {
				const active = runtime.buildAnalysisUpdate({
					previousAnalysis: null,
					revision: {
						source: 'command',
						analysis,
						snapshot: { status: 'miss', key: 'analysis:https://example.com' },
						session: { status: 'observing' },
					},
					source: 'initial',
					resetLateMarkers: true,
				});
				details.active = {
					observationMode: active.observationMode,
					shouldKeepLiveUpdatesActive: active.shouldKeepLiveUpdatesActive,
				};
				assert('generated analysis update executes the active-observation path', active.analysis === analysis, details.active);
				assert('active observation keeps live updates enabled', active.observationMode === 'active' && active.shouldKeepLiveUpdatesActive === true, details.active);
			} catch (error) {
				assert('generated analysis update executes the active-observation path', false, {
					name: error?.name,
					message: error?.message ?? String(error),
					stack: error?.stack,
				});
			}

			try {
				const idle = runtime.buildAnalysisUpdate({
					previousAnalysis: null,
					revision: {
						source: 'snapshot',
						analysis,
						snapshot: { status: 'hit', key: 'analysis:https://example.com' },
					},
					source: 'initial',
					resetLateMarkers: true,
				});
				details.idle = {
					observationMode: idle.observationMode,
					shouldKeepLiveUpdatesActive: idle.shouldKeepLiveUpdatesActive,
				};
				assert('generated analysis update executes the idle path', idle.analysis === analysis, details.idle);
				assert('idle analysis keeps live updates disabled', idle.observationMode === 'idle' && idle.shouldKeepLiveUpdatesActive === false, details.idle);
			} catch (error) {
				assert('generated analysis update executes the idle path', false, {
					name: error?.name,
					message: error?.message ?? String(error),
					stack: error?.stack,
				});
			}
		}

		const newErrors = (harness?.errors ?? []).slice(errorCountBeforeImport);
		assert('generated side-panel model completes without an unhandled error', newErrors.length === 0, newErrors);
		return {
			ok: assertions.every((assertion) => assertion.pass) && newErrors.length === 0,
			assertions,
			details,
			errors: newErrors,
		};
	})()`;
}

/** Reject generated eager preloads that cause extension cross-world or unused-resource warnings. */
function validateHtmlPreloads(outputRoot) {
	const htmlFiles = readdirSync(outputRoot)
		.filter((name) => name.endsWith('.html'))
		.sort();
	const violations = [];
	for (const htmlName of htmlFiles) {
		const html = readFileSync(join(outputRoot, htmlName), 'utf8');
		for (const match of html.matchAll(/<link\b[^>]*\brel=["'](?:modulepreload|preload)["'][^>]*>/gi)) {
			violations.push({ html: htmlName, tag: match[0] });
		}
	}
	return {
		ok: violations.length === 0,
		htmlFiles,
		violations,
	};
}

/** Resolve the generated module script referenced by one WXT HTML entrypoint. */
function findHtmlModule(outputRoot, htmlName) {
	const htmlPath = join(outputRoot, htmlName);
	if (!existsSync(htmlPath)) {
		throw new Error(`Generated HTML entrypoint not found: ${htmlPath}`);
	}
	const html = readFileSync(htmlPath, 'utf8');
	const match = html.match(/<script\b[^>]*\btype=["']module["'][^>]*\bsrc=["']([^"']+\.js)["'][^>]*>/i)
		?? html.match(/<script\b[^>]*\bsrc=["']([^"']+\.js)["'][^>]*\btype=["']module["'][^>]*>/i);
	if (!match?.[1]) {
		throw new Error(`Generated module script not found in ${htmlPath}`);
	}
	const modulePath = resolve(outputRoot, match[1].replace(/^\//, ''));
	if (!existsSync(modulePath)) {
		throw new Error(`Generated HTML module not found: ${modulePath}`);
	}
	return modulePath;
}

/** Embed one generated UI entry prefix through its root guard as a browser-importable data URL. */
function createStartupUrl(entryPath, rootErrorMessage) {
	const source = readFileSync(entryPath, 'utf8');
	const messageIndex = source.indexOf(rootErrorMessage);
	if (messageIndex < 0) {
		throw new Error(`Generated UI root guard not found in ${entryPath}`);
	}
	const end = source.indexOf(';', messageIndex);
	if (end < 0) {
		throw new Error(`Generated UI root guard is not terminated in ${entryPath}`);
	}
	return createModuleUrl(entryPath, source.slice(0, end + 1));
}

/** Execute one generated UI root-binding startup prefix in an isolated Chromium target. */
async function validateUiRoot(debuggingPort, moduleUrl, surface) {
	const target = await createPageTarget(debuggingPort);
	const cdp = await CdpClient.connect(target.webSocketDebuggerUrl);
	try {
		await cdp.call('Runtime.enable');
		await cdp.evaluate(createBrowserMockScript());
		return await cdp.evaluate(createUiProbe(moduleUrl, surface), {
			awaitPromise: true,
			returnByValue: true,
			timeoutMs: CDP_TIMEOUT_MS,
		});
	} finally {
		try {
			await cdp.call('Page.close', {}, 2_000);
		} catch {
			// The target may already be closing after a startup failure.
		}
		cdp.close();
	}
}

/** Create the Chromium expression that verifies a generated UI entry resolves the real DOM root. */
function createUiProbe(moduleUrl, surface) {
	return String.raw`(async () => {
		const harness = globalThis.__kaijuContentArtifactHarness;
		const errorsBefore = harness?.errors?.length ?? 0;
		document.body.innerHTML = '<div id="root"></div>';
		let importError;
		try {
			await import(${JSON.stringify(moduleUrl)});
		} catch (error) {
			importError = {
				name: error?.name,
				message: error?.message ?? String(error),
				stack: error?.stack,
			};
		}
		const errors = (harness?.errors ?? []).slice(errorsBefore);
		const rootBindingError = [importError, ...errors].filter(Boolean).find((error) =>
			/getElementById|before initialization|not a function/i.test(error?.message ?? '')
		);
		return {
			ok: !importError && !rootBindingError && Boolean(document.getElementById('root')),
			surface: ${JSON.stringify(surface)},
			imported: !importError,
			rootResolved: Boolean(document.getElementById('root')),
			importError,
			rootBindingError,
			errors,
		};
	})()`;
}

/** Ask Chromium for a fresh blank target so UI startup checks cannot contaminate each other. */
async function createPageTarget(port) {
	const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
	if (!response.ok) {
		throw new Error(`Chrome could not create a validation page target: ${response.status} ${response.statusText}`);
	}
	const target = await response.json();
	if (!target?.webSocketDebuggerUrl) {
		throw new Error('Chrome created a validation page without a DevTools WebSocket URL.');
	}
	return target;
}

/** Resolve the single generated app chunk that owns the analysis model validation seam. */
function findAppChunk(outputRoot) {
	const chunksDirectory = join(outputRoot, 'chunks');
	if (!existsSync(chunksDirectory)) {
		throw new Error(`Generated chunks directory not found: ${chunksDirectory}`);
	}
	const candidates = readdirSync(chunksDirectory)
		.filter((name) => /^app-.+\.js$/.test(name))
		.map((name) => join(chunksDirectory, name));
	if (candidates.length !== 1) {
		throw new Error(
			`Expected exactly one generated app chunk in ${chunksDirectory}; found ${candidates.length}: ${candidates.map((path) => path.split('/').at(-1)).join(', ') || 'none'}`,
		);
	}
	return candidates[0];
}

/** Rewrite a generated relative module graph into recursive data URLs for Chromium imports. */
function createModuleUrl(entryPath, entrySource) {
	const cache = new Map();
	const rootPath = resolve(entryPath);
	const build = (filePath, ancestry = []) => {
		const absolutePath = resolve(filePath);
		if (cache.has(absolutePath)) return cache.get(absolutePath);
		if (ancestry.includes(absolutePath)) {
			throw new Error(`Generated module graph contains a cycle: ${[...ancestry, absolutePath].join(' -> ')}`);
		}

		let source = absolutePath === rootPath && entrySource !== undefined
			? entrySource
			: readFileSync(absolutePath, 'utf8');
		const relativeImports = new Set(
			[...source.matchAll(/(["'`])(\.\/?[^"'`]+\.js)\1/g)].map((match) => match[2]),
		);
		for (const specifier of relativeImports) {
			const dependencyPath = resolve(dirname(absolutePath), specifier);
			if (!existsSync(dependencyPath)) {
				throw new Error(`Generated module import not found: ${specifier} from ${absolutePath}`);
			}
			const dependencyUrl = build(dependencyPath, [...ancestry, absolutePath]);
			source = source.split(specifier).join(dependencyUrl);
		}

		const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
		cache.set(absolutePath, moduleUrl);
		return moduleUrl;
	};
	return build(entryPath);
}

/** Small Chrome DevTools Protocol client used only by the generated-artifact release check. */
class CdpClient {
	static async connect(url) {
		const socket = new WebSocket(url);
		await new Promise((resolve, reject) => {
			const timeout = setTimeout(() => reject(new Error('Timed out connecting to Chrome DevTools Protocol.')), STARTUP_TIMEOUT_MS);
			socket.addEventListener('open', () => {
				clearTimeout(timeout);
				resolve();
			}, { once: true });
			socket.addEventListener('error', () => {
				clearTimeout(timeout);
				reject(new Error('Failed to connect to Chrome DevTools Protocol.'));
			}, { once: true });
		});
		return new CdpClient(socket);
	}

	constructor(socket) {
		this.socket = socket;
		this.nextId = 1;
		this.pending = new Map();
		this.listeners = new Map();
		socket.addEventListener('message', (event) => {
			const message = JSON.parse(String(event.data));
			if (message.id === undefined) {
				for (const listener of this.listeners.get(message.method) ?? []) {
					listener(message.params ?? {});
				}
				return;
			}
			const pending = this.pending.get(message.id);
			if (!pending) return;
			this.pending.delete(message.id);
			clearTimeout(pending.timeout);
			if (message.error) pending.reject(new Error(JSON.stringify(message.error)));
			else pending.resolve(message.result ?? {});
		});
	}

	on(method, listener) {
		const listeners = this.listeners.get(method) ?? new Set();
		listeners.add(listener);
		this.listeners.set(method, listeners);
		return () => listeners.delete(listener);
	}

	waitForEvent(method, timeoutMs = CDP_TIMEOUT_MS) {
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				remove();
				reject(new Error(`Chrome DevTools Protocol event timed out: ${method}`));
			}, timeoutMs);
			const remove = this.on(method, (params) => {
				clearTimeout(timeout);
				remove();
				resolve(params);
			});
		});
	}

	call(method, params = {}, timeoutMs = CDP_TIMEOUT_MS) {
		const id = this.nextId++;
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				this.pending.delete(id);
				reject(new Error(`Chrome DevTools Protocol timed out: ${method}`));
			}, timeoutMs);
			this.pending.set(id, { resolve, reject, timeout });
			this.socket.send(JSON.stringify({ id, method, params }));
		});
	}

	async evaluate(expression, options = {}) {
		const response = await this.call('Runtime.evaluate', {
			expression,
			awaitPromise: options.awaitPromise ?? false,
			returnByValue: options.returnByValue ?? true,
			userGesture: true,
		}, options.timeoutMs ?? CDP_TIMEOUT_MS);
		if (response.exceptionDetails) {
			const description = response.exceptionDetails.exception?.description
				?? response.exceptionDetails.text
				?? 'Generated script evaluation failed.';
			throw new Error(description);
		}
		return response.result?.value;
	}

	close() {
		for (const pending of this.pending.values()) {
			clearTimeout(pending.timeout);
			pending.reject(new Error('Chrome DevTools Protocol connection closed.'));
		}
		this.pending.clear();
		this.listeners.clear();
		this.socket.close();
	}
}

/** Wait until Chromium exposes its initial page target over the DevTools endpoint. */
async function waitForPage(port) {
	const deadline = Date.now() + STARTUP_TIMEOUT_MS;
	while (Date.now() < deadline) {
		try {
			const response = await fetch(`http://127.0.0.1:${port}/json/list`);
			if (response.ok) {
				const targets = await response.json();
				const page = targets.find((target) => target.type === 'page');
				if (page?.webSocketDebuggerUrl) return page;
			}
		} catch {
			// Chrome has not opened the debugging endpoint yet.
		}
		await delay(100);
	}
	throw new Error('Chrome did not expose a page target before the startup timeout.');
}

/** Reserve and release one loopback port before Chromium starts its DevTools server. */
async function reservePort() {
	const server = createServer();
	await new Promise((resolve, reject) => {
		server.once('error', reject);
		server.listen(0, '127.0.0.1', resolve);
	});
	const address = server.address();
	const port = typeof address === 'object' && address ? address.port : undefined;
	await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
	if (!port) throw new Error('Could not reserve a local TCP port.');
	return port;
}

/** Find the Chrome or Chromium executable from explicit environment values or common install paths. */
function findChrome() {
	for (const value of [process.env.CHROME_BIN, process.env.CHROMIUM_BIN]) {
		if (value && existsSync(value)) return value;
	}

	const candidates = process.platform === 'darwin'
		? [
			'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
			'/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
			'/Applications/Chromium.app/Contents/MacOS/Chromium',
		]
		: process.platform === 'win32'
			? [
				join(process.env.PROGRAMFILES ?? '', 'Google/Chrome/Application/chrome.exe'),
				join(process.env['PROGRAMFILES(X86)'] ?? '', 'Google/Chrome/Application/chrome.exe'),
				join(process.env.LOCALAPPDATA ?? '', 'Google/Chrome/Application/chrome.exe'),
			]
			: [];
	for (const candidate of candidates) {
		if (candidate && existsSync(candidate)) return candidate;
	}

	if (process.platform !== 'win32') {
		for (const executable of ['google-chrome-stable', 'google-chrome', 'chromium', 'chromium-browser']) {
			const resolved = findExecutable(executable);
			if (resolved) return resolved;
		}
	}
	return undefined;
}

/** Resolve one executable name through the host PATH. */
function findExecutable(executable) {
	const command = process.platform === 'win32' ? 'where' : 'which';
	const result = spawnSync(command, [executable], { encoding: 'utf8' });
	if (result.status !== 0) return undefined;
	return result.stdout.split(/\r?\n/).map((value) => value.trim()).find(Boolean);
}

/** Wait for a bounded runtime-settlement interval. */
function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

await main();
