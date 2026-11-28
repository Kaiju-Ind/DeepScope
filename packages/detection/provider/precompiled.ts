import type { CompiledTechnologyRegistryArtifact } from "../compiler/core.ts";
import { compileMatcherRegistry } from "../artifacts/matcher.ts";
import { countTechnologyPatterns, countTechnologyRules, createObservationKindTechnologyRegistry } from "../artifacts/packaged.ts";
import { createRuntimeTechnologyRegistryArtifact } from "../artifacts/runtime.ts";
import type { BuildTechnologyRegistryProvider } from "./index.ts";

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
		/** Expose definitions from the supplied compiled artifact without recompiling or copying them. */
		async listTechnologies() {
			return artifact.technologies;
		},

		/** Use the supplied artifact's full definitions as the bootstrap view. */
		async listBootstrapTechnologies() {
			return artifact.technologies;
		},

		/** Return the caller-supplied full artifact without transferring or rebuilding its ownership. */
		async getCompiledRegistry() {
			return artifact;
		},

		/** Return the runtime projection retained when this provider was created. */
		async getRuntimeRegistry() {
			return runtime;
		},

		/** Reuse the supplied artifact for bootstrap rather than creating a second graph. */
		async getCompiledBootstrapRegistry() {
			return artifact;
		},

		/** Compile and cache only the requested kind's matcher shard from the supplied definitions. */
		async getCompiledObservationKindRegistry(kind) {
			let compiled = matcherByKind.get(kind);
			if (!compiled) {
				compiled = compileMatcherRegistry(createObservationKindTechnologyRegistry(artifact.technologies, kind));
				matcherByKind.set(kind, compiled);
			}
			return compiled;
		},

		/** Report cached shard rule/pattern counts; byte accounting is unavailable and the retention budget is unbounded. */
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
