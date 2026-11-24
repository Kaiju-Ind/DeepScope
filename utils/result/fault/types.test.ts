// Vendored from Kaiju-Ind/Utils packages/result/fault/types.test.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
import * as fault from './mod.ts';

const encoded: fault.FaultValue = fault.encode(new Error('boom'));
const options: fault.Options = { maximumDepth: 4, maximumEntries: 16 };

void encoded;
void options;

async function compileConsumer(): Promise<void> {
	// @ts-expect-error operational limits are numeric, not strings.
	fault.encode('boom', { maximumDepth: '4' });
}

void compileConsumer;
