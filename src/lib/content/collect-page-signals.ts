import { browser } from 'wxt/browser';

import { limitStringsByTotalChars, mergeStringsByTotalChars, normalizeMetaMap, truncate, uniqueStrings } from '../detection/normalizers';
import { SOURCE_LIMITS } from '../detection/source-limits';
import { timeAsyncSpan, timeSyncSpan, type TimingContext } from '../diagnostics/timing';
import type {
	CookieSignals,
	HtmlMatchSignal,
	LinkSignal,
	PageSignals,
	ResourceSignal,
	StorageSignals,
} from '../detection/types';
import type { HtmlProbe } from '../messaging';
import type { DomSelectorPlan } from '../collectors/planning';
import {
	DOM_SELECTOR_OFFSCREEN_CHANNEL,
	type DomSelectorOffscreenResponse,
	type MatchDomSelectorsOffscreenMessage,
} from '../dom-selector/offscreen-contracts';

export type CollectPageSignalsInput = {
	tier?: 'initial' | 'enrichment';
	selectorProbeList: string[];
	domSelectorPlan?: DomSelectorPlan;
	htmlProbeList?: HtmlProbe[];
	includeHtml?: boolean;
	includeText?: boolean;
	includeScriptContent?: boolean;
	includeStylesheetContent?: boolean;
	includeStorageKeys?: boolean;
	timingTraceId?: string;
};

/**
 * Collects only bounded, rule-oriented page signals. The content script may read
 * page DOM, non-HttpOnly cookie names, storage keys, and inline source text, but
 * it never persists raw unbounded page payloads.
 */
export type RuntimePageSignals = Partial<
	Pick<
		PageSignals,
		| 'images'
		| 'scripts'
		| 'stylesheets'
		| 'links'
		| 'resources'
		| 'requests'
		| 'scriptContents'
		| 'stylesheetContents'
		| 'dom'
		| 'meta'
		| 'headers'
		| 'jsGlobals'
		| 'robotsTxt'
		| 'dnsRecords'
		| 'certIssuer'
		| 'probeResults'
	>
>;

type ScriptSourceInput = ParentNode | Iterable<HTMLScriptElement>;
type ScriptContentInput = ParentNode | Iterable<HTMLScriptElement>;
type StylesheetSourceInput = ParentNode | Iterable<HTMLLinkElement>;
type StylesheetContentInput = ParentNode | Iterable<HTMLStyleElement>;
type LinkTagInput = ParentNode | Iterable<HTMLLinkElement>;
type MetaTagInput = ParentNode | Iterable<HTMLMetaElement>;
type ImageSourceInput = ParentNode | Iterable<HTMLImageElement>;

