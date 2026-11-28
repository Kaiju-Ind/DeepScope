// Local pages with known technology markers, served over plain HTTP.
import { createServer } from 'node:http';
import { setTimeout as delay } from 'node:timers/promises';

const pages = {
	/** Serve stable WordPress and jQuery markers for the basic page-detection scenario. */
	'/wp.html': () => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="generator" content="WordPress 6.4.2">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="/wp-content/themes/twentytwentyfour/style.css">
<script src="/wp-includes/js/jquery/jquery.min.js?ver=3.7.1"></script>
<title>WordPress fixture</title></head><body><h1>WordPress fixture</h1></body></html>`,
	/** Serve a Docusaurus marker and a pushState control for same-document navigation checks. */
	'/spa.html': () => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="generator" content="Docusaurus v3.1.0"><title>SPA fixture</title></head>
<body><div id="__docusaurus">SPA fixture</div>
<script>window.go = (path) => history.pushState({}, '', path);</script></body></html>`,
	// Blocks the page's main thread for most of every second, like a heavy app
	// hydrating. Content-script messages share that thread.
	'/busy.html': () => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="generator" content="WordPress 6.4.2"><title>Busy fixture</title></head><body><h1>Busy</h1>
<script>setInterval(() => { const end = performance.now() + 900; while (performance.now() < end); }, 1000);</script></body></html>`,
	/** Serve a page with no declared technology marker for comparison and stale-result checks. */
	'/plain.html': () => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Plain</title></head><body>plain</body></html>`,
	// One generator each, so a result naming another page's generator is a
	// result published for the wrong document (see STRESS_FIXTURES).
	'/hugo.html': () => generatorPage('Hugo 0.120.4', 'Hugo fixture'),
	/** Serve only the Ghost generator marker so results from another fixture can be detected as stale. */
	'/ghost.html': () => generatorPage('Ghost 5.75', 'Ghost fixture'),
	/** Serve only the Drupal generator marker for document-identity checks. */
	'/drupal.html': () => generatorPage('Drupal 10', 'Drupal fixture'),
	/** Serve only the Joomla generator marker for document-identity checks. */
	'/joomla.html': () => generatorPage('Joomla! 4.4', 'Joomla fixture'),
	// A large DOM: tens of thousands of elements for the DOM scan to walk.
	'/huge.html': (url) => {
		const n = Math.min(200_000, Number(url.searchParams.get('n') ?? 40_000));
		const rows = [];
		for (let i = 0; i < n; i += 1) rows.push(`<div class="row r${i % 97}"><span data-i="${i}">item ${i}</span></div>`);
		return generatorPage('Eleventy v2.0.1', 'Huge fixture', rows.join(''));
	},
	// Replaces itself (location.replace) after `after` ms; the old document
	// never gets a history entry.
	'/replace.html': (url) => generatorPage('Hexo 7.0.0', 'Replace fixture', '<p>replacing</p>',
		`setTimeout(() => location.replace(${JSON.stringify(url.searchParams.get('to') ?? '/ghost.html')}), ${Number(url.searchParams.get('after') ?? 300)});`),
	// Swaps document.body and the generator after load, like a client-rendered
	// app replacing a server shell. Results may add TYPO3 CMS; Gatsby stays
	// because observations are sticky for one document.
	'/swap.html': (url) => generatorPage('Gatsby 5.12.0', 'Swap fixture', '<main>shell</main>',
		`setTimeout(() => {
			document.body.innerHTML = '<main id="swapped"><h1>Swapped</h1>' + '<p>x</p>'.repeat(200) + '</main>';
			const meta = document.createElement('meta'); meta.name = 'generator'; meta.content = 'TYPO3 CMS 12.4';
			document.head.append(meta);
		}, ${Number(url.searchParams.get('after') ?? 600)});`),
	// An SPA that rewrites its own view and URL a few times with pushState.
	'/spa-rewrite.html': (url) => generatorPage('Astro v4.5.0', 'SPA rewrite fixture', '<div id="app">view 0</div>',
		`let view = 0;
		const timer = setInterval(() => {
			view += 1;
			history.pushState({ view }, '', location.pathname + '?view=' + view);
			document.getElementById('app').innerHTML = '<section>' + '<p>view ' + view + '</p>'.repeat(50) + '</section>';
			if (view >= ${Number(url.searchParams.get('views') ?? 5)}) clearInterval(timer);
		}, ${Number(url.searchParams.get('every') ?? 600)});
		window.go = (path) => history.pushState({}, '', path);`),
};

