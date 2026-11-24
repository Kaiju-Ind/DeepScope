import type { CompiledTechnologyRegistryArtifact } from './compiler';
import { compileMatcherRegistry } from './matcher-artifact';
import {
	countTechnologyPatterns,
	countTechnologyRules,
	createObservationKindTechnologyRegistry,
} from './packaged-artifacts';
import { createRuntimeTechnologyRegistryArtifact } from './runtime-artifact';
import type { BuildTechnologyRegistryProvider } from '../detection/registry-provider';

/**
 * Runtime provider backed by an already-loaded build-generated registry artifact.
 *
 * Tests and tooling can wrap one complete artifact while still exercising the
 * production provider contract. Runtime and matcher products are projected into
 * the same rule-free/minimal shapes used by packaged extension assets.
 */
export function createPrecompiledTechnologyRegistryProvider(
	artifact: CompiledTechnologyRegistryArtifact,
): BuildTechnologyRegistryProvider {
	const runtime = createRuntimeTechnologyRegistryArtifact(artifact);
	const matcherByKind = new Map<string, ReturnType<typeof compileMatcherRegistry>>();
	return {
		async listTechnologies() {
			return artifact.technologies;
		},

		async listBootstrapTechnologies() {
			return artifact.technologies;
		},

		async getCompiledRegistry() {
			return artifact;
		},

		async getRuntimeRegistry() {
			return runtime;
		},

		async getCompiledBootstrapRegistry() {
			return artifact;
		},

		async getCompiledObservationKindRegistry(kind) {
			let compiled = matcherByKind.get(kind);
			if (!compiled) {
				compiled = compileMatcherRegistry(createObservationKindTechnologyRegistry(artifact.technologies, kind));
				matcherByKind.set(kind, compiled);
			}
			return compiled;
		},

		getCacheState(kind) {
			const compiled = matcherByKind.get(kind);
			return {
				cached: compiled !== undefined,
				retainedBytes: 0,
				retainedShardCount: matcherByKind.size,
				budgetBytes: Number.POSITIVE_INFINITY,
				shardRetainedBytes: 0,
				shardPatternCount: compiled ? countTechnologyPatterns(compiled.technologies) : 0,
				shardRuleCount: compiled ? countTechnologyRules(compiled.technologies) : 0,
			};
		},
	};
}
