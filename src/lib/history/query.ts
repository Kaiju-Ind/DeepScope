import type { DetectionReplayTrace } from '@/lib/pipeline';
import * as url from '@/utils/url';
import { compare, key } from './compare';

/** Page scope used by the retained detector-run query. */
export type HistoryScopeType = 'origin' | 'page';

/** Technology-change predicate used by the retained detector-run query. */
export type HistoryChangeFilterType = 'any' | 'changed' | 'added' | 'removed' | 'modified';

/** Search criteria for retained detector runs. */
export interface HistoryQueryType {
	/** Free-text search over the page URL, run identity, and emitted technology names. */
	readonly text?: string;
	/** Whether to include every retained page or only the currently visible page. */
	readonly scope?: HistoryScopeType;
	/** Which kind of difference from the previous same-page run must exist. */
	readonly change?: HistoryChangeFilterType;
	/** Current page URL used by the `page` scope. */
	readonly page?: string;
}

/**
 * Query retained detector runs without changing their persisted order.
 *
 * Change predicates compare a run only with the previous retained run for the
 * same page. Comparing different routes would turn ordinary page differences
 * into false technology changes.
 */
export function query(runs: readonly DetectionReplayTrace[], options: HistoryQueryType = {}): DetectionReplayTrace[] {
	const text = options.text?.trim().toLocaleLowerCase() ?? '';
	const scope = options.scope ?? 'origin';
	const change = options.change ?? 'any';

	return runs.filter((run) => {
		if (scope === 'page' && options.page && !url.same(run.target.url, options.page)) return false;
		if (change !== 'any' && !matchesChange(runs, run, change)) return false;

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

/** Check one explicit change predicate against the previous same-page run. */
function matchesChange(runs: readonly DetectionReplayTrace[], run: DetectionReplayTrace, change: Exclude<HistoryChangeFilterType, 'any'>): boolean {
	const older = previous(runs, run);
	if (!older) return false;
	const diff = compare(older, run);

	if (change === 'added') return diff.added.length > 0;
	if (change === 'removed') return diff.removed.length > 0;
	if (change === 'modified') return diff.changed.length > 0;
	return diff.added.length + diff.removed.length + diff.changed.length > 0;
}
