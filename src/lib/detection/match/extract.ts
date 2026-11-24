import type { DetectionPatternType } from '../types';

/**
 * Extract a literal that every match of a regex must contain.
 *
 * The matcher skips a rule when its literal is absent from the lowercased
 * value, so the returned literal L must satisfy: if the regex matches `v`,
 * then `v.toLowerCase().includes(L)`. Anything this parser cannot prove
 * returns `undefined` and the rule stays in the fallback bucket.
 *
 * Why the result is required:
 *
 * - Only the top-level sequence is read. A top-level `|` (outside every group
 *   and character class) means no part of the pattern is required, so the
 *   result is `undefined`. A `|` inside a group or class only affects that
 *   group or class, which is never read.
 * - A literal run is a sequence of top-level single-character atoms (plain
 *   ASCII characters or escaped syntax characters such as `\.`). Any other
 *   atom ends the run: groups (including lookarounds and named groups),
 *   classes, `.`, `^`, `$`, class escapes (`\d`, `\b`), backreferences, code
 *   escapes (`\x41`, `A`), and any other character.
 * - A run ended by `+` is still required: its last atom occurs at least once.
 * - A run whose last atom is followed by `?`, `*` or `{...}` is dropped, since
 *   that atom may be absent (`abc?`) or repeated past what the run states.
 * - A `{` that is not a well-formed quantifier is a literal brace in Annex B
 *   syntax; it ends the run and parsing continues, so a `|` after it is still
 *   seen (`a(b)cdef{x|y}` has a top-level `|`).
 * - Escapes are consumed at their exact length (see `escapeLength`), so a
 *   `(`, `[` or `|` after an escape is never skipped.
 *
 * Case: L is lowercased, and so is the value. For a case-sensitive regex the
 * matched ASCII text lowercases to L. For `i` without `u`/`v`, JavaScript only
 * folds ASCII letters to ASCII letters, so the matched text is still an ASCII
 * case variant of L. With `iu` or `iv`, `ſ` (U+017F) matches `s` and does not
 * lowercase to `s`, so those patterns get no literal. `v` is rejected outright
 * because its class syntax nests. `m`, `s`, `g`, `y` and `d` only change `^`,
 * `$`, `.` and match position, never a literal atom.
 */
export function requiredLiteral(pattern: DetectionPatternType | undefined): string | undefined {
	if (!pattern) return undefined;
	const { source, flags } = pattern;
	if (flags.includes('v') || (flags.includes('i') && flags.includes('u'))) return undefined;
	const unicode = flags.includes('u');

	const tokens: string[] = [];
	let token = '';
	let depth = 0;
	let index = 0;

	const flush = (): void => {
		const normalized = token.toLowerCase();
		if (normalized.length >= 4 && /[a-z0-9]/.test(normalized)) tokens.push(normalized);
		token = '';
	};

	while (index < source.length) {
		const char = source[index]!;

		if (char === '\\') {
			const next = source[index + 1];
			if (next === undefined) return undefined;
			if (depth === 0 && ESCAPED.includes(next)) {
				token += next;
				index += 2;
				continue;
			}
			if (depth === 0) flush();
			index += escapeLength(source, index, unicode);
			continue;
		}

		if (char === '[') {
			const end = classEnd(source, index, unicode);
			if (end === undefined) return undefined;
			if (depth === 0) flush();
			index = end + 1;
			continue;
		}

		if (char === '(') {
			if (depth === 0) flush();
			depth += 1;
			index += 1;
			continue;
		}

		if (char === ')') {
			if (depth === 0) return undefined;
			depth -= 1;
			index += 1;
			continue;
		}

		if (depth > 0) {
			index += 1;
			continue;
		}

		if (char === '|') return undefined;

		if (PLAIN.test(char)) {
			token += char;
			index += 1;
			continue;
		}

		switch (char) {
			case '?':
			case '*':
				token = '';
				index += 1;
				break;
			case '{': {
				const quantifier = /^\{\d+(?:,\d*)?\}/.exec(source.slice(index));
				if (quantifier) {
					token = '';
					index += quantifier[0].length;
				} else {
					flush();
					index += 1;
				}
				break;
			}
			default:
				flush();
				index += 1;
		}
	}
	if (depth !== 0) return undefined;
	flush();

	return tokens.sort((left, right) => right.length - left.length)[0];
}

/** Characters that stand for themselves at the top level. */
const PLAIN = /^[a-zA-Z0-9_~:/@%-]$/;

/** Syntax characters whose escape stands for the character itself. */
const ESCAPED = '.\\^$*+?(){}[]|/-';

/**
 * Length of the escape at `slash`.
 *
 * Well-formed multi-character escapes (`\x41`, `\u0041`, `\u{41}` with `u`,
 * `\cJ`, `\k<name>`, `\p{L}` with `u`) are consumed whole. Digits run on
 * (backreferences and Annex B octal escapes). Everything else is two code
 * units: `\d`, `\b`, `\n`, identity escapes, and the malformed forms that
 * Annex B reads as a plain character (`\x` without two hex digits is `x`,
 * `\c` without a letter is a backslash, `\k` without a group name is `k`,
 * `\p` without `u` is `p`); the characters after them are then parsed
 * normally, so a following `(`, `[`, `{` or `|` is never skipped. In `u` mode
 * the malformed forms are syntax errors and never reach the matcher.
 */
function escapeLength(source: string, slash: number, unicode: boolean): number {
	const kind = source[slash + 1]!;
	const rest = source.slice(slash + 2);
	const whole = (match: RegExpExecArray | null): number => (match ? 2 + match[0].length : 2);
	switch (kind) {
		case 'x':
			return whole(/^[0-9a-fA-F]{2}/.exec(rest));
		case 'u':
			return whole(/^[0-9a-fA-F]{4}/.exec(rest) ?? (unicode ? /^\{[0-9a-fA-F]+\}/.exec(rest) : null));
		case 'c':
			return whole(/^[a-zA-Z]/.exec(rest));
		case 'k':
			return whole(/^<[^>()[\]|\\{]+>/.exec(rest));
		case 'p':
		case 'P':
			return whole(unicode ? /^\{[A-Za-z0-9_=]+\}/.exec(rest) : null);
		default:
			return /[0-9]/.test(kind) ? whole(/^[0-9]*/.exec(rest)) : 2;
	}
}

/** Index of the `]` closing the class opened at `open`, or `undefined`. */
function classEnd(source: string, open: number, unicode: boolean): number | undefined {
	let index = open + 1;
	while (index < source.length) {
		const char = source[index]!;
		if (char === ']') return index;
		if (char === '\\') {
			if (source[index + 1] === undefined) return undefined;
			index += escapeLength(source, index, unicode);
			continue;
		}
		index += 1;
	}
	return undefined;
}
