import { describe, expect, it } from 'vitest';

import { buildCollectionPlan } from '@/lib/collectors/planning';
import { technologies } from '@/registry/technologies';

describe('registry DOM selectors', () => {
	it('keeps every authored DOM selector valid for live browser matching', () => {
		const plan = buildCollectionPlan(technologies);
		const invalidSelectors = plan.initial.domSelectorPlan.probes
			.filter((probe) => !probe.valid)
			.map((probe) => probe.selector);

		expect(invalidSelectors).toEqual([]);
	});
});
