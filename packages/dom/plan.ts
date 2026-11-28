import selectorParser from 'postcss-selector-parser';

/** Attributes always relevant to page metadata and resource detection. */
const BASE_ATTRIBUTES = Object.freeze([
	'class', 'content', 'href', 'http-equiv', 'id', 'name', 'property', 'rel', 'src',
]);

/** Pseudo-classes whose truth can change when children are inserted or removed. */
const POSITION_PSEUDOS = new Set([
	':first-child', ':first-of-type', ':last-child', ':last-of-type',
	':nth-child', ':nth-last-child', ':nth-last-of-type', ':nth-of-type',
	':only-child', ':only-of-type',
]);

/** Parsed routing metadata for one registry selector. */
export type DomProbeType = {
	readonly selector: string;
	readonly valid: boolean;
	readonly tags: readonly string[];
	readonly attributes: readonly string[];
	readonly ids: readonly string[];
	readonly classes: readonly string[];
	readonly observedAttributes: readonly string[];
	readonly needsElementTraversal: boolean;
};

/** Cheap element signals used to route structural invalidation without DOM queries. */
export type DomSignalType = {
	readonly tags: readonly string[];
	readonly attributes: readonly string[];
	readonly ids: readonly string[];
	readonly classes: readonly string[];
	/** True when the compound has no cheap tag, attribute, id, or class route. */
	readonly unrouteable: boolean;
};

/** One sibling combinator whose left compound can activate an existing right-side match. */
export type DomSiblingType = {
	readonly kind: 'adjacent' | 'following';
	readonly left: DomSignalType;
	/** Whether the right side can contain the final matching element below the sibling root. */
	readonly deep: boolean;
};

/** Mutation regions that can make an existing element newly satisfy a selector. */
export type DomMutationType = {
	/** Recheck the mutation parent after child-list changes. */
	readonly parentOnChildList: boolean;
	/** Scan the parent subtree when a structural pseudo precedes the final subject. */
	readonly parentDeepOnChildList: boolean;
	/** Recheck ancestors after descendant structure changes, primarily for `:has()`. */
	readonly ancestorsOnChildList: boolean;
	/** Scan ancestor subtrees when `:has()` appears before a later subject compound. */
	readonly ancestorDeepOnChildList: boolean;
	/** Sibling relationships routed from the changed node's cheap element signals. */
	readonly siblings: readonly DomSiblingType[];
	/** Attribute changes that can change matches below the mutated element. */
	readonly descendantAttributes: readonly string[];
	/** Attribute changes that can change matches on sibling elements. */
	readonly siblingAttributes: readonly string[];
	/** Attribute changes that can change matches on ancestors, primarily for `:has()`. */
	readonly ancestorAttributes: readonly string[];
	/** Fall back to one time-sliced document scan for structural syntax we cannot invalidate locally. */
	readonly documentOnChildList: boolean;
	/** Attribute changes that require the same conservative document-level structural scan. */
	readonly documentAttributes: readonly string[];
};

/** Compiled DOM selector plan used by live content-script matching. */
export type DomPlanType = {
	readonly selectors: readonly string[];
	readonly probes: readonly DomProbeType[];
	readonly attributeFilter: readonly string[];
	readonly selectorsByTag: Readonly<Record<string, readonly string[]>>;
	readonly selectorsByAttribute: Readonly<Record<string, readonly string[]>>;
	readonly selectorsById: Readonly<Record<string, readonly string[]>>;
	readonly selectorsByClass: Readonly<Record<string, readonly string[]>>;
	readonly selectorsWithoutRoute: readonly string[];
	readonly mutation: DomMutationType;
};

/** Empty selector plan used by evidence passes that do not collect DOM rules. */
export const empty: DomPlanType = Object.freeze({
	selectors: Object.freeze([]),
	probes: Object.freeze([]),
	attributeFilter: BASE_ATTRIBUTES,
	selectorsByTag: Object.freeze({}),
	selectorsByAttribute: Object.freeze({}),
	selectorsById: Object.freeze({}),
	selectorsByClass: Object.freeze({}),
	selectorsWithoutRoute: Object.freeze([]),
	mutation: Object.freeze({
		parentOnChildList: false,
		parentDeepOnChildList: false,
		ancestorsOnChildList: false,
		ancestorDeepOnChildList: false,
		siblings: Object.freeze([]),
		descendantAttributes: Object.freeze([]),
		siblingAttributes: Object.freeze([]),
		ancestorAttributes: Object.freeze([]),
		documentOnChildList: false,
		documentAttributes: Object.freeze([]),
	}),
});

