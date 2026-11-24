import selectorParser from 'postcss-selector-parser';

/**
 * Element-level selector routing for the live DOM walker.
 *
 * `Element.matches()` is the expensive operation in a content script. Firefox
 * reaches page DOM through Xray wrappers, so each call crosses a compartment
 * boundary. The walker therefore asks this module for the selectors that could
 * plausibly match one element and calls `matches()` only for those.
 *
 * Routing invariants:
 *
 * 1. Every test here is a necessary condition. A selector rejected by routing
 *    can never match the element, so the matched set is identical to calling
 *    `matches()` for every pending selector.
 * 2. Each comma branch is reduced to the simple selectors of its right-most
 *    compound: type, id, classes, and attribute tests. Pseudo-classes,
 *    pseudo-elements, combinators, and the left side of the branch are left to
 *    `matches()`. Ignoring a condition can only admit more candidates.
 * 3. Every comparison is ASCII case-insensitive. Browsers compare type selectors,
 *    HTML attribute names, some attribute values, and quirks-mode ids and classes
 *    case-insensitively, while others are case-sensitive. Folding both sides is a
 *    superset of every case rule, so routing never depends on document mode,
 *    element namespace, or the `i` and `s` attribute flags.
 * 4. A namespaced attribute test such as `[xlink|href]` imposes no condition,
 *    because the live attribute name can carry a prefix the selector omits.
 * 5. Each branch lives in exactly one bucket, chosen by id, then class, then
 *    type, then attribute name. A branch with none of those lives in `rest` and is
 *    considered for every element.
 * 6. Within a bucket, branches with a value test are grouped behind one guard
 *    expression that is the union of their relaxed value tests (see `BucketType`).
 *
 * The route is derived from `DomPlanType.selectors` inside the content script so
 * the serialized collection plan keeps its existing shape.
 */

/** One attribute requirement from a branch subject compound. */
export type TestType = {
	/** ASCII-folded attribute name. */
	readonly name: string;
	/** CSS attribute operator, absent for presence tests. */
	readonly op?: string;
	/** ASCII-folded attribute value, absent for presence tests. */
	readonly value?: string;
};

/** Necessary element conditions for one comma branch of one selector. */
export type BranchType = {
	/** Full registry selector passed to `matches()` when every condition holds. */
	readonly selector: string;
	/** ASCII-folded local name, absent for universal or missing type selectors. */
	readonly tag?: string;
	/**
	 * ASCII-folded first id of the compound. Later ids are left to `matches()`, so
	 * routing never depends on how an engine treats a compound such as `#a#b`.
	 */
	readonly id?: string;
	/** ASCII-folded class tokens that must all be present. */
	readonly classes: readonly string[];
	/** Attribute presence and value tests that must all hold. */
	readonly tests: readonly TestType[];
};

/**
 * Branches that share one routing key, split by their first attribute value test.
 *
 * Most registry selectors look like `link[href*='vendor']`. Thousands of
 * elements carry `href`, so testing every such branch separately would still
 * cost hundreds of string comparisons per element. A guard joins the relaxed
 * value tests of every branch in a group into one regular expression. When the
 * expression fails, no branch in the group can match and all of them are skipped
 * with one test.
 */
export type BucketType = {
	/** Branches without a value test; each is tested separately. */
	readonly open: readonly BranchType[];
	/** Branch groups admitted only when their combined value test passes. */
	readonly guards: readonly GuardType[];
};

/** Branches whose first value test reads the same attribute. */
export type GuardType = {
	/** ASCII-folded attribute name read by every branch in the group. */
	readonly name: string;
	/** Union of the relaxed value tests; failing it rejects every branch. */
	readonly pattern: RegExp;
	readonly branches: readonly BranchType[];
};

/** Branch buckets indexed by the single signal that admits them. */
export type RouteType = {
	readonly byId: ReadonlyMap<string, BucketType>;
	readonly byClass: ReadonlyMap<string, BucketType>;
	readonly byTag: ReadonlyMap<string, BucketType>;
	readonly byAttribute: ReadonlyMap<string, BucketType>;
	/** Branches without a cheap signal; considered for every element. */
	readonly rest: BucketType;
	/** Number of indexed branches, used by diagnostics and tests. */
	readonly size: number;
};

/** Cheap element signals read once per visited element. */
export type SignalsType = {
	readonly element: Element;
	readonly tag: string;
	/** ASCII-folded values of every attribute whose name folds to `id`. */
	readonly ids: readonly string[];
	readonly classes: ReadonlySet<string>;
	/** Folded attribute name to every live attribute name with that folding. */
	readonly names: ReadonlyMap<string, readonly string[]>;
	/** Lazily read folded attribute values keyed by folded name. */
	readonly values: Map<string, readonly string[]>;
};

