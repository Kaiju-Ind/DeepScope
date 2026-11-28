// Vendored from Kaiju-Ind/Utils packages/workflow/types.test.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
import * as workflow from './mod.ts';

type ActivityOptions = NonNullable<Parameters<typeof workflow.activity>[2]>;

const affinity: ActivityOptions = { affinity: { region: 'east', capacity: 2, gpu: false } };
void affinity;

// @ts-expect-error activity affinity fields are scalar placement facts, not nested objects.
const invalidAffinity: ActivityOptions = { affinity: { region: { name: 'east' } } };
void invalidAffinity;
