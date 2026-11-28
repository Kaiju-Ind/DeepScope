import type { PageSignals } from "@deepscope/detection/types";

/**
 * Deterministic page corpus for matcher golden tests.
 *
 * Every byte is generated here from a seeded generator and short hand-written
 * markers; no third-party source text is copied. The page mirrors a busy store
 * page (about 1,000 observations): 200 KB of HTML, 80 KB of text, several
 * 40 KB inline scripts, a stylesheet, hundreds of resource and request URLs,
 * common headers, meta tags and cookies, plus registry-sampled globals,
 * selectors and HTML probes so keyed routes are exercised too.
 */

/** Small LCG; fixed constants keep the corpus identical on every platform. */
export function rng(seed: number): () => number {
	let state = seed >>> 0;
	return () => {
		state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
		return state / 2 ** 32;
	};
}

/** Pick `count` distinct entries in seeded order. */
function sample<T>(items: readonly T[], count: number, seed: number): T[] {
	const next = rng(seed);
	const picked = new Set<number>();
	const limit = Math.min(count, items.length);
	while (picked.size < limit) picked.add(Math.floor(next() * items.length));
	return [...picked].map((index) => items[index]!);
}

/** Fingerprint-like markers planted in generated scripts so literal rules have real hits. */
const MARKERS = [
	'/*! jQuery v3.7.1 | (c) OpenJS Foundation and other contributors */',
	'jQuery.fn.jquery="3.7.1"', 'React.createElement', '__REACT_DEVTOOLS_GLOBAL_HOOK__', 'webpackChunk_N_E',
	'self.__next_f.push', '__NEXT_DATA__', 'window.Shopify=window.Shopify||{}', 'Shopify.theme={"name":"Dawn"}',
	'/wp-content/plugins/woocommerce/', 'gtag("config","G-ABC123")', 'fbq("init","123")', 'Vue.version="3.3.4"',
	'angular.module("app",[])', '_satellite.pageBottom()', 'hj("trigger","x")', 'Sentry.init({dsn:"x"})',
	'Stripe("pk_test_x")', 'dataLayer.push({event:"gtm.js"})', 'window.grafanaBootData={settings:{}}', 'altcha-widget',
	'ga("create","UA-1-1","auto")', 'Intercom("boot",{app_id:"x"})', 'window.__NUXT__={}', 'svelte-1abc',
	'Ember.VERSION="4.0.0"', 'Alpine.start()', 'htmx.process(document.body)', 'gsap.to(".x",{x:1})', 'new Swiper(".s")',
	'_.VERSION="4.17.21"', 'moment.version="2.29.4"', 'Modernizr.addTest', 'core-js/modules', 'Zone.__symbol__',
	'grecaptcha.ready', 'klaviyo.push', 'OneTrust.OnConsentChanged', 'OptanonWrapper', 'clarity("set")',
	'amplitude.getInstance()', 'mixpanel.init("x")', 'analytics.load("x")', 'posthog.init("x")', 'Turbo.session',
	'Livewire.start()', 'Stimulus.register', 'ko.applyBindings', 'Backbone.VERSION="1.4.1"', 'Handlebars.compile',
];

/** Plain identifiers mixed into generated code. */
const WORDS = [
	'value', 'items', 'cart', 'render', 'state', 'props', 'update', 'config', 'module', 'exports', 'require', 'push',
	'length', 'index', 'node', 'parent', 'child', 'event', 'handler', 'listener', 'promise', 'resolve', 'reject', 'then',
	'catch', 'fetch', 'json', 'data', 'price', 'product', 'variant', 'option', 'title', 'image', 'width', 'height',
];