export async function collectPageSignals(
	input: CollectPageSignalsInput,
	runtime: RuntimePageSignals = {},
): Promise<PageSignals> {
	const timingContext: TimingContext = {
		traceId: input.timingTraceId,
		surface: 'content',
		details: {
			hostname: globalThis.location.hostname,
			tier: input.tier ?? 'initial',
		},
	};
	const selectorProbeList = timeSyncSpan(
		'content.collect-page-signals.dedupe-selector-probes',
		timingContext,
		() => uniqueStrings(input.selectorProbeList),
		(values) => ({ selectorProbeCount: values.length }),
	);
	const fullHtml = timeSyncSpan(
		'content.collect-page-signals.read-html',
		timingContext,
		() => input.includeHtml ? globalThis.document.documentElement.outerHTML : '',
		(value) => ({ includeHtml: Boolean(input.includeHtml), htmlChars: value.length }),
	);
	const htmlProbeList = input.htmlProbeList ?? [];
	const htmlMatches = timeSyncSpan(
		'content.collect-page-signals.html-probes',
		timingContext,
		() => fullHtml ? collectHtmlProbeMatches(fullHtml, htmlProbeList) : {},
		(values) => ({ htmlProbeCount: htmlProbeList.length, htmlMatchCount: Object.keys(values).length }),
	);
	const resources = timeSyncSpan(
		'content.collect-page-signals.resources',
		timingContext,
		() => runtime.resources ?? collectResourceTimings(),
		(values) => ({ resourceCount: values.length }),
	);
	const images = timeSyncSpan(
		'content.collect-page-signals.images',
		timingContext,
		() => runtime.images ?? collectImageSources(),
		(values) => ({ imageCount: values.length }),
	);
	const scripts = timeSyncSpan(
		'content.collect-page-signals.scripts',
		timingContext,
		() => runtime.scripts ?? collectScriptSources(),
		(values) => ({ scriptCount: values.length }),
	);
	const stylesheets = timeSyncSpan(
		'content.collect-page-signals.stylesheets',
		timingContext,
		() => runtime.stylesheets ?? collectStylesheetSources(),
		(values) => ({ stylesheetCount: values.length }),
	);
	const links = timeSyncSpan(
		'content.collect-page-signals.links',
		timingContext,
		() => runtime.links ?? collectLinkTags(),
		(values) => ({ linkCount: values.length }),
	);
	const scriptContents = timeSyncSpan(
		'content.collect-page-signals.script-contents',
		timingContext,
		() => input.includeScriptContent
			? mergeStringsByTotalChars(
				[],
				runtime.scriptContents ?? collectScriptContents(),
				SOURCE_LIMITS.scriptContentItems,
				SOURCE_LIMITS.scriptContentChars,
				SOURCE_LIMITS.scriptContentTotalChars,
			)
			: [],
		(values) => ({ includeScriptContent: Boolean(input.includeScriptContent), scriptContentCount: values.length }),
	);
	const stylesheetContents = timeSyncSpan(
		'content.collect-page-signals.stylesheet-contents',
		timingContext,
		() => input.includeStylesheetContent
			? mergeStringsByTotalChars(
				[],
				runtime.stylesheetContents ?? collectStylesheetContents(),
				SOURCE_LIMITS.stylesheetContentItems,
				SOURCE_LIMITS.stylesheetContentChars,
				SOURCE_LIMITS.stylesheetContentTotalChars,
			)
			: [],
		(values) => ({
			includeStylesheetContent: Boolean(input.includeStylesheetContent),
			stylesheetContentCount: values.length,
		}),
	);
	const meta = timeSyncSpan(
		'content.collect-page-signals.meta',
		timingContext,
		() => runtime.meta ?? collectMetaTags(),
		(values) => ({ metaKeyCount: Object.keys(values).length }),
	);
	const domSelectors = await timeAsyncSpan(
		'content.collect-page-signals.selector-probes',
		timingContext,
		async () => mergeObservedDomSelectorMatches(
			runtime.dom?.selectors,
			await collectDomSelectorMatches(input.domSelectorPlan, selectorProbeList, globalThis.document),
		),
		(values) => ({
			selectorProbeCount: selectorProbeList.length,
			selectorMatchCount: Object.values(values).filter(Boolean).length,
			stickySelectorMatchCount: Object.values(runtime.dom?.selectors ?? {}).filter(Boolean).length,
		}),
	);
	const storage = timeSyncSpan(
		'content.collect-page-signals.storage-keys',
		timingContext,
		() => input.includeStorageKeys !== false ? collectStorageKeys() : { localStorage: {}, sessionStorage: {} },
		(values) => ({
			includeStorageKeys: input.includeStorageKeys !== false,
			localStorageKeyCount: Object.keys(values.localStorage).length,
			sessionStorageKeyCount: Object.keys(values.sessionStorage).length,
		}),
	);
	const text = timeSyncSpan(
		'content.collect-page-signals.visible-text',
		timingContext,
		() => input.includeText ? collectVisibleText() : '',
		(value) => ({ includeText: Boolean(input.includeText), textChars: value.length }),
	);
	const html = timeSyncSpan(
		'content.collect-page-signals.bounded-html',
		timingContext,
		() => input.includeHtml ? boundedHtml(fullHtml, htmlProbeList) : '',
		(value) => ({ includeHtml: Boolean(input.includeHtml), boundedHtmlChars: value.length }),
	);

	return {
		url: globalThis.location.href,
		hostname: globalThis.location.hostname,
		html,
		htmlMatches,
		text,
		images,
		scripts,
		stylesheets,
		links,
		resources,
		requests: runtime.requests ?? resources.map(resourceToRequestSignal),
		scriptContents,
		stylesheetContents,
		cookies: collectCookieNames(globalThis.document.cookie),
		headers: runtime.headers ?? {},
		meta,
		dom: {
			selectors: domSelectors,
		},
		storage,
		// JavaScript globals are populated by injected JS context collection.
		// Content scripts cannot read page-owned globals directly, so callers pass
		// those injected values through RuntimePageSignals after the injection step.
		jsGlobals: runtime.jsGlobals ?? {},
		robotsTxt: runtime.robotsTxt ?? '',
		dnsRecords: runtime.dnsRecords ?? {},
		certIssuer: runtime.certIssuer ?? '',
		probeResults: runtime.probeResults ?? [],
		collectedAt: Date.now(),
	};
}


