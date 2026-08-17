import { afterEach, describe, expect, it, vi } from 'vitest';

import {
	collectCookieNames,
	collectImageSources,
	collectLinkTags,
	collectMetaTags,
	collectScriptContents,
	collectScriptSources,
	collectStylesheetContents,
	collectStylesheetSources,
	mergeObservedDomSelectorMatches,
} from '@/lib/content/collect-page-signals';

function makeScript(input: { src?: string; text?: string }): HTMLScriptElement {
	return {
		src: input.src ?? '',
		textContent: input.text ?? '',
		getAttribute(name: string) {
			return name === 'src' ? input.src ?? null : null;
		},
	} as HTMLScriptElement;
}

function makeStylesheetLink(input: { href: string; rel?: string }): HTMLLinkElement {
	const rel = input.rel ?? 'stylesheet';
	return {
		href: input.href,
		rel,
		type: '',
		as: '',
		media: '',
		hreflang: '',
		crossOrigin: '',
		relList: {
			contains(value: string) {
				return rel.split(/\s+/).includes(value);
			},
		},
		getAttribute(name: string) {
			if (name === 'href') return input.href;
			if (name === 'rel') return rel;
			return null;
		},
	} as HTMLLinkElement;
}

function makeMeta(input: Record<string, string>): HTMLMetaElement {
	return {
		getAttribute(name: string) {
			return input[name] ?? null;
		},
	} as HTMLMetaElement;
}

function makeImage(input: { src: string; currentSrc?: string }): HTMLImageElement {
	return {
		src: input.src,
		currentSrc: input.currentSrc ?? '',
		getAttribute(name: string) {
			return name === 'src' ? input.src : null;
		},
	} as HTMLImageElement;
}

function makeStyle(text: string): HTMLStyleElement {
	return {
		textContent: text,
	} as HTMLStyleElement;
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('content page signal collectors', () => {
	it('normalizes script and stylesheet URLs against the current page', () => {
		vi.stubGlobal('location', { href: 'https://example.com/products/index.html' });

		expect(collectScriptSources([
			makeScript({ src: '/assets/app.js' }),
			makeScript({ src: 'https://cdn.example.com/lib.js' }),
		])).toEqual([
			'https://example.com/assets/app.js',
			'https://cdn.example.com/lib.js',
		]);
		expect(collectStylesheetSources([
			makeStylesheetLink({ href: './app.css' }),
			makeStylesheetLink({ href: 'https://cdn.example.com/theme.css' }),
		])).toEqual([
			'https://example.com/products/app.css',
			'https://cdn.example.com/theme.css',
		]);
	});

	it('collects rendered image URLs and prefers currentSrc', () => {
		vi.stubGlobal('location', { href: 'https://example.com/products/index.html' });

		expect(collectImageSources([
			makeImage({ src: '/images/fallback.jpg', currentSrc: 'https://cdn.example.com/rendered.webp' }),
			makeImage({ src: './relative.png' }),
		])).toEqual([
			'https://cdn.example.com/rendered.webp',
			'https://example.com/products/relative.png',
		]);
	});


	it('keeps previously observed DOM selector matches sticky across later scans', () => {
		const observed = {
			'[data-nextjs-router]': true,
			'[data-transient-widget]': true,
		};
		const current = {
			'[data-nextjs-router]': false,
			'[data-current-widget]': true,
		};

		expect(mergeObservedDomSelectorMatches(observed, current)).toEqual({
			'[data-nextjs-router]': true,
			'[data-transient-widget]': true,
			'[data-current-widget]': true,
		});
	});

	it('collects inline source text without external script bodies', () => {
		expect(collectScriptContents([
			makeScript({ src: '/app.js', text: 'console.log("external")' }),
			makeScript({ text: 'window.__APP__ = true' }),
		])).toEqual(['window.__APP__ = true']);
		expect(collectStylesheetContents([
			makeStyle(':root { color-scheme: dark; }'),
		])).toEqual([':root { color-scheme: dark; }']);
	});

	it('collects metadata, links, and visible cookie names without cookie values', () => {
		vi.stubGlobal('location', { href: 'https://example.com/' });

		expect(collectMetaTags([
			makeMeta({ name: 'Generator', content: 'WordPress 6.5' }),
			makeMeta({ property: 'og:site_name', content: 'Example Store' }),
		])).toEqual({
			generator: ['WordPress 6.5'],
			'og:site_name': ['Example Store'],
		});
		expect(collectLinkTags([
			makeStylesheetLink({ href: '/app.css' }),
		])).toMatchObject([
			{
				rel: 'stylesheet',
				href: 'https://example.com/app.css',
			},
		]);
		expect(collectCookieNames('session=secret; feature%20flag=true')).toEqual({
			session: true,
			'feature flag': true,
		});
	});
});

describe('content page signal limits', () => {
	it('re-bounds runtime source text before returning page signals', async () => {
		vi.stubGlobal('location', { href: 'https://example.com/', hostname: 'example.com' });
		vi.stubGlobal('document', {
			documentElement: { outerHTML: '', textContent: '' },
			body: { innerText: '' },
			cookie: '',
			querySelectorAll: () => [],
			styleSheets: [],
		});

		const { collectPageSignals } = await import('@/lib/content/collect-page-signals');
		const { SOURCE_LIMITS } = await import('@/lib/detection/source-limits');
		const runtime = {
			images: [],
			scripts: [],
			stylesheets: [],
			links: [],
			resources: [],
			requests: [],
			meta: {},
			dom: { selectors: {} },
			scriptContents: Array.from({ length: 20 }, (_, index) => `${index}:${'s'.repeat(50_000)}`),
			stylesheetContents: Array.from({ length: 20 }, (_, index) => `${index}:${'c'.repeat(50_000)}`),
		};

		const signals = await collectPageSignals({
			selectorProbeList: [],
			includeScriptContent: true,
			includeStylesheetContent: true,
			includeStorageKeys: false,
		}, runtime);

		expect(signals.scriptContents.every((value) => value.length <= SOURCE_LIMITS.scriptContentChars)).toBe(true);
		expect(signals.stylesheetContents.every((value) => value.length <= SOURCE_LIMITS.stylesheetContentChars)).toBe(true);
		expect(signals.scriptContents.reduce((total, value) => total + value.length, 0)).toBeLessThanOrEqual(SOURCE_LIMITS.scriptContentTotalChars);
		expect(signals.stylesheetContents.reduce((total, value) => total + value.length, 0)).toBeLessThanOrEqual(SOURCE_LIMITS.stylesheetContentTotalChars);
	});

	it('does not return runtime source text when the collection plan disables it', async () => {
		vi.stubGlobal('location', { href: 'https://example.com/', hostname: 'example.com' });
		vi.stubGlobal('document', {
			documentElement: { outerHTML: '', textContent: '' },
			body: { innerText: '' },
			cookie: '',
			querySelectorAll: () => [],
			styleSheets: [],
		});

		const { collectPageSignals } = await import('@/lib/content/collect-page-signals');
		const signals = await collectPageSignals({
			selectorProbeList: [],
			includeScriptContent: false,
			includeStylesheetContent: false,
			includeStorageKeys: false,
		}, {
			images: [],
			scripts: [],
			stylesheets: [],
			links: [],
			resources: [],
			requests: [],
			meta: {},
			dom: { selectors: {} },
			scriptContents: ['window.__SHOULD_NOT_ESCAPE__ = true'],
			stylesheetContents: [':root { --should-not-escape: 1; }'],
		});

		expect(signals.scriptContents).toEqual([]);
		expect(signals.stylesheetContents).toEqual([]);
	});
});
