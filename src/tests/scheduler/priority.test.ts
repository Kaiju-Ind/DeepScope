import { describe, expect, it } from 'vitest';

import * as priority from '@/lib/scheduler/priority';

describe('scheduler priority policy', () => {
	it('orders interactive, foreground, background, then maintenance work', () => {
		expect(['interactive', 'foreground', 'background', 'maintenance'].map(priority.rank)).toEqual([0, 1, 2, 3]);
	});

	it('keeps explicit user work interactive when its tab becomes inactive', () => {
		expect(priority.tab('interactive', false)).toBe('interactive');
	});

	it('promotes and demotes automatic work with tab activation', () => {
		expect(priority.analysis('automatic', true)).toBe('foreground');
		expect(priority.analysis('automatic', false)).toBe('background');
		expect(priority.tab('foreground', false)).toBe('background');
		expect(priority.tab('background', true)).toBe('foreground');
	});

	it('does not repurpose maintenance work as tab-visible work', () => {
		expect(priority.tab('maintenance', true)).toBe('maintenance');
		expect(priority.tab('maintenance', false)).toBe('maintenance');
	});
});
