import type { CompiledTechnologyRegistryArtifact } from './compiler';
import { compileMatcherRegistry } from './matcher-artifact';
import { createObservationKindTechnologyRegistry } from './packaged-artifacts';
import { createRuntimeTechnologyRegistryArtifact } from './runtime-artifact';
import type { TechnologyRegistryProvider } from '../detection/registry-provider';

/**
 * Runtime provider backed by an already-loaded build-generated registry artifact.
 *
 * Tests and tooling can wrap one complete artifact while still exercising the
 * production provider contract. Runtime and matcher products are projected into
 * the same rule-free/minimal shapes used by packaged extension assets.
 */
export function createPrecompiledTechnologyRegistryProvider(
	artifact: CompiledTechnologyRegistryArtifact,
): TechnologyRegistryProvider {
	const runtime = createRuntimeTechnologyRegistryArtifact(artifact);
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
			return compileMatcherRegistry(createObservationKindTechnologyRegistry(artifact.technologies, kind));
		},
	};
}
