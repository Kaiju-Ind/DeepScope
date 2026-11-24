import type { CollectPageSignalsInput, HtmlProbe } from '../messaging/analysis';
import { SOURCE_LIMITS } from '../detection/source-limits';
import type { DetectionRule, TechnologyDefinition } from '../detection/types';
import * as domPlan from '../dom/plan';
import type { DomPlanType } from '../dom/plan';

/** Collection tiers used by the extension visible-tab runtime. */
export const COLLECTION_TIERS = ['initial', 'enrichment'] as const;

/** Detection collection tier for one visible-tab pass. */
export type CollectionTier = typeof COLLECTION_TIERS[number];

/** Evidence pass ids used by the continuous visible-tab collection scheduler. */
export type CollectionEvidencePassId = 'initial' | 'html' | 'headers' | 'text' | 'source-content';

/**
 * Runtime cost assigned to a collector surface in the compiled collection plan.
 *
 * Cheap surfaces read bounded page metadata or keyed values that already exist
 * in the document. Expensive surfaces read large text payloads, run many HTML
 * regexes, or fetch same-origin source content. Keeping the cost in the compiled
 * plan lets the extension choose a smaller first pass before asking for richer
 * evidence later.
 */
export const COLLECTION_COSTS = ['cheap', 'expensive', 'unsupported'] as const;

/** Cost bucket used by collection planning and diagnostics. */
export type CollectionCost = typeof COLLECTION_COSTS[number];

/** Count of registry rules assigned to each collection cost bucket. */
export type CollectionPlanCostSummary = Readonly<Record<CollectionCost, number>>;

/** Rule surfaces the extension can collect immediately from the active page. */
const CHEAP_RULE_KINDS = Object.freeze({
	cookie: true,
	dom: true,
	jsGlobal: true,
	imageSrc: true,
	link: true,
	meta: true,
	requestUrl: true,
	resourceUrl: true,
	scriptSrc: true,
	storage: true,
	stylesheetHref: true,
	url: true,
} satisfies Partial<Record<DetectionRule['kind'], true>>);

/** Rule surfaces that require broad text reads or network source enrichment. */
const EXPENSIVE_RULE_KINDS = Object.freeze({
	header: true,
	html: true,
	probe: true,
	responseHeader: true,
	scriptContent: true,
	stylesheetContent: true,
	text: true,
} satisfies Partial<Record<DetectionRule['kind'], true>>);

/**
 * One executable collector tier derived from registry needs.
 *
 * Initial tiers favor already-visible document facts. Enrichment tiers enable
 * broad text, HTML, header, and source-content collection after the side panel has a
 * useful first result to render.
 */
export type CollectionTierPlan = {
	/** Tier represented by this plan. */
	tier: CollectionTier;
	/** Parsed DOM selector metadata used to route live element checks. */
	domSelectorPlan: DomPlanType;
	/** HTML regexes serialized so the content script can run bounded matches. */
	htmlProbeList: HtmlProbe[];
	/** Page global names the background reads through an injected script. */
	jsGlobalPropertyList: string[];
	/** Whether response headers can contribute evidence in this tier. */
	needsHeaders: boolean;
	/** Whether same-origin script text can contribute evidence in this tier. */
	needsScriptContent: boolean;
	/** Whether same-origin stylesheet text can contribute evidence in this tier. */
	needsStylesheetContent: boolean;
	/** Whether visible text can contribute evidence in this tier. */
	needsText: boolean;
	/** Whether storage keys should be collected in this tier. */
	needsStorage: boolean;
};

/** One executable evidence pass in the continuous visible-tab runtime. */
export type CollectionEvidencePass = {
	/** Stable pass id used for logs, snapshots, and tests. */
	readonly id: CollectionEvidencePassId;
	/** Collector plan that captures only the evidence surface for this pass. */
	readonly plan: CollectionTierPlan;
};

/** Signals the background should ask collectors to capture for the active registry. */
export type CollectionPlan = {
	/** Cheap first-pass collection work used before the side panel renders. */
	initial: CollectionTierPlan;
	/** Deeper collection work that can run after first detections are visible. */
	enrichment: CollectionTierPlan;
	/** Rule count summary that explains how much work can stay on the cheap path. */
	costSummary: CollectionPlanCostSummary;
};

const EMPTY_DOM_SELECTOR_PLAN = domPlan.empty;

