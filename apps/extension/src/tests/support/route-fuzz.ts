import { fc } from '@fast-check/vitest';

import { create } from '@/lib/dom/plan';
import * as route from '@/lib/dom/route';

/**
 * Adversarial selector and document generators for DOM routing soundness.
 *
 * The invariant checked by `violations()` is per element, not per document: for
 * every element `e` and selector `s`, `e.matches(s)` implies that routing admits
 * `s` for `e`. It holds for any selector engine, so engine bugs cannot hide a
 * routing hole, and the same cases can be replayed in a real browser.
 */

/** One serializable fuzz case. */
export type CaseType = {
	readonly html: string;
	readonly selectors: readonly string[];
	/** DOM edits applied after parsing; they reach states the HTML parser cannot. */
	readonly edits: readonly EditType[];
};

/** One post-parse DOM edit addressed by element index in document order. */
export type EditType =
	| { readonly kind: 'ns'; readonly index: number; readonly ns: string | null; readonly name: string; readonly value: string; readonly then?: string }
	| { readonly kind: 'element'; readonly index: number; readonly ns: string; readonly name: string; readonly attributes: readonly (readonly [string, string])[] };

const XLINK = 'http://www.w3.org/1999/xlink';
const XHTML = 'http://www.w3.org/1999/xhtml';
const SVG = 'http://www.w3.org/2000/svg';

/** Attribute values chosen to stress folding, regex escaping, whitespace, and operators. */
const VALUES = [
	'', 'x', 'X', 'a-b', 'A-B', 'b c', ' x ', 'a.b', 'a*b', '(x)', '\\', '$1', '^x', 'x|y', '[x]', '{1}', '/x/', '?',
	'é', 'É', 'K', 'k', 'K', 'İ', 'i', 'ab\ncd', '"', "'", 'x-', 'en', 'en-US', 'EN-us', 'hidden', 'HIDDEN',
	'123', 'a:b', 'x y z', 'xx', '-', 'a\tb', 'a', 'b', 'ab', 'cd', 'y', 'z', 'US', 'a\fb', 'x\ry', 'a\ufffd', 'xy',
] as const;

/** Live attribute names; some only reachable with namespaces or foreign content. */
const NAMES = ['data-x', 'href', 'class', 'id', 'lang', 'type', 'viewBox', 'Data-X', 'q:container', 'data-123', 'rel', 'xmlns:change'] as const;

/** Element names including SVG and MathML foreign content with case-sensitive local names. */
const TAGS = ['div', 'span', 'a', 'P', 'input', 'svg', 'linearGradient', 'foreignObject', 'use', 'math', 'mi', 'x-el', 'table', 'td'] as const;

/** Serialize a string as a CSS quoted string, optionally escaping every character. */
function quote(value: string, hex: string | false, mark: string): string {
	let out = '';
	for (const char of value) {
		const code = char.codePointAt(0)!;
		if (hex !== false || char === "\n" || char === "\t") out += `\\${code.toString(16)}${hex || " "}`;
		else if (char === mark || char === '\\') out += `\\${char}`;
		else out += char;
	}
	return mark + out + mark;
}

/** Serialize an identifier with CSS escapes where required, or everywhere. */
function ident(value: string, hex: string | false): string {
	let out = '';
	let index = 0;
	for (const char of value) {
		const code = char.codePointAt(0)!;
		const plain = /[a-zA-Z_\-\u0080-\uffff]/.test(char) || (index > 0 && /[0-9]/.test(char));
		if (hex !== false || (index === 0 && /[0-9]/.test(char))) out += `\\${code.toString(16)}${hex || " "}`;
		else if (!plain || (index === 0 && value === '-')) out += `\\${char}`;
		else out += char;
		index += 1;
	}
	return out;
}

const value = fc.constantFrom(...VALUES);
/** Escape mode: false for minimal escapes, else hex escapes ended by this whitespace. */
const hex = fc.constantFrom<string | false>(false, false, " ", "\t", "\n", "\r\n", "\f");

/** Attribute names shared by selectors and documents so value tests often meet. */
const CORE = fc.constantFrom('data-x', 'class', 'lang', 'id');

