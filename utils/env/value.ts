// Vendored from Kaiju-Ind/Utils packages/env/value.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
/** Normalize one environment value by treating blank strings as missing. */
export function blank(value: unknown): unknown {
	if (typeof value !== 'string') return value;
	const trimmed = value.trim();
	return trimmed === '' ? undefined : trimmed;
}