export function mergeObservedDomSelectorMatches(
	observed: Record<string, boolean> | undefined,
	current: Record<string, boolean>,
): Record<string, boolean> {
	if (!observed || Object.keys(observed).length === 0) {
		return current;
	}

	const merged: Record<string, boolean> = { ...current };
	for (const [selector, matched] of Object.entries(observed)) {
		if (matched) {
			merged[selector] = true;
		} else if (merged[selector] === undefined) {
			merged[selector] = false;
		}
	}
	return merged;
}

function boundedHtml(html: string, htmlProbeList: HtmlProbe[]): string {
	if (html.length <= SOURCE_LIMITS.htmlChars) {
		return html;
	}

	const baseLimit = Math.floor(SOURCE_LIMITS.htmlChars * 0.75);
	const snippetBudget = SOURCE_LIMITS.htmlChars - baseLimit;
	const base = html.slice(0, baseLimit);
	const snippets = collectRuleDrivenHtmlSnippets(html, htmlProbeList, {
		maxChars: snippetBudget,
		skipBeforeIndex: baseLimit,
	});

	const combined = snippets ? `${base}\n${snippets}` : base;
	return truncate(combined, SOURCE_LIMITS.htmlChars);
}

function collectRuleDrivenHtmlSnippets(
	html: string,
	probes: HtmlProbe[],
	options: {
		maxChars: number;
		skipBeforeIndex: number;
	},
): string {
	const snippets: string[] = [];
	const seenRanges = new Set<string>();
	let usedChars = 0;

	for (const probe of probes) {
		const pattern = safeProbePattern(probe);
		if (!pattern) {
			continue;
		}

		const match = findMatchAtOrAfter(pattern, html, options.skipBeforeIndex);
		if (!match) {
			continue;
		}

		const matchLength = Math.max(1, Math.min(match.value.length, 2_000));
		const start = Math.max(0, match.index - 500);
		const end = Math.min(html.length, match.index + matchLength + 500);
		const rangeKey = `${start}:${end}`;

		if (seenRanges.has(rangeKey)) {
			continue;
		}

		const snippet = html.slice(start, end);
		if (usedChars + snippet.length > options.maxChars) {
			continue;
		}

		seenRanges.add(rangeKey);
		snippets.push(snippet);
		usedChars += snippet.length;
	}

	return snippets.join('\n');
}

function findMatchAtOrAfter(
	pattern: RegExp,
	html: string,
	minIndex: number,
): { index: number; value: string } | null {
	pattern.lastIndex = minIndex;

	for (let match = pattern.exec(html); match; match = pattern.exec(html)) {
		if (match.index >= minIndex) {
			return { index: match.index, value: match[0] ?? '' };
		}

		if (match[0] === '') {
			pattern.lastIndex += 1;
		}
	}

	return null;
}

