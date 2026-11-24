/**
 * Wait until every microtask queued so far, and every microtask those queue, has run.
 *
 * Scheduler tests mock IndexedDB and session lookups with immediately resolved
 * Promises, so all pending work drains before the next macrotask. Waiting for a
 * timer tick avoids counting `await Promise.resolve()` hops, which silently
 * breaks whenever an implementation adds or removes one `await`.
 *
 * Use this before asserting that something has *not* happened (for example while
 * a fence or a pause holds work back). For something that *should* happen, prefer
 * `vi.waitFor(() => expect(...))` or an explicit deferred the test resolves.
 */
export async function settle(): Promise<void> {
	await new Promise<void>((resolve) => setTimeout(resolve, 0));
}