/** Generate minified-looking script text of about `size` characters with planted markers. */
export function script(seed: number, size: number): string {
	const next = rng(seed);
	const pick = <T>(items: readonly T[]): T => items[Math.floor(next() * items.length)]!;
	const parts: string[] = [];
	let length = 0;
	while (length < size) {
		const roll = next();
		let part: string;
		if (roll < 0.03) part = `${pick(MARKERS)};`;
		else if (roll < 0.5) part = `var ${pick(WORDS)}${Math.floor(next() * 99)}=function(${pick(WORDS)},${pick(WORDS)}){return ${pick(WORDS)}.${pick(WORDS)}(${Math.floor(next() * 1000)})};`;
		else if (roll < 0.8) part = `${pick(WORDS)}.${pick(WORDS)}("${pick(WORDS)}-${Math.floor(next() * 1e6).toString(36)}",{${pick(WORDS)}:!0,${pick(WORDS)}:${Math.floor(next() * 50)}});`;
		else part = `if(${pick(WORDS)}&&${pick(WORDS)}.${pick(WORDS)}){${pick(WORDS)}=[${pick(WORDS)},"${pick(WORDS)}"].join("/")}`;
		parts.push(part);
		length += part.length;
	}
	return parts.join('').slice(0, size);
}

/** Generate stylesheet text with framework-like class names. */
function stylesheet(seed: number, size: number): string {
	const next = rng(seed);
	const names = ['btn', 'container', 'row', 'col-md-6', 'navbar', 'wp-block-group', 'woocommerce', 'shopify-section', 'swiper-slide', 'fa-solid', 'mui-root', 'chakra-ui'];
	const parts: string[] = ['/*! generated */', ':root{--bs-blue:#0d6efd}'];
	let length = 0;
	while (length < size) {
		const part = `.${names[Math.floor(next() * names.length)]}-${Math.floor(next() * 500)}{margin:${Math.floor(next() * 40)}px;color:#${Math.floor(next() * 0xffffff).toString(16).padStart(6, '0')}}`;
		parts.push(part);
		length += part.length;
	}
	return parts.join('\n').slice(0, size);
}

/** Registry keys a page could plausibly expose, sampled from the shards under test. */
export interface CorpusKeys {
	/** Keyed `jsGlobal` property names. */
	readonly globals: readonly string[];
	/** Keyed `dom` selectors. */
	readonly selectors: readonly string[];
	/** Keyed `htmlMatch` probe keys (`technologyId:ruleIndex`). */
	readonly probes: readonly string[];
}

const HOST = 'shop.example-store.test';