/** Element attribute values built from selector vocabulary so prefixes and suffixes collide. */
const joined = fc.array(fc.tuple(value, fc.constantFrom('', ' ', '-', '\t', '\n')), { minLength: 1, maxLength: 3 })
	.map((parts) => parts.map(([v, s], index) => (index === 0 ? v : s + v)).join(''));

/** Selector type part, including case variants and namespace forms. */
const type = fc.oneof(
	fc.constantFrom(...TAGS),
	fc.constantFrom('DIV', 'Span', 'LINEARGRADIENT', 'lineargradient', 'FOREIGNOBJECT', 'Use', 'MI', 'X-EL', '*', '*|*', '*|div', '|div', '*|linearGradient'),
	fc.tuple(fc.constantFrom(...TAGS), hex).map(([tag, h]) => ident(tag, h)),
);

/** Attribute selector, including escaped and namespaced names, flags, and quoting forms. */
const attribute = fc.tuple(
	fc.oneof(
		fc.tuple(fc.oneof({ weight: 3, arbitrary: CORE }, { weight: 1, arbitrary: fc.constantFrom(...NAMES, "DATA-X", "viewbox", "xlink:href", "HREF") }), hex).map(([name, h]) => ident(name, h)),
		fc.constantFrom('*|href', '|href', '*|data-x', '*|viewBox'),
	),
	fc.option(fc.tuple(
		fc.constantFrom('=', '^=', '$=', '*=', '~=', '|='),
		value,
		fc.constantFrom('"', "'", ''),
		hex,
		fc.constantFrom('', ' i', ' s', ' I', ' S'),
	), { nil: undefined }),
).map(([name, check]) => {
	if (!check) return `[${name}]`;
	const [op, raw, mark, h, flag] = check;
	const text = mark === '' && /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(raw) ? raw : quote(raw, h, mark || '"');
	return `[${name}${op}${text}${flag}]`;
});

/** Leaf simple selectors used both at top level and inside pseudo-class arguments. */
const simple = fc.oneof(
	fc.constantFrom(".a\u0000", "#a\u0000", "[data-x=\"a\u0000\"]", ".a\\", "[data-x=\"x\\\ny\"]", "[data-x=\"x\\\r\ny\"]", ".a\\\tb"),
	fc.tuple(value.filter((v) => v.length > 0), hex).map(([v, h]) => `.${ident(v, h)}`),
	fc.tuple(value.filter((v) => v.length > 0), hex).map(([v, h]) => `#${ident(v, h)}`),
	attribute,
);

/** Pseudo-classes and pseudo-elements whose arguments must never become conditions. */
const pseudo = fc.oneof(
	fc.constantFrom(':first-child', ':last-child', ':root', ':scope', ':empty', ':defined', ':hover', ':lang(en)', ':dir(ltr)',
		'::before', '::after', ':host', '::part(x)', ':link', ':checked', ':nth-child(2n+1)', ':only-of-type'),
	simple.map((s) => `:not(${s})`),
	fc.tuple(simple, simple).map(([a, b]) => `:is(${a}, ${b})`),
	fc.tuple(simple, type).map(([a, b]) => `:where(${b}${a})`),
	simple.map((s) => `:has(${s})`),
	simple.map((s) => `:has(> ${s})`),
	simple.map((s) => `:nth-child(odd of ${s})`),
	simple.map((s) => `:not(:is(${s}))`),
	simple.map((s) => `::slotted(${s})`),
	simple.map((s) => `:host(${s})`),
);

/** One compound selector. */
const compound = fc.tuple(
	fc.option(type, { nil: undefined }),
	fc.array(fc.oneof({ weight: 3, arbitrary: simple }, { weight: 1, arbitrary: pseudo }), { maxLength: 4 }),
).map(([tag, parts]) => `${tag ?? ''}${parts.join('')}` || '*');

/** One complex selector branch with combinators, comments, and odd whitespace. */
const branch = fc.tuple(
	compound,
	fc.array(fc.tuple(fc.constantFrom(' ', ' > ', '>', ' + ', '~', ' ~ ', '\t', '\n', ' /* c */ ', '/**/ > '), compound), { maxLength: 3 }),
).map(([head, rest]) => head + rest.map(([c, part]) => c + part).join(''));

