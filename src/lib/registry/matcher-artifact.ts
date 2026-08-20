import { createObservationMatcherIndex, type ObservationMatcherIndex } from '../detection/observation-matcher-index';
import type { MatcherTechnologyType } from '../detection/types';

/** Minimal compiled product required inside a dedicated matcher worker. */
export interface CompiledMatcherRegistryArtifact {
	/** Narrow technology records that contain only identity and rules for this shard. */
	readonly technologies: readonly MatcherTechnologyType[];
	/** Kind/key/literal routes used to avoid unrelated semantic rule evaluation. */
	readonly matcherIndex: ObservationMatcherIndex;
}

/** Compile one matcher shard without graphs, collection plans, metadata tables, or source maps. */
export function compileMatcherRegistry(
	technologies: readonly MatcherTechnologyType[],
): CompiledMatcherRegistryArtifact {
	return {
		technologies,
		matcherIndex: createObservationMatcherIndex(technologies),
	};
}