/** Compile registry selectors into element routes and mutation invalidation metadata. */
export function create(selectors: readonly string[]): DomPlanType {
	const probes = selectors.map(parse);
	const observed = values(probes, 'observedAttributes');
	const descendantAttributes = new Set<string>();
	const siblingAttributes = new Set<string>();
	const ancestorAttributes = new Set<string>();
	const documentAttributes = new Set<string>();
	const siblings: DomSiblingType[] = [];
	let parentOnChildList = false;
	let parentDeepOnChildList = false;
	let ancestorsOnChildList = false;
	let ancestorDeepOnChildList = false;
	let documentOnChildList = false;

	for (const selector of selectors) {
		const impact = inspect(selector);
		if (!impact.valid) continue;
		parentOnChildList ||= impact.parentOnChildList;
		parentDeepOnChildList ||= impact.parentDeepOnChildList;
		ancestorsOnChildList ||= impact.ancestorsOnChildList;
		ancestorDeepOnChildList ||= impact.ancestorDeepOnChildList;
		documentOnChildList ||= impact.documentOnChildList;
		siblings.push(...impact.siblings);
		for (const attribute of impact.descendantAttributes) descendantAttributes.add(attribute);
		for (const attribute of impact.siblingAttributes) siblingAttributes.add(attribute);
		for (const attribute of impact.ancestorAttributes) ancestorAttributes.add(attribute);
		for (const attribute of impact.documentAttributes) documentAttributes.add(attribute);
	}

	return Object.freeze({
		selectors: Object.freeze([...selectors]),
		probes: Object.freeze(probes),
		attributeFilter: Object.freeze(unique([...BASE_ATTRIBUTES, ...observed])),
		selectorsByTag: freezeRoutes(routes(probes, 'tags')),
		selectorsByAttribute: freezeRoutes(routes(probes, 'attributes')),
		selectorsById: freezeRoutes(routes(probes, 'ids')),
		selectorsByClass: freezeRoutes(routes(probes, 'classes')),
		selectorsWithoutRoute: Object.freeze(probes
			.filter((probe) => probe.valid && probe.needsElementTraversal)
			.map((probe) => probe.selector)),
		mutation: Object.freeze({
			parentOnChildList,
			parentDeepOnChildList,
			ancestorsOnChildList,
			ancestorDeepOnChildList,
			siblings: Object.freeze(siblings),
			descendantAttributes: Object.freeze([...descendantAttributes]),
			siblingAttributes: Object.freeze([...siblingAttributes]),
			ancestorAttributes: Object.freeze([...ancestorAttributes]),
			documentOnChildList,
			documentAttributes: Object.freeze([...documentAttributes]),
		}),
	});
}

/** Parse one selector for signals present on its right-most matching element. */
function parse(selector: string): DomProbeType {
	const tags = new Set<string>();
	const attributes = new Set<string>();
	const ids = new Set<string>();
	const classes = new Set<string>();
	const observedAttributes = new Set<string>();
	let valid = true;
	let needsElementTraversal = false;

	try {
		const root = selectorParser().astSync(selector);
		root.walkAttributes((node) => addLower(observedAttributes, node.attribute));
		root.walkClasses(() => { observedAttributes.add('class'); });
		root.walkIds(() => { observedAttributes.add('id'); });
		for (const branch of root.nodes) {
			const signals = getSignals(subject(branch.nodes));
			for (const value of signals.tags) tags.add(value);
			for (const value of signals.attributes) attributes.add(value);
			for (const value of signals.ids) ids.add(value);
			for (const value of signals.classes) classes.add(value);
			needsElementTraversal ||= signals.unrouteable;
		}
	} catch {
		// Invalid authored selectors must not make one page mutation fail. Registry
		// validation reports the malformed rule separately from live collection.
		valid = false;
	}

	return Object.freeze({
		selector,
		valid,
		tags: Object.freeze([...tags]),
		attributes: Object.freeze([...attributes]),
		ids: Object.freeze([...ids]),
		classes: Object.freeze([...classes]),
		observedAttributes: Object.freeze([...observedAttributes]),
		needsElementTraversal,
	});
}

