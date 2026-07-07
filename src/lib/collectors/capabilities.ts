import type { RuntimeDetectionKind } from '../detection/types';

/**
 * Describes whether the browser extension can collect a rule source today.
 *
 * The detector supports more rule kinds than the extension can currently feed.
 * Keeping that gap explicit prevents a rule file from looking supported just
 * because the engine knows how to match it. A future command-line scanner can
 * use a different capability table without changing the rule schema.
 */
export type ExtensionCollectorSupport =
	| 'collected'
	| 'partially-collected'
	| 'derived'
	| 'not-implemented';

/**
 * One rule-source capability for the browser extension collector.
 */
export type ExtensionCollectorCapability = {
	/** Rule kind from the detector schema. */
	kind: RuntimeDetectionKind;
	/** Whether the extension collector can provide useful data for this kind today. */
	support: ExtensionCollectorSupport;
	/** Where the data comes from when the extension can provide it. */
	source: string;
	/** Practical limitation a rule author should know before relying on this kind. */
	note: string;
};

const CAPABILITIES: readonly ExtensionCollectorCapability[] = [
	{
		kind: 'dom',
		support: 'collected',
		source: 'content script',
		note: 'The content script checks planned selectors with querySelector.',
	},
	{
		kind: 'html',
		support: 'collected',
		source: 'content script',
		note: 'The content script captures bounded HTML and planned HTML matches.',
	},
	{
		kind: 'scriptSrc',
		support: 'collected',
		source: 'content script',
		note: 'Script URLs come from script tags and observed DOM changes.',
	},
	{
		kind: 'stylesheetHref',
		support: 'collected',
		source: 'content script',
		note: 'Stylesheet URLs come from stylesheet link tags and observed DOM changes.',
	},
	{
		kind: 'resourceUrl',
		support: 'partially-collected',
		source: 'content script performance API',
		note: 'Resource URLs come from browser timing entries, not from full network capture.',
	},
	{
		kind: 'requestUrl',
		support: 'derived',
		source: 'content script performance API',
		note: 'Request URL signals are derived from resource timing entries.',
	},
	{
		kind: 'scriptContent',
		support: 'partially-collected',
		source: 'content script and background fetch',
		note: 'Inline scripts are read in the content script. Same-origin external scripts are fetched in the background.',
	},
	{
		kind: 'stylesheetContent',
		support: 'partially-collected',
		source: 'content script and background fetch',
		note: 'Inline and accessible CSS rules are read in the content script. Same-origin stylesheets are fetched in the background.',
	},
	{
		kind: 'cookie',
		support: 'partially-collected',
		source: 'content script',
		note: 'Only cookie names visible through document.cookie are collected.',
	},
	{
		kind: 'header',
		support: 'partially-collected',
		source: 'background fetch',
		note: 'The background can read headers from a bounded same-page HEAD request, not from all browser requests.',
	},
	{
		kind: 'responseHeader',
		support: 'partially-collected',
		source: 'background fetch',
		note: 'Response header rules use the same bounded page HEAD request as header rules.',
	},
	{
		kind: 'requestHeader',
		support: 'not-implemented',
		source: 'not collected by the extension',
		note: 'Request headers need a later permission and design decision.',
	},
	{
		kind: 'jsGlobal',
		support: 'collected',
		source: 'injected script',
		note: 'The background injects a short script into the page so it can read page-owned JavaScript globals.',
	},
	{
		kind: 'meta',
		support: 'collected',
		source: 'content script',
		note: 'Meta tags come from the initial scan and observed DOM changes.',
	},
	{
		kind: 'link',
		support: 'collected',
		source: 'content script',
		note: 'Link tags come from the initial scan and observed DOM changes.',
	},
	{
		kind: 'storage',
		support: 'partially-collected',
		source: 'content script',
		note: 'Only localStorage and sessionStorage keys are collected, not values.',
	},
	{
		kind: 'url',
		support: 'collected',
		source: 'content script',
		note: 'The current document URL is part of every page signal snapshot.',
	},
	{
		kind: 'text',
		support: 'collected',
		source: 'content script',
		note: 'Visible text is bounded before it leaves the content script.',
	},
	{
		kind: 'robots',
		support: 'not-implemented',
		source: 'not collected by the extension',
		note: 'robots.txt fetching is a later collector decision, not part of the current visible-tab collector.',
	},
	{
		kind: 'dns',
		support: 'not-implemented',
		source: 'not collected by the extension',
		note: 'DNS lookup belongs in a future collector, likely the CLI first.',
	},
	{
		kind: 'certIssuer',
		support: 'not-implemented',
		source: 'not collected by the extension',
		note: 'Certificate details are not available through the current extension collector path.',
	},
	{
		kind: 'probe',
		support: 'not-implemented',
		source: 'not collected by the extension',
		note: 'Active probe requests are intentionally deferred so phase 3 does not expand permissions or network behavior.',
	},
] as const;

/**
 * Browser-extension collector support by detector rule kind.
 *
 * Use this table when deciding whether a rule kind is supported by the current
 * extension path. The detector may still support matching a kind when fixtures,
 * tests, or a future CLI provide that data.
 */
export const EXTENSION_COLLECTOR_CAPABILITIES = CAPABILITIES;

const CAPABILITY_BY_KIND: Readonly<Record<RuntimeDetectionKind, ExtensionCollectorCapability>> = Object.freeze(
	Object.fromEntries(CAPABILITIES.map((capability) => [capability.kind, capability])) as Record<RuntimeDetectionKind, ExtensionCollectorCapability>,
);

/** Return the browser-extension collector support record for one detector rule kind. */
export function getExtensionCollectorCapability(
	kind: RuntimeDetectionKind,
): ExtensionCollectorCapability {
	return CAPABILITY_BY_KIND[kind];
}

/** Return rule kinds that the browser-extension collector does not feed today. */
export function listUnsupportedExtensionCollectorKinds(): RuntimeDetectionKind[] {
	return CAPABILITIES
		.filter((capability) => capability.support === 'not-implemented')
		.map((capability) => capability.kind);
}
