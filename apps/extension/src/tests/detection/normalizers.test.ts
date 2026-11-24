import { describe, expect, it } from 'vitest';

import { mergeStringsByTotalChars } from '@/lib/detection/normalizers';
import { SOURCE_LIMITS } from '@/lib/detection/source-limits';

describe('bounded observed source content', () => {
	it('keeps long-lived stylesheet observations inside the shared transport budget', () => {
		let values: string[] = [];

		for (let index = 0; index < 20; index += 1) {
			const prefix = `/* snapshot-${index} */`;
			const content = `${prefix}${String(index % 10).repeat(SOURCE_LIMITS.stylesheetContentChars)}`;
			values = mergeStringsByTotalChars(
				values,
				[content],
				SOURCE_LIMITS.stylesheetContentItems,
				SOURCE_LIMITS.stylesheetContentChars,
				SOURCE_LIMITS.stylesheetContentTotalChars,
			);
		}

		expect(values.length).toBeLessThanOrEqual(SOURCE_LIMITS.stylesheetContentItems);
		expect(values.every((value) => value.length <= SOURCE_LIMITS.stylesheetContentChars)).toBe(true);
		expect(values.reduce((total, value) => total + value.length, 0)).toBeLessThanOrEqual(
			SOURCE_LIMITS.stylesheetContentTotalChars,
		);
	});

	it('preserves earlier values and deduplicates repeated content', () => {
		const current = ['alpha', 'beta'];
		const merged = mergeStringsByTotalChars(current, ['beta', 'gamma-long'], 4, 5, 15);

		expect(merged).toEqual(['alpha', 'beta', 'gamma']);
	});
});
