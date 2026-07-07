import { describe, expect, it } from 'vitest';

import { analyzeSite } from '@/lib/detection/engine';
import { estimateBytes, normalizeMetaMap, truncate } from '@/lib/detection/normalizers';
import { collectCookieNames } from '@/lib/content/collect-page-signals';
import { technologies } from '@/data/technologies';
import { SOURCE_LIMITS } from '@/lib/detection/source-limits';
import type { PageSignals, TechnologyDefinition } from '@/lib/detection/types';
import { validatePageSignals } from '@/lib/detection/validate';
import { extractVersion } from '@/lib/detection/version';


const technologyDefinitions = technologies;
function createSignals(overrides: Partial<PageSignals> = {}): PageSignals {
	return {
		url: 'https://example.com',
		hostname: 'example.com',
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

function detectionIds(analysis: ReturnType<typeof analyzeSite>): Set<string> {
	return new Set(analysis.results.map((item) => item.technologyId));
}

function expectNoDetections(
	registry: TechnologyDefinition[],
	signals: Partial<PageSignals>,
	technologyIds: readonly string[],
): void {
	const ids = detectionIds(analyzeSite(createSignals(signals), registry));
	for (const id of technologyIds) {
		expect(ids.has(id), `${id} should not be detected`).toBe(false);
	}
}

function expectDetections(
	registry: TechnologyDefinition[],
	signals: Partial<PageSignals>,
	technologyIds: readonly string[],
): void {
	const ids = detectionIds(analyzeSite(createSignals(signals), registry));
	for (const id of technologyIds) {
		expect(ids.has(id), `${id} should be detected`).toBe(true);
	}
}

describe('detection helpers', () => {
	it('deduplicates and normalizes meta maps', () => {
		expect(
			normalizeMetaMap({
				'OG:Site_Name': ['Example App', 'Example App', ' Example App '],
			}),
		).toEqual({
			'og:site_name': ['Example App'],
		});
	});

	it('truncates strings to the requested bound', () => {
		expect(truncate('abcdef', 3)).toBe('abc');
		expect(truncate('abc', 3)).toBe('abc');
	});

	it('estimates signal size as a positive byte count', () => {
		expect(estimateBytes({ value: 'abc' })).toBeGreaterThan(0);
	});

	it('bounds normalized meta values', () => {
		const longValue = 'x'.repeat(SOURCE_LIMITS.metaValueChars + 50);
		expect(normalizeMetaMap({ generator: [longValue] }).generator[0]).toHaveLength(
			SOURCE_LIMITS.metaValueChars,
		);
	});

	it('rejects non-http signals', () => {
		expect(validatePageSignals(createSignals({ url: 'chrome://extensions' }))).toBe(
			'Invalid URL in page signals',
		);
	});

	it('accepts normal bounded page signals', () => {
		expect(
			validatePageSignals(
				createSignals({
					html: '<html></html>',
					scripts: ['https://cdn.example.com/app.js'],
				}),
			),
		).toBeNull();
	});

	it('rejects oversized meta signals', () => {
		expect(
			validatePageSignals(
				createSignals({
					meta: { generator: ['x'.repeat(SOURCE_LIMITS.metaValueChars + 1)] },
				}),
			),
		).toBe('Meta signal exceeded safe size bounds');
	});

	it('rejects cookie signals that contain raw values', () => {
		expect(
			validatePageSignals(
				createSignals({
					cookies: { session_id: 'super-secret' } as unknown as PageSignals['cookies'],
				}),
			),
		).toBe('Cookie signal must contain names only');
	});
});

describe('extractVersion', () => {
	it('applies capture-group templates', () => {
		const match = 'WordPress 6.5'.match(/WordPress\s*([\d.]+)/i);
		expect(match).toBeTruthy();
		expect(extractVersion({ source: 'match', group: 1 }, match!)).toBe('6.5');
	});
});

describe('analyzeSite', () => {
	it('detects WordPress from html and meta generator', () => {
		const analysis = analyzeSite(
			createSignals({
				html: '<meta name="generator" content="WordPress 6.5"><link href="/wp-content/theme.css">',
				meta: { generator: ['WordPress 6.5'] },
			}),
			technologyDefinitions,
		);

		const wordpress = analysis.results.find((item) => item.technologyId === 'wordpress');
		expect(wordpress).toBeDefined();
		expect(wordpress?.version).toBe('6.5');
		expect(wordpress?.confidence.value).toBe(100);
	});

	it('detects Shopify from CDN signals', () => {
		const analysis = analyzeSite(
			createSignals({
				html: '<script src="https://cdn.shopify.com/s/files/theme.js"></script>',
				scripts: ['https://cdn.shopify.com/s/files/theme.js'],
			}),
			technologyDefinitions,
		);

		expect(analysis.results.some((item) => item.technologyId === 'shopify')).toBe(true);
	});

	it('detects React from script sources', () => {
		const analysis = analyzeSite(
			createSignals({
				scripts: ['https://cdn.example.com/react-dom.production.min.js'],
			}),
			technologyDefinitions,
		);

		expect(analysis.results.some((item) => item.technologyId === 'react')).toBe(true);
	});

	it('detects Google Analytics from gtag script sources', () => {
		const analysis = analyzeSite(
			createSignals({
				scripts: ['https://www.googletagmanager.com/gtag/js?id=G-123'],
			}),
			technologyDefinitions,
		);

		expect(analysis.results.some((item) => item.technologyId === 'google-analytics')).toBe(true);
	});

	it('detects jsGlobal values collected by injected JS context', () => {
		const registry: TechnologyDefinition[] = [
			{
				id: 'global-powered',
				name: 'Global Powered',
				website: 'https://example.com/global',
				categories: ['unknown'],
				rules: [
					{
						kind: 'jsGlobal',
						property: 'ExampleRuntime.version',
						valuePattern: /^1\./,
					},
				],
			},
		];

		const analysis = analyzeSite(
			createSignals({
				jsGlobals: { 'ExampleRuntime.version': '1.2.3' },
			}),
			registry,
		);

		expect(analysis.results.map((item) => item.technologyId)).toEqual(['global-powered']);
	});

	it('detects inline script and stylesheet content signatures', () => {
		const registry: TechnologyDefinition[] = [
			{
				id: 'inline-script-tool',
				name: 'Inline Script Tool',
				website: 'https://example.com/script',
				categories: ['unknown'],
				rules: [{ kind: 'scriptContent', pattern: /__INLINE_SCRIPT_TOOL__/ }],
			},
			{
				id: 'inline-style-tool',
				name: 'Inline Style Tool',
				website: 'https://example.com/style',
				categories: ['unknown'],
				rules: [{ kind: 'stylesheetContent', pattern: /--inline-style-tool/ }],
			},
		];

		const analysis = analyzeSite(
			createSignals({
				scriptContents: ['window.__INLINE_SCRIPT_TOOL__ = true'],
				stylesheetContents: [':root { --inline-style-tool: 1; }'],
			}),
			registry,
		);

		expect(analysis.results.map((item) => item.technologyId)).toEqual([
			'inline-script-tool',
			'inline-style-tool',
		]);
	});

	it('collects and detects cookies by name without exposing values', () => {
		const cookies = collectCookieNames(
			'session_id=super-secret; wordpress_test_cookie=encoded%20value',
		);

		expect(cookies).toEqual({
			session_id: true,
			wordpress_test_cookie: true,
		});

		const analysis = analyzeSite(createSignals({ cookies }), technologyDefinitions);
		const wordpress = analysis.results.find((item) => item.technologyId === 'wordpress');

		expect(wordpress).toBeDefined();
		expect(wordpress?.evidence.some((item) => item.matchedValue === 'wordpress_test_cookie')).toBe(
			true,
		);
		expect(JSON.stringify(analysis)).not.toContain('super-secret');
		expect(JSON.stringify(analysis)).not.toContain('encoded value');
	});

	it('filters detections below the display threshold', () => {
		const registry: TechnologyDefinition[] = [
			{
				id: 'weak-signal',
				name: 'Weak Signal',
				website: 'https://example.com',
				categories: ['unknown'],
				rules: [
					{
						kind: 'html',
						pattern: /weak/i,
						confidence: 40,
					},
				],
			},
		];

		const analysis = analyzeSite(createSignals({ html: 'weak' }), registry);
		expect(analysis.results).toHaveLength(0);
	});

	it('truncates matched evidence values', () => {
		const longMatch = `marker-${'x'.repeat(300)}`;
		const registry: TechnologyDefinition[] = [
			{
				id: 'long-evidence',
				name: 'Long Evidence',
				website: 'https://example.com',
				categories: ['mobile'],
				rules: [
					{
						kind: 'html',
						pattern: /marker-x+/i,
						confidence: 100,
					},
				],
			},
		];

		const analysis = analyzeSite(createSignals({ html: longMatch }), registry);
		expect(analysis.results[0]?.evidence[0]?.matchedValue?.length).toBeLessThanOrEqual(
			SOURCE_LIMITS.evidenceValueChars,
		);
	});

	it('returns normalized analysis output instead of raw page signals', () => {
		const analysis = analyzeSite(createSignals({ html: '<html></html>' }), technologyDefinitions);
		expect('html' in analysis).toBe(false);
		expect('scripts' in analysis).toBe(false);
	});
});

type RelationshipTechnologyInput = {
	id: string;
	name?: string;
	marker?: string;
	confidence?: number;
	implies?: string[];
	requires?: string[];
	excludes?: string[];
	relationships?: TechnologyDefinition['relationships'];
};

function relationshipTechnology(input: RelationshipTechnologyInput): TechnologyDefinition {
	return {
		id: input.id,
		name: input.name ?? input.id,
		website: `https://example.com/${input.id}`,
		categories: ['unknown'],
		rules:
			input.marker === undefined
				? []
				: [
						{
							kind: 'text',
							pattern: new RegExp(input.marker, 'i'),
							confidence: input.confidence ?? 100,
						},
					],
		implies: input.implies,
		requires: input.requires,
		excludes: input.excludes,
		relationships: input.relationships,
	};
}

function resultIds(registry: TechnologyDefinition[], html: string): string[] {
	return analyzeSite(createSignals({ text: html }), registry).results.map(
		(result) => result.technologyId,
	);
}

describe('relationship resolver', () => {
	it('adds implied technologies with relationship evidence', () => {
		const registry = [
			relationshipTechnology({ id: 'nextjs', marker: 'next', implies: ['react'] }),
			relationshipTechnology({ id: 'react' }),
		];

		const analysis = analyzeSite(createSignals({ text: 'next' }), registry);
		const react = analysis.results.find((result) => result.technologyId === 'react');

		expect(analysis.results.map((result) => result.technologyId)).toEqual([
			'nextjs',
			'react',
		]);
		expect(react).toMatchObject({
			confidence: { value: 55, level: 'medium' },
			evidence: [{ ruleDescription: 'Implied by nextjs' }],
		});
	});

	it('expands chained implications to a fixed point', () => {
		const registry = [
			relationshipTechnology({ id: 'nextjs', marker: 'next', implies: ['react'] }),
			relationshipTechnology({ id: 'react', implies: ['javascript'] }),
			relationshipTechnology({ id: 'javascript', implies: ['runtime'] }),
			relationshipTechnology({ id: 'runtime' }),
		];

		expect(resultIds(registry, 'next')).toEqual([
			'nextjs',
			'react',
			'javascript',
			'runtime',
		]);
	});

	it('does not loop forever when implication edges cycle', () => {
		const registry = [
			relationshipTechnology({ id: 'alpha', marker: 'alpha', implies: ['beta'] }),
			relationshipTechnology({ id: 'beta', implies: ['alpha'] }),
		];

		expect(resultIds(registry, 'alpha')).toEqual(['alpha', 'beta']);
	});

	it('removes detections whose required technologies are absent', () => {
		const registry = [
			relationshipTechnology({
				id: 'woocommerce',
				marker: 'woo',
				requires: ['wordpress'],
			}),
			relationshipTechnology({ id: 'wordpress', marker: 'wp' }),
		];

		expect(resultIds(registry, 'woo')).toEqual([]);
	});

	it('prevents a technology from satisfying its own requirement through an implication', () => {
		const registry = [
			relationshipTechnology({
				id: 'element-ui',
				marker: 'el-button',
				implies: ['vue-js'],
				requires: ['vue-js'],
			}),
			relationshipTechnology({ id: 'vue-js' }),
		];

		expect(resultIds(registry, 'el-button')).toEqual([]);
	});

	it('keeps detections whose required technologies are present', () => {
		const registry = [
			relationshipTechnology({
				id: 'woocommerce',
				marker: 'woo',
				requires: ['wordpress'],
			}),
			relationshipTechnology({ id: 'wordpress', marker: 'wp' }),
		];

		expect(resultIds(registry, 'woo wp')).toEqual(['woocommerce', 'wordpress']);
	});

	it('removes lower-priority excluded technologies', () => {
		const registry = [
			relationshipTechnology({
				id: 'shopify',
				marker: 'shopify',
				confidence: 90,
				excludes: ['wordpress'],
			}),
			relationshipTechnology({ id: 'wordpress', marker: 'wordpress', confidence: 70 }),
		];

		expect(resultIds(registry, 'shopify wordpress')).toEqual(['shopify']);
	});

	it('keeps higher-confidence detections when they are excluded by weaker detections', () => {
		const registry = [
			relationshipTechnology({
				id: 'shopify',
				marker: 'shopify',
				confidence: 70,
				excludes: ['wordpress'],
			}),
			relationshipTechnology({ id: 'wordpress', marker: 'wordpress', confidence: 90 }),
		];

		expect(resultIds(registry, 'shopify wordpress')).toEqual(['wordpress']);
	});

	it('keeps direct detections over implied detections during exclusion conflicts', () => {
		const registry = [
			relationshipTechnology({ id: 'nextjs', marker: 'next', implies: ['react'] }),
			relationshipTechnology({ id: 'react' }),
			relationshipTechnology({
				id: 'other-framework',
				marker: 'other',
				excludes: ['react'],
			}),
		];

		expect(resultIds(registry, 'next other')).toEqual(['nextjs', 'other-framework']);
	});

	it('uses registry order as a stable final tie breaker', () => {
		const registry = [
			relationshipTechnology({ id: 'beta', marker: 'beta' }),
			relationshipTechnology({ id: 'alpha', marker: 'alpha' }),
		];

		expect(resultIds(registry, 'alpha beta')).toEqual(['beta', 'alpha']);
	});

	it('does not use implied technologies to satisfy direct requirements', () => {
		const registry = [
			relationshipTechnology({ id: 'nextjs', marker: 'next', implies: ['react'] }),
			relationshipTechnology({ id: 'plugin', marker: 'plugin', requires: ['react'] }),
			relationshipTechnology({ id: 'react' }),
		];

		expect(resultIds(registry, 'next plugin')).toEqual(['nextjs', 'react']);
	});

	it('removes implied technologies whose requirements are absent', () => {
		const registry = [
			relationshipTechnology({ id: 'platform', marker: 'platform', implies: ['addon'] }),
			relationshipTechnology({ id: 'addon', requires: ['runtime'] }),
			relationshipTechnology({ id: 'runtime', marker: 'runtime' }),
		];

		expect(resultIds(registry, 'platform')).toEqual(['platform']);
	});

	it('prunes chained requirements to a fixed point', () => {
		const registry = [
			relationshipTechnology({ id: 'addon', marker: 'addon', requires: ['platform'] }),
			relationshipTechnology({
				id: 'platform',
				marker: 'platform',
				requires: ['runtime'],
			}),
			relationshipTechnology({ id: 'runtime', marker: 'runtime' }),
		];

		expect(resultIds(registry, 'addon platform')).toEqual([]);
	});

	it('keeps requirement cycles when every member is detected', () => {
		const registry = [
			relationshipTechnology({ id: 'alpha', marker: 'alpha', requires: ['beta'] }),
			relationshipTechnology({ id: 'beta', marker: 'beta', requires: ['alpha'] }),
		];

		expect(resultIds(registry, 'alpha beta')).toEqual(['alpha', 'beta']);
	});

	it('removes requirement cycles when any member is missing', () => {
		const registry = [
			relationshipTechnology({ id: 'alpha', marker: 'alpha', requires: ['beta'] }),
			relationshipTechnology({ id: 'beta', marker: 'beta', requires: ['alpha'] }),
		];

		expect(resultIds(registry, 'alpha')).toEqual([]);
	});

	it('uses registry order to resolve mutual exclusions with equal confidence', () => {
		const registry = [
			relationshipTechnology({ id: 'alpha', marker: 'alpha', excludes: ['beta'] }),
			relationshipTechnology({ id: 'beta', marker: 'beta', excludes: ['alpha'] }),
		];

		expect(resultIds(registry, 'alpha beta')).toEqual(['alpha']);
	});

	it('ignores unknown implied targets without creating reported technologies', () => {
		const registry = [
			relationshipTechnology({ id: 'alpha', marker: 'alpha', implies: ['missing'] }),
		];

		expect(resultIds(registry, 'alpha')).toEqual(['alpha']);
	});

	it('prunes detections that require unknown targets', () => {
		const registry = [
			relationshipTechnology({ id: 'alpha', marker: 'alpha', requires: ['missing'] }),
		];

		expect(resultIds(registry, 'alpha')).toEqual([]);
	});

	it('ignores unknown excluded targets', () => {
		const registry = [
			relationshipTechnology({ id: 'alpha', marker: 'alpha', excludes: ['missing'] }),
		];

		expect(resultIds(registry, 'alpha')).toEqual(['alpha']);
	});

	it('does not downgrade direct detections that are also implied', () => {
		const registry = [
			relationshipTechnology({ id: 'nextjs', marker: 'next', implies: ['react'] }),
			relationshipTechnology({ id: 'react', marker: 'react', confidence: 95 }),
		];

		const analysis = analyzeSite(createSignals({ text: 'next react' }), registry);
		const react = analysis.results.find((result) => result.technologyId === 'react');

		expect(resultIds(registry, 'next react')).toEqual(['nextjs', 'react']);
		expect(react?.confidence.value).toBe(95);
		expect(react?.evidence[0]?.ruleDescription).not.toBe('Implied by nextjs');
	});

	it('treats self-implies relationships as no-ops', () => {
		const registry = [
			relationshipTechnology({ id: 'alpha', marker: 'alpha', implies: ['alpha'] }),
		];

		expect(resultIds(registry, 'alpha')).toEqual(['alpha']);
	});

	it('handles self-excludes relationships without looping', () => {
		const registry = [
			relationshipTechnology({ id: 'alpha', marker: 'alpha', excludes: ['alpha'] }),
		];

		expect(resultIds(registry, 'alpha')).toEqual([]);
	});

	it('re-prunes dependents after exclusions remove their requirements', () => {
		const registry = [
			relationshipTechnology({
				id: 'exclusive-platform',
				marker: 'exclusive',
				confidence: 100,
				excludes: ['platform'],
			}),
			relationshipTechnology({ id: 'platform', marker: 'platform', confidence: 80 }),
			relationshipTechnology({ id: 'addon', marker: 'addon', requires: ['platform'] }),
		];

		expect(resultIds(registry, 'exclusive platform addon')).toEqual(['exclusive-platform']);
	});

	it('removes implied technologies orphaned by exclusion of their source', () => {
		const registry = [
			relationshipTechnology({
				id: 'exclusive-platform',
				marker: 'exclusive',
				excludes: ['platform'],
			}),
			relationshipTechnology({
				id: 'platform',
				marker: 'platform',
				confidence: 80,
				implies: ['addon'],
			}),
			relationshipTechnology({ id: 'addon' }),
		];

		expect(resultIds(registry, 'exclusive platform')).toEqual([
			'exclusive-platform',
		]);
	});

	it('applies exclusions introduced by late implication expansion', () => {
		const registry = [
			relationshipTechnology({
				id: 'platform',
				marker: 'platform',
				implies: ['plugin', 'legacy-runtime'],
			}),
			relationshipTechnology({ id: 'plugin', implies: ['modern-runtime'] }),
			relationshipTechnology({
				id: 'modern-runtime',
				excludes: ['legacy-runtime'],
			}),
			relationshipTechnology({ id: 'legacy-runtime' }),
		];

		expect(resultIds(registry, 'platform')).toEqual([
			'platform',
			'plugin',
			'modern-runtime',
		]);
	});
});


describe('false-positive regressions', () => {
	it('does not display product-like technologies from HTML-only evidence', () => {
		const registry: TechnologyDefinition[] = [
			{
				id: 'html-only-product',
				name: 'HTML Only Product',
				website: 'https://example.com/html-only-product',
				categories: ['platform-cms-builder'],
				rules: [{ kind: 'html', pattern: /HTML_ONLY_PRODUCT/, confidence: 100 }],
			},
			{
				id: 'html-with-structured-support',
				name: 'HTML With Structured Support',
				website: 'https://example.com/html-with-structured-support',
				categories: ['platform-cms-builder'],
				rules: [
					{ kind: 'html', pattern: /HTML_WITH_STRUCTURED_SUPPORT/, confidence: 100 },
					{ kind: 'meta', key: 'generator', valuePattern: /Structured Support/, confidence: 80 },
				],
			},
		];

		expectNoDetections(
			registry,
			{ html: '<div>HTML_ONLY_PRODUCT</div>' },
			['html-only-product'],
		);
		expectDetections(
			registry,
			{
				html: '<div>HTML_WITH_STRUCTURED_SUPPORT</div>',
				meta: { generator: ['Structured Support'] },
			},
			['html-with-structured-support'],
		);
	});

	it('does not detect Element UI or Vue.js from Vercel-style class names containing el-', () => {
		const analysis = analyzeSite(
			createSignals({
				html: '<a class="vercel-logo text-label-12">Vercel</a>',
				dom: {
					selectors: {
						".el-button, .el-dialog, .el-form-item, .el-select, .el-select-dropdown, .el-table, .el-pagination, .el-message, .el-notification, .el-popover": false,
					},
				},
			}),
			technologyDefinitions,
		);

		expect(analysis.results.some((item) => item.technologyId === 'element-ui')).toBe(false);
		expect(analysis.results.some((item) => item.technologyId === 'vue-js')).toBe(false);
	});

	it('does not report Web Components from the internal Next.js route announcer element', () => {
		const analysis = analyzeSite(
			createSignals({
				html: '<next-route-announcer style="position:absolute"></next-route-announcer>',
			}),
			technologyDefinitions,
		);

		expect(analysis.results.some((item) => item.technologyId === 'web-components')).toBe(false);
	});

	it('does not report Tailwind CSS from HTML-only utility-shaped classes', () => {
		const analysis = analyzeSite(
			createSignals({
				html: '<a class="fixed z-[1000] flex items-center focus:opacity-100">Skip</a>',
			}),
			technologyDefinitions,
		);

		expect(analysis.results.some((item) => item.technologyId === 'tailwind-css')).toBe(false);
	});

	it('does not report Priority Hints as a displayed technology from fetchpriority alone', () => {
		const analysis = analyzeSite(
			createSignals({
				dom: {
					selectors: {
						'iframe[fetchpriority], img[fetchpriority], script[fetchpriority], link[fetchpriority]': true,
					},
				},
				html: '<link rel="preload" href="/asset.css" as="style" fetchpriority="high">',
			}),
			technologyDefinitions,
		);

		expect(analysis.results.some((item) => item.technologyId === 'priority-hints')).toBe(false);
	});

	it('does not report a full PWA from a manifest link alone', () => {
		const analysis = analyzeSite(
			createSignals({
				dom: { selectors: { "link[rel='manifest']": true } },
				links: [{ rel: 'manifest', href: '/manifest.webmanifest' }],
			}),
			technologyDefinitions,
		);

		expect(analysis.results.some((item) => item.technologyId === 'pwa')).toBe(false);
	});

	it('detects HSTS only from a Strict-Transport-Security response header', () => {
		const httpsOnly = analyzeSite(
			createSignals({ url: 'https://example.com', hostname: 'example.com' }),
			technologyDefinitions,
		);
		const withHeader = analyzeSite(
			createSignals({
				url: 'https://example.com',
				hostname: 'example.com',
				headers: { 'strict-transport-security': 'max-age=31536000; includeSubDomains' },
			}),
			technologyDefinitions,
		);

		expect(httpsOnly.results.some((item) => item.technologyId === 'hsts')).toBe(false);
		expect(withHeader.results.some((item) => item.technologyId === 'hsts')).toBe(true);
	});

	it('reports preloaded TLDs separately from response-header HSTS', () => {
		const analysis = analyzeSite(
			createSignals({ url: 'https://example.dev', hostname: 'example.dev' }),
			technologyDefinitions,
		);

		expect(analysis.results.some((item) => item.technologyId === 'hsts')).toBe(false);
		expect(analysis.results.some((item) => item.technologyId === 'hsts-preloaded-tld')).toBe(true);
	});
});

describe('upgraded detection surfaces and graph relationships', () => {
	it('detects passive resource URL and link-tag rule kinds at runtime', () => {
		const registry: TechnologyDefinition[] = [
			{
				id: 'pagefind',
				name: 'Pagefind',
				website: 'https://pagefind.app',
				categories: ['search'],
				rules: [
					{
						kind: 'resourceUrl',
						pattern: /\/pagefind\/pagefind\.js/i,
						confidence: 80,
					},
				],
			},
			{
				id: 'opensearch',
				name: 'OpenSearch',
				website: 'https://example.com/opensearch',
				categories: ['search'],
				rules: [
					{
						kind: 'link',
						rel: 'search',
						typePattern: /opensearchdescription\+xml/i,
						confidence: 80,
					},
				],
			},
		];

		const analysis = analyzeSite(
			createSignals({
				resources: [{ url: 'https://example.com/pagefind/pagefind.js' }],
				links: [
					{
						rel: 'search',
						href: 'https://example.com/opensearch.xml',
						type: 'application/opensearchdescription+xml',
					},
				],
			}),
			registry,
		);

		expect(analysis.results.map((result) => result.technologyId)).toEqual([
			'pagefind',
			'opensearch',
		]);
	});

	it('matches extended detection kinds when their signals are populated', () => {
		const registry: TechnologyDefinition[] = [
			{
				id: 'text-only',
				name: 'Text Only',
				website: 'https://example.com/text',
				categories: ['unknown'],
				rules: [{ kind: 'text', pattern: /visible technology marker/i, confidence: 90 }],
			},
			{
				id: 'dns-only',
				name: 'DNS Only',
				website: 'https://example.com/dns',
				categories: ['unknown'],
				rules: [{ kind: 'dns', recordType: 'TXT', valuePattern: /dns-verification/i, confidence: 90 }],
			},
			{
				id: 'cert-only',
				name: 'Cert Only',
				website: 'https://example.com/cert',
				categories: ['unknown'],
				rules: [{ kind: 'certIssuer', pattern: /example ca/i, confidence: 90 }],
			},
			{
				id: 'probe-only',
				name: 'Probe Only',
				website: 'https://example.com/probe',
				categories: ['unknown'],
				rules: [{ kind: 'probe', pattern: /probe marker/i, confidence: 90 }],
			},
			{
				id: 'request-header-only',
				name: 'Request Header Only',
				website: 'https://example.com/request-header',
				categories: ['unknown'],
				rules: [
					{
						kind: 'requestHeader',
						key: 'x-powered-by-request',
						valuePattern: /request marker/i,
						confidence: 90,
					},
				],
			},
		];

		const analysis = analyzeSite(
			createSignals({
				text: 'A visible technology marker on the page.',
				dnsRecords: { TXT: ['dns-verification=abc123'] },
				certIssuer: 'Example CA',
				probeResults: ['probe marker response'],
				requests: [
					{
						url: 'https://example.com/api',
						requestHeaders: { 'x-powered-by-request': 'request marker' },
					},
				],
			}),
			registry,
		);

		expect(analysis.results.map((item) => item.technologyId)).toEqual([
			'text-only',
			'dns-only',
			'cert-only',
			'probe-only',
			'request-header-only',
		]);
	});

	it('detects standard metadata, resource hints, and modern image assets', () => {
		const analysis = analyzeSite(
			createSignals({
				html: '<html lang="en-CA"><head><meta property="og:image" content="/social.avif"></head><body><picture><source srcset="/hero.avif" type="image/avif"></picture></body></html>',
				meta: {
					'content-language': ['en-CA'],
					referrer: ['strict-origin-when-cross-origin'],
					'content-security-policy': ["default-src 'self'; script-src 'self'"],
				},
				links: [
					{ rel: 'prefetch', href: 'https://example.com/next-page' },
					{ rel: 'prerender', href: 'https://example.com/checkout' },
					{ rel: 'icon', href: 'https://example.com/favicon.avif', type: 'image/avif' },
				],
				resources: [
					{ url: 'https://example.com/assets/hero.avif', initiatorType: 'img' },
				],
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		expect(ids.has('language-declaration')).toBe(true);
		expect(ids.has('referrer-policy-meta')).toBe(true);
		expect(ids.has('meta-content-security-policy')).toBe(true);
		expect(ids.has('resource-prefetch')).toBe(true);
		expect(ids.has('prerender-hint')).toBe(true);
		expect(ids.has('avif-image-format')).toBe(true);
	});

	it('detects source-backed browser metadata and modern web platform features', () => {
		const analysis = analyzeSite(
			createSignals({
				html: '<html><head><meta property="al:ios:url" content="example://article/1"><script type="importmap">{"imports":{}}</script><script type="speculationrules">{"prefetch":[]}</script><style>@media (prefers-color-scheme: dark){:root{color:oklch(65% 0.2 30);background:color-mix(in oklab, black, white);font-variation-settings:"wght" 650}}</style><link rel="preload" href="/fonts/inter.woff2" as="font"></head><body><img src="/hero.jpg" loading="lazy"><dialog open>Confirm</dialog><button popovertarget="menu">Open</button><div id="menu" popover></div></body></html>',
				meta: {
					robots: ['noindex, nofollow'],
					googlebot: ['max-snippet:-1'],
					'application-name': ['Example App'],
				},
				scriptContents: [
					'document.querySelector("#menu")?.showPopover();',
				],
				stylesheetContents: [
					'@media (prefers-color-scheme: dark) { .x { color: oklab(60% 0.1 0.1); color: color-mix(in srgb, red, blue); font-optical-sizing: auto; } }',
				],
				resources: [
					{ url: 'https://example.com/fonts/inter.woff2', initiatorType: 'font' },
				],
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		expect(ids.has('robots-meta')).toBe(true);
		expect(ids.has('application-name-meta')).toBe(true);
		expect(ids.has('app-links-meta')).toBe(true);
		expect(ids.has('native-lazy-loading')).toBe(true);
		expect(ids.has('import-maps')).toBe(true);
		expect(ids.has('speculation-rules')).toBe(true);
		expect(ids.has('popover-api')).toBe(true);
		expect(ids.has('dialog-element')).toBe(true);
		expect(ids.has('woff2-font-format')).toBe(true);
		expect(ids.has('variable-fonts')).toBe(true);
		expect(ids.has('css-color-mix')).toBe(true);
		expect(ids.has('perceptual-color-spaces')).toBe(true);
		expect(ids.has('prefers-color-scheme')).toBe(true);
	});

	it('does not detect DNS rules when no DNS records were collected', () => {
		const registry: TechnologyDefinition[] = [
			{
				id: 'dns-only-cdn',
				name: 'DNS Only CDN',
				website: 'https://example.com/cdn',
				categories: ['infrastructure-hosting'],
				rules: [
					{
						kind: 'dns',
						recordType: 'NS',
						valuePattern: /example-cdn/i,
						confidence: 90,
					},
				],
			},
		];

		expect(analyzeSite(createSignals(), registry).results).toEqual([]);
	});

	it('does not use taxonomy categories as runtime graph evidence', () => {
		const registry = [
			relationshipTechnology({
				id: 'shipping-carrier',
				marker: 'carrier',
			}),
		];

		expect(resultIds(registry, 'carrier')).toEqual(['shipping-carrier']);
	});

	it('detects robots rules when robots.txt content is present', () => {
		const registry: TechnologyDefinition[] = [
			{
				id: 'robots-only',
				name: 'Robots Only',
				website: 'https://example.com/robots',
				categories: ['unknown'],
				rules: [
					{
						kind: 'robots',
						pattern: /RobotsOnly/i,
						confidence: 90,
					},
				],
			},
		];

		const analysis = analyzeSite(createSignals({ robotsTxt: 'User-agent: *\nDisallow: /RobotsOnly' }), registry);

		expect(analysis.results.map((item) => item.technologyId)).toEqual(['robots-only']);
	});
});


describe('payload-ready collector promotions', () => {
	it('does not detect Sphinx technologies from generic visible version numbers', () => {
		const analysis = analyzeSite(
			createSignals({
				url: 'https://wordpress.com/',
				hostname: 'wordpress.com',
				text: 'WordPress.com has a 4.5 rating from customers and supports modern publishing workflows.',
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		expect(ids.has('sphinx')).toBe(false);
		expect(ids.has('pydata-sphinx-theme')).toBe(false);
	});

	it('still detects Sphinx technologies from explicit visible generator text', () => {
		const analysis = analyzeSite(
			createSignals({
				text: 'Created using Sphinx 7.2.6. PyData Sphinx Theme 0.15.4',
			}),
			technologyDefinitions,
		);

		const sphinx = analysis.results.find((item) => item.technologyId === 'sphinx');
		const pydataSphinxTheme = analysis.results.find((item) => item.technologyId === 'pydata-sphinx-theme');

		expect(sphinx?.version).toBe('7.2.6');
		expect(pydataSphinxTheme?.version).toBe('0.15.4');
	});

	it('does not infer Wagtail or its server stack from generic image paths', () => {
		const analysis = analyzeSite(
			createSignals({
				url: 'https://google.com/',
				hostname: 'google.com',
				html: '<img src="/images/logo.png"><meta property="og:image" content="/images/search.png">',
				text: 'Search images, maps, news, and videos.',
				dom: {
					selectors: {
						"[style*='images/']": true,
						"img[src*='images/']": true,
						"img[srcset*='images/'], source[srcset*='images/']": true,
						"meta[content*='images/']": true,
						"video[poster*='images/']": true,
					},
				},
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		expect(ids.has('wagtail')).toBe(false);
		expect(ids.has('django')).toBe(false);
		expect(ids.has('python')).toBe(false);
	});

	it('does not detect requested platform families from loose mentions or generic paths', () => {
		const analysis = analyzeSite(
			createSignals({
				url: 'https://example.com/',
				hostname: 'example.com',
				html: '<section class="wp-card react-section">Cloudinary upload notes, Shopify pricing, WooCommerce guide, and Vercel status.</section>',
				scripts: [
					'https://cdn.example.com/integrations/woocommerce.js?ver=1.2.3',
					'https://cdn.example.com/assets/reactive-menu.js',
				],
				resources: [
					{ url: 'https://cdn.example.com/image/upload/banner.jpg', initiatorType: 'img' },
					{ url: 'https://api.shopify.com/docs/reference.json', initiatorType: 'fetch' },
					{ url: 'https://example.com/va/script.js', initiatorType: 'script' },
				],
				headers: { server: 'not-now', 'x-powered-by': 'Wordpressible' },
				jsGlobals: { va: {}, si: {}, Shopify: {} },
				dom: {
					selectors: {
						"div[id='react-root'], div[id^='react-root-']": false,
						"[data-reactroot], [data-reactid], [data-react-helmet], [data-react-checksum]": false,
					},
				},
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		for (const id of [
			'react',
			'vercel',
			'vercel-analytics',
			'vercel-speed-insights',
			'cloudinary',
			'wordpress',
			'shopify',
			'woocommerce',
		]) {
			expect(ids.has(id)).toBe(false);
		}
	});

	it('does not detect short commerce and styling names from ordinary page text', () => {
		const analysis = analyzeSite(
			createSignals({
				text: [
					'DHL and UPS are mentioned in a shipping comparison.',
					'DX is a developer-experience abbreviation here, not a courier.',
					'APC is a power backup brand in this article.',
					'Bootstrap appears in prose and --bs-gutter is shown as a code example.',
				].join(' '),
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		for (const id of ['dhl', 'ups', 'dx', 'apc', 'bootstrap']) {
			expect(ids.has(id)).toBe(false);
		}
	});

	it('detects commerce and Bootstrap technologies from owned resources and structured styling evidence', () => {
		const analysis = analyzeSite(
			createSignals({
				resources: [
					{ url: 'https://assets.dhl.com/parcel/widget.js', initiatorType: 'script' },
					{ url: 'https://www.ups.com/assets/tracking/widget.js', initiatorType: 'script' },
					{ url: 'https://tracking.apc-pli.com/assets/checkout.js', initiatorType: 'script' },
					{ url: 'https://www.dxdelivery.com/assets/tracking.js', initiatorType: 'script' },
				],
				stylesheets: [
					'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
				],
				stylesheetContents: [
					'/*! * Bootstrap v5.3.3 */ :root { --bs-gutter-x: 1.5rem; }',
				],
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		for (const id of ['dhl', 'ups', 'apc', 'dx', 'bootstrap']) {
			expect(ids.has(id)).toBe(true);
		}
	});

	it('detects iframe integrations whose selectors use src attribute matching', () => {
		const analysis = analyzeSite(
			createSignals({
				dom: {
					selectors: {
						"iframe[src*='.audioeye.com/']": true,
					},
				},
			}),
			technologyDefinitions,
		);

		expect(analysis.results.some((item) => item.technologyId === 'audioeye')).toBe(true);
	});

	it('still detects requested platform families from explicit vendor-owned markers', () => {
		const analysis = analyzeSite(
			createSignals({
				headers: { server: 'Vercel' },
				meta: { generator: ['WordPress 6.5'] },
				html: [
					'<div data-reactroot></div>',
					'<img src="/media/images/hero.fill-800x600.jpg">',
					'<link rel="stylesheet" href="/wp-content/plugins/woocommerce/assets/css/woocommerce.css?ver=9.1.0">',
				].join(''),
				scripts: [
					'https://cdn.example.com/react-dom.production.min.js',
					'https://cdn.shopify.com/s/files/1/0000/0000/t/theme.js',
					'https://example.com/wp-content/plugins/woocommerce/assets/js/frontend/add-to-cart.min.js?ver=9.1.0',
					'https://example.com/_vercel/insights/script.js',
					'https://example.com/_vercel/speed-insights/script.js',
				],
				resources: [
					{ url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg', initiatorType: 'img' },
					{ url: 'https://example.com/media/images/hero.fill-800x600.jpg', initiatorType: 'img' },
					{ url: 'https://cdn.shopify.com/s/files/1/0000/0000/t/theme.js', initiatorType: 'script' },
					{
						url: 'https://example.com/wp-content/plugins/woocommerce/assets/js/frontend/add-to-cart.min.js?ver=9.1.0',
						initiatorType: 'script',
					},
					{ url: 'https://example.com/_vercel/insights/script.js', initiatorType: 'script' },
					{ url: 'https://example.com/_vercel/speed-insights/script.js', initiatorType: 'script' },
				],
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		for (const id of [
			'react',
			'vercel',
			'vercel-analytics',
			'vercel-speed-insights',
			'cloudinary',
			'wordpress',
			'shopify',
			'woocommerce',
			'wagtail',
		]) {
			expect(ids.has(id)).toBe(true);
		}
	});

	it('does not display named tooling from single weak compiled-code snippets', () => {
		const analysis = analyzeSite(
			createSignals({
				scriptContents: [
					'const coerced = flags | 0;',
					'if (enabled == !1) return;',
					'return { currentPagePath: getCurrentPagePath() };',
					'return function() { return currentPageName; }',
					'module.exports = factory;',
					'fetch("/xmlrpc.php?rsd")',
					'8999999999999 * Math.random() + 1e12; performance.getEntriesByType("largest-contentful-paint")',
				],
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		expect(ids.has('babel-minify')).toBe(false);
		expect(ids.has('uglify')).toBe(false);
		expect(ids.has('amd')).toBe(false);
		expect(ids.has('umd')).toBe(false);
		expect(ids.has('php')).toBe(false);
		expect(ids.has('web-vitals')).toBe(false);
	});

	it('still detects named tooling from explicit high-confidence signals', () => {
		const analysis = analyzeSite(
			createSignals({
				scriptContents: [
					'define(["require", "exports", "module"], function(require, exports, module) { return exports; });',
					'(function(root, factory) { if (typeof define === "function" && define.amd) { define([], factory); } else if (typeof exports === "object") { module.exports = factory(); } })(this, function() { return {}; });',
				],
				resources: [
					{ url: 'https://cdn.example.com/babel-minify/app.min.js', initiatorType: 'script' },
					{ url: 'https://cdn.example.com/vendor.uglify.min.js', initiatorType: 'script' },
				],
				cookies: { PHPSESSID: true },
				jsGlobals: { webVitals: {} },
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		expect(ids.has('amd')).toBe(true);
		expect(ids.has('umd')).toBe(true);
		expect(ids.has('babel-minify')).toBe(true);
		expect(ids.has('uglify')).toBe(true);
		expect(ids.has('php')).toBe(true);
		expect(ids.has('web-vitals')).toBe(true);
	});

	it('does not display transpilers from generic compiled JavaScript fragments', () => {
		const analysis = analyzeSite(
			createSignals({
				scriptContents: [
					'Object.defineProperty(exports, "__esModule", { value: true });',
					'exports.default = void 0;',
					'"use strict";',
					'React.createElement(App, null, title);',
					'var fallback = value === void 0 ? defaultValue : value;',
					'var item = source == null ? void 0 : source.item;',
				],
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		expect(ids.has('babel')).toBe(false);
		expect(ids.has('typescript')).toBe(false);
		expect(ids.has('sucrase')).toBe(false);
	});

	it('still detects transpilers from explicit runtime or helper signals', () => {
		const analysis = analyzeSite(
			createSignals({
				scriptContents: [
					'function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function"); }',
					'function _createClass(Constructor, protoProps, staticProps) { return Constructor; }',
					'var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) { return generator; };',
					'var __generator = (this && this.__generator) || function (thisArg, body) { return body; };',
				],
				resources: [
					{ url: 'https://cdn.example.com/@babel/runtime/helpers/classCallCheck.js', initiatorType: 'script' },
					{ url: 'https://cdn.example.com/npm/tslib@2.6.2/tslib.es6.js', initiatorType: 'script' },
					{ url: 'https://cdn.example.com/sucrase/sucrase.min.js', initiatorType: 'script' },
				],
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		expect(ids.has('babel')).toBe(true);
		expect(ids.has('typescript')).toBe(true);
		expect(ids.has('sucrase')).toBe(true);
	});

	it('does not display bundlers from generic chunks or ESM boilerplate', () => {
		const analysis = analyzeSite(
			createSignals({
				scriptContents: [
					'import { createApp as c } from "./chunk-ABCD1234.js";',
					'export { createApp as c, hydrate as h } from "./runtime.js";',
					'function loadBundle(bundle) { return Promise.all(Object.keys(bundle).map((key) => bundle[key])); }',
					'var __defProp = Object.defineProperty; var __getOwnPropDesc = Object.getOwnPropertyDescriptor;',
				],
				resources: [
					{ url: 'https://cdn.example.com/assets/chunk-ABCD1234.js', initiatorType: 'script' },
				],
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		expect(ids.has('vite')).toBe(false);
		expect(ids.has('rollup')).toBe(false);
		expect(ids.has('esbuild')).toBe(false);
	});

	it('still detects bundlers from explicit tool-specific signals', () => {
		const analysis = analyzeSite(
			createSignals({
				scriptContents: [
					'import "/@vite/client"; new Event("vite:preloadError");',
					'var bundle = (function (exports) { "use strict"; /* Rollup generated */ return exports; });',
				],
				resources: [
					{ url: 'https://cdn.example.com/app.esbuild.min.js', initiatorType: 'script' },
				],
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		expect(ids.has('vite')).toBe(true);
		expect(ids.has('rollup')).toBe(true);
		expect(ids.has('esbuild')).toBe(true);
	});

	it('detects WordPress.com observed passive technologies from source and resource signals', () => {
		const analysis = analyzeSite(
			createSignals({
				url: 'https://wordpress.com/',
				hostname: 'wordpress.com',
				meta: {
					generator: ['WordPress.com'],
					viewport: ['width=device-width, initial-scale=1.0'],
					'apple-itunes-app': ['app-id=1565481562'],
					'twitter:app:id:iphone': ['335703880'],
					'og:title': ['WordPress.com'],
				},
				links: [
					{ rel: 'EditURI', href: 'https://s1.wp.com/xmlrpc.php?rsd', type: 'application/rsd+xml' },
					{ rel: 'search', href: 'https://wordpress.com/osd.xml', type: 'application/opensearchdescription+xml' },
					{ rel: 'alternate', href: 'https://wordpress.com/blog/feed/', type: 'application/rss+xml' },
					{ rel: 'alternate', href: 'https://wordpress.com/fr/', hreflang: 'fr' },
				],
				stylesheets: [
					'https://wordpress.com/wp-content/plugins/gutenberg-core/v23.2.2/build/styles/block-library/common.min.css',
				],
				resources: [
					{ url: 'https://cdn.parsely.com/keys/wordpress.com/p.js?ver=3.3.2', initiatorType: 'script' },
					{ url: 'https://widgets.wp.com/help-center/help-center-logged-out.min.js', initiatorType: 'script' },
					{ url: 'https://wordpress.com/wp-content/plugins/gutenberg-core/v23.2.2/build/scripts/vendors/react.min.js?ver=18.3.1', initiatorType: 'script' },
				],
				html: '<meta property="og:title" content="WordPress.com"><script type="application/ld+json">{}</script><div class="wp-block-group jetpack-reblog-enabled"></div>',
			}),
			technologyDefinitions,
		);

		const ids = new Set(analysis.results.map((item) => item.technologyId));
		expect(ids.has('wordpress')).toBe(true);
		expect(ids.has('wordpress-com')).toBe(true);
		expect(ids.has('wordpress-block-editor')).toBe(true);
		expect(ids.has('parse-ly')).toBe(true);
		expect(ids.has('really-simple-discovery')).toBe(true);
		expect(ids.has('opensearch')).toBe(true);
		expect(ids.has('rss')).toBe(true);
		expect(ids.has('hreflang')).toBe(true);
		expect(ids.has('open-graph')).toBe(true);
		expect(ids.has('json-ld')).toBe(true);
		expect(ids.has('sphinx')).toBe(false);
		expect(ids.has('pydata-sphinx-theme')).toBe(false);
		expect(ids.has('babel-minify')).toBe(false);
		expect(ids.has('uglify')).toBe(false);
		expect(ids.has('amd')).toBe(false);
		expect(ids.has('umd')).toBe(false);
		expect(ids.has('web-vitals')).toBe(false);
	});
});
