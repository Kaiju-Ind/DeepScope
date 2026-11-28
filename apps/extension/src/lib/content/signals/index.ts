import type { PageSignals } from "@deepscope/detection/types";
import type { CollectPageSignalsInput } from "@deepscope/detection/collection/input";
import type { TimingContext } from "../../diagnostics/timing.ts";
import { timeSyncSpan, timeAsyncSpan } from "../../diagnostics/timing.ts";
import { mergeStringsByTotalChars, truncate } from "@deepscope/detection/normalizers";
import { SOURCE_LIMITS } from "@deepscope/detection/limits";
import * as dom from "@deepscope/dom";
import { collectHtmlProbeMatches, boundedHtml } from "./html.ts";
import { collectResourceTimings, resourceToRequestSignal } from "./resources.ts";
import { collectImageSources, collectScriptSources, collectStylesheetSources, collectLinkTags, collectScriptContents, collectStylesheetContents, collectMetaTags } from "./elements.ts";
import { collectStorageKeys, collectCookieNames } from "./keys.ts";

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

/**
 * Collect the requested page signals for the current document.
 *
 * The content entrypoint supplies Chrome's incognito context. When true, timing
 * diagnostics omit page identity and raw failures. Ordinary documents default to
 * false; the returned signals retain the data needed by the in-memory matcher.
 */
export async function collectPageSignals(
	input: CollectPageSignalsInput,
	runtime: RuntimePageSignals = {},
	incognito = false,
): Promise<PageSignals> {
	const timingContext: TimingContext = {
		traceId: input.timingTraceId,
		surface: 'content',
		incognito,
		details: {
			...(!incognito && { hostname: globalThis.location.hostname }),
			tier: input.tier ?? 'initial',
		},
	};
	const selectorCount = input.domSelectorPlan?.selectors.length ?? 0;
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
		async () => runtime.dom?.selectors ?? dom.match(input.domSelectorPlan, globalThis.document),
		(values) => ({
			selectorCount,
			selectorMatchCount: Object.values(values).filter(Boolean).length,
			runtimeSelectorMatchCount: Object.values(runtime.dom?.selectors ?? {}).filter(Boolean).length,
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

/** Prefer rendered body text, fall back to document text and enforce the shared text character limit. */
function collectVisibleText(): string {
	const text = globalThis.document.body?.innerText ?? globalThis.document.documentElement.textContent ?? '';
	return truncate(text, SOURCE_LIMITS.textChars);
}
