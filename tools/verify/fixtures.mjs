// Local pages with known technology markers, served over plain HTTP.
import { createServer } from 'node:http';

const pages = {
	'/wp.html': () => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="generator" content="WordPress 6.4.2">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="/wp-content/themes/twentytwentyfour/style.css">
<script src="/wp-includes/js/jquery/jquery.min.js?ver=3.7.1"></script>
<title>WordPress fixture</title></head><body><h1>WordPress fixture</h1></body></html>`,
	'/spa.html': () => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="generator" content="Docusaurus v3.1.0"><title>SPA fixture</title></head>
<body><div id="__docusaurus">SPA fixture</div>
<script>window.go = (path) => history.pushState({}, '', path);</script></body></html>`,
	// Blocks the page's main thread for most of every second, like a heavy app
	// hydrating. Content-script messages share that thread.
	'/busy.html': () => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="generator" content="WordPress 6.4.2"><title>Busy fixture</title></head><body><h1>Busy</h1>
<script>setInterval(() => { const end = performance.now() + 900; while (performance.now() < end); }, 1000);</script></body></html>`,
	'/plain.html': () => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Plain</title></head><body>plain</body></html>`,
};

export function startFixtureServer(port = 0) {
	const server = createServer(async (request, response) => {
		const url = new URL(request.url, 'http://localhost');
		const delayMs = Number(url.searchParams.get('delay') ?? 0);
		if (delayMs) await new Promise((resolve) => setTimeout(resolve, delayMs));
		const page = pages[url.pathname];
		if (page) {
			response.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'x-powered-by': 'PHP/8.2.0' });
			response.end(page());
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
	});
	return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve({ server, origin: `http://127.0.0.1:${server.address().port}` })));
}
