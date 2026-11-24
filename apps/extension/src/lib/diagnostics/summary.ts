/**
 * Short `key=value` text for the `{summary}` placeholder of a debug log line.
 *
 * The background and the content script each pass the detail keys worth
 * reading at a glance; the full details stay in the structured record.
 */

/** How one log surface lays out its summary. */
export interface FormatOptions {
	/** Also leave out `null` and empty-string values; `undefined` is always left out. */
	readonly skipBlank?: boolean;
	/** Wrap the pairs in parentheses: ` (a=1 b=2)` instead of ` a=1 b=2`. */
	readonly parenthesize?: boolean;
}

/** Render the listed keys present in `details`, in list order, with a leading space; empty when none are. */
export function format(
	details: Record<string, unknown> | undefined,
	keys: readonly string[],
	options: FormatOptions = {},
): string {
	if (!details) return '';

	const pairs: string[] = [];
	for (const key of keys) {
		const value = details[key];
		if (value === undefined) continue;
		if (options.skipBlank && (value === null || value === '')) continue;
		pairs.push(`${key}=${render(value)}`);
	}

	if (!pairs.length) return '';
	return options.parenthesize ? ` (${pairs.join(' ')})` : ` ${pairs.join(' ')}`;
}

/** Scalars as text, arrays as `[a,b]`, anything else as JSON. */
function render(value: unknown): string {
	if (Array.isArray(value)) return `[${value.map(render).join(',')}]`;
	if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
	return JSON.stringify(value);
}