function safeProbePattern(probe: HtmlProbe): RegExp | null {
	try {
		const flags = Array.from(new Set(`${probe.flags.replace(/[dy]/g, '')}g`)).join('');
		return new RegExp(probe.source, flags);
	} catch {
		return null;
	}
}

function collectHtmlProbeMatches(
	html: string,
	probes: HtmlProbe[],
): Record<string, HtmlMatchSignal> {
	const matches: Record<string, HtmlMatchSignal> = {};

	for (const probe of probes) {
		const pattern = safeProbePattern(probe);
		if (!pattern) {
			continue;
		}

		pattern.lastIndex = 0;
		const match = pattern.exec(html);
		if (!match) {
			continue;
		}

		matches[htmlProbeKey(probe.technologyId, probe.ruleIndex)] = {
			matchedValue: truncate(match[0] ?? '', SOURCE_LIMITS.evidenceValueChars),
			captures: match.slice(1).map((value) =>
				truncate(value ?? '', SOURCE_LIMITS.evidenceValueChars),
			),
		};
	}

	return matches;
}

function htmlProbeKey(technologyId: string, ruleIndex: number): string {
	return `${technologyId}:${ruleIndex}`;
}

export function collectMetaTags(input: MetaTagInput = globalThis.document): Record<string, string[]> {
	const grouped: Record<string, string[]> = Object.create(null) as Record<string, string[]>;

	for (const node of iterateMetaTags(input)) {
		const key = node.getAttribute('name') ?? node.getAttribute('property') ?? node.getAttribute('http-equiv');
		const value = node.getAttribute('content');
		if (!key || !value) {
			continue;
		}

		const normalizedKey = key.toLowerCase();
		const values = grouped[normalizedKey] ?? (grouped[normalizedKey] = []);
		values.push(value);
	}

	return normalizeMetaMap(grouped);
}

export function collectScriptSources(input: ScriptSourceInput = globalThis.document): string[] {
	return uniqueStrings(
		Array.from(iterateScripts(input))
			.map((script) => normalizeResourceUrl(script.getAttribute('src') ?? script.src))
			.filter((source): source is string => Boolean(source)),
	).slice(0, SOURCE_LIMITS.scriptSrc);
}

/** Collect rendered image source URLs without reading image bytes. */
export function collectImageSources(input: ImageSourceInput = globalThis.document): string[] {
	return uniqueStrings(
		Array.from(iterateImages(input))
			.map((image) => normalizeResourceUrl(image.currentSrc || image.getAttribute('src') || image.src))
			.filter((source): source is string => Boolean(source)),
	).slice(0, SOURCE_LIMITS.imageSrc);
}

export function collectScriptContents(input: ScriptContentInput = globalThis.document): string[] {
	return limitStringsByTotalChars(
		Array.from(iterateScripts(input))
			.filter((script) => !script.src)
			.map((script) => truncate(script.textContent ?? '', SOURCE_LIMITS.scriptContentChars))
			.filter(Boolean),
		SOURCE_LIMITS.scriptContentItems,
		SOURCE_LIMITS.scriptContentTotalChars,
	);
}

export function collectStylesheetSources(input: StylesheetSourceInput = globalThis.document): string[] {
	return uniqueStrings(
		Array.from(iterateStylesheetLinks(input))
			.map((link) => normalizeResourceUrl(link.getAttribute('href') ?? link.href))
			.filter((href): href is string => Boolean(href)),
	).slice(0, SOURCE_LIMITS.stylesheetHref);
}

