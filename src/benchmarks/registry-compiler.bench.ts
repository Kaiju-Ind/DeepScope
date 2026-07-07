import { bench, describe } from 'vitest';

import { buildCollectionPlan } from '@/lib/collectors/planning';
import { createObservationMatcherIndex } from '@/lib/detection/observation-matcher-index';
import { createCompiledDetectionRegistry } from '@/lib/detection/registry-graph';
import type { DetectionRule, TechnologyDefinition } from '@/lib/detection/types';
import { compileTechnologyRegistry } from '@/lib/registry';

/** Number of generated technologies used to approximate a large bundled registry. */
const LARGE_REGISTRY_SIZE = 1_000;

/** Number of rule groups per generated technology. */
const RULE_GROUPS_PER_TECHNOLOGY = 4;

/** Vitest benchmark settings tuned for stable local comparison without huge CI cost. */
const BENCHMARK_OPTIONS = {
	time: 1_000,
	warmupTime: 250,
	iterations: 64,
	warmupIterations: 16,
} as const;

/** Visible benchmark sink used because Tinybench does not expose `do_not_optimize()`. */
let consumedArtifactSize = 0;

/** Consume benchmark output through a visible side effect. */
function consumeArtifactSize(count: number): void {
	consumedArtifactSize = (consumedArtifactSize + count) % Number.MAX_SAFE_INTEGER;
}

/** Create deterministic registry entries for compiler benchmark scenarios. */
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

/** Baseline current work before the compiler owns artifact construction. */
function buildSeparateArtifacts(registry: readonly TechnologyDefinition[]): number {
	const matcherIndex = createObservationMatcherIndex(registry);
	const relationshipGraph = createCompiledDetectionRegistry(registry);
	const collectionPlan = buildCollectionPlan(registry);

	return matcherIndex.ruleCount + relationshipGraph.relationshipEdges.length + collectionPlan.selectorProbeList.length;
}

/** Compiler work that builds validation, diagnostics, source maps, and runtime artifacts. */
function buildCompiledArtifact(registry: readonly TechnologyDefinition[]): number {
	const artifact = compileTechnologyRegistry({ technologies: registry });

	return artifact.matcherIndex.ruleCount +
		artifact.relationshipGraph.relationshipEdges.length +
		artifact.collectionPlan.selectorProbeList.length +
		Object.keys(artifact.sourceMap).length +
		artifact.diagnostics.length;
}

const registry = createBenchmarkRegistry(LARGE_REGISTRY_SIZE);

describe('registry compiler', () => {
	bench('separate runtime artifacts', () => {
		consumeArtifactSize(buildSeparateArtifacts(registry));
	}, BENCHMARK_OPTIONS);

	bench('compiled registry artifact', () => {
		consumeArtifactSize(buildCompiledArtifact(registry));
	}, BENCHMARK_OPTIONS);
});
