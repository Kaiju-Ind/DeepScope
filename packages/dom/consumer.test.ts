import { JSDOM } from 'jsdom';
import { afterEach, expect, it, vi } from 'vitest';

import * as dom from './index.ts';
import * as route from './route.ts';

afterEach(() => vi.unstubAllGlobals());

it('plans and matches through the public operations without the extension runtime', async () => {
	const { window } = new JSDOM('<!doctype html><main><a class="product" href="/item">Item</a></main>');
	try {
		vi.stubGlobal('Element', window.Element);
		vi.stubGlobal('Document', window.Document);
		vi.stubGlobal('NodeFilter', window.NodeFilter);
		const plan = dom.create(['a.product[href^="/"]', 'a.missing']);
		const matches = await dom.match(plan, window.document);
		expect({ ...matches }).toEqual({ 'a.product[href^="/"]': true });
		expect(route.compile(plan.selectors).size).toBe(2);
		const stopped = await dom.match(plan, window.document, { signal: AbortSignal.abort() });
		expect(Object.keys(stopped)).toEqual([]);
	} finally {
		window.close();
	}
});
