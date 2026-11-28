import { describe, expect, it } from 'vitest';
import { analyzeSite } from "../engine/index.ts";
import type { PageSignals } from "../types.ts";
import { technologies } from "@deepscope/registry";

/**
 * SolidJS, SolidStart and Solid Router must stay distinguishable.
 *
 * `_$HY` and hydration keys come from Solid's server renderer and appear on any
 * Solid SSR page, so they prove SolidJS only. SolidStart needs its own markers
 * and implies SolidJS. Fixture strings are copied from solid-js 1.9.20 and
 * 2.0.3, @solidjs/web 2.0.3, @solidjs/start 1.5.1 and 2.2.3, and
 * @solidjs/router 0.15.4 and 2.0.1.
 */

function signals(overrides: Partial<PageSignals> = {}): PageSignals {
	return {
		url: 'https://app.example.com/',
		hostname: 'app.example.com',
		html: '',
		text: '',
		scripts: [],
		stylesheets: [],
		links: [],
		resources: [],
		requests: [],
		scriptContents: [],
		stylesheetContents: [],
		cookies: {},
		headers: {},
		meta: {},
		dom: { selectors: {} },
		storage: { localStorage: {}, sessionStorage: {} },
		jsGlobals: {},
		robotsTxt: '',
		dnsRecords: {},
		certIssuer: '',
		probeResults: [],
		collectedAt: 1,
		...overrides,
	};
}

function analyze(page: PageSignals) {
	const analysis = analyzeSite(page, technologies);
	return {
		ids: new Set(analysis.results.map((result) => result.technologyId)),
		result: (id: string) => analysis.results.find((result) => result.technologyId === id),
	};
}

const SOLID_2_HYDRATION_SCRIPT =
	'<script>window._$HY||(e=>{let t=e=>e&&e.hasAttribute&&(e.hasAttribute("_hk")?e:t(e.host&&e.host.nodeType?e.host:e.parentNode));["click","input"].forEach((o=>document.addEventListener(o,(o=>{if(!e.events)return;let n=o.composedPath&&o.composedPath()[0]||o.target,s=t(n);s&&!e.completed.has(s)&&e.events.push([s,o,n])}))))})(_$HY={events:[],completed:new WeakSet,r:{},fe(){}});</script><!--xs-->';
const SOLID_1_HYDRATION_SCRIPT =
	'<script>window._$HY||(e=>{let t=e=>e&&e.hasAttribute&&(e.hasAttribute("data-hk")?e:t(e.host&&e.host.nodeType?e.host:e.parentNode));["click", "input"].forEach((o=>document.addEventListener(o,(o=>{if(!e.events)return;let s=t(o.composedPath&&o.composedPath()[0]||o.target);s&&!e.completed.has(s)&&e.events.push([s,o])}))))})(window._$HY={events:[],completed:new WeakSet,r:{},fe(){}});</script>';

