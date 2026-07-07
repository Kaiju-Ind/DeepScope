import type { CompiledTechnologyRegistryArtifact } from './compiler';
import type { TechnologyRegistryProvider } from '../detection/registry-provider';

/**
 * Runtime provider backed by an already-loaded build-generated registry artifact.
 *
 * Tooling and tests can still wrap a concrete artifact even though production
 * loads packaged JSON asynchronously. The async methods keep callers on one
 * provider contract while avoiding browser fetches in small test registries.
 */
export function createPrecompiledTechnologyRegistryProvider(
	artifact: CompiledTechnologyRegistryArtifact,
): TechnologyRegistryProvider {
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

		async getCompiledBootstrapRegistry() {
			return artifact;
		},

		async getCompiledObservationKindRegistry() {
			return artifact;
		},
	};
}
