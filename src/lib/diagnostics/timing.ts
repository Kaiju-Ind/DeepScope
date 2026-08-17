import { getKaijuSiteScopeLogger } from '../diagnostics/logging';

/** Summary-only timing context shared by background, content, collector, and pipeline code. */
export type TimingContext = {
	/** Correlates logs emitted for one side panel-triggered analysis or refresh flow. */
	traceId?: string;
	/** Short runtime surface that emitted the timing event. */
	surface?: 'background' | 'content' | 'collector' | 'pipeline' | 'storage' | 'registry' | 'benchmark';
	/** Safe dimensions such as tier, mode, counts, hostname, or cache status. */
	details?: Record<string, unknown>;
};

/** Started timing span that must be ended by the same runtime surface. */
export type TimingSpan = {
	/** Stable event name used when searching console output. */
	name: string;
	/** Monotonic timestamp from `performance.now()` when available. */
	startedAt: number;
	/** Optional safe context copied into the final timing log. */
	context?: TimingContext;
};

const TIMING_LOG_MARKER = '[kaiju-site-scope][timing]';
const timingLogger = getKaijuSiteScopeLogger('timing');

/**
 * Browser runtimes expose a monotonic performance clock, while tests can run in
 * lighter environments. Falling back to `Date.now()` keeps diagnostics available
 * without making timing support a hard browser dependency.
 */
function now(): number {
	return globalThis.performance?.now?.() ?? Date.now();
}

/** Generate a compact id so background, collector, and content logs can be read together. */
export function createTimingTraceId(prefix = 'analysis'): string {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Start a named timing span without logging until the measured work finishes. */
export function startTimingSpan(name: string, context?: TimingContext): TimingSpan {
	return {
		name,
		startedAt: now(),
		...(context ? { context } : {}),
	};
}

/**
 * Finish a timing span and write one summary-only structured LogTape record.
 *
 * Callers pass counts, modes, and status fields rather than collected page data.
 * That keeps the debug output useful for performance diagnosis without exposing
 * raw evidence values, HTML, cookie values, or storage contents.
 */
export function endTimingSpan(
	span: TimingSpan,
	details?: Record<string, unknown>,
): number {
	const durationMs = Number((now() - span.startedAt).toFixed(2));
	const properties = {
		marker: TIMING_LOG_MARKER,
		span: span.name,
		durationMs,
		traceId: span.context?.traceId,
		surface: span.context?.surface,
		...(span.context?.details ?? {}),
		...(details ?? {}),
	};

	timingLogger.debug('{marker} {span} completed in {durationMs}ms.', properties);

	return durationMs;
}

/** Measure synchronous work and log one summary-only duration. */
export function timeSyncSpan<T>(
	name: string,
	context: TimingContext | undefined,
	operation: () => T,
	details?: (value: T) => Record<string, unknown>,
): T {
	const span = startTimingSpan(name, context);
	try {
		const value = operation();
		endTimingSpan(span, details?.(value));
		return value;
	} catch (error) {
		endTimingSpan(span, {
			failed: true,
			message: error instanceof Error ? error.message : 'Unknown timing failure',
		});
		throw error;
	}
}

/** Measure asynchronous work and log one summary-only duration. */
export async function timeAsyncSpan<T>(
	name: string,
	context: TimingContext | undefined,
	operation: () => Promise<T>,
	details?: (value: T) => Record<string, unknown>,
): Promise<T> {
	const span = startTimingSpan(name, context);
	try {
		const value = await operation();
		endTimingSpan(span, details?.(value));
		return value;
	} catch (error) {
		endTimingSpan(span, {
			failed: true,
			message: error instanceof Error ? error.message : 'Unknown timing failure',
		});
		throw error;
	}
}