/** Internal structural impact returned by the selector parser. */
type ImpactType = DomMutationType & { readonly valid: boolean };

/**
 * Derive mutation regions that can make existing elements newly match.
 *
 * The content observer scans newly inserted subtrees automatically. Structural
 * selectors need extra work because the element that becomes a match can already
 * exist elsewhere. For example, inserting `A` before an existing `B` can create
 * `A + B`. We retain cheap signals from the left compound so the observer only
 * rechecks the affected sibling instead of rescanning every sibling subtree.
 */
function inspect(selector: string): ImpactType {
	const observed = new Set<string>();
	const siblings: DomSiblingType[] = [];
	let parentOnChildList = false;
	let parentDeepOnChildList = false;
	let ancestorsOnChildList = false;
	let ancestorDeepOnChildList = false;
	let documentOnChildList = false;
	let hasCombinator = false;
	let hasSibling = false;
	let hasHas = false;
	let hasNestedStructure = false;

	try {
		const root = selectorParser().astSync(selector);
		root.walkAttributes((node) => addLower(observed, node.attribute));
		root.walkClasses(() => { observed.add('class'); });
		root.walkIds(() => { observed.add('id'); });

		for (const branch of root.nodes) {
			const nodes = branch.nodes;
			const lastCombinator = findLastCombinator(nodes);
			let compoundStart = 0;
			for (let index = 0; index < nodes.length; index += 1) {
				const node = nodes[index]!;
				if (node.type !== 'combinator') continue;
				hasCombinator = true;
				const value = node.value.trim();
				if (value === '+' || value === '~') {
					hasSibling = true;
					siblings.push(Object.freeze({
						kind: value === '+' ? 'adjacent' : 'following',
						left: getSignals(nodes.slice(compoundStart, index)),
						deep: index < lastCombinator,
					}));
				}
				compoundStart = index + 1;
			}

			for (let index = 0; index < nodes.length; index += 1) {
				const node = nodes[index]!;
				if (node.type !== 'pseudo') continue;
				const value = node.value.toLowerCase();
				const beforeSubject = index < subjectStart(nodes);
				hasNestedStructure ||= hasNestedSelectorStructure(node) || (POSITION_PSEUDOS.has(value) && Boolean(node.nodes?.length));
				if (value === ':has') {
					hasHas = true;
					ancestorsOnChildList = true;
					ancestorDeepOnChildList ||= beforeSubject;
				}
				if (value === ':empty' || POSITION_PSEUDOS.has(value)) {
					parentOnChildList = true;
					parentDeepOnChildList ||= beforeSubject;
				}
			}
		}

		// Nested structural pseudo/combinator syntax is uncommon in the current
		// registry. Walk it conservatively so future authored rules remain correct.
		root.walkCombinators((node) => {
			hasCombinator = true;
			if (node.value.trim() === '+' || node.value.trim() === '~') hasSibling = true;
		});
		root.walkPseudos((node) => {
			const value = node.value.toLowerCase();
			if (value === ':has') {
				hasHas = true;
				ancestorsOnChildList = true;
			}
			if (value === ':empty' || POSITION_PSEUDOS.has(value)) parentOnChildList = true;
		});

		// Nested selectors can combine sibling, positional, and `:has()` semantics in
		// ways that no single local mutation region describes safely. Keep ordinary
		// selectors on the cheap local path, but preserve correctness for future
		// registry rules by falling back to one time-sliced document scan.
		documentOnChildList = hasNestedStructure || (hasHas && hasSibling);
	} catch {
		return invalidImpact();
	}

	const attributes = [...observed];
	return {
		valid: true,
		parentOnChildList,
		parentDeepOnChildList,
		ancestorsOnChildList,
		ancestorDeepOnChildList,
		siblings,
		descendantAttributes: hasCombinator ? attributes : [],
		siblingAttributes: hasSibling ? attributes : [],
		ancestorAttributes: hasHas ? attributes : [],
		documentOnChildList,
		documentAttributes: documentOnChildList ? attributes : [],
	};
}

