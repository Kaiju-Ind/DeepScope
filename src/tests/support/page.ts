import selectorParser from 'postcss-selector-parser';

/**
 * Build HTML in which each selector branch has a likely match and a near miss.
 *
 * Each comma branch becomes a small element chain that follows its combinators.
 * Every compound becomes one element carrying its tag, id, classes, and an
 * attribute value that satisfies the operator. The near miss swaps the ASCII
 * case of the right-most compound's values and drops its last class, so routing
 * must stay correct for both case rules. Pseudo-classes are ignored: whether a
 * chain truly matches is decided by the DOM, never by this builder.
 */
export function synthesize(selectors: readonly string[]): string {
	const parts: string[] = [];
	for (const selector of selectors) {
		let root: selectorParser.Root;
		try {
			root = selectorParser().astSync(selector);
		} catch {
			continue;
		}
		for (const branch of root.nodes) parts.push(chain(branch.nodes, false), chain(branch.nodes, true));
	}
	return `<!doctype html><html><head></head><body>${parts.join('')}</body></html>`;
}

/** Element names that cannot carry child markup in the HTML parser. */
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

/** Render one branch as nested and sibling elements. */
function chain(nodes: readonly selectorParser.Node[], miss: boolean): string {
	const compounds: selectorParser.Node[][] = [[]];
	const combinators: string[] = [];
	for (const node of nodes) {
		if (node.type === 'combinator') {
			combinators.push(node.value.trim() || ' ');
			compounds.push([]);
		} else {
			compounds.at(-1)!.push(node);
		}
	}
	let html = '';
	for (let index = compounds.length - 1; index >= 0; index -= 1) {
		const { tag, open } = render(compounds[index]!, miss && index === compounds.length - 1);
		const close = VOID.has(tag) ? '' : `</${tag}>`;
		const combinator = combinators[index];
		if (index === compounds.length - 1) html = open + close;
		else if (combinator === '+' || combinator === '~') html = open + close + html;
		else html = VOID.has(tag) ? open + html : open + html + close;
	}
	return `<section>${html}</section>`;
}

/** Render one compound as an opening tag. */
function render(nodes: readonly selectorParser.Node[], miss: boolean): { tag: string; open: string } {
	let tag = 'div';
	const attributes = new Map<string, string>();
	const classes: string[] = [];
	const flip = (value: string): string => (miss ? swap(value) : value);
	for (const node of nodes) {
		if (node.type === 'tag' && node.value) tag = node.value.toLowerCase();
		if (node.type === 'id') attributes.set('id', flip(node.value));
		if (node.type === 'class') classes.push(flip(node.value));
		if (node.type === 'attribute' && !node.namespace) {
			const name = node.attribute.toLowerCase();
			const next = shape(node.operator, flip(node.value ?? ''));
			const previous = attributes.get(name);
			attributes.set(name, previous === undefined ? next : `${previous} ${next}`);
		}
	}
	if (miss) classes.pop();
	if (classes.length) attributes.set('class', [attributes.get('class'), ...classes].filter(Boolean).join(' '));
	const rendered = [...attributes].map(([name, value]) => ` ${name}="${escape(value)}"`).join('');
	return { tag, open: `<${tag}${rendered}>` };
}

/** Produce an attribute value that satisfies one attribute operator. */
function shape(operator: string | undefined, value: string): string {
	switch (operator) {
		case '^=': return `${value}tail`;
		case '$=': return `head${value}`;
		case '*=': return `head${value}tail`;
		case '~=': return `head ${value} tail`;
		case '|=': return `${value}-tail`;
		default: return value;
	}
}

/** Swap ASCII letter case. */
function swap(value: string): string {
	return value.replace(/[a-z]/gi, (letter) => (letter === letter.toLowerCase() ? letter.toUpperCase() : letter.toLowerCase()));
}

/** Escape one HTML attribute value. */
function escape(value: string): string {
	return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
