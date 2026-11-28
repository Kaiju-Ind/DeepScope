import { normalizeMetaMap, uniqueStrings, limitStringsByTotalChars, truncate } from "@deepscope/detection/normalizers";
import { SOURCE_LIMITS } from "@deepscope/detection/limits";
import type { LinkSignal } from "@deepscope/detection/types";

type ScriptSourceInput = ParentNode | Iterable<HTMLScriptElement>;
type ScriptContentInput = ParentNode | Iterable<HTMLScriptElement>;
type StylesheetSourceInput = ParentNode | Iterable<HTMLLinkElement>;
type StylesheetContentInput = ParentNode | Iterable<HTMLStyleElement>;
type LinkTagInput = ParentNode | Iterable<HTMLLinkElement>;
type MetaTagInput = ParentNode | Iterable<HTMLMetaElement>;
type ImageSourceInput = ParentNode | Iterable<HTMLImageElement>;

/** Read name/property/http-equiv meta values and apply the shared lowercase-key and payload limits. */
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

/** Resolve script URLs against the document, retain first-seen unique sources and enforce the source-count limit. */
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

/** Read only inline scripts and enforce per-item, item-count and total character limits. */
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

/** Collect distinct stylesheet link URLs in document order up to the shared count limit. */
export function collectStylesheetSources(input: StylesheetSourceInput = globalThis.document): string[] {
	return uniqueStrings(
		Array.from(iterateStylesheetLinks(input))
			.map((link) => normalizeResourceUrl(link.getAttribute('href') ?? link.href))
			.filter((href): href is string => Boolean(href)),
	).slice(0, SOURCE_LIMITS.stylesheetHref);
}

/** Combine bounded inline styles with readable CSSOM rules only for a whole-document scan. */
export function collectStylesheetContents(input: StylesheetContentInput = globalThis.document): string[] {
	const inlineStyles = Array.from(iterateStyleTags(input))
		.map((style) => truncate(style.textContent ?? '', SOURCE_LIMITS.stylesheetContentChars))
		.filter(Boolean);

	const cssomStyles = input === globalThis.document ? collectStylesheetRules() : [];
	return limitStringsByTotalChars(
		[...inlineStyles, ...cssomStyles],
		SOURCE_LIMITS.stylesheetContentItems,
		SOURCE_LIMITS.stylesheetContentTotalChars,
	);
}

/** Retain bounded link URLs and semantic attributes required by registry link rules. */
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

/** Collect bounded CSSOM rules from stylesheets Chromium allows this page to inspect. */
export function collectStylesheetRules(): string[] {
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

/** Query a supplied DOM root or reuse the caller's preselected script iterable without another document scan. */
function* iterateScripts(input: ScriptSourceInput): Iterable<HTMLScriptElement> {
	if (isParentNode(input)) {
		yield* input.querySelectorAll('script') as Iterable<HTMLScriptElement>;
		return;
	}

	yield* input;
}

/** Restrict both DOM-root and iterable inputs to stylesheet relationships. */
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

/** Query style tags for a DOM root or reuse already selected style nodes. */
function* iterateStyleTags(input: StylesheetContentInput): Iterable<HTMLStyleElement> {
	if (isParentNode(input)) {
		yield* input.querySelectorAll('style');
		return;
	}

	yield* input;
}

/** Select href-bearing links for a DOM root while trusting an explicitly supplied iterable. */
function* iterateLinks(input: LinkTagInput): Iterable<HTMLLinkElement> {
	if (isParentNode(input)) {
		yield* input.querySelectorAll('link[href]') as Iterable<HTMLLinkElement>;
		return;
	}

	yield* input;
}

/** Select meta nodes from a DOM root or reuse the caller's existing selection. */
function* iterateMetaTags(input: MetaTagInput): Iterable<HTMLMetaElement> {
	if (isParentNode(input)) {
		yield* input.querySelectorAll('meta') as Iterable<HTMLMetaElement>;
		return;
	}

	yield* input;
}

/** Select src/srcset-bearing images from a DOM root or reuse the caller's image iterable. */
function* iterateImages(input: ImageSourceInput): Iterable<HTMLImageElement> {
	if (isParentNode(input)) {
		yield* input.querySelectorAll('img[src], img[srcset]') as Iterable<HTMLImageElement>;
		return;
	}

	yield* input;
}

/** Distinguish queryable DOM roots from supplied element iterables without relying on a realm-specific constructor. */
function isParentNode(value: unknown): value is ParentNode {
	return typeof value === 'object' && value !== null && 'querySelectorAll' in value;
}

/** Recognize the stylesheet relation token through DOMTokenList or a case-insensitive textual fallback. */
function isStylesheetLink(link: HTMLLinkElement): boolean {
	return link.relList.contains('stylesheet') || /(^|\s)stylesheet(\s|$)/i.test(link.rel);
}

/** Resolve relative resources against the page; preserve nonempty authored text when URL parsing fails. */
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
