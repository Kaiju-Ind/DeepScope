// Vendored from Kaiju-Ind/Utils packages/workflow/retry.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
/** Deterministic values used by retry policy evaluation. @module */
import { temporal } from '@utils/duration/temporal';
import * as durationCore from '@utils/duration';
import type { WorkflowRetryInstruction } from './types.ts';

/**
 * Derive one replay-stable unit interval value from durable instruction identity.
 *
 * @internal
 */
export function unit(value: string): number {
	let hash = 2166136261;
	for (let index = 0; index < value.length; index += 1) {
		hash ^= value.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0) / 0xffff_ffff;
}

/** Calculate the same bounded retry delay for local and saved execution. */
export function delay(instruction: WorkflowRetryInstruction, path: string, failedAttempt: number): Temporal.Duration {
	const initialMilliseconds = retryMilliseconds(instruction.delay!);
	const maximumMilliseconds = instruction.maximumDelay === undefined
		? Number.POSITIVE_INFINITY
		: retryMilliseconds(instruction.maximumDelay);
	const backedOff = Math.min(initialMilliseconds * instruction.backoff ** (failedAttempt - 1), maximumMilliseconds);
	const jitterScale = instruction.jitter === 0
		? 1
		: 1 + ((unit(`${path}:${failedAttempt}`) * 2) - 1) * instruction.jitter;
	return temporal.Duration.from({ milliseconds: Math.max(0, Math.round(backedOff * jitterScale)) });
}

/**
 * Reject calendar-relative and invalid delays before calculating a retry timer.
 *
 * @internal
 */
function retryMilliseconds(value: Temporal.Duration): number {
	let milliseconds: number;
	try {
		milliseconds = durationCore.elapsed(value);
	} catch (error) {
		throw new TypeError('Workflow retry delay must be convertible to milliseconds.', { cause: error });
	}
	if (!Number.isFinite(milliseconds) || milliseconds < 0) {
		throw new TypeError('Workflow retry delay must be a finite non-negative duration.');
	}
	return milliseconds;
}
