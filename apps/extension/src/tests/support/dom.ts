import { JSDOM } from 'jsdom';
import { vi } from 'vitest';

import type { DomPlanType } from "@deepscope/dom";

/** Window that created each parsed document, used to expose its constructors. */
const windows = new WeakMap<Document, JSDOM['window']>();

/** Parse HTML into a jsdom document without running scripts or loading resources. */
export function parse(html: string): Document {
	const { window } = new JSDOM(html);
	windows.set(window.document, window);
	return window.document;
}

/** Expose one parsed document through the globals the live DOM walker reads. */
export function stub(document: Document): void {
	const window = windows.get(document);
	if (!window) throw new Error('Document was not created by parse().');
	vi.stubGlobal('Element', window.Element);
	vi.stubGlobal('Document', window.Document);
	vi.stubGlobal('NodeFilter', window.NodeFilter);
	vi.stubGlobal('document', document);
}

/** Release one parsed document's window so property runs do not accumulate heaps. */
export function close(document: Document): void {
	windows.get(document)?.close();
	windows.delete(document);
}

/**
 * Ground truth: every valid plan selector that matches at least one element.
 *
 * This asks the DOM implementation directly, one `querySelector()` per selector,
 * so it shares no routing logic with the walker under test.
 */
export function truth(plan: DomPlanType, root: ParentNode): Record<string, boolean> {
	const result: Record<string, boolean> = {};
	for (const probe of plan.probes) {
		if (!probe.valid) continue;
		if (isMatch(root, probe.selector)) result[probe.selector] = true;
	}
	return result;
}

/** Return whether the root or any descendant matches one selector. */
function isMatch(root: ParentNode, selector: string): boolean {
	try {
		const self = (root as Partial<Element>).matches?.call(root, selector) === true;
		return self || root.querySelector(selector) !== null;
	} catch {
		return false;
	}
}

/**
 * Reference copy of the walker routing used before branch routing.
 *
 * It routes each element by the union of every tag, attribute name, id, and
 * class that appears in any branch subject, then calls `matches()` for every
 * routed selector. Kept only to prove the faster routing returns the same set.
 */
export function reference(plan: DomPlanType, root: ParentNode): { matches: Record<string, boolean>; checks: number } {
	const pending = new Set(plan.probes.filter((probe) => probe.valid).map((probe) => probe.selector));
	const matches: Record<string, boolean> = {};
	const routes = new Set<string>();
	let checks = 0;
	const elements = [
		...((root as Partial<Element>).localName ? [root as Element] : []),
		...root.querySelectorAll('*'),
	];
	for (const element of elements) {
		routes.clear();
		add(routes, plan.selectorsWithoutRoute);
		add(routes, plan.selectorsByTag[element.localName.toLowerCase()]);
		for (const attribute of element.getAttributeNames()) add(routes, plan.selectorsByAttribute[attribute.toLowerCase()]);
		if (element.id) add(routes, plan.selectorsById[element.id]);
		for (const className of element.classList) add(routes, plan.selectorsByClass[className]);
		for (const selector of routes) {
			if (!pending.has(selector)) continue;
			checks += 1;
			let matched = false;
			try {
				matched = element.matches(selector);
			} catch {
				matched = false;
			}
			if (matched) {
				matches[selector] = true;
				pending.delete(selector);
			}
		}
		if (pending.size === 0) break;
	}
	return { matches, checks };
}

/** Add routed selectors to one reusable set. */
function add(target: Set<string>, selectors: readonly string[] | undefined): void {
	if (!selectors) return;
	for (const selector of selectors) target.add(selector);
}
