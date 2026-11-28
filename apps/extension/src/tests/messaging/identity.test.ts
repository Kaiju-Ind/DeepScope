import { describe, expect, it } from 'vitest';

import type { VisibleTabIdentity } from "../../lib/messaging/index.ts";
import * as tabIdentity from '../../lib/messaging/identity.ts';

const base: VisibleTabIdentity = {
	windowId: 1, tabId: 7, frameId: 0, url: 'https://example.com/a', hostname: 'example.com',
	originHash: 'origin', urlHash: 'url-a', incognito: false,
};

describe('tab identity', () => {
	it('matches the same document regardless of the readable URL and hostname', () => {
		expect(tabIdentity.same(base, { ...base })).toBe(true);
		expect(tabIdentity.same(base, { ...base, url: 'https://example.com/a#x', hostname: 'other' })).toBe(true);
	});

	it.each(['windowId', 'tabId', 'frameId', 'originHash', 'urlHash', 'incognito'] as const)('differs when %s differs', (field) => {
		const changed = { ...base, [field]: typeof base[field] === 'boolean' ? !base[field] : `${String(base[field])}-x` };
		expect(tabIdentity.same(base, changed as VisibleTabIdentity)).toBe(false);
	});

	it('treats no current identity as different', () => {
		expect(tabIdentity.same(null, base)).toBe(false);
	});
});
