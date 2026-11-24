/**
 * IndexedDB store for `@utils/workflow` instruction history.
 *
 * `workflow.scheduler({ history })` asks the history for every deterministic
 * instruction a workflow yields. This store records the instruction's
 * fingerprint before the instruction runs, and its encoded completion after,
 * so a workflow re-run after the service worker restarts replays recorded
 * completions instead of repeating their work. A changed fingerprint at a
 * recorded path is a {@link ReplayError}, as in `history.memory()`.
 *
 * Concurrent calls for one instruction in this context share one execution.
 * An instruction recorded without a completion (its runner stopped) runs again
 * when replayed: execution is at least once, as with any durable history.
 *
 * `fence` ties a completion to a queue claim. When it returns the claim the
 * current run holds, the completion is written in the same transaction that
 * re-reads that claim from the queue store, and only while the claim still
 * owns its item and has not expired; otherwise the call fails with
 * `StaleClaimError` and nothing is recorded. The queue must use the same
 * database (`@utils/storage/queue/indexeddb`).
 *
 * Private-tab runs use `history.memory()` from `@utils/workflow/history`.
 *
 * DeepScope's own file, proposed for upstream as
 * `storage/workflow/history/indexeddb.ts`; not vendored.
 *
 * @module
 */
import * as context from '@utils/context';
import { StaleClaimError } from '@utils/scheduler/queue';
import type { QueueClaim } from '@utils/scheduler/queue/types';
import { HistoryCapacityError, ReplayError } from '@utils/workflow/history';
import type {
	History,
	HistoryCompletionType,
	HistoryEntryType,
	HistoryInput,
	HistorySnapshotType,
	WorkflowCompletionAny,
} from '@utils/workflow';

import { type DatabaseInput, HISTORY, QUEUE_ITEMS, resolve } from '../../indexeddb.ts';

/** The queue claim a completion depends on. */
export interface HistoryFence {
	/** Queue namespace the claim belongs to. */
	readonly namespace: string;
	/** The claim the current run holds. */
	readonly claim: Pick<QueueClaim<unknown>, 'id' | 'itemId' | 'owner'>;
}

/** Options for {@link indexeddb}. */
export interface IndexedDBHistoryOptions {
	/** Database handle from `@utils/storage/indexeddb#open`, or a name to open (and close with the history). */
	readonly database: DatabaseInput;
	/** Separate history within the database. Defaults to `default`. */
	readonly namespace?: string;
	/** Most instruction records kept in this namespace. Defaults to 10,000. */
	readonly maximumEntries?: number;
	/** Claim each completion depends on, if any. */
	readonly fence?: (input: HistoryInput) => HistoryFence | undefined;
	/** Clock used to check claim expiry. */
	readonly clock?: context.Clock;
}

/** IndexedDB history with inspection and per-run deletion. */
export interface IndexedDBHistory extends History {
	/** Recorded instructions of one run, sorted by path. */
	inspect(runId: string): Promise<HistorySnapshotType>;
	/** Delete every record of one finished run; returns how many were deleted. */
	forget(runId: string): Promise<number>;
}

interface Record {
	readonly ns: string;
	readonly runId: string;
	readonly path: string;
	readonly fingerprint: string;
	completion?: HistoryCompletionType;
}

interface ClaimRow {
	readonly state: string;
	readonly due: number;
	readonly claim?: { readonly id: string; readonly owner: string };
}

