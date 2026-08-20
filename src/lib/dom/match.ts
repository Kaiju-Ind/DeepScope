import type { DomPlanType } from './plan';

/** Maximum elements checked before one live DOM scan yields to the page. */
const DEFAULT_ELEMENTS_PER_SLICE = 256;

/** Cooperative time target for one uninterrupted live DOM scan slice. */
const DEFAULT_SLICE_MS = 4;

/** Runtime and test controls for one live DOM selector scan. */
export type MatchOptionsType = {
	/** Selectors already observed for this document and retired from later scans. */
	readonly matched?: { readonly has: (selector: string) => boolean };
	/** Visit each walked element once so other mutation collectors can share the traversal. */
	readonly visit?: (element: Element) => void;
	/** Traverse descendants when true; false rechecks only an element root. */
	readonly deep?: boolean;
	/** Maximum elements checked before yielding even when the time target is not exhausted. */
	readonly elementsPerSlice?: number;
	/** Cooperative continuous-work target before yielding to other renderer tasks. */
	readonly sliceMs?: number;
	/** Stop future work when the owning document session is released. */
	readonly signal?: AbortSignal;
	/** Scheduler operation injected by tests or hosts with a preferred yield primitive. */
	readonly yield?: () => Promise<void>;
	/** Optional diagnostic projection for representative renderer-churn measurements. */
	readonly onStats?: (stats: MatchStatsType) => void;
};

/** Bounded work measurements for one live DOM scan. */
export type MatchStatsType = {
	/** Elements visited in the authoritative live DOM. */
	readonly elementCount: number;
	/** Native `Element.matches()` calls issued after cheap routing. */
	readonly selectorCheckCount: number;
	/** Positive selectors discovered during this scan. */
	readonly matchCount: number;
	/** Cooperative yields performed to return control to the renderer. */
	readonly yieldCount: number;
	/** Wall-clock duration including cooperative yields. */
	readonly durationMs: number;
	/** Whether cancellation stopped the scan before ordinary completion. */
	readonly aborted: boolean;
};

/**
 * Match compiled technology selectors against the authoritative live DOM.
 *
 * The content script must not serialize the page into an offscreen document, but
 * it also must not monopolize the renderer main thread. This walker therefore
 * routes each element to a small selector set, retires positive evidence for the
 * rest of the document session, and yields cooperatively between both elements
 * and selector checks. `sliceMs` is a scheduling target, not a hard CPU deadline:
 * a single native `Element.matches()` call cannot be preempted after it starts.
 *
 * The caller owns mutation invalidation. Structural selectors such as `A + B`,
 * `:empty`, positional pseudo-classes, and `:has()` can require existing siblings,
 * parents, or ancestors to be rechecked even when they are outside the newly
 * inserted subtree. `DomPlanType.mutation` describes those extra regions.
 */
export async function match(
	plan: DomPlanType | undefined,
	root: ParentNode,
	options: MatchOptionsType = {},
): Promise<Record<string, boolean>> {
	const pending = getPending(plan, options.matched);
	const matches: Record<string, boolean> = Object.create(null) as Record<string, boolean>;
	const routes = new Set<string>();
	const budget = createBudget(options);
	const startedAt = now();
	let elementCount = 0;
	let selectorCheckCount = 0;

	try {
		for (const element of elements(root, options.deep !== false)) {
			if (options.signal?.aborted) break;
			elementCount += 1;
			options.visit?.(element);
			if (!plan || pending.size === 0) {
				if (await budget.step(options.signal)) break;
				continue;
			}

			getRoutes(plan, element, routes);
			for (const selector of routes) {
				if (options.signal?.aborted) break;
				if (pending.has(selector)) {
					selectorCheckCount += 1;
					if (safeMatch(element, selector)) {
						matches[selector] = true;
						pending.delete(selector);
					}
				}
				if (await budget.check(options.signal)) break;
			}
			if (options.signal?.aborted || pending.size === 0) break;
			if (await budget.step(options.signal)) break;
		}
		return matches;
	} finally {
		options.onStats?.({
			elementCount,
			selectorCheckCount,
			matchCount: Object.keys(matches).length,
			yieldCount: budget.yields(),
			durationMs: Math.max(0, now() - startedAt),
			aborted: options.signal?.aborted === true,
		});
	}
}

/** Keep only valid selectors that have not already produced sticky evidence. */
function getPending(
	plan: DomPlanType | undefined,
	matched: { readonly has: (selector: string) => boolean } | undefined,
): Set<string> {
	const pending = new Set<string>();
	if (!plan) return pending;
	for (const probe of plan.probes) {
		if (probe.valid && !matched?.has(probe.selector)) pending.add(probe.selector);
	}
	return pending;
}

/** Route one element without allocating selector arrays on the hot path. */
function getRoutes(plan: DomPlanType, element: Element, result: Set<string>): void {
	result.clear();
	add(result, plan.selectorsWithoutRoute);
	add(result, plan.selectorsByTag[element.localName.toLowerCase()]);
	for (const attribute of element.getAttributeNames()) add(result, plan.selectorsByAttribute[attribute.toLowerCase()]);
	if (element.id) add(result, plan.selectorsById[element.id]);
	for (const className of element.classList) add(result, plan.selectorsByClass[className]);
}