export function collectStylesheetContents(input: StylesheetContentInput = globalThis.document): string[] {
	const inlineStyles = Array.from(iterateStyleTags(input))
		.map((style) => truncate(style.textContent ?? '', SOURCE_LIMITS.stylesheetContentChars))
		.filter(Boolean);

	const cssomStyles = isParentNode(input) ? collectAccessibleCssRules() : [];
	return limitStringsByTotalChars(
		[...inlineStyles, ...cssomStyles],
		SOURCE_LIMITS.stylesheetContentItems,
		SOURCE_LIMITS.stylesheetContentTotalChars,
	);
}

export function collectLinkTags(input: LinkTagInput = globalThis.document): LinkSignal[] {
	const links: LinkSignal[] = [];
	for (const link of iterateLinks(input)) {
		const href = normalizeResourceUrl(link.getAttribute('href') ?? link.href);
		if (!href) {
			continue;
		}

		links.push({
			rel: link.rel,
			href,
			type: link.type || undefined,
			as: link.as || undefined,
			media: link.media || undefined,
			hreflang: link.hreflang || undefined,
			crossOrigin: link.crossOrigin || undefined,
		});

		if (links.length >= SOURCE_LIMITS.linkTags) {
			break;
		}
	}

	return links;
}

/** Convert a finite Performance Timeline entry set into bounded resource signals. */
export function collectResourceEntries(entries: Iterable<PerformanceEntry>): ResourceSignal[] {
	const resources: ResourceSignal[] = [];
	const seenUrls = new Set<string>();

	for (const entry of entries) {
		if (!entry.name || seenUrls.has(entry.name)) continue;

		seenUrls.add(entry.name);
		resources.push({
			url: entry.name,
			initiatorType: isPerformanceResourceTiming(entry) ? entry.initiatorType : undefined,
		});

		if (resources.length >= SOURCE_LIMITS.resourceUrls) break;
	}

	return resources;
}

/** Return the bounded resource signals already present in the page Performance Timeline. */
export function collectResourceTimings(): ResourceSignal[] {
	if (!('performance' in globalThis) || typeof globalThis.performance.getEntriesByType !== 'function') return [];
	return collectResourceEntries(globalThis.performance.getEntriesByType('resource'));
}

export function collectCookieNames(cookieString: string): CookieSignals {
	return Object.fromEntries(
		cookieString
			.split(';')
			.map((part) => part.trim())
			.filter(Boolean)
			.map((part) => {
				const index = part.indexOf('=');
				const name = index === -1 ? part : part.slice(0, index);
				return [safeDecode(name), true];
			})
			.slice(0, SOURCE_LIMITS.cookieNames),
	);
}

function isPerformanceResourceTiming(entry: PerformanceEntry): entry is PerformanceResourceTiming {
	return 'initiatorType' in entry;
}

function collectVisibleText(): string {
	const text = globalThis.document.body?.innerText ?? globalThis.document.documentElement.textContent ?? '';
	return truncate(text, SOURCE_LIMITS.textChars);
}

function collectAccessibleCssRules(): string[] {
	const values: string[] = [];
	for (const sheet of Array.from(globalThis.document.styleSheets)) {
		if (values.length >= SOURCE_LIMITS.stylesheetContentItems) {
			break;
		}

		try {
			const cssRules = Array.from(sheet.cssRules ?? []);
			const cssText = cssRules.map((rule) => rule.cssText).join('\n');
			if (cssText) {
				values.push(truncate(cssText, SOURCE_LIMITS.stylesheetContentChars));
			}
		} catch {
			// Cross-origin stylesheets commonly throw SecurityError here. Hrefs are
			// still captured through stylesheetHref/link/resource signals.
		}
	}

	return values;
}

function collectStorageKeys(): StorageSignals {
	return {
		localStorage: collectStorageAreaKeys(() => globalThis.localStorage),
		sessionStorage: collectStorageAreaKeys(() => globalThis.sessionStorage),
	};
}