describe('Solid family detection', () => {
	it('reports SolidStart 2 and SolidJS for a SolidStart 2 page', () => {
		const { ids } = analyze(signals({
			html: `<!DOCTYPE html><html><head>${SOLID_2_HYDRATION_SCRIPT}</head><body><main _hk=0000><h1 _hk=00001>Hi</h1></main><script type="module" async data-start-url="/" src="/_build/assets/index-Bx1y2z3.js"></script></body></html>`,
			dom: { selectors: { 'script[type="module"][data-start-url]': true, '[_hk]': true } },
			jsGlobals: { _$HY: { events: [] } },
			scripts: ['https://app.example.com/_build/assets/index-Bx1y2z3.js'],
		}));
		expect(ids.has('solidstart')).toBe(true);
		expect(ids.has('solidjs')).toBe(true);
		expect(ids.has('solid')).toBe(false);
	});

	it('reports SolidJS through the SolidStart implication when only SolidStart markers are visible', () => {
		const { ids, result } = analyze(signals({
			dom: { selectors: { 'script[type="module"][data-start-url]': true } },
		}));
		expect(ids.has('solidstart')).toBe(true);
		expect(ids.has('solidjs')).toBe(true);
		expect(result('solidjs')?.inferred).toBe(true);
	});

	it('reports SolidStart 1 from the inlined Vinxi client manifest and server-function client', () => {
		const { ids } = analyze(signals({
			html: `<html><head>${SOLID_1_HYDRATION_SCRIPT}</head><body><div data-hk="0-0-0"></div><script>window.manifest = {"src/routes/index.tsx?pick=default&pick=$css":{"output":"/_build/assets/index-4d2f1a.js","assets":[]}}</script><script type="module" async src="/_build/assets/client-8f2e1c.js"></script></body></html>`,
			dom: { selectors: { '[data-hk]': true } },
			jsGlobals: { _$HY: { events: [] } },
			scriptContents: ['fetch(t+"/_server",{method:"POST",headers:{"X-Server-Id":encodeURIComponent(e),"X-Server-Instance":n}})'],
		}));
		expect(ids.has('solidstart')).toBe(true);
		expect(ids.has('solidjs')).toBe(true);
	});

	it('reports SolidStart from server-function request headers', () => {
		const { ids } = analyze(signals({
			requests: [{ url: 'https://app.example.com/_server', method: 'POST', requestHeaders: { 'x-server-id': 'src_lib_api_ts--getUser_query', 'x-server-instance': 'server-fn:0' } }],
		}));
		expect(ids.has('solidstart')).toBe(true);
	});

	it('reports SolidJS but not SolidStart for a plain Solid SSR page', () => {
		// Astro Solid islands, TanStack Start for Solid and Vike all emit the same bootstrap.
		const { ids } = analyze(signals({
			html: `<html><head>${SOLID_2_HYDRATION_SCRIPT}</head><body><astro-island><div _hk=0>Counter</div></astro-island></body></html>`,
			dom: { selectors: { '[_hk]': true } },
			jsGlobals: { _$HY: { events: [] } },
		}));
		expect(ids.has('solidjs')).toBe(true);
		expect(ids.has('solidstart')).toBe(false);
	});

	it('reports SolidJS from minified Solid 1 and Solid 2 runtime symbols', () => {
		for (const bundle of [
			'const P=Symbol("solid-proxy"),T=Symbol("solid-track");',
			'const L=Symbol.for("solid.LiveSource"),R=Symbol.for("solid.LiveResumeFrom");',
		]) {
			const { ids } = analyze(signals({ scriptContents: [bundle] }));
			expect(ids.has('solidjs'), bundle).toBe(true);
			expect(ids.has('solidstart'), bundle).toBe(false);
			expect(ids.has('solid-router'), bundle).toBe(false);
		}
	});

	it('reports Solid Router from its invariant message', () => {
		const { ids } = analyze(signals({
			scriptContents: [`const u=()=>c(l(R),"<A> and 'use' router primitives can be only used inside a Route.");`],
		}));
		expect(ids.has('solid-router')).toBe(true);
		expect(ids.has('solidjs')).toBe(true);
	});

	it('does not report SolidJS or Solid Router from API names other libraries share', () => {
		const { ids } = analyze(signals({
			scriptContents: [
				// React.lazy, Svelte onMount, Immer produce, Redux createStore and a generic dev flag.
				'const Page = lazy(() => import("./page.js")); onMount(() => { start(); }); onCleanup(() => { stop(); });',
				'const next = produce(state, draft => { draft.done = true }); const store = createStore({ todos: [] });',
				'if (DEV_EXPRESSION) { DEVCOMP(); } handleRouterError(err); createMemo({equals:!1});',
			],
		}));
		expect(ids.has('solidjs')).toBe(false);
		expect(ids.has('solid-router')).toBe(false);
		expect(ids.has('solidstart')).toBe(false);
	});
});