/** Build controlled local fixture markup from harness-owned generator, title, body and optional script text. */
function generatorPage(generator, title, body = `<h1>${title}</h1>`, script = '') {
	return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="generator" content="${generator}"><title>${title}</title></head>
<body>${body}${script ? `<script>${script}</script>` : ''}</body></html>`;
}

/**
 * What the stress scenario expects on each fixture. `must` names must appear
 * on the fixture's own document; `allow` names may appear (late or sticky
 * changes). Any other fixture's marker on this document is a stale result.
 */
export const STRESS_FIXTURES = {
	'/wp.html': { must: ['WordPress', 'jQuery'] },
	'/busy.html': { must: ['WordPress'] },
	'/hugo.html': { must: ['Hugo'] },
	'/ghost.html': { must: ['Ghost'] },
	'/drupal.html': { must: ['Drupal'] },
	'/joomla.html': { must: ['Joomla'] },
	'/huge.html': { must: ['Eleventy'] },
	'/replace.html': { must: ['Hexo'] },
	'/swap.html': { must: ['Gatsby'], late: ['TYPO3 CMS'] },
	'/spa-rewrite.html': { must: ['Astro'] },
	'/plain.html': { must: [] },
};

/** Every fixture marker; a document may only show its own. */
export const STRESS_MARKERS = [...new Set(Object.values(STRESS_FIXTURES).flatMap((f) => [...f.must, ...(f.late ?? [])]))];

// The first fixtures send a PHP header; the stress fixtures send none.
const LEGACY_PHP = new Set(['/wp.html', '/spa.html', '/busy.html', '/plain.html']);

/**
 * Serve controlled pages on loopback and own every delayed response.
 *
 * The caller must await `close()`. It stops new connections, cancels fixture
 * delays and closes active HTTP connections before joining request handlers.
 * Listen failures reject acquisition instead of escaping as an unhandled event.
 */
export async function startFixtureServer(port = 0) {
	/** Closing the server also cancels timers owned by its delayed responses. */
	const lifetime = new AbortController();
	/** Join each request's final listener/timer cleanup before disposal completes. */
	const active = new Set();
	/** Repeated callers share the same disposal result. */
	let closing;
	/** Retain a server error until acquisition or disposal can report it. */
	let serverError;
	const server = createServer((request, response) => {
		const task = serve(request, response);
		active.add(task);
		// The request owner handles its response error; this continuation only
		// removes completed work from the server's disposal set.
		void task.finally(() => active.delete(task));
	});

	/** Complete one response or cancel its delay when the client or fixture closes. */
	async function serve(request, response) {
		const abandoned = new AbortController();
		const disconnected = () => abandoned.abort();
		response.once('close', disconnected);
		try {
			await respond(request, response, AbortSignal.any([lifetime.signal, abandoned.signal]));
		} catch (error) {
			if (!response.destroyed) response.destroy(error instanceof Error ? error : new Error(String(error)));
		} finally {
			response.off('close', disconnected);
		}
	}

	/** Render a fixture after its optional delay; cancellation must not write a late response. */
	async function respond(request, response, signal) {
		const url = new URL(request.url, 'http://localhost');
		const delayMs = Number(url.searchParams.get('delay') ?? 0);
		if (!Number.isInteger(delayMs) || delayMs < 0 || delayMs > 2_147_483_647) {
			response.writeHead(400);
			response.end('Fixture delay must be finite nonnegative milliseconds.');
			return;
		}
		if (delayMs) await delay(delayMs, undefined, { signal });
		signal.throwIfAborted();
		const page = pages[url.pathname];
		if (page) {
			response.writeHead(200, { 'content-type': 'text/html; charset=utf-8', ...(LEGACY_PHP.has(url.pathname) ? { 'x-powered-by': 'PHP/8.2.0' } : {}) });
			response.end(page(url));
			return;
		}
		if (url.pathname.endsWith('.css')) {
			response.writeHead(200, { 'content-type': 'text/css' });
			response.end('/* Theme Name: Twenty Twenty-Four */ body{color-scheme:light dark}');
			return;
		}
		if (url.pathname.endsWith('.js')) {
			response.writeHead(200, { 'content-type': 'text/javascript' });
			response.end('/*! jQuery v3.7.1 | (c) OpenJS Foundation */ window.jQuery = window.$ = function(){}; window.jQuery.fn = { jquery: "3.7.1" };');
			return;
		}
		response.writeHead(404);
		response.end();
	}

	await new Promise((resolve, reject) => {
		server.on('error', (error) => { serverError = error; reject(error); });
		server.listen(port, '127.0.0.1', resolve);
	});
	const origin = `http://127.0.0.1:${server.address().port}`;
	return {
		origin,
		/** Repeated disposal joins the same server and delayed-response cleanup. */
		close() {
			closing ??= (async () => {
				lifetime.abort(new Error('Fixture server is closing.'));
				const closed = new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
				server.closeAllConnections();
				await Promise.all([closed, ...active]);
				if (serverError) throw serverError;
			})();
			return closing;
		},
	};
}