function collectStorageAreaKeys(getStorage: () => Storage): Record<string, true> {
	try {
		const storage = getStorage();
		const keys: Array<[string, true]> = [];
		for (let index = 0; index < storage.length && keys.length < SOURCE_LIMITS.storageKeys; index += 1) {
			const key = storage.key(index);
			if (key) {
				keys.push([key, true]);
			}
		}
		return Object.fromEntries(keys);
	} catch {
		return {};
	}
}

function resourceToRequestSignal(resource: ResourceSignal) {
	return {
		url: resource.url,
		type: resource.initiatorType,
	};
}

export async function collectDomSelectorMatches(
	plan: DomSelectorPlan | undefined,
	selectorProbeList: readonly string[],
	root: ParentNode,
): Promise<Record<string, boolean>> {
	if (!plan?.candidateSelector) {
		return Promise.resolve({});
	}

	try {
		const message: MatchDomSelectorsOffscreenMessage = {
			channel: DOM_SELECTOR_OFFSCREEN_CHANNEL,
			type: 'dom-selector.match',
			request: {
				html: serializeDomRoot(root),
				plan,
				selectorProbeList,
			},
		};
		const response = await browser.runtime.sendMessage(message) as DomSelectorOffscreenResponse;
		if (response.ok) {
			return response.selectors;
		}
		return {};
	} catch {
		return {};
	}
}

function serializeDomRoot(root: ParentNode): string {
	if (root instanceof globalThis.Document) {
		return root.documentElement?.outerHTML ?? '';
	}
	if (root instanceof globalThis.Element) {
		return root.outerHTML;
	}
	if (root instanceof globalThis.DocumentFragment) {
		const container = globalThis.document.createElement('template');
		container.content.append(root.cloneNode(true));
		return container.innerHTML;
	}
	return '';
}

function safeDecode(value: string): string {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}

function* iterateScripts(input: ScriptSourceInput): Iterable<HTMLScriptElement> {
	if (isParentNode(input)) {
		yield* input.querySelectorAll('script') as Iterable<HTMLScriptElement>;
		return;
	}

	yield* input;
}

function* iterateStylesheetLinks(input: StylesheetSourceInput): Iterable<HTMLLinkElement> {
	if (isParentNode(input)) {
		yield* input.querySelectorAll('link[rel~="stylesheet"]') as Iterable<HTMLLinkElement>;
		return;
	}

	for (const link of input) {
		if (isStylesheetLink(link)) {
			yield link;
		}
	}
}

function* iterateStyleTags(input: StylesheetContentInput): Iterable<HTMLStyleElement> {
	if (isParentNode(input)) {
		yield* input.querySelectorAll('style');
		return;
	}

	yield* input;
}

function* iterateLinks(input: LinkTagInput): Iterable<HTMLLinkElement> {
	if (isParentNode(input)) {
		yield* input.querySelectorAll('link[href]') as Iterable<HTMLLinkElement>;
		return;
	}

	yield* input;
}

function* iterateMetaTags(input: MetaTagInput): Iterable<HTMLMetaElement> {
	if (isParentNode(input)) {
		yield* input.querySelectorAll('meta') as Iterable<HTMLMetaElement>;
		return;
	}

	yield* input;
}

function* iterateImages(input: ImageSourceInput): Iterable<HTMLImageElement> {
	if (isParentNode(input)) {
		yield* input.querySelectorAll('img[src], img[srcset]') as Iterable<HTMLImageElement>;
		return;
	}

	yield* input;
}

function isParentNode(value: unknown): value is ParentNode {
	return typeof value === 'object' && value !== null && 'querySelectorAll' in value;
}

function isStylesheetLink(link: HTMLLinkElement): boolean {
	return link.relList.contains('stylesheet') || /(^|\s)stylesheet(\s|$)/i.test(link.rel);
}

function normalizeResourceUrl(value: string | null | undefined): string | null {
	if (!value) {
		return null;
	}

	try {
		return new globalThis.URL(value, globalThis.location.href).href;
	} catch {
		return value;
	}
}