/** Build the collection plan needed by the active technology registry. */
export function buildCollectionPlan(
	registry: readonly TechnologyDefinition[],
): CollectionPlan {
	const domSelectorPlan = domPlan.create(getDomSelectors(registry));
	const htmlProbeList = buildHtmlProbeList(registry);
	const jsGlobalPropertyList = buildJsGlobalPropertyList(registry);
	const needsHeaders = hasRegistryRuleKind(registry, 'header') || hasRegistryRuleKind(registry, 'responseHeader');
	const needsScriptContent = hasRegistryRuleKind(registry, 'scriptContent');
	const needsStylesheetContent = hasRegistryRuleKind(registry, 'stylesheetContent');
	const needsText = hasRegistryRuleKind(registry, 'text');
	const needsStorage = hasRegistryRuleKind(registry, 'storage');
	const initial: CollectionTierPlan = {
		tier: 'initial',
		domSelectorPlan,
		htmlProbeList: [],
		jsGlobalPropertyList,
		needsHeaders: false,
		needsScriptContent: false,
		needsStylesheetContent: false,
		needsText: false,
		needsStorage,
	};
	const enrichment: CollectionTierPlan = {
		tier: 'enrichment',
		domSelectorPlan,
		htmlProbeList,
		jsGlobalPropertyList,
		needsHeaders,
		needsScriptContent,
		needsStylesheetContent,
		needsText,
		needsStorage,
	};

	return {
		initial,
		enrichment,
		costSummary: createCollectionPlanCostSummary(registry),
	};
}


/**
 * Split full-registry collection needs into small evidence passes.
 *
 * The initial pass collects cheap facts that are already present in the page:
 * URLs, resources, scripts, stylesheets, meta tags, DOM selectors, storage keys,
 * cookies, and page globals. Follow-up passes ask for one expensive surface at a
 * time. Each pass can produce a normal detector revision, which avoids the old
 * bootstrap-then-enrichment contract where the side panel waited for one large
 * deferred result.
 */
export function createIncrementalCollectionPasses(
	plan: CollectionPlan,
): readonly CollectionEvidencePass[] {
	const passes: CollectionEvidencePass[] = [{ id: 'initial', plan: plan.initial }];
	const htmlPass = createCollectionTierPlan('enrichment', {
		domSelectorPlan: EMPTY_DOM_SELECTOR_PLAN,
		htmlProbeList: plan.enrichment.htmlProbeList,
		jsGlobalPropertyList: [],
		needsHeaders: false,
		needsScriptContent: false,
		needsStylesheetContent: false,
		needsText: false,
		needsStorage: false,
	});
	const headerPass = createCollectionTierPlan('enrichment', {
		domSelectorPlan: EMPTY_DOM_SELECTOR_PLAN,
		htmlProbeList: [],
		jsGlobalPropertyList: [],
		needsHeaders: plan.enrichment.needsHeaders,
		needsScriptContent: false,
		needsStylesheetContent: false,
		needsText: false,
		needsStorage: false,
	});
	const textPass = createCollectionTierPlan('enrichment', {
		domSelectorPlan: EMPTY_DOM_SELECTOR_PLAN,
		htmlProbeList: [],
		jsGlobalPropertyList: [],
		needsHeaders: false,
		needsScriptContent: false,
		needsStylesheetContent: false,
		needsText: plan.enrichment.needsText,
		needsStorage: false,
	});
	const sourceContentPass = createCollectionTierPlan('enrichment', {
		domSelectorPlan: EMPTY_DOM_SELECTOR_PLAN,
		htmlProbeList: [],
		jsGlobalPropertyList: [],
		needsHeaders: false,
		needsScriptContent: plan.enrichment.needsScriptContent,
		needsStylesheetContent: plan.enrichment.needsStylesheetContent,
		needsText: false,
		needsStorage: false,
	});
	appendCollectionEvidencePass(passes, 'html', htmlPass);
	appendCollectionEvidencePass(passes, 'headers', headerPass);
	appendCollectionEvidencePass(passes, 'text', textPass);
	appendCollectionEvidencePass(passes, 'source-content', sourceContentPass);

	return passes;
}

function appendCollectionEvidencePass(
	passes: CollectionEvidencePass[],
	id: CollectionEvidencePassId,
	plan: CollectionTierPlan,
): void {
	if (hasCollectionTierPlanWork(plan)) {
		passes.push({ id, plan });
	}
}

