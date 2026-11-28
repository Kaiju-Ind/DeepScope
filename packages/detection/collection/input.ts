import type { DomPlanType } from '@deepscope/dom/plan';

/** Serializable HTML pattern probe sent to the content script. */
export type HtmlProbe = {
	/** Technology that owns the original HTML rule. */
	technologyId: string;
	/** Index of the rule inside that technology's rule list. */
	ruleIndex: number;
	/** Regular expression source without slashes. */
	source: string;
	/** Regular expression flags, such as `i`. */
	flags: string;
};

/**
 * Request sent from the background to the content script for event observation capture.
 *
 * The content runtime reads the live Chromium document directly. DOM selector
 * matching is time-sliced and mutation-driven, and no DOM tree or serialized DOM
 * copy crosses the extension runtime channel. The RPC response is normalized
 * observations.
 */
export type CollectPageSignalsInput = {
	/** Collection tier represented by this request. */
	tier?: 'initial' | 'enrichment';
	/** Whether the content script should include bounded page HTML text. */
	includeHtml?: boolean;
	/** Whether visible text should be collected for text rules. */
	includeText?: boolean;
	/** Whether inline script text should be collected for script-content rules. */
	includeScriptContent?: boolean;
	/** Whether inline and accessible stylesheet text should be collected for stylesheet-content rules. */
	includeStylesheetContent?: boolean;
	/** Whether localStorage and sessionStorage keys should be collected. */
	includeStorageKeys?: boolean;
	/** Parsed DOM selector metadata used to route live element checks. */
	domSelectorPlan?: DomPlanType;
	/** HTML regex probes serialized for the content script. */
	htmlProbeList?: HtmlProbe[];
	/** Optional debug id used only to correlate summary timing logs. */
	timingTraceId?: string;
};
