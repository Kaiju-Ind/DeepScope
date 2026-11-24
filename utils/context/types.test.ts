// Vendored from Kaiju-Ind/Utils packages/context/types.test.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
import * as context from './mod.ts';

/** Compile-time consumer examples for the context view and timer surface. */
async function contextTypes(): Promise<void> {
	await using ctx = context.create({ id: 'type-test' });
	const extended = context.view(ctx, { actorId: 'actor-1' as const });
	const actor: 'actor-1' = extended.actorId;
	void actor;

	// Existing context fields are framework-owned and cannot be replaced by a view.
	// @ts-expect-error Context views cannot replace the stable operation ID.
	context.view(ctx, { id: 'different' });

	await context.delay(1, ctx.signal);
	await context.delay(1, new AbortController());
	await context.wait(ctx, { milliseconds: 1 });
}

void contextTypes;
