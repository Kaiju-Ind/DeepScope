import type { AnalysisSourceType, WorkPriorityType } from './schema';

/** Stable numeric rank persisted in IndexedDB compound indexes. */
const PRIORITY_RANK: Readonly<Record<WorkPriorityType, number>> = Object.freeze({
	interactive: 0,
	foreground: 1,
	background: 2,
	maintenance: 3,
});

/** Return the IndexedDB ordering rank for one semantic priority class. */
export function rank(priority: WorkPriorityType): number {
	return PRIORITY_RANK[priority];
}

/** Choose analysis priority from user intent and current tab visibility. */
export function analysis(source: AnalysisSourceType, active: boolean): WorkPriorityType {
	if (source === 'interactive') return 'interactive';
	if (source === 'recovery') return active ? 'foreground' : 'background';
	return active ? 'foreground' : 'background';
}

/** Preserve explicit user intent while changing automatic/recovery tab priority. */
export function tab(current: WorkPriorityType, active: boolean): WorkPriorityType {
	if (current === 'interactive') return current;
	if (current === 'maintenance') return current;
	return active ? 'foreground' : 'background';
}
