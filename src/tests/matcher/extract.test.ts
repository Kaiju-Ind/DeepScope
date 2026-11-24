import { fc, test } from '@fast-check/vitest';
import { describe, expect, it } from 'vitest';

import { requiredLiteral } from '@/lib/detection/match/extract';

/**
 * Traps for required-literal extraction.
 *
 * Each row names a pattern, its flags, the literal the extractor must return
 * (or `undefined`), and a witness the real regex accepts. For a returned
 * literal the witness must contain it after lowercasing; for `undefined` the
 * witness shows why no literal can be required.
 */
const TRAPS: readonly (readonly [source: string, flags: string, expected: string | undefined, witness: string])[] = [
	// Alternation: only a top-level `|` voids the pattern.
	['abcd|efgh', '', undefined, 'efgh'],
	['(abcd|efgh)ijkl', '', 'ijkl', 'efghijkl'],
	['wxyz(a|b)', '', 'wxyz', 'wxyzb'],
	['[a|b]wxyz', '', 'wxyz', '|wxyz'],
	['\\|wxyz', '', '|wxyz', '|wxyz'],
	['a((b|c)|d)efgh', '', 'efgh', 'adefgh'],
	['(a(b|c))|defgh', '', undefined, 'ab'],
	['(?:x|y)abcd|zzzz', '', undefined, 'zzzz'],
	// Quantifiers that make the last atom optional drop the run.
	['abcd?', '', undefined, 'abc'],
	['abcde?fghi', '', 'fghi', 'abcdfghi'],
	['(?:abcd)?wxyz', '', 'wxyz', 'wxyz'],
	['(?:abcd)?', '', undefined, ''],
	['abcda{0,2}', '', undefined, 'abcd'],
	['abcd*', '', undefined, 'abc'],
	['abcd{2}', '', undefined, 'abcdd'],
	['abcd+efgh', '', 'abcd', 'abcddefgh'],
	['abcd+?', '', 'abcd', 'abcdd'],
	['abcd\\.?', '', undefined, 'abcd'],
	// Annex B: a `{` that is not a quantifier is a literal and does not hide what follows.
	['wxyz(a)abcd{x|y}', '', undefined, 'y}'],
	['abcd{,5}', '', 'abcd', 'abcd{,5}'],
	['import{[^}]+}from', '', 'import', 'import{a}from'],
	// Lookarounds and named groups are never read.
	['(?=wxyzabcd)wxyz', '', 'wxyz', 'wxyzabcd'],
	['(?!abcdefgh)wxyz', '', 'wxyz', 'wxyz'],
	['(?<=abcdefgh)wxyz', '', 'wxyz', 'abcdefghwxyz'],
	['(?<!abcdefgh)wxyz', '', 'wxyz', 'wxyz'],
	['wxyz(?=abcdefgh)', '', 'wxyz', 'wxyzabcdefgh'],
	['(?<name>abcdefgh)?wxyz', '', 'wxyz', 'wxyz'],
	// Escapes: syntax escapes are literal, code and class escapes end a run.
	['\\.wxyz', '', '.wxyz', '.wxyz'],
	['\\x41bcde', '', 'bcde', 'Abcde'],
	['\\u0041bcde', '', 'bcde', 'Abcde'],
	['\\u{41}bcde', 'u', 'bcde', 'Abcde'],
	['\\u{4}bcde', '', 'bcde', 'uuuubcde'],
	['\\dabcd', '', 'abcd', '1abcd'],
	['\\babcd\\b', '', 'abcd', 'abcd'],
	['\\x(?:abcdefgh)?wxyz', '', 'wxyz', 'xwxyz'],
	['\\keyreply\\.com', '', 'eyreply.com', 'keyreply.com'],
	['\\c(?:abcdefgh)?wxyz', '', 'wxyz', '\\cwxyz'],
	// Backreferences.
	['(ab)\\1cdef', '', 'cdef', 'ababcdef'],
	['(?<n>ab)\\k<n>cdef', '', 'cdef', 'ababcdef'],
	// Classes containing `|`, `)` or an escaped `]`.
	['[)|(]wxyz', '', 'wxyz', ')wxyz'],
	['[\\]|]wxyz', '', 'wxyz', ']wxyz'],
	['[^]wxyz', '', 'wxyz', '!wxyz'],
	// Flags.
	['ABCD', '', 'abcd', 'xABCDx'],
	['abcd', 'i', 'abcd', 'AbCd'],
	['^abcd$', 'm', 'abcd', 'x\nabcd\ny'],
	['abcd.efgh', 's', 'abcd', 'abcd\nefgh'],
	['abcd', 'gy', 'abcd', 'abcd'],
	['ssss', 'iu', undefined, 'ſſſſ'],
	['kkkk', 'iu', undefined, 'KKKK'],
	['abcd', 'v', undefined, 'abcd'],
	['ssss', 'u', 'ssss', 'ssss'],
];

