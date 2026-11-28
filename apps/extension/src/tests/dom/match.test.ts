import { fc, test } from '@fast-check/vitest';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { buildCollectionPlan } from "@deepscope/detection/collection/plan";
import * as dom from "@deepscope/dom";
import { technologies } from "@deepscope/registry";

import { close, parse, reference, stub, truth } from "../support/dom.ts";
import { synthesize } from "../support/page.ts";

/** Registry selectors scanned against one synthesized document at a time. */
const CHUNK = 160;

/** Run the live walker without real scheduling delays and capture its stats. */
async function scan(plan: dom.DomPlanType, root: ParentNode): Promise<{ matches: Record<string, boolean>; stats: dom.MatchStatsType }> {
	let stats: dom.MatchStatsType | undefined;
	const matches = await dom.match(plan, root, {
		yield: async () => undefined,
		onStats: (value) => { stats = value; },
	});
	return { matches: { ...matches }, stats: stats! };
}

/** Return the registry DOM selectors in plan order. */
function registry(): readonly string[] {
	return buildCollectionPlan(technologies).initial.domSelectorPlan.selectors;
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('routed DOM selector matching', () => {
	it('returns exactly the selectors the DOM matches for every registry selector', async () => {
		const selectors = registry();
		let positives = 0;
		for (let start = 0; start < selectors.length; start += CHUNK) {
			const chunk = selectors.slice(start, start + CHUNK);
			const plan = dom.create(chunk);
			const document = parse(synthesize(chunk));
			stub(document);

			const { matches } = await scan(plan, document);

			expect(matches).toEqual(truth(plan, document));
			expect(matches).toEqual(reference(plan, document).matches);
			positives += Object.keys(matches).length;
		}
		// The fixture must exercise positives, not only rejections.
		expect(positives).toBeGreaterThan(selectors.length / 2);
	}, 120_000);

	it('keeps native selector checks per element low for the full registry plan', async () => {
		const plan = buildCollectionPlan(technologies).initial.domSelectorPlan;
		const document = parse(synthesize(plan.selectors));
		stub(document);

		const { stats } = await scan(plan, document);

		expect(stats.elementCount).toBeGreaterThan(5_000);
		// The previous union routing issued hundreds of checks per element here.
		expect(stats.selectorCheckCount / stats.elementCount).toBeLessThan(2);
	}, 60_000);

	it.each([
		['descendant, child, and sibling combinators', `
			<div class="outer"><p><span class="leaf">x</span></p></div>
			<ul><li id="first"></li><li class="second"></li><li class="third"></li></ul>`, [
			'.outer .leaf', '.outer > .leaf', 'div > p > span.leaf', '#first + .second', '#first ~ .third',
			'#first + .third', 'ul > li.second + li', 'p ~ .leaf',
		]],
		['attribute operators and flags', `
			<a href="https://CDN.Example.com/lib.js" lang="en-US" rel="noopener external" data-x=""></a>
			<input type="HIDDEN" name="Token">`, [
			"a[href^='https://cdn']", "a[href^='https://cdn' i]", "a[href^='https://CDN' s]", "a[href$='.JS' i]",
			"a[href*='example']", "a[href*='Example']", "a[rel~='external']", "a[rel~='noop']", "a[lang|='en']",
			"a[lang|='EN' i]", "a[data-x='']", "a[data-x]", "a[data-x^='']", "input[type='hidden']",
			"input[name='token']", "input[name='token' i]", 'a[HREF]', "[href='https://CDN.Example.com/lib.js']",
		]],
		['pseudo-classes', `
			<main><section class="a"></section><section class="b"><em></em></section></main>`, [
			'section:not(.a)', 'section:not(.a):not(.b)', ':is(.a, .b)', 'main :is(section) em', ':where(.b) > em',
			'section:first-child', 'section:last-child.a', 'main > :not(section)', ':root', 'section:empty',
			'section:has(em)', 'em::before',
		]],
		['ids and classes are case-sensitive in standards mode', `
			<div id="App" class="Widget Box"></div>`, [
			'#App', '#app', '.Widget', '.widget', '.Widget.Box', '.Widget.box', 'div#App.Box', 'DIV.Widget',
		]],
		['SVG and namespaced names', `
			<svg viewBox="0 0 1 1"><linearGradient id="g"></linearGradient><use xlink:href="#g"></use></svg>`, [
			'svg[viewBox]', 'svg[viewbox]', 'linearGradient', 'lineargradient', 'svg > linearGradient#g',
			'[xlink\\:href]', 'use[href]', 'svg use',
		]],
		['invalid and route-free selectors', `<p></p>`, ['p:not(', '*', '> p', 'p >', ':not(div)']],
	])('matches DOM ground truth for %s', async (_name, body, selectors) => {
		const plan = dom.create(selectors);
		const document = parse(`<!doctype html><html><body>${body}</body></html>`);
		stub(document);

		const { matches } = await scan(plan, document);

		expect(matches).toEqual(truth(plan, document));
	});

	it('matches ground truth in a quirks-mode document', async () => {
		const selectors = ['.widget', '.Widget', '#app', '#App', 'DIV.WIDGET'];
		const plan = dom.create(selectors);
		const document = parse('<html><body><div id="App" class="Widget"></div></body></html>');
		stub(document);

		const { matches } = await scan(plan, document);

		expect(matches).toEqual(truth(plan, document));
	});

	it('checks one selector once per element even when several branches admit it', async () => {
		const plan = dom.create(['div.a, div.b, div[data-x]']);
		const document = parse('<!doctype html><div class="a b" data-x></div>');
		stub(document);

		const { stats } = await scan(plan, document);

		expect(stats.selectorCheckCount).toBe(1);
		expect(stats.matchCount).toBe(1);
	});
});

/** Small vocabularies keep random selectors and documents likely to intersect. */
const TAGS = ['div', 'span', 'a', 'svg', 'P'] as const;
const WORDS = ['x', 'X', 'ab', 'Ab', 'a-b', 'b c'] as const;
const NAMES = ['data-x', 'href', 'class', 'id', 'Lang'] as const;
const OPERATORS = ['=', '^=', '$=', '*=', '~=', '|='] as const;

const word = fc.constantFrom(...WORDS);
const attribute = fc.constantFrom(...NAMES);

/** Random element markup with nested children. */
const element: fc.Memo<string> = fc.memo((depth) => fc.tuple(
	fc.constantFrom(...TAGS),
	fc.array(fc.tuple(attribute, word), { maxLength: 3 }),
	depth > 1 ? fc.array(element(depth - 1), { maxLength: 3 }) : fc.constant([]),
).map(([tag, attributes, children]) => {
	const rendered = attributes.map(([key, value]) => ` ${key}="${value}"`).join('');
	return `<${tag}${rendered}>${children.join('')}</${tag}>`;
}));

/** Random compound selector built from the same vocabulary. */
const compound = fc.tuple(
	fc.option(fc.constantFrom(...TAGS, '*'), { nil: undefined }),
	fc.array(fc.oneof(
		word.filter((value) => !value.includes(' ')).map((value) => `.${value}`),
		word.filter((value) => !value.includes(' ')).map((value) => `#${value}`),
		fc.tuple(attribute, fc.option(fc.tuple(fc.constantFrom(...OPERATORS), word, fc.constantFrom('', ' i', ' s')), { nil: undefined }))
			.map(([key, check]) => (check ? `[${key}${check[0]}"${check[1]}"${check[2]}]` : `[${key}]`)),
		fc.constantFrom(':not(.x)', ':first-child', ':is(a, span)'),
	), { maxLength: 3 }),
).map(([tag, parts]) => `${tag ?? ''}${parts.join('')}` || '*');

/** Random complex selector with up to two combinators and comma branches. */
const selector = fc.array(
	fc.tuple(compound, fc.array(fc.tuple(fc.constantFrom(' ', ' > ', ' + ', ' ~ '), compound), { maxLength: 2 }))
		.map(([head, rest]) => head + rest.map(([combinator, part]) => combinator + part).join('')),
	{ minLength: 1, maxLength: 2 },
).map((branches) => branches.join(', '));

describe('routed DOM selector matching properties', () => {
	test.prop([
		fc.array(element(3), { minLength: 1, maxLength: 4 }),
		fc.uniqueArray(selector, { minLength: 1, maxLength: 12 }),
		fc.boolean(),
	], { numRuns: 150 })('equals DOM ground truth for random documents and selectors', async (body, selectors, quirks) => {
		const plan = dom.create(selectors);
		const document = parse(`${quirks ? '' : '<!doctype html>'}<html><body>${body.join('')}</body></html>`);
		stub(document);

		const { matches } = await scan(plan, document);

		try {
			expect(matches).toEqual(truth(plan, document));
		} finally {
			vi.unstubAllGlobals();
			close(document);
		}
	});
});

describe('routed DOM selector matching regressions', () => {
	it.each([
		['an escaped tab', 'div id="a&#9;b"', '#a\\\tb'],
		['a hex escape ended by a tab', 'div class="1a"', '.\\31\ta'],
		['a hex escape ended by a newline', 'div class="1a"', '.\\31\na'],
		['a hex escape ended by CRLF', 'div data-x="1b"', '[data-x=\\31\r\nb]'],
		['an escaped line break in a string', 'div data-x="xy"', '[data-x="x\\\ny"]'],
	])('matches a selector the parser misreads: %s', async (_name, tag, selector) => {
		const plan = dom.create([selector]);
		const document = parse(`<!doctype html><html><body><${tag}></div></body></html>`);
		stub(document);

		const { matches } = await scan(plan, document);

		expect(truth(plan, document)).toEqual({ [selector]: true });
		expect(matches).toEqual({ [selector]: true });
	});

	it('reads every attribute that shares one qualified name', async () => {
		const selectors = ['.real', '[data-x="plain"]', '#plain'];
		const plan = dom.create(selectors);
		const document = parse('<!doctype html><html><body><div></div></body></html>');
		const element = document.querySelector('div')!;
		for (const name of ['class', 'data-x', 'id']) {
			element.setAttributeNS('urn:x', name, 'other');
			element.setAttributeNS(null, name, name === 'class' ? 'real' : 'plain');
		}
		stub(document);

		const { matches } = await scan(plan, document);

		expect(truth(plan, document)).toEqual({ '.real': true, '[data-x="plain"]': true, '#plain': true });
		expect(matches).toEqual(truth(plan, document));
	});
});
