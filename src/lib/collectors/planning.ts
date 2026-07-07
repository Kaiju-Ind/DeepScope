import selectorParser from 'postcss-selector-parser';

import type { CollectPageSignalsInput, HtmlProbe } from '../contracts/analysis';
import { SOURCE_LIMITS } from '../detection/source-limits';
import type { DetectionRule, TechnologyDefinition } from '../detection/types';

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
 * broad text, HTML, header, and source-content collection after the popup has a
 * useful first result to render.
 */
export type CollectionTierPlan = {
	/** Tier represented by this plan. */
	tier: CollectionTier;
	/** DOM selectors the content script should resolve through the parsed selector plan. */
	selectorProbeList: string[];
	/** Parsed DOM selector metadata used to preselect candidate elements. */
	domSelectorPlan: DomSelectorPlan;
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

/** Parsed selector metadata for one DOM detection rule. */
export type DomSelectorProbe = {
	/** Original selector string preserved as the observation key. */
	readonly selector: string;
	/** Element tag names referenced by the selector. */
	readonly tags: readonly string[];
	/** Attribute names referenced by the selector. */
	readonly attributes: readonly string[];
	/** Element ids referenced by the selector. */
	readonly ids: readonly string[];
	/** Class names referenced by the selector. */
	readonly classes: readonly string[];
};

/** Compiled DOM selector prefilter derived from all DOM rules in one tier. */
export type DomSelectorPlan = {
	/** Original selector strings in registry order. */
	readonly selectors: readonly string[];
	/** Per-selector parsed metadata. */
	readonly probes: readonly DomSelectorProbe[];
	/** Combined selector used to collect candidate elements in one DOM query. */
	readonly candidateSelector: string;
	/** All tag names referenced by DOM rules. */
	readonly tags: readonly string[];
	/** All attribute names referenced by DOM rules. */
	readonly attributes: readonly string[];
	/** All ids referenced by DOM rules. */
	readonly ids: readonly string[];
	/** All class names referenced by DOM rules. */
	readonly classes: readonly string[];
	/** Attributes the mutation observer should ask the browser to filter. */
	readonly attributeFilter: readonly string[];
	/** Selector keys routed by tag name. */
	readonly selectorsByTag: Readonly<Record<string, readonly string[]>>;
	/** Selector keys routed by attribute name. */
	readonly selectorsByAttribute: Readonly<Record<string, readonly string[]>>;
	/** Selector keys routed by id. */
	readonly selectorsById: Readonly<Record<string, readonly string[]>>;
	/** Selector keys routed by class name. */
	readonly selectorsByClass: Readonly<Record<string, readonly string[]>>;
};

/** One executable evidence pass in the continuous visible-tab runtime. */
export type CollectionEvidencePass = {
	/** Stable pass id used for logs, snapshots, and tests. */
	readonly id: CollectionEvidencePassId;
	/** Collector plan that captures only the evidence surface for this pass. */
	readonly plan: CollectionTierPlan;
};

/**
 * Signals the background should ask collectors to capture for the active registry.
 *
 * The top-level fields mirror the initial tier for compatibility with older
 * callers, while `initial` and `enrichment` make the progressive runtime explicit.
 */
export type CollectionPlan = CollectionTierPlan & {
	/** Cheap first-pass collection work used before the popup renders. */
	initial: CollectionTierPlan;
	/** Deeper collection work that can run after first detections are visible. */
	enrichment: CollectionTierPlan;
	/** Rule count summary that explains how much work can stay on the cheap path. */
	costSummary: CollectionPlanCostSummary;
};

const BASE_DOM_OBSERVER_ATTRIBUTES = Object.freeze([
	'class',
	'content',
	'href',
	'http-equiv',
	'id',
	'name',
	'property',
	'rel',
	'src',
]);

const EMPTY_DOM_SELECTOR_PLAN: DomSelectorPlan = Object.freeze({
	selectors: Object.freeze([]),
	probes: Object.freeze([]),
	candidateSelector: '',
	tags: Object.freeze([]),
	attributes: Object.freeze([]),
	ids: Object.freeze([]),
	classes: Object.freeze([]),
	attributeFilter: BASE_DOM_OBSERVER_ATTRIBUTES,
	selectorsByTag: Object.freeze({}),
	selectorsByAttribute: Object.freeze({}),
	selectorsById: Object.freeze({}),
	selectorsByClass: Object.freeze({}),
});

/** Build the collection plan needed by the active technology registry. */
export function buildCollectionPlan(
	registry: readonly TechnologyDefinition[],
): CollectionPlan {
	const selectorProbeList = buildSelectorProbeList(registry);
	const domSelectorPlan = buildDomSelectorPlan(selectorProbeList);
	const htmlProbeList = buildHtmlProbeList(registry);
	const jsGlobalPropertyList = buildJsGlobalPropertyList(registry);
	const needsHeaders = hasRegistryRuleKind(registry, 'header') || hasRegistryRuleKind(registry, 'responseHeader');
	const needsScriptContent = hasRegistryRuleKind(registry, 'scriptContent');
	const needsStylesheetContent = hasRegistryRuleKind(registry, 'stylesheetContent');
	const needsText = hasRegistryRuleKind(registry, 'text');
	const needsStorage = hasRegistryRuleKind(registry, 'storage');
	const initial: CollectionTierPlan = {
		tier: 'initial',
		selectorProbeList,
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
		selectorProbeList,
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
		...initial,
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
 * bootstrap-then-enrichment contract where the popup waited for one large
 * deferred result.
 */
export function createIncrementalCollectionPasses(
	plan: CollectionPlan,
): readonly CollectionEvidencePass[] {
	const passes: CollectionEvidencePass[] = [{ id: 'initial', plan: plan.initial }];
	const htmlPass = createCollectionTierPlan('enrichment', {
		selectorProbeList: [],
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
		selectorProbeList: [],
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
		selectorProbeList: [],
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
		selectorProbeList: [],
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
		plan.selectorProbeList.length > 0 ||
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
	tier: CollectionTier = plan.tier,
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
		selectorProbeList: tierPlan.selectorProbeList,
		domSelectorPlan: tierPlan.domSelectorPlan,
		htmlProbeList: tierPlan.htmlProbeList,
		...(timingTraceId ? { timingTraceId } : {}),
	};
}

/** Return the executable tier plan from a full plan or an already-selected tier. */
export function getCollectionTierPlan(
	plan: CollectionPlan | CollectionTierPlan,
	tier: CollectionTier,
): CollectionTierPlan {
	if ('initial' in plan && 'enrichment' in plan) {
		return tier === 'initial' ? plan.initial : plan.enrichment;
	}

	return plan;
}

function buildSelectorProbeList(registry: readonly TechnologyDefinition[]): string[] {
	const selectors = new Set<string>();

	for (const technology of registry) {
		for (const rule of technology.rules) {
			if (rule.kind === 'dom' && rule.selector) {
				selectors.add(rule.selector);
			}
		}
	}

	return [...selectors];
}

function buildDomSelectorPlan(selectors: readonly string[]): DomSelectorPlan {
	const probes = selectors.map(parseDomSelectorProbe);
	const tags = collectUniqueProbeValues(probes, 'tags');
	const attributes = collectUniqueProbeValues(probes, 'attributes');
	const ids = collectUniqueProbeValues(probes, 'ids');
	const classes = collectUniqueProbeValues(probes, 'classes');
	const candidateSelector = buildDomCandidateSelector({ tags, attributes, ids, classes });

	return Object.freeze({
		selectors: Object.freeze([...selectors]),
		probes: Object.freeze(probes),
		candidateSelector,
		tags: Object.freeze(tags),
		attributes: Object.freeze(attributes),
		ids: Object.freeze(ids),
		classes: Object.freeze(classes),
		attributeFilter: Object.freeze(uniqueStrings([...BASE_DOM_OBSERVER_ATTRIBUTES, ...attributes])),
		selectorsByTag: freezeSelectorRouteMap(buildSelectorRouteMap(probes, 'tags')),
		selectorsByAttribute: freezeSelectorRouteMap(buildSelectorRouteMap(probes, 'attributes')),
		selectorsById: freezeSelectorRouteMap(buildSelectorRouteMap(probes, 'ids')),
		selectorsByClass: freezeSelectorRouteMap(buildSelectorRouteMap(probes, 'classes')),
	});
}

function parseDomSelectorProbe(selector: string): DomSelectorProbe {
	const tags = new Set<string>();
	const attributes = new Set<string>();
	const ids = new Set<string>();
	const classes = new Set<string>();

	try {
		const root = selectorParser().astSync(selector);
		root.walkTags((node) => {
			const value = normalizeSelectorSignal(node.value);
			if (value) tags.add(value);
		});
		root.walkAttributes((node) => {
			const value = normalizeSelectorSignal(node.attribute);
			if (value) attributes.add(value);
		});
		root.walkIds((node) => {
			const value = normalizeCaseSensitiveSelectorSignal(node.value);
			if (value) ids.add(value);
		});
		root.walkClasses((node) => {
			const value = normalizeCaseSensitiveSelectorSignal(node.value);
			if (value) classes.add(value);
		});
	} catch {
		// Invalid selectors simply produce no prefilter signals. The collector
		// intentionally avoids falling back to the old full selector probe loop.
	}

	return Object.freeze({
		selector,
		tags: Object.freeze([...tags]),
		attributes: Object.freeze([...attributes]),
		ids: Object.freeze([...ids]),
		classes: Object.freeze([...classes]),
	});
}

function buildDomCandidateSelector(input: {
	readonly tags: readonly string[];
	readonly attributes: readonly string[];
	readonly ids: readonly string[];
	readonly classes: readonly string[];
}): string {
	return uniqueStrings([
		...input.tags.map(cssIdentifier),
		...input.attributes.map((attribute) => `[${cssIdentifier(attribute)}]`),
		...input.ids.map((id) => `#${cssIdentifier(id)}`),
		...input.classes.map((className) => `.${cssIdentifier(className)}`),
	]).join(',');
}

function collectUniqueProbeValues(
	probes: readonly DomSelectorProbe[],
	key: 'tags' | 'attributes' | 'ids' | 'classes',
): string[] {
	return uniqueStrings(probes.flatMap((probe) => probe[key]));
}

function buildSelectorRouteMap(
	probes: readonly DomSelectorProbe[],
	key: 'tags' | 'attributes' | 'ids' | 'classes',
): Record<string, string[]> {
	const routes: Record<string, string[]> = Object.create(null) as Record<string, string[]>;

	for (const probe of probes) {
		for (const value of probe[key]) {
			const selectors = routes[value] ?? (routes[value] = []);
			selectors.push(probe.selector);
		}
	}

	return routes;
}

function freezeSelectorRouteMap(
	routes: Record<string, string[]>,
): Readonly<Record<string, readonly string[]>> {
	const frozen: Record<string, readonly string[]> = Object.create(null) as Record<string, readonly string[]>;
	for (const [key, selectors] of Object.entries(routes)) {
		frozen[key] = Object.freeze(uniqueStrings(selectors));
	}
	return Object.freeze(frozen);
}

function normalizeSelectorSignal(value: string | undefined): string {
	return normalizeCaseSensitiveSelectorSignal(value).toLowerCase();
}

function normalizeCaseSensitiveSelectorSignal(value: string | undefined): string {
	return value?.trim() ?? '';
}

function uniqueStrings(values: readonly string[]): string[] {
	return [...new Set(values.filter(Boolean))];
}

function cssIdentifier(value: string): string {
	return value.replace(/^[0-9-]|[^A-Za-z0-9_-]/g, (character, offset) => {
		const codePoint = character.codePointAt(0)?.toString(16).toUpperCase() ?? '0';
		const suffix = offset === value.length - 1 ? '' : ' ';
		return `\\${codePoint}${suffix}`;
	});
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
