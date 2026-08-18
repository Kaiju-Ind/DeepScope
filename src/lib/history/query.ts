import type { DetectionReplayTrace } from '@/lib/pipeline';
import * as url from '@/utils/url';
import { compare, key } from './compare';

/** Filters supported by the retained detector-run query. */
export type FilterType = 'all' | 'page' | 'changed';

/** Search criteria for retained detector runs. */
export interface QueryType {
	/** Free-text search over the page URL, run identity, and emitted technology names. */
	readonly text?: string;
	/** Which retained runs should remain in the result. */
	readonly filter?: FilterType;
	/** Current page URL used by the `page` filter. */
	readonly page?: string;
}

/**
 * Query retained detector runs without changing their persisted order.
 *
 * The `changed` filter compares a run only with the previous retained run for
 * the same page. Comparing different page URLs would turn normal route
 * differences into false technology changes.
 */
export function query(runs: readonly DetectionReplayTrace[], options: QueryType = {}): DetectionReplayTrace[] {
	const text = options.text?.trim().toLocaleLowerCase() ?? '';
	const filter = options.filter ?? 'all';

	return runs.filter((run) => {
		if (filter === 'page' && options.page && !url.same(run.target.url, options.page)) return false;
		if (filter === 'changed') {
			const older = previous(runs, run);
			if (!older) return false;
			const diff = compare(older, run);
			if (diff.added.length + diff.removed.length + diff.changed.length === 0) return false;
		}

		if (!text) return true;
		return [run.target.url, run.runId ?? '', ...run.explanations.map((item) => item.name)]
			.some((value) => value.toLocaleLowerCase().includes(text));
	});
}

/** Find one retained run by its stable replay identity. */
export function get(runs: readonly DetectionReplayTrace[], runKey: string | undefined): DetectionReplayTrace | undefined {
	return runKey ? runs.find((run) => key(run) === runKey) : undefined;
}

/** Find the immediately older retained run for the same page. */
export function previous(runs: readonly DetectionReplayTrace[], current: DetectionReplayTrace | undefined): DetectionReplayTrace | undefined {
	if (!current) return undefined;
	const index = runs.findIndex((run) => key(run) === key(current));
	if (index < 0) return undefined;

	for (let position = index + 1; position < runs.length; position += 1) {
		const candidate = runs[position];
		if (candidate && url.same(candidate.target.url, current.target.url)) return candidate;
	}

	return undefined;
}