/** Add routed selectors to the reusable per-element candidate set. */
function add(target: Set<string>, selectors: readonly string[] | undefined): void {
	if (!selectors) return;
	for (const selector of selectors) target.add(selector);
}

/** Browser selector failures are authored-registry defects, not page failures. */
function safeMatch(element: Element, selector: string): boolean {
	try {
		return element.matches(selector);
	} catch {
		return false;
	}
}

/**
 * Iterate one root and its descendants without materializing a candidate NodeList.
 *
 * Chromium uses `TreeWalker`. The query-selector fallback exists only for test
 * DOMs and older host shims that do not provide `Document.createTreeWalker()`.
 */
function* elements(root: ParentNode, deep: boolean): Iterable<Element> {
	if (isElement(root)) yield root;
	if (!deep) return;
	const document = getDocument(root);
	if (document?.createTreeWalker) {
		const walker = document.createTreeWalker(root, showElements());
		for (let node = walker.nextNode(); node; node = walker.nextNode()) {
			if (isElement(node)) yield node;
		}
		return;
	}
	for (const element of root.querySelectorAll('*')) yield element;
}

/** Resolve the document that owns a TreeWalker for the supplied root. */
function getDocument(root: ParentNode): Document | undefined {
	if (isDocument(root)) return root;
	return (root as ParentNode & { readonly ownerDocument?: Document | null }).ownerDocument ?? globalThis.document;
}

/** Resolve the TreeWalker element mask in browser and lightweight test runtimes. */
function showElements(): number {
	return typeof globalThis.NodeFilter === 'undefined' ? 1 : globalThis.NodeFilter.SHOW_ELEMENT;
}

/** Narrow a scan root to the live Document constructor when available. */
function isDocument(value: unknown): value is Document {
	return typeof globalThis.Document !== 'undefined' && value instanceof globalThis.Document;
}

/** Narrow a walked value to the live Element constructor when available. */
function isElement(value: unknown): value is Element {
	return typeof globalThis.Element !== 'undefined' && value instanceof globalThis.Element;
}

/** Mutable slice state shared across element and selector checks. */
type BudgetType = {
	/** Count one completed element and yield when either scheduling target is reached. */
	readonly step: (signal?: AbortSignal) => Promise<boolean>;
	/** Yield between selector checks when the time target is already exhausted. */
	readonly check: (signal?: AbortSignal) => Promise<boolean>;
	/** Read the number of cooperative yields performed so far. */
	readonly yields: () => number;
};

/** Create one cooperative scheduler budget without putting policy in the observer. */
function createBudget(options: MatchOptionsType): BudgetType {
	const elementLimit = positiveInteger(options.elementsPerSlice, DEFAULT_ELEMENTS_PER_SLICE);
	const timeLimit = positiveNumber(options.sliceMs, DEFAULT_SLICE_MS);
	const yieldControl = options.yield ?? yieldRenderer;
	let elementCount = 0;
	let yieldCount = 0;
	let startedAt = now();

	/** Yield after the configured time or element budget, then report cancellation. */
	async function yieldIfNeeded(forceElementCheck: boolean, signal?: AbortSignal): Promise<boolean> {
		if (signal?.aborted) return true;
		const timeExpired = now() - startedAt >= timeLimit;
		const elementExpired = forceElementCheck && elementCount >= elementLimit;
		if (!timeExpired && !elementExpired) return false;
		await yieldControl();
		yieldCount += 1;
		if (signal?.aborted) return true;
		elementCount = 0;
		startedAt = now();
		return false;
	}

	return {
		async step(signal) {
			elementCount += 1;
			return await yieldIfNeeded(true, signal);
		},
		async check(signal) {
			return await yieldIfNeeded(false, signal);
		},
		yields() {
			return yieldCount;
		},
	};
}

/** Yield without requiring one browser-specific scheduling API. */
async function yieldRenderer(): Promise<void> {
	const scheduler = (globalThis as typeof globalThis & {
		readonly scheduler?: { yield?: () => Promise<void> };
	}).scheduler;
	if (scheduler?.yield) {
		await scheduler.yield();
		return;
	}
	await new Promise<void>((resolve) => globalThis.setTimeout(resolve, 0));
}

/** Read a monotonic timer when the host exposes one. */
function now(): number {
	return globalThis.performance?.now?.() ?? Date.now();
}

/** Normalize an optional positive integer scheduling option. */
function positiveInteger(value: number | undefined, fallback: number): number {
	return value !== undefined && Number.isInteger(value) && value > 0 ? value : fallback;
}

/** Normalize an optional positive finite scheduling option. */
function positiveNumber(value: number | undefined, fallback: number): number {
	return value !== undefined && Number.isFinite(value) && value > 0 ? value : fallback;
}
