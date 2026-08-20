import {
	collectImageSources,
	collectLinkTags,
	collectMetaTags,
	collectResourceTimings,
	collectScriptContents,
	collectScriptSources,
	collectStylesheetContents,
	collectStylesheetRules,
	collectStylesheetSources,
} from '../collect-page-signals';
import { mergeStringsByTotalChars } from '../../detection/normalizers';
import { SOURCE_LIMITS } from '../../detection/source-limits';
import * as dom from '../../dom';
import type { DomPlanType, MatchStatsType } from '../../dom';
import type { SnapshotOptionsType, SnapshotType } from './types';

/** Inputs for one bounded live-DOM scan. */
export type ScanType = {
	/** Authoritative live DOM root to inspect. */
	readonly root: ParentNode;
	/** Whether descendants are included or only an element root is rechecked. */
	readonly deep: boolean;
	/** Evidence surfaces enabled for this scan. */
	readonly content: SnapshotOptionsType;
	/** Compiled registry selector routes. */
	readonly plan?: DomPlanType;
	/** Sticky positive selectors already observed in the current document session. */
	readonly matched: { readonly has: (selector: string) => boolean };
	/** Cancellation owned by the current document session. */
	readonly signal?: AbortSignal;
	/** Diagnostic hook that receives bounded renderer-work measurements. */
	readonly onStats?: (stats: MatchStatsType) => void;
};

/** Create one sparse evidence object that never contains live DOM nodes. */
export function empty(): SnapshotType {
	return {
		images: [],
		scripts: [],
		stylesheets: [],
		links: [],
		resources: [],
		requests: [],
		scriptContents: [],
		stylesheetContents: [],
		meta: {},
		dom: { selectors: {} },
	};
}

/**
 * Scan one DOM region once for resource evidence and technology selectors.
 *
 * The selector matcher owns the TreeWalker and exposes every visited element to
 * this collector. Resource and metadata extraction therefore share the same
 * time-sliced traversal instead of issuing independent descendant queries.
 */
export async function node(input: ScanType): Promise<SnapshotType> {
	const snapshot = empty();
	const selectors = await dom.match(input.plan, input.root, {
		deep: input.deep,
		matched: input.matched,
		...(input.signal ? { signal: input.signal } : {}),
		...(input.onStats ? { onStats: input.onStats } : {}),
		visit(element) {
			collect(snapshot, element, input.content);
		},
	});
	snapshot.dom = { selectors };
	return snapshot;
}

/**
 * Scan the complete live document and add document-wide browser evidence.
 *
 * Full CSSOM and Performance Timeline reads belong here. Focused mutation scans
 * deliberately avoid both operations so a busy SPA does not repeatedly reread
 * global browser state for one changed subtree.
 */
export async function page(input: Omit<ScanType, 'root' | 'deep'>): Promise<SnapshotType> {
	const snapshot = await node({ ...input, root: globalThis.document, deep: true });
	const resources = collectResourceTimings();
	snapshot.resources = resources;
	snapshot.requests = resources.map((resource) => ({ url: resource.url, type: resource.initiatorType }));
	if (input.content.includeStylesheetContent) {
		snapshot.stylesheetContents = mergeStringsByTotalChars(
			snapshot.stylesheetContents,
			collectStylesheetRules(),
			SOURCE_LIMITS.stylesheetContentItems,
			SOURCE_LIMITS.stylesheetContentChars,
			SOURCE_LIMITS.stylesheetContentTotalChars,
		);
	}
	return snapshot;
}

/** Collect one visited element without walking its descendants again. */
function collect(snapshot: SnapshotType, element: Element, content: SnapshotOptionsType): void {
	if (isImage(element)) {
		append(snapshot.images, collectImageSources([element]), SOURCE_LIMITS.imageSrc);
		return;
	}
	if (isScript(element)) {
		append(snapshot.scripts, collectScriptSources([element]), SOURCE_LIMITS.scriptSrc);
		if (content.includeScriptContent) {
			snapshot.scriptContents = mergeStringsByTotalChars(
				snapshot.scriptContents,
				collectScriptContents([element]),
				SOURCE_LIMITS.scriptContentItems,
				SOURCE_LIMITS.scriptContentChars,
				SOURCE_LIMITS.scriptContentTotalChars,
			);
		}
		return;
	}
	if (isStyle(element)) {
		if (content.includeStylesheetContent) {
			snapshot.stylesheetContents = mergeStringsByTotalChars(
				snapshot.stylesheetContents,
				collectStylesheetContents([element]),
				SOURCE_LIMITS.stylesheetContentItems,
				SOURCE_LIMITS.stylesheetContentChars,
				SOURCE_LIMITS.stylesheetContentTotalChars,
			);
		}
		return;
	}
	if (isLink(element)) {
		append(snapshot.stylesheets, collectStylesheetSources([element]), SOURCE_LIMITS.stylesheetHref);
		append(snapshot.links, collectLinkTags([element]), SOURCE_LIMITS.linkTags);
		return;
	}
	if (isMeta(element)) mergeMeta(snapshot.meta, collectMetaTags([element]));
}

/** Append bounded values to one temporary mutation snapshot. */
function append<T>(target: T[], values: readonly T[], limit: number): void {
	for (const value of values) {
		if (target.length >= limit) break;
		target.push(value);
	}
}

/** Merge bounded per-element metadata into one temporary mutation snapshot. */
function mergeMeta(target: Record<string, string[]>, source: Record<string, string[]>): void {
	for (const [key, values] of Object.entries(source)) {
		const bucket = target[key] ?? (target[key] = []);
		for (const value of values) {
			if (bucket.length >= SOURCE_LIMITS.metaValuesPerKey) break;
			if (!bucket.includes(value)) bucket.push(value);
		}
	}
}

/** Narrow a visited element to a script evidence source. */
function isScript(element: Element): element is HTMLScriptElement {
	return typeof globalThis.HTMLScriptElement !== 'undefined' && element instanceof globalThis.HTMLScriptElement;
}

/** Narrow a visited element to an inline stylesheet evidence source. */
function isStyle(element: Element): element is HTMLStyleElement {
	return typeof globalThis.HTMLStyleElement !== 'undefined' && element instanceof globalThis.HTMLStyleElement;
}

/** Narrow a visited element to a link or stylesheet reference source. */
function isLink(element: Element): element is HTMLLinkElement {
	return typeof globalThis.HTMLLinkElement !== 'undefined' && element instanceof globalThis.HTMLLinkElement;
}

/** Narrow a visited element to a document metadata source. */
function isMeta(element: Element): element is HTMLMetaElement {
	return typeof globalThis.HTMLMetaElement !== 'undefined' && element instanceof globalThis.HTMLMetaElement;
}

/** Narrow a visited element to an image source candidate. */
function isImage(element: Element): element is HTMLImageElement {
	return typeof globalThis.HTMLImageElement !== 'undefined' && element instanceof globalThis.HTMLImageElement;
}
