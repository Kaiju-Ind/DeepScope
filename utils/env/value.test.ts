// Vendored from Kaiju-Ind/Utils packages/env/value.test.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
import { expect } from '@std/expect';
import { describe, it } from 'node:test';

import { blank } from './value.ts';

describe('blank', () => {
	it('treats whitespace-only strings as missing', () => {
		expect(blank('   ')).toBeUndefined();
	});

	it('trims configured string values without changing non-string values', () => {
		expect(blank('  production  ')).toBe('production');
		expect(blank(42)).toBe(42);
	});
});
