import * as capacity from '@utils/scheduler/capacity';

/**
 * Transient matcher memory policy for the background scheduler.
 *
 * Raw observation batches stay in background memory from admission until their
 * job finishes. At most `jobs` batches, together at most `bytes` estimated
 * bytes, may be held at once. The accounting itself is `@utils/scheduler/capacity`.
 */
export const LIMIT = { jobs: 8, bytes: 12 * 1024 * 1024 } as const;

/** Capacity held by one admitted job until it is released. */
export type Lease = capacity.AdmissionLease;

/** Admission pool for one scheduler. */
export type Budget = capacity.Admission;

/** Create an admission pool for the given limits. */
export function create(limit: { readonly jobs: number; readonly bytes: number } = LIMIT): Budget {
	return capacity.create({ jobs: limit.jobs, bytes: limit.bytes }, { maximumPending: 0 });
}

/**
 * Reserve one job and its estimated bytes now, or return undefined when either
 * limit is full. Never waits. A batch larger than the whole byte limit is
 * refused the same way rather than thrown.
 */
export function reserve(budget: Budget, bytes: number): Lease | undefined {
	if (bytes > budget.limits.bytes!) return undefined;
	return capacity.tryAcquire(budget, { jobs: 1, bytes });
}