describe('required literal extraction', () => {
	it.each(TRAPS)('/%s/%s', (source, flags, expected, witness) => {
		const regex = new RegExp(source, flags);
		regex.lastIndex = 0;
		expect(regex.test(witness), 'witness must match').toBe(true);
		const literal = requiredLiteral({ source, flags });
		expect(literal).toBe(expected);
		if (literal !== undefined) expect(witness.toLowerCase()).toContain(literal);
	});

	it('rejects malformed sources', () => {
		expect(requiredLiteral({ source: 'abcd\\', flags: '' })).toBeUndefined();
		expect(requiredLiteral({ source: 'abcd)efgh', flags: '' })).toBeUndefined();
		expect(requiredLiteral({ source: '(abcd', flags: '' })).toBeUndefined();
		expect(requiredLiteral({ source: 'wxyz[abcd', flags: '' })).toBeUndefined();
	});

	/** Atoms that cover every construct the extractor distinguishes. */
	const atom = fc.oneof(
		{ arbitrary: fc.constantFrom('abcd', 'wxyz', 'Ab', 'cd', 'efgh', 'k', 's', '-', '/', ':'), weight: 6 },
		{ arbitrary: fc.constantFrom('\\.', '\\|', '\\(', '\\d', '\\b', '\\x41', '\\x', '\\u0041', '\\u{41}', '\\c', '\\cA', '\\k', '\\1', '\\0'), weight: 3 },
		{ arbitrary: fc.constantFrom('[a|b]', '[)]', '[\\]]', '[^]', '.', '^', '$', '{', '}', ']', '{,2}'), weight: 2 },
	);
	const quantifier = fc.constantFrom('', '', '', '?', '*', '+', '+?', '{2}', '{0,2}', '{1,}');
	const piece = fc.tuple(atom, quantifier).map(([value, suffix]) => value + suffix);
	/** Balanced groups (with lookarounds, named groups and inner alternation), optionally quantified. */
	const group = fc.tuple(
		fc.constantFrom('(', '(?:', '(?=', '(?!', '(?<=', '(?<!'),
		fc.array(piece, { minLength: 1, maxLength: 3 }),
		fc.option(piece),
		quantifier,
	).map(([open, inner, alternative, suffix]) => `${open}${inner.join('')}${alternative === null ? '' : `|${alternative}`})${suffix}`);
	const fragment = fc.oneof({ arbitrary: piece, weight: 12 }, { arbitrary: group, weight: 6 }, { arbitrary: fc.constant('|'), weight: 1 });

	test.prop([fc.array(fragment, { minLength: 1, maxLength: 8 }), fc.constantFrom('', 'i', 'u', 'iu', 'm', 's', 'y')], { numRuns: 10_000 })(
		'never returns a literal that a match can lack',
		(parts, flags) => {
			const source = parts.join('');
			let regex: RegExp;
			try {
				regex = new RegExp(source, flags.replace('y', ''));
			} catch {
				return;
			}
			const literal = requiredLiteral({ source, flags });
			if (literal === undefined) return;
			let values: string[];
			try {
				// Samples match by construction. They are not re-run through the regex:
				// generated nestings such as `(abcd+)*` can backtrack for minutes.
				values = fc.sample(fc.stringMatching(regex), { numRuns: 20, seed: 7 });
			} catch {
				return;
			}
			for (const value of values) {
				const cased = flags.includes('i') ? [value, value.toUpperCase()] : [value];
				for (const entry of cased) expect(entry.toLowerCase(), `/${source}/${flags}`).toContain(literal);
			}
		},
	);
});
