import { bench, describe } from 'vitest';

import type { DetectionRule, TechnologyDefinition } from '@/lib/detection/types';
import { compileTechnologyRegistry } from '@/lib/registry';
import {
	PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
	hydratePackagedTechnologyRegistry,
	renderPackagedRegistryJson,
} from '@/lib/registry/packaged-artifacts';

/** Number of generated technologies used to approximate a large packaged registry. */
const LARGE_REGISTRY_SIZE = 1_000;

/** Number of rule groups per generated technology. */
const RULE_GROUPS_PER_TECHNOLOGY = 4;

/** Vitest benchmark settings tuned for local comparison without huge CI cost. */
const BENCHMARK_OPTIONS = {
	time: 1_000,
	warmupTime: 250,
	iterations: 64,
	warmupIterations: 16,
} as const;

/** Observable benchmark sink used because Tinybench does not expose `do_not_optimize()`. */
let consumedRegistrySize = 0;

/** Consume benchmark output through a visible side effect. */
function consumeRegistrySize(count: number): void {
	consumedRegistrySize = (consumedRegistrySize + count) % Number.MAX_SAFE_INTEGER;
}

/** Create deterministic registry entries for parse and hydration benchmark scenarios. */
function createBenchmarkRegistry(size: number): TechnologyDefinition[] {
	return Array.from({ length: size }, (_item, index) => {
		const rules = Array.from({ length: RULE_GROUPS_PER_TECHNOLOGY }, (_rule, ruleIndex): DetectionRule[] => [
			{ kind: 'meta', key: `generator-${index}-${ruleIndex}`, valuePattern: /matched-generator/ },
			{ kind: 'dom', selector: `[data-tech-${index}-${ruleIndex}]` },
			{ kind: 'scriptSrc', pattern: new RegExp(`tech-${index}-${ruleIndex}\\.js`) },
		]).flat();

		return {
			id: `tech-${index}`,
			name: `Tech ${index}`,
			website: `https://tech-${index}.example`,
			categories: ['framework'],
			rules,
			...(index > 0 ? { implies: [`tech-${index - 1}`] } : {}),
		};
	});
}

const registry = createBenchmarkRegistry(LARGE_REGISTRY_SIZE);
const registryJson = renderPackagedRegistryJson({
	schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
	kind: 'enrichment',
	technologies: registry,
	ruleCount: registry.reduce((count, technology) => count + technology.rules.length, 0),
	generatedAt: 1,
});
const parsedRegistry = JSON.parse(registryJson);

/** Parse, decode regular expressions, and compile the packaged registry artifact. */
function parseHydrateAndCompileRegistry(): number {
	const parsed = JSON.parse(registryJson);
	const hydrated = hydratePackagedTechnologyRegistry(parsed);
	const artifact = compileTechnologyRegistry({ technologies: hydrated });

	return artifact.matcherIndex.ruleCount;
}

/** Decode and compile an already-parsed registry asset to isolate hydration cost. */
function hydrateAndCompileParsedRegistry(): number {
	const hydrated = hydratePackagedTechnologyRegistry(parsedRegistry);
	const artifact = compileTechnologyRegistry({ technologies: hydrated });

	return artifact.matcherIndex.ruleCount;
}

/** Compile the in-memory TypeScript-shaped registry as the previous baseline. */
function compileInMemoryRegistry(): number {
	const artifact = compileTechnologyRegistry({ technologies: registry });

	return artifact.matcherIndex.ruleCount;
}

/**
 * Compare packaged JSON loading against the previous in-memory registry shape.
 *
 * The first scenario measures the real runtime path: JSON parse, regular
 * expression hydration, and compiler artifact construction. The second isolates
 * hydration and compilation after fetch has already parsed JSON. The final
 * baseline keeps the old TypeScript-shaped registry in memory so local runs can
 * see the cost of moving registry data out of the background startup bundle.
 */
describe('registry json hydration', () => {
	bench('parse hydrate and compile packaged json', () => {
		consumeRegistrySize(parseHydrateAndCompileRegistry());
	}, BENCHMARK_OPTIONS);

	bench('hydrate and compile parsed json', () => {
		consumeRegistrySize(hydrateAndCompileParsedRegistry());
	}, BENCHMARK_OPTIONS);

	bench('compile in-memory registry baseline', () => {
		consumeRegistrySize(compileInMemoryRegistry());
	}, BENCHMARK_OPTIONS);
});
