import { describe, expect, it } from 'vitest';

import type { TechnologyDefinition } from "@deepscope/registry/types";
import { createStaticTechnologyRegistryProvider } from "../provider/index.ts";

function makeTechnology(id: string): TechnologyDefinition {
	return {
		id,
		name: id,
		website: `https://${id}.example`,
		categories: ['unknown'],
		rules: [],
	};
}

describe('technology registry provider contract', () => {
	it('returns the active registry in detector order', async () => {
		const registry = [makeTechnology('first'), makeTechnology('second')];
		const provider = createStaticTechnologyRegistryProvider(registry);

		expect((await provider.listTechnologies()).map((technology) => technology.id)).toEqual([
			'first',
			'second',
		]);
		expect((await provider.listBootstrapTechnologies()).map((technology) => technology.id)).toEqual([
			'first',
			'second',
		]);
	});
});
