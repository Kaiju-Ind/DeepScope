import { describe, expect, it } from 'vitest';

import * as url from '@/utils/url';

describe('URL utilities', () => {
	it('returns an absolute URL origin', () => {
		expect(url.getOrigin('https://example.com:8443/products?id=1#details')).toBe('https://example.com:8443');
	});

	it('returns null instead of throwing when an origin cannot be parsed', () => {
		expect(url.getOriginOrNull('not an absolute URL')).toBeNull();
	});

	it('removes only the hash from document identity', () => {
		expect(url.withoutHash('https://example.com/products?id=1#details')).toBe('https://example.com/products?id=1');
	});

	it('compares documents while ignoring hash-only navigation', () => {
		expect(url.sameDocument('https://example.com/products?id=1#first', 'https://example.com/products?id=1#second')).toBe(true);
		expect(url.sameDocument('https://example.com/products?id=1', 'https://example.com/products?id=2')).toBe(false);
		expect(url.sameDocument('invalid', 'invalid')).toBe(false);
	});

	it('splits display-safe URL parts without exposing credentials', () => {
		expect(url.getParts('https://user:secret@example.com:8443/products?id=1#details')).toEqual({
			host: 'example.com:8443',
			pathname: '/products',
			search: '?id=1',
			hash: '#details',
			parameterCount: 1,
		});
		expect(url.getParts('not an absolute URL')).toEqual({
			host: 'not an absolute URL',
			pathname: '',
			search: '',
			hash: '',
			parameterCount: 0,
		});
	});
});
