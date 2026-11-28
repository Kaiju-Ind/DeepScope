/**
 * Multi-literal scanner for literal-prefiltered rule buckets.
 *
 * A literal bucket can hold thousands of rules, and the observations it guards
 * (inline scripts, HTML) can be hundreds of kilobytes. Asking
 * `value.includes(literal)` once per rule walks the value once per rule. This
 * scanner walks it once: every literal is filed under a hash of its first four
 * code units, and each position of the value only checks the literals filed
 * under the hash of the four code units starting there.
 *
 * Invariant (exactness): after `scan(table, value)`, `found[id] === 1` exactly
 * when `value.includes(table.literals[id])`.
 *
 * - A literal of length >= 4 occurs at position `i` iff
 *   `value.startsWith(literal, i)`. Its first four code units then equal the
 *   four at `i`, so they hash to the same chain, and every `i` from `0` to
 *   `value.length - 4` is visited. Hash collisions only add `startsWith`
 *   checks; they never mark a literal that is absent.
 * - Shorter literals (including the empty literal, which every value
 *   contains) cannot be anchored on four code units and use `includes`.
 * - The walk stops early only once every literal has been found.
 *
 * Code units are compared, not code points, which is exactly what `includes`
 * and `startsWith` do.
 */

/** Number of code units hashed per anchor. */
const ANCHOR = 4;

/** Scanner built once per literal bucket. */
export interface LiteralTable {
	/** Distinct literals in first-seen order. */
	readonly literals: readonly string[];
	/** Literal id for each rule position in the bucket. */
	readonly ids: Int32Array;
	/** First literal id per hash slot, or -1. */
	readonly heads: Int32Array;
	/** Next literal id in the same slot, or -1. */
	readonly next: Int32Array;
	/** Slot mask; the table has `mask + 1` slots. */
	readonly mask: number;
	/** Ids of literals shorter than the anchor, checked with `includes`. */
	readonly short: readonly number[];
	/** Number of anchored literals (length >= 4). */
	readonly anchored: number;
	/** Scratch result reused by every scan of this table. */
	readonly found: Uint8Array;
}

/** Hash four code units starting at `at`; callers guarantee they exist. */
function hash(value: string, at: number): number {
	let h = Math.imul(value.charCodeAt(at), 0x9e3779b1);
	h = Math.imul(h ^ value.charCodeAt(at + 1), 0x85ebca6b);
	h = Math.imul(h ^ value.charCodeAt(at + 2), 0xc2b2ae35);
	return (h ^ value.charCodeAt(at + 3)) >>> 0;
}

/** Build a scanner for rules in bucket order. */
export function table(rules: readonly { readonly requiredLiteral: string }[]): LiteralTable {
	const byLiteral = new Map<string, number>();
	const literals: string[] = [];
	const ids = new Int32Array(rules.length);
	for (const [position, rule] of rules.entries()) {
		let id = byLiteral.get(rule.requiredLiteral);
		if (id === undefined) {
			id = literals.length;
			byLiteral.set(rule.requiredLiteral, id);
			literals.push(rule.requiredLiteral);
		}
		ids[position] = id;
	}

	let bits = 4;
	while (1 << bits < literals.length * 4) bits += 1;
	const mask = (1 << bits) - 1;
	const heads = new Int32Array(mask + 1).fill(-1);
	const next = new Int32Array(literals.length).fill(-1);
	const short: number[] = [];
	let anchored = 0;
	for (const [id, literal] of literals.entries()) {
		if (literal.length < ANCHOR) {
			short.push(id);
			continue;
		}
		const slot = hash(literal, 0) & mask;
		next[id] = heads[slot]!;
		heads[slot] = id;
		anchored += 1;
	}

	return { literals, ids, heads, next, mask, short, anchored, found: new Uint8Array(literals.length) };
}

/**
 * Mark every literal of `scanner` that occurs in `value`.
 *
 * Returns the table's scratch array, indexed by literal id. It is overwritten
 * by the next scan of the same table, so read it before scanning again.
 */
export function scan(scanner: LiteralTable, value: string): Uint8Array {
	const { literals, heads, next, mask, found } = scanner;
	found.fill(0);
	for (const id of scanner.short) {
		if (value.includes(literals[id]!)) found[id] = 1;
	}

	let remaining = scanner.anchored;
	const last = value.length - ANCHOR;
	for (let at = 0; at <= last && remaining > 0; at += 1) {
		let id = heads[hash(value, at) & mask]!;
		while (id !== -1) {
			if (found[id] === 0 && value.startsWith(literals[id]!, at)) {
				found[id] = 1;
				remaining -= 1;
			}
			id = next[id]!;
		}
	}
	return found;
}

/** Scanners keyed by the frozen bucket they were built from. */
const tables = new WeakMap<object, LiteralTable>();

/**
 * Return the scanner for one literal bucket, building it on first use.
 *
 * Index construction and shard hydration call this eagerly so the first
 * observation does not pay for it; any other index builds it lazily. Buckets
 * are frozen, so a cached scanner can never go stale.
 */
export function tableFor(rules: readonly { readonly requiredLiteral: string }[]): LiteralTable {
	let cached = tables.get(rules);
	if (!cached) {
		cached = table(rules);
		tables.set(rules, cached);
	}
	return cached;
}