/** Build the deterministic page snapshot. */
export function page(keys: CorpusKeys): PageSignals {
	const scripts = [
		'https://www.googletagmanager.com/gtag/js?id=G-ABC123', 'https://www.googletagmanager.com/gtm.js?id=GTM-XYZ',
		'https://www.google-analytics.com/analytics.js', 'https://connect.facebook.net/en_US/fbevents.js',
		'https://code.jquery.com/jquery-3.7.1.min.js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
		'https://unpkg.com/react@18.2.0/umd/react.production.min.js', 'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
		'https://cdn.shopify.com/s/files/1/0001/theme.js?v=123', 'https://cdn.shopify.com/shopifycloud/shopify/assets/storefront/features-1.js',
		'https://static.hotjar.com/c/hotjar-123.js?sv=6', 'https://js.stripe.com/v3/', 'https://www.google.com/recaptcha/api.js',
		'https://cdn.segment.com/analytics.js/v1/abc/analytics.min.js', 'https://browser.sentry-cdn.com/7.80.0/bundle.min.js',
		'https://ajax.cloudflare.com/cdn-cgi/scripts/7d0fa10a/cloudflare-static/rocket-loader.min.js',
		`https://${HOST}/wp-content/plugins/woocommerce/assets/js/frontend/cart.min.js?ver=8.2.1`,
		`https://${HOST}/wp-includes/js/jquery/jquery.min.js?ver=3.7.1`,
		'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js', 'https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js',
		'https://js.hs-scripts.com/123456.js', 'https://widget.intercom.io/widget/abc123', 'https://cdn.optimizely.com/js/123.js',
		'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=ABC', 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js',
		'https://www.clarity.ms/tag/abc123', 'https://snap.licdn.com/li.lms-analytics/insight.min.js', 'https://s.pinimg.com/ct/core.js',
		'https://analytics.tiktok.com/i18n/pixel/events.js', 'https://cdn.amplitude.com/libs/amplitude-8.21.4-min.gz.js',
	];
	for (let index = 0; index < 30; index += 1) scripts.push(`https://${HOST}/_next/static/chunks/${index}-${(index * 7919).toString(16)}a1b2c3.js`);

	const stylesheets = [
		'https://fonts.googleapis.com/css2?family=Inter:wght@400;700', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
		'https://use.fontawesome.com/releases/v6.4.0/css/all.css', `https://${HOST}/wp-content/themes/astra/assets/css/minified/main.min.css?ver=4.1`,
		'https://cdn.shopify.com/s/files/1/0001/t/1/assets/base.css?v=1',
	];
	for (let index = 0; index < 10; index += 1) stylesheets.push(`https://${HOST}/_next/static/css/${index}abc${index}.css`);

	const hosts = ['cdn.shopify.com', 'fonts.gstatic.com', 'www.google-analytics.com', 'i.ytimg.com', 'images.ctfassets.net', 'res.cloudinary.com', 'cdn.sanity.io', HOST, 'static.cloudflareinsights.com', 'p.typekit.net'];
	const resources = Array.from({ length: 250 }, (_, index) => ({
		url: `https://${hosts[index % hosts.length]}/assets/${index}/file-${(index * 104729).toString(36)}.${['js', 'css', 'png', 'woff2', 'json'][index % 5]}`,
		initiatorType: ['script', 'link', 'img', 'css', 'fetch'][index % 5],
	}));
	const requests = resources.slice(0, 200).map((resource) => ({ url: resource.url.replace('/assets/', '/api/v2/'), method: 'GET', type: 'xmlhttprequest' }));

	const chunk = '<div class="product-card wp-block-group"><a href="/products/item"><img src="https://cdn.shopify.com/s/files/1/img.jpg" loading="lazy" alt="Item"></a><span class="price">$19.99</span><button class="btn btn-primary add-to-cart" data-product-id="123">Add to cart</button></div>\n';
	let html = `<!doctype html><html lang="en"><head><meta name="generator" content="WordPress 6.4.2"><link rel="stylesheet" href="${stylesheets[1]}">${scripts.slice(0, 20).map((src) => `<script src="${src}" async></script>`).join('')}</head><body class="home page-template-default woocommerce-page"><div id="__next" data-reactroot="">`;
	while (html.length < 190_000) html += chunk;
	html = `${html.slice(0, 199_000)}</div></body></html>`;
	const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 80_000);

	const globals = [...sample(keys.globals, 250, 7), 'jQuery', 'React', '__NEXT_DATA__', 'Shopify', 'gtag', 'dataLayer', 'ga', 'fbq', 'wp', 'Stripe'];
	const htmlMatches = Object.fromEntries(sample(keys.probes, 40, 13).map((key) => [key, { matchedValue: `probe ${key} 1.2.3`, captures: ['1.2.3'] }]));

	return {
		url: `https://${HOST}/collections/all?page=2`,
		hostname: HOST,
		html,
		htmlMatches,
		text,
		images: Array.from({ length: 60 }, (_, index) => `https://cdn.shopify.com/s/files/1/0001/products/img-${index}.jpg?v=1&width=640`),
		scripts,
		stylesheets,
		links: [
			{ rel: 'stylesheet', href: stylesheets[0]! }, { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
			{ rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }, { rel: 'preload', href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2' },
			{ rel: 'canonical', href: `https://${HOST}/collections/all` }, { rel: 'alternate', href: `https://${HOST}/fr`, hreflang: 'fr' },
			{ rel: 'https://api.w.org/', href: `https://${HOST}/wp-json/` }, { rel: 'manifest', href: '/manifest.json' },
			{ rel: 'dns-prefetch', href: '//cdn.shopify.com' }, { rel: 'modulepreload', href: '/_next/static/chunks/main.js' },
		],
		resources,
		requests,
		scriptContents: [
			script(1, 40_000), script(2, 40_000), script(3, 40_000), script(4, 30_000),
			'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date);gtag("config","G-ABC123");',
			'!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.queue.push(arguments)};}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","123");',
			`self.__next_f.push([1,"${'{\\"props\\":{\\"pageProps\\":{\\"items\\":[1,2,3]}}}'.repeat(400)}"]);`,
		],
		stylesheetContents: [stylesheet(5, 30_000)],
		cookies: Object.fromEntries(['_ga', '_gid', '_fbp', '_hjSessionUser_123', 'cart', '_shopify_y', '_shopify_s', 'wp-settings-1', 'PHPSESSID', '__cf_bm', 'OptanonConsent', 'ajs_anonymous_id', 'intercom-id-abc', '_clck', '_pin_unauth'].map((key) => [key, true as const])),
		headers: {
			'server': 'cloudflare', 'cf-ray': '8a1b2c3d4e5f-AMS', 'content-type': 'text/html; charset=utf-8', 'x-powered-by': 'Next.js',
			'x-shopify-stage': 'production', 'x-shopid': '123', 'strict-transport-security': 'max-age=31536000', 'vary': 'Accept-Encoding',
			'cache-control': 'private, no-store', 'x-frame-options': 'DENY', 'content-security-policy': "default-src 'self' https://*.shopify.com",
			'x-cache': 'HIT', 'via': '1.1 varnish', 'x-served-by': 'cache-ams21037-AMS', 'alt-svc': 'h3=":443"', 'set-cookie': 'redacted',
			'x-nextjs-cache': 'HIT', 'x-vercel-id': 'fra1::abc', 'report-to': '{"group":"cf-nel"}', 'nel': '{"report_to":"cf-nel"}',
			'X-Generator': 'Drupal 10 (https://www.drupal.org)', 'x-litespeed-cache': 'hit', 'x-varnish': '123 456',
		},
		meta: {
			'generator': ['WordPress 6.4.2', 'WooCommerce 8.2.1', 'Elementor 3.18.0'], 'viewport': ['width=device-width, initial-scale=1'],
			'description': ['The best store for things'], 'og:type': ['website'], 'og:site_name': ['Example Store'], 'twitter:card': ['summary_large_image'],
			'theme-color': ['#ffffff'], 'shopify-digital-wallet': ['/123/digital_wallets/dialog'], 'msapplication-TileColor': ['#da532c'],
			'google-site-verification': ['abc123'], 'robots': ['index, follow'], 'next-head-count': ['32'], 'Generator': ['Hugo 0.120.0'],
		},
		dom: { selectors: Object.fromEntries(sample(keys.selectors, 150, 11).map((selector) => [selector, true])) },
		storage: { localStorage: { ajs_user_id: true, _hjTLDTest: true, shopify_pay_redirect: true }, sessionStorage: { _hjSession: true } },
		jsGlobals: Object.fromEntries(globals.map((key, index) => [key, index % 3 === 0 ? '3.7.1' : index % 3 === 1 ? true : 'object'])),
		robotsTxt: `User-agent: *\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\nSitemap: https://${HOST}/sitemap.xml\n`,
		dnsRecords: {
			A: ['104.16.1.1'], CNAME: ['shops.myshopify.com'], MX: ['aspmx.l.google.com'], NS: ['ns1.cloudflare.com'],
			TXT: ['v=spf1 include:_spf.google.com include:mailgun.org ~all', 'google-site-verification=abc', 'MS=ms123'],
		},
		certIssuer: "Let's Encrypt",
		probeResults: [],
		collectedAt: 1_700_000_000_000,
	};
}