/** Routes keyed by selector list identity; one session reuses one plan object. */
const byList = new WeakMap<readonly string[], RouteType>();

/** Last compiled list by content, for plans re-sent as structurally equal copies. */
let last: { readonly key: string; readonly route: RouteType } | undefined;

/** Return the route for one selector list, compiling each distinct list once. */
export function get(selectors: readonly string[]): RouteType {
	const known = byList.get(selectors);
	if (known) return known;
	const key = selectors.join('\n');
	const route = last?.key === key ? last.route : compile(selectors);
	last = { key, route };
	byList.set(selectors, route);
	return route;
}

/** Compile selectors into branch buckets. Unparseable selectors are omitted. */
export function compile(selectors: readonly string[]): RouteType {
	const byId = new Map<string, BranchType[]>();
	const byClass = new Map<string, BranchType[]>();
	const byTag = new Map<string, BranchType[]>();
	const byAttribute = new Map<string, BranchType[]>();
	const rest: BranchType[] = [];
	let size = 0;

	for (const selector of new Set(selectors)) {
		for (const branch of parse(selector)) {
			size += 1;
			if (branch.id !== undefined) push(byId, branch.id, branch);
			else if (branch.classes[0] !== undefined) push(byClass, branch.classes[0], branch);
			else if (branch.tag !== undefined) push(byTag, branch.tag, branch);
			else if (branch.tests[0] !== undefined) push(byAttribute, branch.tests[0].name, branch);
			else rest.push(branch);
		}
	}
	return {
		byId: buckets(byId),
		byClass: buckets(byClass),
		byTag: buckets(byTag),
		byAttribute: buckets(byAttribute),
		rest: bucket(rest),
		size,
	};
}

/** Convert every keyed branch list into a guarded bucket. */
function buckets(source: ReadonlyMap<string, readonly BranchType[]>): Map<string, BucketType> {
	const result = new Map<string, BucketType>();
	for (const [key, branches] of source) result.set(key, bucket(branches));
	return result;
}

/** Group branches by their first value test so one expression can reject a group. */
function bucket(branches: readonly BranchType[]): BucketType {
	const open: BranchType[] = [];
	const groups = new Map<string, { sources: string[]; branches: BranchType[] }>();
	for (const branch of branches) {
		const condition = branch.tests.find((item) => source(item) !== undefined);
		if (!condition) {
			open.push(branch);
			continue;
		}
		let group = groups.get(condition.name);
		if (!group) groups.set(condition.name, group = { sources: [], branches: [] });
		group.sources.push(source(condition)!);
		group.branches.push(branch);
	}
	const guards = [...groups].map(([name, group]): GuardType => ({
		name,
		pattern: new RegExp([...new Set(group.sources)].join('|')),
		branches: group.branches,
	}));
	return { open, guards };
}

/** Return the relaxed regular-expression form of one attribute value test. */
function source(condition: TestType): string | undefined {
	if (!condition.value) return undefined;
	const value = condition.value.replace(/[\\^$.*+?()[\]{}|/-]/g, '\\$&');
	switch (condition.op) {
		case '=': return `^${value}$`;
		case '^=':
		case '|=': return `^${value}`;
		case '$=': return `${value}$`;
		case '*=':
		case '~=': return value;
		default: return undefined;
	}
}

/**
 * Read the cheap signals of one element.
 *
 * Only the attribute names, `id`, and `class` are read eagerly. Other attribute
 * values are read on demand by `test()` and cached for the element, so most
 * elements cost a constant number of DOM calls regardless of registry size.
 */
export function read(element: Element): SignalsType {
	const names = new Map<string, string[]>();
	for (const name of element.getAttributeNames()) {
		const folded = fold(name);
		const list = names.get(folded);
		if (list) list.push(name);
		else names.set(folded, [name]);
	}
	const signals: SignalsType = { element, tag: fold(element.localName), ids: [], classes: new Set(), names, values: new Map() };
	const ids = names.has('id') ? values(signals, 'id') : [];
	const classes = new Set<string>();
	if (names.has('class')) {
		for (const value of values(signals, 'class')) {
			for (const token of value.split(SPACE)) if (token) classes.add(token);
		}
	}
	return { ...signals, ids, classes };
}

/** Return folded values for one folded attribute name, reading the DOM once. */
function values(signals: SignalsType, name: string): readonly string[] {
	let result = signals.values.get(name);
	if (result) return result;
	result = (signals.names.get(name) ?? []).map((raw) => fold(signals.element.getAttribute(raw) ?? ''));
	signals.values.set(name, result);
	return result;
}

