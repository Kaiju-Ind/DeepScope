import { fc, test } from '@fast-check/vitest';
import { describe, expect, it } from 'vitest';

import { normalizePageSignals } from '@/lib/observations';
import { makePageSignals, TEST_NOW } from '../support/factories';

describe('page-signal observation normalization', () => {
	it('maps representative page-signal surfaces into stable observation records', () => {
		const batch = normalizePageSignals(makePageSignals({
			html: '<meta name="generator" content="ExampleCMS">',
			htmlMatches: {
				'example:0': {
					matchedValue: 'ExampleCMS 1.2.3',
					captures: ['1.2.3'],
				},
			},
			text: 'Powered by ExampleCMS',
			images: ['https://images.example.com/product.webp'],
			scripts: ['https://cdn.example.com/app.js'],
			stylesheets: ['https://cdn.example.com/app.css'],
			links: [{ rel: 'preload', href: 'https://cdn.example.com/app.js', as: 'script' }],
			resources: [{ url: 'https://cdn.example.com/app.js', initiatorType: 'script' }],
			requests: [{
				url: 'https://api.example.com/graphql',
				method: 'POST',
				type: 'fetch',
				requestHeaders: { 'x-client': 'kaiju-deepscope' },
				responseHeaders: { server: 'ExampleServer' },
			}],
			scriptContents: ['window.ExampleCMS = true'],
			stylesheetContents: ['.example { color: red; }'],
			cookies: { session: true },
			headers: { 'x-powered-by': 'ExampleCMS' },
			meta: { generator: ['ExampleCMS'] },
			dom: { selectors: { '[data-example]': true, '.missing': false } },
			storage: {
				localStorage: { exampleUser: true },
				sessionStorage: { exampleSession: true },
			},
			jsGlobals: { ExampleCMS: { version: '1.2.3' } },
			robotsTxt: 'Disallow: /wp-admin/',
			dnsRecords: { TXT: ['v=spf1 include:example.com'] },
			certIssuer: 'Example CA',
			probeResults: ['/.well-known/example returned 200'],
		}), {
			observedAt: TEST_NOW + 1,
		});

		expect(batch.target).toEqual({
			url: 'https://example.com/products',
			hostname: 'example.com',
		});
		expect(batch.interface).toBe('extension');
		expect(batch.observedAt).toBe(TEST_NOW + 1);
		expect(batch.observations).toEqual(expect.arrayContaining([
			expect.objectContaining({ kind: 'url', value: 'https://example.com/products' }),
			expect.objectContaining({ kind: 'html', value: '<meta name="generator" content="ExampleCMS">' }),
			expect.objectContaining({ kind: 'htmlMatch', key: 'example:0', value: 'ExampleCMS 1.2.3' }),
			expect.objectContaining({ kind: 'imageSrc', value: 'https://images.example.com/product.webp' }),
			expect.objectContaining({ kind: 'scriptSrc', value: 'https://cdn.example.com/app.js' }),
			expect.objectContaining({ kind: 'stylesheetHref', value: 'https://cdn.example.com/app.css' }),
			expect.objectContaining({ kind: 'link', key: 'preload', value: 'https://cdn.example.com/app.js' }),
			expect.objectContaining({ kind: 'resourceUrl', value: 'https://cdn.example.com/app.js' }),
			expect.objectContaining({ kind: 'requestUrl', value: 'https://api.example.com/graphql' }),
			expect.objectContaining({ kind: 'requestHeader', key: 'x-client', value: 'kaiju-deepscope' }),
			expect.objectContaining({ kind: 'responseHeader', key: 'server', value: 'ExampleServer' }),
			expect.objectContaining({ kind: 'cookie', key: 'session', value: true }),
			expect.objectContaining({ kind: 'header', key: 'x-powered-by', value: 'ExampleCMS' }),
			expect.objectContaining({ kind: 'meta', key: 'generator', value: 'ExampleCMS' }),
			expect.objectContaining({ kind: 'dom', key: '[data-example]', value: true }),
			expect.objectContaining({ kind: 'storage', key: 'exampleUser', value: true }),
			expect.objectContaining({ kind: 'jsGlobal', key: 'ExampleCMS', value: '[object Object]' }),
			expect.objectContaining({ kind: 'robots', value: 'Disallow: /wp-admin/' }),
			expect.objectContaining({ kind: 'dns', key: 'TXT', value: 'v=spf1 include:example.com' }),
			expect.objectContaining({ kind: 'certIssuer', value: 'Example CA' }),
			expect.objectContaining({ kind: 'probe', value: '/.well-known/example returned 200' }),
		]));
	});

	it('redacts cookie and storage values as key-only observations', () => {
		const batch = normalizePageSignals(makePageSignals({
			cookies: { authToken: true },
			storage: {
				localStorage: { persistedUser: true },
				sessionStorage: { transientSession: true },
			},
		}));

		expect(batch.observations).toEqual(expect.arrayContaining([
			expect.objectContaining({
				kind: 'cookie',
				key: 'authToken',
				value: true,
				attributes: { redacted: true },
			}),
			expect.objectContaining({
				kind: 'storage',
				key: 'persistedUser',
				value: true,
				attributes: { area: 'localStorage' },
			}),
			expect.objectContaining({
				kind: 'storage',
				key: 'transientSession',
				value: true,
				attributes: { area: 'sessionStorage' },
			}),
		]));
		expect(batch.observations.some((observation) => observation.value === 'secret')).toBe(false);
	});

	it('keeps absent DOM selectors out of the default observation stream', () => {
		const signals = makePageSignals({
			dom: { selectors: { '[data-present]': true, '[data-absent]': false } },
		});

		const defaultBatch = normalizePageSignals(signals);
		const explicitBatch = normalizePageSignals(signals, { includeAbsentDomSelectors: true });

		expect(defaultBatch.observations).toEqual(expect.arrayContaining([
			expect.objectContaining({ kind: 'dom', key: '[data-present]', value: true }),
		]));
		expect(defaultBatch.observations).not.toEqual(expect.arrayContaining([
			expect.objectContaining({ kind: 'dom', key: '[data-absent]' }),
		]));
		expect(explicitBatch.observations).toEqual(expect.arrayContaining([
			expect.objectContaining({ kind: 'dom', key: '[data-absent]', value: false }),
		]));
	});

	test.prop([
		fc.array(fc.webUrl(), { maxLength: 8 }),
		fc.array(fc.webUrl(), { maxLength: 8 }),
	], { numRuns: 25 })(
		'preserves script and stylesheet URL observation counts',
		(scripts, stylesheets) => {
			const batch = normalizePageSignals(makePageSignals({ scripts, stylesheets }));

			expect(batch.observations.filter((observation) => observation.kind === 'scriptSrc')).toHaveLength(scripts.length);
			expect(batch.observations.filter((observation) => observation.kind === 'stylesheetHref')).toHaveLength(stylesheets.length);
		},
	);
});
