import { access, readFile, readdir, stat } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { basename, join, relative, resolve, sep } from 'node:path';
import * as pages from './chrome/pages.mjs';

const DEFAULT_ARTIFACT_DIRECTORY = '.output/chrome-mv3';
const REGISTRY_DIRECTORY = 'kaiju-deepscope-registry';
const RUNTIME_REGISTRY = 'registry.runtime.json';
const KIND_PREFIX = 'registry.kind.';
const APP_VALIDATION_KEY = '__kaijuDeepScopeAppArtifactValidationV1';
const CONTENT_VALIDATION_KEY = '__kaijuDeepScopeContentArtifactValidationV1';

const options = parseArgs(process.argv.slice(2));
if (options.help) {
	console.log(`Usage: node tools/verify/chrome.mjs [options]\n\nOptions:\n  --artifact=<path>  Generated Chrome artifact directory.\n  --chrome=<path>    Chrome or Chromium executable.\n  --static-only      Skip the browser startup checks.\n  --help             Show this message.`);
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
		assertion(assertions, 'Chrome artifact declares the Chrome 144 minimum (native Temporal)', manifest.minimum_chrome_version === '144', {
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
				const runtime = await pages.validate({ artifactDirectory: input.artifactDirectory, chrome, manifest });
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

/** Verify the build emits the UI font files and legacy public paths stay absent. */
async function validateFonts(assertions, files) {
	const generated = files.filter((path) => /^assets\/[^/]+\.(?:woff2|ttf)$/u.test(path));
	const legacy = files.filter((path) => path.startsWith('fonts/american-kestrel/'));
	assertion(assertions, 'generated artifact contains bundled font assets', generated.length > 0, { generatedCount: generated.length });
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

	for (const page of pages.entries(manifest)) {
		const path = pages.normalizeArtifactPath(page.path);
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

/** Prefer an explicit executable or CHROME_BIN, then probe known platform paths without downloading a browser. */
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

/** List artifact files as sorted portable relative paths so output checks do not depend on traversal order. */
async function listFiles(root) {
	const files = [];
	/** Collect regular files below this artifact root while retaining their relative paths for later assertions. */
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

/** Reject a missing or non-directory artifact before attempting static or browser verification. */
async function assertDirectory(path) {
	const info = await stat(path);
	if (!info.isDirectory()) throw new TypeError(`Chrome artifact is not a directory: ${path}`);
}

/** Retain a named boolean result with its evidence for the final machine-readable report. */
function assertion(assertions, name, pass, evidence) {
	assertions.push({ name, pass: Boolean(pass), evidence });
}

/** Accept only the documented artifact, executable and mode flags; reject unknown options before launching work. */
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