/**
 * Visit every branch whose necessary conditions hold for one element.
 *
 * `admit` returns false to skip a branch before its conditions are evaluated,
 * which lets the walker drop selectors that are already matched or checked.
 * Returns the number of guard and branch tests run, for diagnostics.
 */
export function each(
	route: RouteType,
	signals: SignalsType,
	admit: (selector: string) => boolean,
	visit: (selector: string) => void,
): number {
	let count = 0;
	const branches = (list: readonly BranchType[]): void => {
		for (const branch of list) {
			if (!admit(branch.selector)) continue;
			count += 1;
			if (test(branch, signals)) visit(branch.selector);
		}
	};
	const scan = (target: BucketType | undefined): void => {
		if (!target) return;
		branches(target.open);
		for (const guard of target.guards) {
			if (!signals.names.has(guard.name)) continue;
			count += 1;
			if (values(signals, guard.name).some((value) => guard.pattern.test(value))) branches(guard.branches);
		}
	};
	for (const id of new Set(signals.ids)) scan(route.byId.get(id));
	for (const token of signals.classes) scan(route.byClass.get(token));
	scan(route.byTag.get(signals.tag));
	for (const name of signals.names.keys()) scan(route.byAttribute.get(name));
	scan(route.rest);
	return count;
}

/** Return whether every necessary branch condition holds for one element. */
export function test(branch: BranchType, signals: SignalsType): boolean {
	if (branch.tag !== undefined && branch.tag !== signals.tag) return false;
	if (branch.id !== undefined && !signals.ids.includes(branch.id)) return false;
	for (const token of branch.classes) if (!signals.classes.has(token)) return false;
	for (const condition of branch.tests) {
		if (!signals.names.has(condition.name)) return false;
		if (condition.value !== undefined && !values(signals, condition.name).some((value) => compare(condition, value))) return false;
	}
	return true;
}

/** ASCII whitespace that separates class tokens. */
const SPACE = /[\t\n\f\r ]+/;

/** Fold ASCII letters only, matching CSS ASCII case-insensitive comparison. */
export function fold(value: string): string {
	return /[A-Z]/.test(value) ? value.replace(/[A-Z]+/g, (letters) => letters.toLowerCase()) : value;
}

/**
 * Apply a folded, relaxed form of one attribute operator.
 *
 * `~=` and `|=` relax to substring and prefix tests, which every true match also
 * satisfies. Empty operands never match for `^=`, `$=`, `*=`, and `~=`, but the
 * relaxed test admits them and leaves the answer to `matches()`.
 */
function compare(condition: TestType, value: string): boolean {
	const expected = condition.value ?? '';
	switch (condition.op) {
		case '=': return value === expected;
		case '^=':
		case '|=': return value.startsWith(expected);
		case '$=': return value.endsWith(expected);
		case '*=':
		case '~=': return value.includes(expected);
		default: return true;
	}
}

/** Parse one selector into routed branches; invalid selectors yield none. */
function parse(selector: string): BranchType[] {
	let root: selectorParser.Root;
	try {
		root = selectorParser().astSync(selector);
	} catch {
		return [];
	}
	return root.nodes.map((branch) => reduce(selector, branch.nodes));
}

/** Reduce one branch to the necessary conditions of its right-most compound. */
function reduce(selector: string, nodes: readonly selectorParser.Node[]): BranchType {
	let start = 0;
	for (let index = 0; index < nodes.length; index += 1) {
		if (nodes[index]?.type === 'combinator') start = index + 1;
	}
	let tag: string | undefined;
	let id: string | undefined;
	const classes: string[] = [];
	const tests: TestType[] = [];
	for (const node of nodes.slice(start)) {
		switch (node.type) {
			case 'tag':
				if (node.value) tag = fold(node.value);
				break;
			case 'id':
				if (node.value) id ??= fold(node.value);
				break;
			case 'class':
				if (node.value) classes.push(fold(node.value));
				break;
			case 'attribute': {
				if (node.namespace) break;
				const name = fold(node.attribute.trim());
				if (!name) break;
				const value = node.operator && node.value ? fold(node.value) : undefined;
				tests.push(value === undefined ? { name } : { name, op: node.operator, value });
				break;
			}
		}
	}
	return {
		selector,
		...(tag !== undefined ? { tag } : {}),
		...(id !== undefined ? { id } : {}),
		classes,
		tests,
	};
}

/** Append one branch to a keyed bucket. */
function push(target: Map<string, BranchType[]>, key: string, branch: BranchType): void {
	const bucket = target.get(key);
	if (bucket) bucket.push(branch);
	else target.set(key, [branch]);
}
