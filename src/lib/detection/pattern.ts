import type { DetectionPatternType } from './types';

/** Native patterns compiled on demand for packaged matcher descriptors. */
const compiledPatterns = new WeakMap<object, RegExp>();
let packagedCompileCount = 0;
let packagedCacheHitCount = 0;

/** Cumulative worker-local native-pattern activity without retaining pattern keys. */
export interface DetectionPatternCacheStats {
	readonly packagedCompileCount: number;
	readonly packagedCacheHitCount: number;
}

/** Return cumulative packaged-pattern activity for runtime diagnostics and benchmarks. */
export function getDetectionPatternCacheStats(): DetectionPatternCacheStats {
	return { packagedCompileCount, packagedCacheHitCount };
}

/** Return true when a value has the source/flags shape used by detection patterns. */
export function isDetectionPattern(value: unknown): value is DetectionPatternType {
	if (value instanceof RegExp) return true;
	if (typeof value !== 'object' || value === null) return false;
	const candidate = value as { readonly source?: unknown; readonly flags?: unknown };
	return typeof candidate.source === 'string' && typeof candidate.flags === 'string';
}

/** Return the regular-expression source without forcing a packaged pattern to compile. */
export function getDetectionPatternSource(pattern: DetectionPatternType): string {
	return pattern.source;
}

/** Return regular-expression flags without forcing a packaged pattern to compile. */
export function getDetectionPatternFlags(pattern: DetectionPatternType): string {
	return pattern.flags;
}

/**
 * Compile a packaged pattern only when semantic matching actually needs it.
 *
 * The cache is weak so evicting a matcher shard also makes its compiled native
 * patterns eligible for collection. TypeScript-authored `RegExp` values pass
 * through unchanged.
 */
export function getDetectionRegExp(pattern: DetectionPatternType): RegExp {
	if (pattern instanceof RegExp) return pattern;

	const key = pattern as object;
	const cached = compiledPatterns.get(key);
	if (cached) {
		packagedCacheHitCount += 1;
		return cached;
	}

	const compiled = new RegExp(pattern.source, pattern.flags);
	compiledPatterns.set(key, compiled);
	packagedCompileCount += 1;
	return compiled;
}

/** Execute one pattern from a stable zero `lastIndex` and restore it afterwards. */
export function execDetectionPattern(
	pattern: DetectionPatternType,
	value: string,
): RegExpExecArray | null {
	const compiled = getDetectionRegExp(pattern);
	compiled.lastIndex = 0;
	const match = compiled.exec(value);
	compiled.lastIndex = 0;
	return match;
}

/** Test one pattern without leaking state from global or sticky expressions. */
export function testDetectionPattern(pattern: DetectionPatternType, value: string): boolean {
	return execDetectionPattern(pattern, value) !== null;
}
