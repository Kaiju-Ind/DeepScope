/** Failure classes emitted by the matcher runtime before background policy maps them to durable state. */
export type MatcherFailureType =
	| 'canceled'
	| 'offscreen-unavailable'
	| 'queue-full'
	| 'queue-timeout'
	| 'run-timeout'
	| 'host-failed';

/** Typed matcher runtime error that preserves the failure mechanism across local call sites. */
export class MatcherError extends Error {
	/** Stable machine-readable reason used by background lifecycle policy and diagnostics. */
	readonly reason: MatcherFailureType;

	constructor(reason: MatcherFailureType, message: string, options?: ErrorOptions) {
		super(message, options);
		this.name = 'MatcherError';
		this.reason = reason;
	}
}
