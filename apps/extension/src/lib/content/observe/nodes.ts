import type { DomPlanType, DomSignalType } from "@deepscope/dom";

/** Return whether one queued mutation root already contains another. */
export function containsNode(parent: Node, child: Node): boolean {
	if (parent === child) return true;
	const contains = (parent as Node & { contains?: (node: Node) => boolean }).contains;
	return typeof contains === 'function' ? contains.call(parent, child) : false;
}

/**
 * Return whether a new subtree can contribute page signals or selector evidence.
 *
 * Keep this check synchronous. MutationObserver callbacks run on the renderer
 * main thread, so descendant queries are forbidden here. Route-free selectors
 * still require leaf elements to reach the later time-sliced walker.
 */
export function canScanNode(node: Node, plan?: DomPlanType): boolean {
	if (isSignalElement(node)) return true;
	if (isElementNode(node)) {
		if (plan?.selectorsWithoutRoute.length) return true;
		if (matchesPlan(node, plan)) return true;
		return node.childElementCount > 0;
	}
	if (isFragmentNode(node)) return node.childNodes.length > 0;
	return isDocumentNode(node);
}

/** Check direct tag, attribute, id, and class indexes without querying descendants. */
export function matchesPlan(element: Element, plan?: DomPlanType): boolean {
	if (!plan) return false;
	if (plan.selectorsByTag[element.localName.toLowerCase()]?.length) return true;
	for (const attribute of element.getAttributeNames()) {
		if (plan.selectorsByAttribute[attribute.toLowerCase()]?.length) return true;
	}
	if (element.id && plan.selectorsById[element.id]?.length) return true;
	for (const className of element.classList) {
		if (plan.selectorsByClass[className]?.length) return true;
	}
	return false;
}

/** Check the cheap necessary signals from one structural selector compound. */
export function matchesSignal(element: Element, signal: DomSignalType): boolean {
	if (signal.unrouteable) return true;
	if (signal.tags.length > 0 && !signal.tags.includes(element.localName.toLowerCase())) return false;
	for (const attribute of signal.attributes) {
		if (!element.hasAttribute(attribute)) return false;
	}
	if (signal.ids.length > 0 && !signal.ids.includes(element.id)) return false;
	for (const className of signal.classes) {
		if (!element.classList.contains(className)) return false;
	}
	return true;
}

/** Return the nearest element at or before one mutation sibling marker. */
export function previousElement(node: Node | null): Element | null {
	let current = node;
	while (current && !isElementNode(current)) current = current.previousSibling;
	return isElementNode(current) ? current : null;
}

/** Return the nearest element at or after one mutation sibling marker. */
export function nextElement(node: Node | null): Element | null {
	let current = node;
	while (current && !isElementNode(current)) current = current.nextSibling;
	return isElementNode(current) ? current : null;
}

/** Return whether a node can be passed to the DOM walker as a ParentNode. */
export function isScanRoot(node: Node): node is ParentNode {
	return isElementNode(node) || isFragmentNode(node) || isDocumentNode(node);
}

/** Narrow a mutation node to an Element without assuming constructors exist in tests. */
export function isElementNode(node: Node | null): node is Element {
	return typeof globalThis.Element !== 'undefined' && node instanceof globalThis.Element;
}

/** Narrow a mutation node to a DocumentFragment in browser hosts that expose it. */
export function isFragmentNode(node: Node): node is DocumentFragment {
	return typeof globalThis.DocumentFragment !== 'undefined' && node instanceof globalThis.DocumentFragment;
}

/** Narrow a mutation node to the current Document in browser hosts that expose it. */
export function isDocumentNode(node: Node): node is Document {
	return typeof globalThis.Document !== 'undefined' && node instanceof globalThis.Document;
}

/** Return the nearest element parent without retaining a separate DOM reference. */
export function getParentElement(node: Node): Element | null {
	return (node as Node & { readonly parentElement?: Element | null }).parentElement ?? null;
}

/** Return whether an element can contribute direct resource or metadata evidence. */
export function isSignalElement(node: Node): node is Element {
	if (!isElementNode(node)) return false;
	return node.localName === 'script' || node.localName === 'style' || node.localName === 'link' ||
		node.localName === 'meta' || node.localName === 'img';
}
