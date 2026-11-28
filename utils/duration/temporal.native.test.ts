// DeepScope's own test for the Chrome/Firefox Temporal alias target; not vendored.
import { expect } from '@std/expect';
import { describe, it } from 'node:test';

describe('temporal.native', () => {
	it('re-exports the host Temporal so temporal.ts selects it without the polyfill', async () => {
		const { Temporal } = await import('./temporal.native.ts');
		expect(Temporal).toBe(globalThis.Temporal);
		const { temporal } = await import('./temporal.ts');
		expect(temporal).toBe(globalThis.Temporal);
	});
});
