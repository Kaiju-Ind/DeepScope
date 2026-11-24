import { describe, expect, it } from 'vitest';

import {
	createCompiledDetectionRegistry,
	listRegistryRelationshipTargets,
} from '@/lib/detection/registry-graph';
import type { TechnologyDefinition } from '@/lib/detection/types';

function technology(input: Partial<TechnologyDefinition> & Pick<TechnologyDefinition, 'id'>): TechnologyDefinition {
	return {
		name: input.id,
		website: `https://example.com/${input.id}`,
		categories: ['unknown'],
		rules: [],
		...input,
	};
}

describe('compiled detection registry graph', () => {
	it('preserves technology order and id lookups from the loaded registry', () => {
		const alpha = technology({ id: 'alpha' });
		const beta = technology({ id: 'beta' });
		const compiled = createCompiledDetectionRegistry([alpha, beta]);

		expect(compiled.technologies).toEqual([alpha, beta]);
		expect(compiled.definitionsById.get('alpha')).toBe(alpha);
		expect(compiled.registryOrderById.get('alpha')).toBe(0);
		expect(compiled.registryOrderById.get('beta')).toBe(1);
	});

	it('normalizes shorthand and explicit relationship declarations into one edge list', () => {
		const compiled = createCompiledDetectionRegistry([
			technology({
				id: 'platform',
				implies: ['runtime'],
				requires: ['language'],
				excludes: ['legacy'],
				relationships: [
					{ kind: 'implies', target: 'runtime' },
					{ kind: 'excludes', target: 'legacy' },
				],
			}),
			technology({ id: 'language' }),
			technology({ id: 'runtime' }),
			technology({ id: 'legacy' }),
		]);

		expect(compiled.relationshipEdges).toEqual([
			{ kind: 'implies', sourceId: 'platform', targetId: 'runtime' },
			{ kind: 'requires', sourceId: 'platform', targetId: 'language' },
			{ kind: 'excludes', sourceId: 'platform', targetId: 'legacy' },
		]);
	});

	it('lists relationship targets in registry order instead of declaration order', () => {
		const compiled = createCompiledDetectionRegistry([
			technology({ id: 'alpha', implies: ['gamma', 'beta'] }),
			technology({ id: 'beta' }),
			technology({ id: 'gamma' }),
		]);

		expect(listRegistryRelationshipTargets(compiled, 'implies', 'alpha')).toEqual([
			'beta',
			'gamma',
		]);
	});
});
