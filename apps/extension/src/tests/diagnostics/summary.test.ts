import { describe, expect, it } from 'vitest';

import * as summary from '../../lib/diagnostics/summary.ts';

describe('log summary', () => {
	const details = { tabId: 7, hostname: 'example.com', status: '', sessionId: null, ids: ['a', 'b'], extra: 'hidden', missing: undefined };

	it('renders the background style: parenthesized, keeps blanks, arrays and objects compact', () => {
		expect(summary.format({ ...details, kind: { a: 1 } }, ['tabId', 'status', 'sessionId', 'ids', 'kind', 'missing'], { parenthesize: true }))
			.toBe(' (tabId=7 status= sessionId=null ids=[a,b] kind={"a":1})');
	});

	it('renders the content style: inline and without blank values', () => {
		expect(summary.format(details, ['tabId', 'hostname', 'status', 'sessionId', 'missing'], { skipBlank: true }))
			.toBe(' tabId=7 hostname=example.com');
	});

	it('is empty without details or listed values', () => {
		expect(summary.format(undefined, ['tabId'])).toBe('');
		expect(summary.format({ other: 1 }, ['tabId'], { parenthesize: true })).toBe('');
	});
});
