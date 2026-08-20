import { matchIndexedObservationBatch } from '../../detection/observation-matcher-index';
import { bundledTechnologyRegistryProvider } from '../../detection/registry-provider';
import type { MatcherJobRunResult, RunMatcherJobRequest } from '../contracts';
import { createMatcherPartitionTasks, createMatcherPipelineResult } from '../partition';

/**
 * Run matcher work in the background only for WXT development builds.
 *
 * Development intentionally pays for the complete compiled registry because the
 * Vite worker path can be unstable during hot reload. Production never calls this
 * function and therefore never loads executable matcher rules into the background
 * service worker.
 */
export async function run(request: RunMatcherJobRequest): Promise<MatcherJobRunResult> {
	const compiled = await bundledTechnologyRegistryProvider.getCompiledRegistry();
	const partitions = createMatcherPartitionTasks({
		job: request.job,
		batch: request.batch,
		options: request.options,
	}).map((task) => {
		const observationIndexes = new Map(task.batch.observations.map((observation, index) => [
			observation,
			task.observationIndexes[index] ?? index,
		]));
		const matched = matchIndexedObservationBatch({
			registry: compiled.technologies,
			batch: task.batch,
			index: compiled.matcherIndex,
			options: task.options,
		});
		return {
			job: task.job,
			partitionId: task.partitionId,
			kind: task.kind,
			priority: task.priority,
			observationCount: task.batch.observations.length,
			matches: matched.matches.map((match, matchIndex) => ({
				observationIndex: observationIndexes.get(match.observation) ?? matchIndex,
				matchIndex,
				match,
			})),
			diagnostics: matched.diagnostics,
			completedAt: Date.now(),
		};
	});
	const result = createMatcherPipelineResult({
		batch: request.batch,
		registry: request.registry,
		relationshipGraph: request.relationshipGraph,
		partitions,
		analyzedAt: request.analyzedAt,
		source: request.source,
	});
	return {
		job: request.job,
		mode: request.mode,
		result,
		partitions,
		executor: 'development-background',
		completedAt: Date.now(),
	};
}
