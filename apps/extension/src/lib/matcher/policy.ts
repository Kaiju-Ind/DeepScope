/** Active dedicated-worker capacity retained while a matcher analysis lifecycle is hot. */
export const MATCHER_PARTITION_CONCURRENCY = 2;

/**
 * Hard execution limit for one partition inside a worker slot.
 *
 * The pool owns this deadline because only it can stop the CPU work: when it
 * expires, the slot terminates its worker and starts a fresh one. A background
 * timeout alone would abandon the reply while the worker kept running.
 */
export const MATCHER_PARTITION_DEADLINE_MS = 120_000;

/**
 * Background-side transport backstop for one partition request.
 *
 * It is longer than the pool deadline so the host normally reports the timeout
 * itself; this only fires when the host document stopped answering entirely.
 */
export const MATCHER_PARTITION_TRANSPORT_DEADLINE_MS = MATCHER_PARTITION_DEADLINE_MS + 10_000;