/** Return whether a pass asks any collector to do real work. */
export function hasCollectionTierPlanWork(plan: CollectionTierPlan): boolean {
	return (
		plan.domSelectorPlan.selectors.length > 0 ||
		plan.htmlProbeList.length > 0 ||
		plan.jsGlobalPropertyList.length > 0 ||
		plan.needsHeaders ||
		plan.needsScriptContent ||
		plan.needsStylesheetContent ||
		plan.needsText ||
		plan.needsStorage
	);
}

function createCollectionTierPlan(
	tier: CollectionTier,
	fields: Omit<CollectionTierPlan, 'tier'>,
): CollectionTierPlan {
	return Object.assign({ tier }, fields);
}

/** Convert a collection plan to the content-script request shape. */
export function toCollectPageSignalsInput(
	plan: CollectionPlan | CollectionTierPlan,
	tier: CollectionTier = 'initial',
	timingTraceId?: string,
): CollectPageSignalsInput {
	const tierPlan = getCollectionTierPlan(plan, tier);
	return {
		tier: tierPlan.tier,
		includeHtml: tierPlan.htmlProbeList.length > 0,
		includeText: tierPlan.needsText,
		includeScriptContent: tierPlan.needsScriptContent,
		includeStylesheetContent: tierPlan.needsStylesheetContent,
		includeStorageKeys: tierPlan.needsStorage,
		domSelectorPlan: tierPlan.domSelectorPlan,
		htmlProbeList: tierPlan.htmlProbeList,
		...(timingTraceId ? { timingTraceId } : {}),
	};
}

/** Return the executable tier plan from a full plan or an already-selected tier. */
export function getCollectionTierPlan(
	plan: CollectionPlan | CollectionTierPlan,
	tier: CollectionTier = 'initial',
): CollectionTierPlan {
	if ('initial' in plan && 'enrichment' in plan) {
		return tier === 'initial' ? plan.initial : plan.enrichment;
	}

	return plan;
}

/** Return the unique DOM selectors authored by the active registry. */
function getDomSelectors(registry: readonly TechnologyDefinition[]): string[] {
	const selectors = new Set<string>();
	for (const technology of registry) {
		for (const rule of technology.rules) {
			if (rule.kind === 'dom' && rule.selector) selectors.add(rule.selector);
		}
	}
	return [...selectors];
}

function buildHtmlProbeList(registry: readonly TechnologyDefinition[]): HtmlProbe[] {
	const probes: HtmlProbe[] = [];

	for (const technology of registry) {
		for (const [ruleIndex, rule] of technology.rules.entries()) {
			if (rule.kind !== 'html' || !rule.pattern) {
				continue;
			}

			probes.push({
				technologyId: technology.id,
				ruleIndex,
				source: rule.pattern.source,
				flags: rule.pattern.flags,
			});
		}
	}

	return probes;
}

function buildJsGlobalPropertyList(registry: readonly TechnologyDefinition[]): string[] {
	const propertyPaths = new Set<string>();

	for (const technology of registry) {
		for (const rule of technology.rules) {
			if (rule.kind === 'jsGlobal' && rule.property) {
				propertyPaths.add(rule.property);
			}
			if (propertyPaths.size >= SOURCE_LIMITS.jsGlobals) {
				return [...propertyPaths];
			}
		}
	}

	return [...propertyPaths];
}

function createCollectionPlanCostSummary(
	registry: readonly TechnologyDefinition[],
): CollectionPlanCostSummary {
	const summary: Record<CollectionCost, number> = {
		cheap: 0,
		expensive: 0,
		unsupported: 0,
	};

	for (const technology of registry) {
		for (const rule of technology.rules) {
			summary[getRuleCollectionCost(rule)] += 1;
		}
	}

	return Object.freeze(summary);
}

function hasRegistryRuleKind(
	registry: readonly TechnologyDefinition[],
	kind: DetectionRule['kind'],
): boolean {
	for (const technology of registry) {
		for (const rule of technology.rules) {
			if (rule.kind === kind) {
				return true;
			}
		}
	}

	return false;
}

function getRuleCollectionCost(rule: DetectionRule): CollectionCost {
	if (hasRuleKind(CHEAP_RULE_KINDS, rule.kind)) {
		return 'cheap';
	}
	if (hasRuleKind(EXPENSIVE_RULE_KINDS, rule.kind)) {
		return 'expensive';
	}

	return 'unsupported';
}

/** Lookup membership stays type-safe even when new rule kinds are added. */
function hasRuleKind(
	lookup: Partial<Record<DetectionRule['kind'], true>>,
	kind: DetectionRule['kind'],
): boolean {
	return Object.prototype.hasOwnProperty.call(lookup, kind);
}
