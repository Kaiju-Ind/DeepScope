import { afterEach, describe, expect, it, vi } from 'vitest';

import * as dom from '@/lib/dom';

/** Minimal live element fixture used to exercise routing without a browser DOM. */
class FakeElement {
	readonly classList: readonly string[];
	readonly #attributes: readonly string[];
	readonly #matched: ReadonlySet<string>;
	readonly matches = vi.fn((selector: string) => this.#matched.has(selector));

	constructor(
		readonly localName: string,
		readonly id: string,
		classes: readonly string[],
		attributes: readonly string[],
		matched: ReadonlySet<string>,
	) {
		this.classList = classes;
		this.#attributes = attributes;
		this.#matched = matched;
	}

	getAttributeNames(): string[] {
		return [...this.#attributes];
	}
}

/** ParentNode fixture that exercises the matcher fallback traversal used by tests. */
class FakeRoot {
	constructor(readonly elements: readonly FakeElement[]) {}

	querySelectorAll(selector: string): readonly FakeElement[] {
		return selector === '*' ? this.elements : [];
	}
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('live DOM selector matching', () => {
	it('routes selectors by live element signals and returns positive evidence only', async () => {
		vi.stubGlobal('Element', FakeElement);
		vi.stubGlobal('document', {});
		const root = new FakeRoot([
			new FakeElement('html', '', [], [], new Set([':root'])),
			new FakeElement('script', '', [], ['src'], new Set(['script[src]'])),
			new FakeElement('div', '', ['widget'], [], new Set(['.widget'])),
		]);
		const plan = dom.create(['script[src]', '.widget', ':root', '.missing']);

		await expect(dom.match(plan, root as unknown as ParentNode)).resolves.toEqual({
			':root': true,
			'script[src]': true,
			'.widget': true,
		});
	});

	it('retires sticky selector evidence from later scans', async () => {
		vi.stubGlobal('Element', FakeElement);
		vi.stubGlobal('document', {});
		const script = new FakeElement('script', '', [], ['src'], new Set(['script[src]']));
		const root = new FakeRoot([script]);
		const plan = dom.create(['script[src]']);

		const matches = await dom.match(plan, root as unknown as ParentNode, {
			matched: new Set(['script[src]']),
		});

		expect(matches).toEqual({});
		expect(script.matches).not.toHaveBeenCalled();
	});

	it('shares one traversal with other mutation collectors', async () => {
		vi.stubGlobal('Element', FakeElement);
		vi.stubGlobal('document', {});
		const elements = [
			new FakeElement('script', '', [], ['src'], new Set()),
			new FakeElement('div', '', ['widget'], [], new Set(['.widget'])),
		];
		const visit = vi.fn();
		const plan = dom.create(['.widget']);

		await dom.match(plan, new FakeRoot(elements) as unknown as ParentNode, { visit });

		expect(visit.mock.calls.map(([element]) => element)).toEqual(elements);
	});

	it('yields between bounded element batches instead of monopolizing one renderer task', async () => {
		vi.stubGlobal('Element', FakeElement);
		vi.stubGlobal('document', {});
		const root = new FakeRoot(Array.from({ length: 5 }, () => (
			new FakeElement('div', '', [], [], new Set())
		)));
		const yieldControl = vi.fn(async () => undefined);
		const plan = dom.create(['div.missing']);

		await dom.match(plan, root as unknown as ParentNode, {
			elementsPerSlice: 2,
			sliceMs: 60_000,
			yield: yieldControl,
		});

		expect(yieldControl).toHaveBeenCalledTimes(2);
	});


	it('reports bounded work measurements without retaining live nodes', async () => {
		vi.stubGlobal('Element', FakeElement);
		vi.stubGlobal('document', {});
		const root = new FakeRoot([
			new FakeElement('div', '', ['widget'], [], new Set(['.widget'])),
			new FakeElement('span', '', [], [], new Set()),
		]);
		const onStats = vi.fn();
		const plan = dom.create(['.widget', 'span.missing']);

		await dom.match(plan, root as unknown as ParentNode, {
			elementsPerSlice: 1,
			sliceMs: 60_000,
			yield: async () => undefined,
			onStats,
		});

		expect(onStats).toHaveBeenCalledOnce();
		expect(onStats).toHaveBeenCalledWith(expect.objectContaining({
			elementCount: 2,
			selectorCheckCount: 2,
			matchCount: 1,
			yieldCount: 2,
			aborted: false,
		}));
	});

	it('stops a time-sliced scan after its document session is canceled', async () => {
		vi.stubGlobal('Element', FakeElement);
		vi.stubGlobal('document', {});
		const elements = Array.from({ length: 6 }, () => (
			new FakeElement('div', '', [], [], new Set())
		));
		const controller = new AbortController();
		const yieldControl = vi.fn(async () => { controller.abort(); });
		const plan = dom.create(['div.missing']);

		await dom.match(plan, new FakeRoot(elements) as unknown as ParentNode, {
			elementsPerSlice: 2,
			sliceMs: 60_000,
			signal: controller.signal,
			yield: yieldControl,
		});

		expect(yieldControl).toHaveBeenCalledOnce();
		expect(elements.slice(0, 2).every((element) => element.matches.mock.calls.length === 1)).toBe(true);
		expect(elements.slice(2).every((element) => element.matches.mock.calls.length === 0)).toBe(true);
	});

	it('rechecks only an element root for structural invalidation', async () => {
		vi.stubGlobal('Element', FakeElement);
		vi.stubGlobal('document', {});
		const root = new FakeElement('noscript', '', [], [], new Set(['gt-root + noscript']));
		const plan = dom.create(['gt-root + noscript']);

		await expect(dom.match(plan, root as unknown as ParentNode, { deep: false })).resolves.toEqual({
			'gt-root + noscript': true,
		});
	});
});
