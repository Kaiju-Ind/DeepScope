// Vendored from Kaiju-Ind/Utils packages/collection/record/capabilities.types.test.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
import * as record from './mod.ts';
/** Compile consumer inference without running a second runtime test suite. */
function consumer(): void {
	const input = { id: 'asset', count: 2 } as const;
	const omitted = record.omit(input, ['count']);
	const id: 'asset' = omitted.id;
	void id;
	// @ts-expect-error Omitted properties are absent from the output contract.
	void omitted.count;
	const entries: Readonly<Record<string, number>> = record.fromEntries([['a', 1]], {
		maximumItems: 1,
		duplicates: 'reject',
	});
	void entries;
}
void consumer;