/** Create an IndexedDB-backed workflow history. The database opens on first use. */
export function indexeddb(options: IndexedDBHistoryOptions): IndexedDBHistory {
	const database = resolve(options.database);
	const ns = options.namespace ?? 'default';
	const maximum = options.maximumEntries ?? 10_000;
	if (!Number.isSafeInteger(maximum) || maximum < 1) throw new TypeError('history maximumEntries must be a positive safe integer.');
	const clock = options.clock ?? context.SystemClock;
	const pending = new Map<string, Promise<WorkflowCompletionAny>>();
	let closed = false;

	async function begin(input: HistoryInput): Promise<HistoryCompletionType | undefined> {
		const db = await database.db;
		const tx = db.transaction(HISTORY, 'readwrite');
		const key = [ns, input.ctx.runId, input.path];
		const existing = await tx.store.get(key) as Record | undefined;
		if (existing) {
			await tx.done;
			if (existing.fingerprint !== input.identity.fingerprint) {
				throw new ReplayError(input.ctx.runId, input.path, existing.fingerprint, input.identity.fingerprint);
			}
			return existing.completion;
		}
		if (await tx.store.count(IDBKeyRange.bound([ns], [ns, []])) >= maximum) {
			tx.abort();
			await tx.done.catch(() => {});
			throw new HistoryCapacityError(maximum);
		}
		await tx.store.put({ ns, runId: input.ctx.runId, path: input.path, fingerprint: input.identity.fingerprint } satisfies Record);
		await tx.done;
		return undefined;
	}

	async function record(input: HistoryInput, completion: HistoryCompletionType): Promise<void> {
		const db = await database.db;
		const fence = options.fence?.(input);
		const tx = db.transaction(fence ? [HISTORY, QUEUE_ITEMS] : [HISTORY], 'readwrite');
		const history = tx.objectStore(HISTORY);
		if (fence) {
			const row = await tx.objectStore(QUEUE_ITEMS).get([fence.namespace, fence.claim.itemId]) as ClaimRow | undefined;
			const live = row?.state === 'claimed' && row.claim?.id === fence.claim.id && row.claim.owner === fence.claim.owner &&
				row.due > clock.now().epochMilliseconds;
			if (!live) {
				tx.abort();
				await tx.done.catch(() => {});
				throw new StaleClaimError(fence.claim.itemId, fence.claim.id);
			}
		}
		const key = [ns, input.ctx.runId, input.path];
		const existing = await history.get(key) as Record | undefined;
		if (existing && existing.fingerprint !== input.identity.fingerprint) {
			tx.abort();
			await tx.done.catch(() => {});
			throw new ReplayError(input.ctx.runId, input.path, existing.fingerprint, input.identity.fingerprint);
		}
		await history.put({ ns, runId: input.ctx.runId, path: input.path, fingerprint: input.identity.fingerprint, completion } satisfies Record);
		await tx.done;
	}

	const history: IndexedDBHistory = Object.freeze({
		schedule(input: HistoryInput): Promise<WorkflowCompletionAny> {
			if (closed) return Promise.reject(new Error('Workflow history is closed.'));
			try {
				context.check(input.ctx);
			} catch (error) {
				return Promise.reject(error);
			}
			const local = `${input.ctx.runId.length}:${input.ctx.runId}${input.path}`;
			const joined = pending.get(local);
			// Join synchronously, before any storage read, so concurrent callers in
			// this context never start the same instruction twice.
			if (joined) return joined;
			const run = (async () => {
				const recorded = await begin(input);
				if (recorded !== undefined) return await input.decode(recorded);
				const completion = await input.next();
				await record(input, await input.encode(completion));
				return completion;
			})().finally(() => pending.delete(local));
			pending.set(local, run);
			return run;
		},
		async inspect(runId: string): Promise<HistorySnapshotType> {
			const db = await database.db;
			const records = await db.getAllFromIndex(HISTORY, 'run', [ns, runId]) as Record[];
			const entries: HistoryEntryType[] = records.map((entry) => Object.freeze({
				path: entry.path,
				fingerprint: entry.fingerprint,
				...(entry.completion === undefined ? {} : { completion: entry.completion }),
				pending: pending.has(`${runId.length}:${runId}${entry.path}`),
			}));
			entries.sort((left, right) => left.path.localeCompare(right.path));
			return Object.freeze({ runId, entries: Object.freeze(entries) });
		},
		async forget(runId: string): Promise<number> {
			const db = await database.db;
			const tx = db.transaction(HISTORY, 'readwrite');
			let deleted = 0;
			let next = await tx.store.index('run').openCursor([ns, runId]);
			while (next) {
				await next.delete();
				deleted++;
				next = await next.continue();
			}
			await tx.done;
			return deleted;
		},
		async close(): Promise<void> {
			if (closed) return;
			closed = true;
			if (database.owned) (await database.db).close();
		},
		async [Symbol.asyncDispose](): Promise<void> {
			await history.close();
		},
	});
	return history;
}
