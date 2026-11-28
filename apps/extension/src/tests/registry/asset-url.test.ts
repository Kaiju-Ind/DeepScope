import { describe, expect, it } from 'vitest';

import { resolvePackagedAssetUrl } from "../../lib/registry/assets.ts";

describe('resolvePackagedAssetUrl', () => {
	// Safari Technology Preview: a matcher worker at this URL reports
	// location.origin as safari-web-extension://04bc661f-…, and fetching a
	// shard under that lowercased host fails with "Load failed", so every
	// partition failed and no page showed results.
	it('keeps the extension host exactly as the worker URL spells it', () => {
		const location = { href: 'safari-web-extension://04BC661F-675C-417B-9A0B-F351755C1AAF/assets/matcher.worker-GcO9So74.js' };
		expect(resolvePackagedAssetUrl('kaiju-deepscope-registry/registry.kind.dom.json', location))
			.toBe('safari-web-extension://04BC661F-675C-417B-9A0B-F351755C1AAF/kaiju-deepscope-registry/registry.kind.dom.json');
	});

	it('resolves from the extension root, not the worker directory', () => {
		expect(resolvePackagedAssetUrl('/kaiju-deepscope-registry/registry.runtime.json', { href: 'moz-extension://d5e3b0c0-0000-4000-8000-00000000d5e3/assets/matcher.worker.js' }))
			.toBe('moz-extension://d5e3b0c0-0000-4000-8000-00000000d5e3/kaiju-deepscope-registry/registry.runtime.json');
		expect(resolvePackagedAssetUrl('kaiju-deepscope-registry/registry.kind.url.json', { href: 'chrome-extension://abcdefghijklmnop/offscreen.html' }))
			.toBe('chrome-extension://abcdefghijklmnop/kaiju-deepscope-registry/registry.kind.url.json');
	});
});
