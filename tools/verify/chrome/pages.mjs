import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { connect as connectCdp } from './cdp.mjs';
import { launch, StartupError } from './process.mjs';

/** Keep the existing settling interval before reading a generated page's root. */
const PAGE_SETTLE_MS = 750;

/**
 * Validate generated pages and retain every observed result through cleanup.
 *
 * A failed process launch owns its partial cleanup. A successful launch belongs
 * to this function, which appends a separate failure if closing it fails.
 */
export async function validate(input) {
	const results = [];
	let browser;
	try {
		browser = await launch(input);
		results.push({ name: 'Chrome DevTools endpoint started', pass: Boolean(browser.version.webSocketDebuggerUrl), evidence: { chrome: input.chrome } });
		const extensionId = extensionIdForPath(input.artifactDirectory);
		for (const page of entries(input.manifest)) {
			const url = `chrome-extension://${extensionId}/${normalizeArtifactPath(page.path)}`;
			results.push(await validatePage({ browser, page: page.name, url }));
		}
	} catch (error) {
		results.push({
			name: 'generated extension pages start in Chrome',
			pass: false,
			evidence: {
				error: error instanceof Error ? error.message : String(error),
				chrome: input.chrome,
				process: error instanceof StartupError ? error.diagnostics : browser?.diagnostics(),
			},
		});
	} finally {
		try {
			await browser?.close();
		} catch (error) {
			results.push({
				name: 'Chrome process and profile cleanup',
				pass: false,
				evidence: {
					error: error instanceof Error ? error.message : String(error),
					process: browser.diagnostics(),
				},
			});
		}
	}
	return results;
}

/** Validate one generated extension page through Chrome DevTools Protocol. */
async function validatePage({ browser, page, url }) {
	const target = await browser.request(`/json/new?${encodeURIComponent(url)}`, { method: 'PUT' });
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
		// connectCdp already unwraps the protocol envelope; evaluate returns one RemoteObject.
		const value = root.result?.value ?? {};
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

/** Select manifest-declared side-panel and options pages for direct artifact UI checks. */
export function entries(manifest) {
	const pages = [];
	if (manifest.side_panel?.default_path) pages.push({ name: 'side panel', path: manifest.side_panel.default_path });
	const options = manifest.options_ui?.page ?? manifest.options_page;
	if (options) pages.push({ name: 'options', path: options });
	return pages;
}

/** Derive Chromium's unpacked-extension ID from the normalized artifact path, preserving Windows path encoding rules. */
function extensionIdForPath(path) {
	let normalized = resolve(path);
	if (process.platform === 'win32' && /^[a-z]:/u.test(normalized)) normalized = `${normalized[0].toUpperCase()}${normalized.slice(1)}`;
	const pathBytes = Buffer.from(normalized, process.platform === 'win32' ? 'utf16le' : 'utf8');
	const bytes = createHash('sha256').update(pathBytes).digest().subarray(0, 16);
	let id = '';
	for (const byte of bytes) id += String.fromCharCode(97 + (byte >> 4), 97 + (byte & 15));
	return id;
}

/** Convert a manifest resource's root-relative spelling to a path inside the artifact directory. */
export function normalizeArtifactPath(path) {
	return path.replace(/^\/+/, '');
}

/** Provide the polling interval without blocking the JavaScript event loop. */
function delay(ms) {
	return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}
