import { matchIndexedObservationBatch } from '../../detection/observation-matcher-index';
import type { MatcherJobRunResult, RunMatcherJobRequest } from '../contracts';
import { createMatcherPartitionTasks, createMatcherPipelineResult } from '../partition';

/**
 * Run matcher work in the background only for WXT development builds.
 *
 * Vite can serve worker modules differently during extension development. This
 * path keeps hot-reload useful, but it must never become a production fallback:
 * repeating a failed offscreen job in the service worker duplicates the largest
 * CPU and memory cost exactly when the primary runtime is already unhealthy.
 */
export async function run(request: RunMatcherJobRequest): Promise<MatcherJobRunResult> {
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
			registry: request.registry,
			batch: task.batch,
			index: request.index,
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
		compiledRegistryArtifact: { relationshipGraph: request.relationshipGraph },
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
