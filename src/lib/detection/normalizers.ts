import { SOURCE_LIMITS } from './source-limits';

export function uniqueStrings(values: string[]): string[] {
	return Array.from(new Set(values.filter(Boolean)));
}

export function limitStringsByTotalChars(
	values: string[],
	maxItems: number,
	maxTotalChars: number,
): string[] {
	const output: string[] = [];
	let usedChars = 0;

	for (const value of uniqueStrings(values)) {
		if (output.length >= maxItems || usedChars >= maxTotalChars) {
			break;
		}

		const remainingChars = maxTotalChars - usedChars;
		const boundedValue = truncate(value, remainingChars);
		if (!boundedValue) {
			continue;
		}

		output.push(boundedValue);
		usedChars += boundedValue.length;
	}

	return output;
}

/**
 * Merge newly observed text into an existing bounded collection.
 *
 * Earlier observations keep priority. Each value is first clipped to its item
 * limit, then the combined list is deduplicated and clipped to the shared total
 * character budget. This is useful for long-lived observers where many
 * individually valid snapshots can otherwise accumulate into an invalid payload.
 */
export function mergeStringsByTotalChars(
	current: readonly string[],
	incoming: readonly string[],
	maxItems: number,
	maxItemChars: number,
	maxTotalChars: number,
): string[] {
	return limitStringsByTotalChars(
		[...current, ...incoming].map((value) => truncate(value, maxItemChars)),
		maxItems,
		maxTotalChars,
	);
}

export function truncate(value: string, maxChars: number): string {
	if (value.length <= maxChars) {
		return value;
	}

	return value.slice(0, maxChars);
}

/** Normalize page metadata into bounded, deterministic signal values. */
export function normalizeMetaMap(meta: Record<string, string[]>): Record<string, string[]> {
	const entries = Object.entries(meta).map(([key, values]) => {
		const normalizedValues = uniqueStrings(
			values.map((value) => truncate((value ?? '').trim(), SOURCE_LIMITS.metaValueChars)),
		).slice(0, SOURCE_LIMITS.metaValuesPerKey);

		return [key.toLowerCase(), normalizedValues] as const;
	});

	return Object.fromEntries(entries);
}

/** Estimate serialized message size before sending signals across extension boundaries. */
export function estimateBytes(value: unknown): number {
	return new TextEncoder().encode(JSON.stringify(value)).length;
}