/** One selector list, sometimes with an unroutable branch. */
export const selector = fc.array(branch, { minLength: 1, maxLength: 3 }).map((branches) => branches.join(', '));

/** HTML attribute value escaping. */
function html(value: string): string {
	return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/** One element subtree as HTML. */
const element: fc.Memo<string> = fc.memo((depth) => fc.tuple(
	fc.constantFrom(...TAGS),
	fc.array(fc.tuple(fc.oneof({ weight: 3, arbitrary: CORE }, { weight: 1, arbitrary: fc.constantFrom(...NAMES, "xlink:href", "HREF", "ID", "CLASS") }), joined), { maxLength: 4 }),
	depth > 1 ? fc.array(element(depth - 1), { maxLength: 3 }) : fc.constant([]),
).map(([tag, attributes, children]) => {
	const rendered = attributes.map(([key, v]) => ` ${key}="${html(v)}"`).join('');
	return `<${tag}${rendered}>${children.join('')}</${tag}>`;
}));

/** Post-parse edits that reach namespaced, mixed-case, and duplicate qualified names. */
const edit: fc.Arbitrary<EditType> = fc.oneof(
	fc.record({
		kind: fc.constant('ns' as const),
		index: fc.nat(40),
		ns: fc.constantFrom(null, XLINK, 'urn:x'),
		name: fc.constantFrom('Data-X', 'dataX', 'href', 'xlink:href', 'p:href', 'q:container', 'ID', 'Class', 'class', 'id', 'viewBox'),
		value,
		then: fc.option(value, { nil: undefined }),
	}),
	fc.record({
		kind: fc.constant('element' as const),
		index: fc.nat(40),
		ns: fc.constantFrom(XHTML, SVG, 'urn:x'),
		name: fc.constantFrom('DIV', 'Div', 'div', 'linearGradient', 'P', 'x-el', 'X-EL'),
		attributes: fc.array(fc.tuple(fc.constantFrom('class', 'id', 'href', 'data-x'), value), { maxLength: 2 }),
	}),
);

/** One complete fuzz case. */
export const fuzzCase: fc.Arbitrary<CaseType> = fc.record({
	html: fc.tuple(fc.boolean(), fc.array(element(3), { minLength: 1, maxLength: 4 }))
		.map(([quirks, body]) => `${quirks ? '' : '<!doctype html>'}<html><body>${body.join('')}</body></html>`),
	selectors: fc.uniqueArray(selector, { minLength: 1, maxLength: 10 }),
	edits: fc.array(edit, { maxLength: 4 }),
});

/** Apply post-parse edits to one document. */
export function apply(document: Document, edits: readonly EditType[]): void {
	for (const item of edits) {
		const all = [...document.querySelectorAll('*')];
		const target = all[item.index % all.length];
		if (!target) continue;
		try {
			if (item.kind === "ns") {
				target.setAttributeNS(item.ns, item.name, item.value);
				if (item.then !== undefined) target.setAttributeNS(null, item.name.split(":").pop()!, item.then);
			}
			else {
				const child = document.createElementNS(item.ns, item.name);
				for (const [name, v] of item.attributes) child.setAttribute(name, v);
				target.appendChild(child);
			}
		} catch {
			// Invalid qualified names are rejected by the DOM; skip them.
		}
	}
}

/** One element and selector that the engine matches but routing rejects. */
export type ViolationType = { readonly selector: string; readonly element: string };

/**
 * Return every (element, selector) pair the engine matches but routing rejects.
 *
 * Only selectors the plan marks valid are checked, because the walker never
 * makes any other selector pending.
 */
export function violations(document: Document, all: readonly string[]): ViolationType[] {
	const selectors = create(all).probes.filter((probe) => probe.valid).map((probe) => probe.selector);
	const compiled = route.compile(selectors);
	const result: ViolationType[] = [];
	for (const element of document.querySelectorAll('*')) {
		const admitted = new Set<string>();
		route.each(compiled, route.read(element), () => true, (s) => admitted.add(s));
		for (const s of selectors) {
			let matched = false;
			try {
				matched = element.matches(s);
			} catch {
				matched = false;
			}
			if (matched && !admitted.has(s)) result.push({ selector: s, element: element.outerHTML.slice(0, 200) });
		}
	}
	return result;
}