/** Return the no-op impact used when an authored selector cannot be parsed safely. */
function invalidImpact(): ImpactType {
	return {
		valid: false,
		parentOnChildList: false,
		parentDeepOnChildList: false,
		ancestorsOnChildList: false,
		ancestorDeepOnChildList: false,
		siblings: [],
		descendantAttributes: [],
		siblingAttributes: [],
		ancestorAttributes: [],
		documentOnChildList: false,
		documentAttributes: [],
	};
}

/** Return whether a pseudo contains selector syntax that needs conservative invalidation. */
function hasNestedSelectorStructure(node: selectorParser.Pseudo): boolean {
	if (!node.nodes?.length) return false;
	let structural = false;
	node.walkCombinators(() => {
		structural = true;
	});
	node.walkPseudos((nested) => {
		const value = nested.value.toLowerCase();
		if (value === ':has' || value === ':empty' || POSITION_PSEUDOS.has(value)) structural = true;
	});
	return structural;
}

/** Return cheap signals for one compound selector without evaluating it in the DOM. */
function getSignals(nodes: readonly selectorParser.Node[]): DomSignalType {
	const tags = new Set<string>();
	const attributes = new Set<string>();
	const ids = new Set<string>();
	const classes = new Set<string>();
	for (const node of nodes) {
		switch (node.type) {
			case 'tag': addLower(tags, node.value); break;
			case 'attribute': addLower(attributes, node.attribute); break;
			case 'id': addExact(ids, node.value); break;
			case 'class': addExact(classes, node.value); break;
		}
	}
	const routed = tags.size + attributes.size + ids.size + classes.size > 0;
	return Object.freeze({
		tags: Object.freeze([...tags]),
		attributes: Object.freeze([...attributes]),
		ids: Object.freeze([...ids]),
		classes: Object.freeze([...classes]),
		unrouteable: !routed,
	});
}

/** Return the right-most compound whose element owns the final selector match. */
function subject(nodes: readonly selectorParser.Node[]): readonly selectorParser.Node[] {
	return nodes.slice(subjectStart(nodes));
}

/** Return the first node index of the right-most selector compound. */
function subjectStart(nodes: readonly selectorParser.Node[]): number {
	return findLastCombinator(nodes) + 1;
}

/** Return the final top-level combinator index, or -1 for one compound. */
function findLastCombinator(nodes: readonly selectorParser.Node[]): number {
	let index = -1;
	for (let current = 0; current < nodes.length; current += 1) {
		if (nodes[current]?.type === 'combinator') index = current;
	}
	return index;
}

/** Collect unique probe values for one routing field. */
function values(
	probes: readonly DomProbeType[],
	key: 'tags' | 'attributes' | 'ids' | 'classes' | 'observedAttributes',
): string[] {
	return unique(probes.flatMap((probe) => probe[key]));
}

/** Build a selector lookup keyed by one cheap element signal. */
function routes(
	probes: readonly DomProbeType[],
	key: 'tags' | 'attributes' | 'ids' | 'classes',
): Record<string, string[]> {
	const result: Record<string, string[]> = Object.create(null) as Record<string, string[]>;
	for (const probe of probes) {
		if (!probe.valid) continue;
		for (const value of probe[key]) (result[value] ??= []).push(probe.selector);
	}
	return result;
}

/** Freeze and deduplicate one route table before it crosses collection call sites. */
function freezeRoutes(routes: Record<string, string[]>): Readonly<Record<string, readonly string[]>> {
	const result: Record<string, readonly string[]> = Object.create(null) as Record<string, readonly string[]>;
	for (const [key, selectors] of Object.entries(routes)) result[key] = Object.freeze(unique(selectors));
	return Object.freeze(result);
}

/** Add one normalized case-insensitive selector signal when it is non-empty. */
function addLower(target: Set<string>, value: string | undefined): boolean {
	const normalized = value?.trim().toLowerCase() ?? '';
	if (!normalized) return false;
	target.add(normalized);
	return true;
}

/** Add one case-sensitive id or class signal when it is non-empty. */
function addExact(target: Set<string>, value: string | undefined): boolean {
	const normalized = value?.trim() ?? '';
	if (!normalized) return false;
	target.add(normalized);
	return true;
}

/** Preserve first-seen order while removing empty and duplicate values. */
function unique(values: readonly string[]): string[] {
	return [...new Set(values.filter(Boolean))];
}
