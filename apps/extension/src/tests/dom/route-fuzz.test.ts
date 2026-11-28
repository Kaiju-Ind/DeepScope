import { test } from '@fast-check/vitest';
import { describe, expect } from 'vitest';

import { close, parse } from "../support/dom.ts";
import { apply, fuzzCase, violations } from "../support/route-fuzz.ts";

/** Runs per property; raise with DOM_ROUTE_FUZZ_RUNS for audits. */
const RUNS = Number(process.env.DOM_ROUTE_FUZZ_RUNS ?? 300);

describe('DOM routing soundness under adversarial selectors', () => {
	test.prop([fuzzCase], { numRuns: RUNS })('never rejects a selector the engine matches on an element', (item) => {
		const document = parse(item.html);
		try {
			apply(document, item.edits);
			expect(violations(document, item.selectors)).toEqual([]);
		} finally {
			close(document);
		}
	}, 600_000);
});
