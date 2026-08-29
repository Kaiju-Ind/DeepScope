/** Current transient matcher retention owned by the service-worker scheduler. */
export interface BudgetState {
	readonly count: number;
	readonly bytes: number;
}

/** Physical limits applied before another raw observation batch can enter memory. */
export interface BudgetLimit {
	readonly count: number;
	readonly bytes: number;
}

/** Return whether another transient batch fits both count and estimated-byte limits. */
export function accepts(state: BudgetState, nextBytes: number, limit: BudgetLimit): boolean {
	return state.count < limit.count && state.bytes + nextBytes <= limit.bytes;
}
