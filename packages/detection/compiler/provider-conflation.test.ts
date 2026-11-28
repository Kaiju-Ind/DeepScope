import { describe, expect, it } from 'vitest';
import { analyzeSite } from "../engine/index.ts";
import type { PageSignals } from "../types.ts";
import { technologies } from "@deepscope/registry";

/**
 * A framework never proves where a site is hosted, and a host never proves which
 * framework built the site. Self-hosted Next.js is common, and Vercel serves
 * every kind of site. Provider facts need provider-owned evidence: response
 * headers such as `x-vercel-id` or `server: Netlify`, provider hosts, DNS.
 */

function signals(overrides: Partial<PageSignals> = {}): PageSignals {
	return {
		url: 'https://shop.example.com/',
		hostname: 'shop.example.com',
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

function detectedIds(page: PageSignals): Set<string> {
	return new Set(analyzeSite(page, technologies).results.map((result) => result.technologyId));
}

const selfHostedNextPage = {
	headers: { 'x-powered-by': 'Next.js', server: 'nginx' },
	scripts: [
		'https://shop.example.com/_next/static/chunks/webpack-6a4f3c1b.js',
		'https://shop.example.com/_next/static/chunks/main-app-1f2e3d4c.js',
	],
	jsGlobals: { __NEXT_DATA__: { props: {}, page: '/', buildId: 'abc123' } },
} satisfies Partial<PageSignals>;

describe('provider and framework conflation', () => {
	it('does not report Vercel for a self-hosted Next.js page', () => {
		const ids = detectedIds(signals(selfHostedNextPage));
		expect(ids.has('next-js')).toBe(true);
		expect(ids.has('vercel')).toBe(false);
	});

	it('reports Vercel when Vercel response headers are present', () => {
		const ids = detectedIds(signals({
			...selfHostedNextPage,
			headers: { ...selfHostedNextPage.headers, server: 'Vercel', 'x-vercel-id': 'iad1::abcde-1700000000000-0123456789ab' },
		}));
		expect(ids.has('next-js')).toBe(true);
		expect(ids.has('vercel')).toBe(true);
	});

	it('does not report Next.js or React from Vercel headers alone', () => {
		const ids = detectedIds(signals({ headers: { server: 'Vercel', 'x-vercel-id': 'iad1::abcde', 'x-vercel-cache': 'HIT' } }));
		expect(ids.has('vercel')).toBe(true);
		expect(ids.has('next-js')).toBe(false);
		expect(ids.has('react')).toBe(false);
	});

	it('does not report a host from Gatsby Image CDN paths', () => {
		const ids = detectedIds(signals({
			dom: { selectors: { "img[srcset*='/_gatsby/image/'], source[srcset*='/_gatsby/image/']": true } },
		}));
		expect(ids.has('netlify')).toBe(false);
		expect(ids.has('vercel')).toBe(false);
	});

	it('keeps framework and library definitions from implying a hosting provider', () => {
		const byId = new Map(technologies.map((technology) => [technology.id, technology]));
		const frameworkCategories = new Set(['framework', 'ui-library', 'bundler', 'router', 'transpiler', 'state-management', 'component-library']);
		// Vendor-owned add-ons whose target is the vendor's platform, not a guessed host.
		const allowed = new Set([
			'hydrogen implies shopify',
			'bunny-fonts implies bunny',
			'weblocks requires webflow',
			'shopify-brochure-kit requires shopify',
			'wordpress-com-landpack requires wordpress-com',
		]);
		const weak: string[] = [];
		for (const technology of technologies) {
			if (!technology.categories.some((category) => frameworkCategories.has(category))) continue;
			if (technology.categories.includes('infrastructure-hosting')) continue;
			for (const relation of ['implies', 'requires'] as const) {
				for (const target of technology[relation] ?? []) {
					const edge = `${technology.id} ${relation} ${target}`;
					if (byId.get(target)?.categories.includes('infrastructure-hosting') && !allowed.has(edge)) weak.push(edge);
				}
			}
		}
		expect(weak).toEqual([]);
	});
});
