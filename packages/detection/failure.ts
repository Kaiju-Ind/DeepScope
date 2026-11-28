/**
 * Serializable failure attached to an analysis.
 *
 * Producers own their code vocabulary. The detector retains the plain record so
 * snapshots and RPC messages keep their existing JSON representation. This is
 * data, not a Result failure occurrence or an Error with runtime identity.
 */
export interface AnalysisFailure<Code extends string = string> {
	/** Stable producer-defined code used to choose a user-facing explanation. */
	readonly code: Code;
	/** Safe explanation supplied by the producer. */
	readonly message: string;
	/** Optional diagnostic stack retained by the existing wire contract. */
	readonly stack?: string;
}
