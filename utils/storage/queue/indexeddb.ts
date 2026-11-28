/**
 * IndexedDB store for `@utils/scheduler/queue`, with the label extensions.
 *
 * The store implements the same contract as `queue.memory()` and passes the
 * same conformance suite (`@utils/scheduler/queue/testing`). Every operation
 * that changes ownership runs in one readwrite transaction: admission checks
 * the key and capacity and assigns the admission sequence; a claim promotes due
 * delayed items, recovers expired claims and leases the next items in
 * priority/FIFO order; completion, failure, retry, renewal and consumer
 * cancellation re-read the row and require the exact claim id and owner and an
 * unexpired lease (fencing). Because IndexedDB serialises readwrite
 * transactions on a store across the whole extension origin, handles opened by
 * the service worker, the offscreen document and extension pages never lease
 * one item twice.
 *
 * Rows sit in one of four lanes (`claimed`, `delayed`, `ready`, `terminal`).
 * Compound indexes on `[namespace, lane, ...]` replace the partial indexes a
 * SQL store would use: `order` lists ready work in claim order and `due` gives
 * the next availability, claim expiry or finish time per lane.
 *
 * Waiting calls wake on this handle's own changes, on a `BroadcastChannel`
 * message from another handle, at the next due instant, or after `poll`.
 * Values (input, output, labels, cancellation reasons) must be structured-
 * cloneable; a reason that is not is stored as its string form.
 *
 * DeepScope's own file, proposed for upstream as `storage/queue/indexeddb.ts`;
 * not vendored.
 *
 * @example
 * ```ts
 * import * as context from '@utils/context';
 * import { indexeddb } from '@utils/storage/queue/indexeddb';
 * await using ctx = context.create({ id: 'service-worker' });
 * await using jobs = indexeddb<{ url: string }, number>({ database: 'deepscope-work', namespace: 'analysis' });
 * const ref = await jobs.add(ctx, { url: 'https://example.com' }, { labels: { tab: 12, window: 3 } });
 * await jobs.cancelWhere(ctx, { tab: 12 }, 'tab closed');
 * ```
 *
 * @module
 */
import type { IDBPDatabase, IDBPObjectStore, IDBPTransaction } from 'idb';
import { EventBus } from '@okikio/observables/events';
import * as context from '@utils/context';
import { temporal } from '@utils/duration/temporal';
import type { Encoded as EncodedFailure } from '@utils/result/failure';
import {
	QueueCapacityError,
	QueueClosedError,
	QueueItemCancelledError,
	QueueItemFailedError,
	QueueItemNotFoundError,
	QueueWaitCapacityError,
	StaleClaimError,
} from '@utils/scheduler/queue';
import * as extension from '@utils/scheduler/queue/extensions';
import type { LabeledAddOptions, LabeledQueue, Labels, OwnerSelector, PriorityUpdate, QueueExtensions } from '@utils/scheduler/queue/extensions';
import { cursor, elapsed, inspection, policy, position, pruneLimit } from '@utils/scheduler/queue/policy';
import type {
	Context,
	MemoryQueueOptions,
	QueueClaim,
	QueueClaimOptions,
	QueueEntryType,
	QueueEventType,
	QueueInspectOptions,
	QueuePageType,
	QueuePruneResult,
	QueueRedriveOptions,
	QueueRef,
	QueueRetryOptions,
	QueueStateType,
	QueueStats,
	QueueWaitStateType,
} from '@utils/scheduler/queue/types';
import { observe } from '@utils/telemetry/observe';

import { type DatabaseInput, QUEUE_ITEMS, QUEUE_META, resolve } from '../indexeddb.ts';

/** Options for {@link indexeddb}. Limits and clock behave as in `queue.memory()`. */
export interface IndexedDBQueueOptions extends MemoryQueueOptions {
	/** Database handle from `@utils/storage/indexeddb#open`, or a name to open (and close with the queue). */
	readonly database: DatabaseInput;
	/** Separate queue within the database. Defaults to `default`. */
	readonly namespace?: string;
	/** Longest a waiting call sleeps before re-reading storage. Defaults to one second. */
	readonly poll?: Temporal.Duration | Temporal.DurationLike | string;
}

type Lane = 'claimed' | 'delayed' | 'ready' | 'terminal';

/** One stored item. Instants are stored as strings; `due` is the lane's sort instant in epoch milliseconds. */
interface Row {
	readonly ns: string;
	readonly id: string;
	readonly seq: number;
	readonly key?: string;
	readonly input: unknown;
	readonly labels: Labels;
	readonly tags: readonly string[];
	readonly redrivenFrom?: string;
	state: QueueStateType;
	lane: Lane;
	priority: number;
	rank: number;
	due: number;
	available: string;
	attempt: number;
	claim?: { readonly id: string; readonly owner: string; readonly claimedAt: string; readonly expiresAt: string };
	output?: unknown;
	failure?: EncodedFailure;
	cancellation?: unknown;
}

type Store = IDBPObjectStore<unknown, string[], string, 'readwrite'>;
type Tx = IDBPTransaction<unknown, string[], 'readwrite'>;

interface Waiter {
	readonly resolve: () => void;
	readonly reject: (reason: unknown) => void;
	readonly unlink: () => void;
}

/** What one transaction committed: events to publish and whether claim waiters should re-check. */
interface Effects {
	readonly events: QueueEventType[];
	readonly settled: Row[];
	wake: boolean;
}

const LOW = -Infinity;
const HIGH = Infinity;
/** Rows changed per bounded maintenance pass inside one transaction. */
const MAINTENANCE = 500;
/** Terminal rows pruned inside one admission or settlement transaction. */
const PRUNE_INLINE = 100;
/** Settled rows remembered so a local result() waiter still sees a row pruned right after it settled. */
const RECENT = 1000;

/** A labeled queue that provides every extension method. */
export type IndexedDBQueue<Input, Output> = LabeledQueue<Input, Output> & Required<QueueExtensions>;

/** Create an IndexedDB-backed queue. The database opens on first use. */
export function indexeddb<Input, Output>(options: IndexedDBQueueOptions): IndexedDBQueue<Input, Output> {
	return new Runtime<Input, Output>(options).queue;
}

class Runtime<Input, Output> {
	readonly #database: ReturnType<typeof resolve>;
	readonly #ns: string;
	readonly #clock: Context['clock'];
	readonly #id: () => string;
	readonly #capacity: number;
	readonly #retention: ReturnType<typeof policy>['retention'];
	readonly #duration: number;
	readonly #poll: number;
	readonly #maximumWaiters: number;
	readonly #events = new EventBus<QueueEventType>();
	readonly #claimWaiters = new Set<Waiter>();
	readonly #resultWaiters = new Map<string, Set<Waiter>>();
	readonly #recent = new Map<string, Row>();
	readonly #queue: IndexedDBQueue<Input, Output>;
	#channel: BroadcastChannel | undefined;
	#waiting = 0;
	#closed = false;
	#reason: unknown;

	constructor(options: IndexedDBQueueOptions) {
		const limits = policy(options);
		this.#capacity = limits.capacity;
		this.#retention = limits.retention;
		this.#database = resolve(options.database);
		this.#ns = options.namespace ?? 'default';
		if (this.#ns.length === 0 || this.#ns.length > 256) throw new TypeError('Queue namespace must be 1 to 256 characters.');
		this.#clock = options.clock ?? context.SystemClock;
		this.#id = options.id ?? (() => crypto.randomUUID());
		this.#duration = elapsed(options.defaultClaimDuration ?? { seconds: 30 }, 'default claim duration');
		this.#poll = elapsed(options.poll ?? { seconds: 1 }, 'queue poll interval');
		this.#maximumWaiters = positiveInteger(options.maximumWaiters ?? 1000, 'maximum waiters');
		void this.#database.name.then((name) => {
			if (this.#closed || typeof BroadcastChannel === 'undefined') return;
			this.#channel = new BroadcastChannel(`@utils/storage/queue:${name}:${this.#ns}`);
			this.#channel.onmessage = () => this.#wakeAll();
		}, () => {});
		this.#queue = Object.freeze({
			events: observe(this.#events, { onError: options.onObserverError }),
			add: (ctx: Context, input: Input, add?: LabeledAddOptions) => this.#add(ctx, input, add),
			claim: (ctx: Context, claim?: QueueClaimOptions) => this.#claim(ctx, claim),
			wait: (ctx: Context, ref: QueueRef) => this.#wait(ctx, ref),
			complete: (ctx: Context, claim: QueueClaim<Input>, output: Output) => this.#complete(ctx, claim, output),
			fail: (ctx: Context, claim: QueueClaim<Input>, failure: EncodedFailure) => this.#fail(ctx, claim, failure),
			retry: (ctx: Context, claim: QueueClaim<Input>, retry?: QueueRetryOptions) => this.#retry(ctx, claim, retry),
			cancel: (ctx: Context, owner: QueueRef | QueueClaim<Input>, reason?: unknown) => this.#cancel(ctx, owner, reason),
			result: (ctx: Context, ref: QueueRef) => this.#result(ctx, ref),
			renew: (ctx: Context, claim: QueueClaim<Input>, duration: Temporal.Duration | Temporal.DurationLike | string) =>
				this.#renew(ctx, claim, duration),
			stats: () => this.#stats(),
			inspect: (inspect: QueueInspectOptions) => this.#inspect(inspect),
			redrive: (ctx: Context, ref: QueueRef, redrive: QueueRedriveOptions) => this.#redrive(ctx, ref, redrive),
			prune: (prune?: { readonly limit?: number }) => this.#prune(pruneLimit(prune?.limit)),
			cancelWhere: (ctx: Context, where: Labels, reason?: unknown) => this.#cancelWhere(ctx, where, reason),
			reprioritize: (ctx: Context, where: Labels, update: PriorityUpdate) => this.#reprioritize(ctx, where, update),
			abandon: (ctx: Context, selector: OwnerSelector) => this.#abandon(ctx, selector),
			close: (reason?: unknown) => this.#close(reason),
			[Symbol.asyncDispose]: () => this.#close('Queue was disposed.'),
		});
	}

	get queue(): IndexedDBQueue<Input, Output> {
		return this.#queue;
	}

	// ---- operations -------------------------------------------------------

	async #add(ctx: Context, input: Input, options: LabeledAddOptions = {}, redrivenFrom?: string): Promise<QueueRef> {
		context.check(ctx);
		this.#open();
		if (options.key !== undefined) assertKey(options.key);
		const labels = extension.labels(options.labels);
		const priority = integer(options.priority ?? 0, 'queue priority');
		return await this.#transact(async (store, tx, now, effects) => {
			await this.#pruneIn(store, now, PRUNE_INLINE, effects);
			if (options.key !== undefined) {
				const prior = await store.index('key').get([this.#ns, options.key]) as Row | undefined;
				if (prior) {
					if (redrivenFrom !== undefined && prior.redrivenFrom !== redrivenFrom) {
						throw new TypeError('Redrive key belongs to another logical item.');
					}
					return Object.freeze({ id: prior.id });
				}
			}
			const active = await store.index('due').count(IDBKeyRange.bound([this.#ns, 'claimed', LOW], [this.#ns, 'ready', HIGH]));
			if (active >= this.#capacity) throw new QueueCapacityError(this.#capacity);
			const meta = tx.objectStore(QUEUE_META);
			const seq = ((await meta.get(this.#ns) as number | undefined) ?? 0) + 1;
			await meta.put(seq, this.#ns);
			const id = await this.#unique(store);
			const available = options.availableAt ?? now;
			const ready = temporal.Instant.compare(available, now) <= 0;
			const row: Row = {
				ns: this.#ns,
				id,
				seq,
				...(options.key === undefined ? {} : { key: options.key }),
				input,
				labels,
				tags: tags(this.#ns, labels),
				...(redrivenFrom === undefined ? {} : { redrivenFrom }),
				state: 'queued',
				lane: ready ? 'ready' : 'delayed',
				priority,
				rank: -priority,
				due: available.epochMilliseconds,
				available: available.toString(),
				attempt: 0,
			};
			await store.add(row);
			effects.events.push(Object.freeze({ type: 'added', itemId: id, ...(options.key === undefined ? {} : { key: options.key }) }));
			effects.wake = true;
			return Object.freeze({ id });
		});
	}

	async #redrive(ctx: Context, ref: QueueRef, options: QueueRedriveOptions): Promise<QueueRef> {
		context.check(ctx);
		this.#open();
		assertKey(options.key);
		const source = await this.#read(ref.id);
		if (!source) throw new QueueItemNotFoundError(ref.id);
		if (source.state !== 'failed' && source.state !== 'cancelled') {
			throw new TypeError('Redrive requires a retained failed or cancelled item.');
		}
		return await this.#add(ctx, source.input as Input, { key: options.key, priority: source.priority, labels: source.labels }, source.id);
	}

	async #claim(ctx: Context, options: QueueClaimOptions = {}): Promise<readonly QueueClaim<Input>[]> {
		const owner = options.owner ?? ctx.id;
		if (owner.trim().length === 0) throw new TypeError('Queue claim owner must not be empty.');
		const limit = positiveInteger(options.limit ?? 1, 'claim limit');
		if (options.ref !== undefined && limit !== 1) throw new TypeError('A specific queue ref claim limit must be 1.');
		const duration = elapsed(options.duration ?? { milliseconds: this.#duration }, 'claim duration');
		while (true) {
			context.check(ctx);
			this.#open();
			const outcome = await this.#transact(async (store, _tx, now, effects) => {
				await this.#maintain(store, now, effects);
				const rows: Row[] = [];
				if (options.ref !== undefined) {
					const row = await this.#row(store, options.ref.id);
					if (row.lane === 'ready') rows.push(row);
					else if (row.lane === 'terminal') return { claims: [], done: true } as const;
				} else {
					let next = await store.index('order').openCursor(
						IDBKeyRange.bound([this.#ns, 'ready', LOW, LOW], [this.#ns, 'ready', HIGH, HIGH]),
					);
					while (next && rows.length < limit) {
						rows.push(next.value as Row);
						next = await next.continue();
					}
				}
				const claims: QueueClaim<Input>[] = [];
				for (const row of rows) {
					const claimedAt = now;
					const expiresAt = now.add({ milliseconds: duration });
					const id = this.#id();
					assertKey(id);
					row.state = 'claimed';
					row.lane = 'claimed';
					row.attempt += 1;
					row.due = expiresAt.epochMilliseconds;
					row.claim = { id, owner, claimedAt: claimedAt.toString(), expiresAt: expiresAt.toString() };
					await store.put(row);
					claims.push(this.#claimOf(row));
					effects.events.push(Object.freeze({ type: 'claimed', itemId: row.id, claimId: id, owner, attempt: row.attempt }));
				}
				if (claims.length > 0 || options.wait !== true) return { claims, done: true } as const;
				const wakeAt = options.ref === undefined ? await this.#soonest(store) : (await this.#row(store, options.ref.id)).due;
				return { claims, done: false, wakeAt } as const;
			});
			if (outcome.done) return Object.freeze(outcome.claims);
			await this.#change(ctx, this.#claimWaiters, outcome.wakeAt);
		}
	}

	async #wait(ctx: Context, ref: QueueRef): Promise<QueueWaitStateType> {
		while (true) {
			context.check(ctx);
			this.#open();
			const outcome = await this.#transact(async (store, _tx, now, effects) => {
				await this.#maintain(store, now, effects);
				const row = await this.#row(store, ref.id);
				if (row.lane === 'terminal') return 'terminal' as const;
				if (row.lane === 'ready') return 'claimable' as const;
				return row.due;
			});
			if (typeof outcome === 'string') return outcome;
			await this.#change(ctx, this.#claimWaiters, outcome);
		}
	}

	async #complete(ctx: Context, claim: QueueClaim<Input>, output: Output): Promise<void> {
		context.check(ctx);
		await this.#owned(claim, (row, now, effects) => {
			this.#finish(row, 'completed', now, effects);
			row.output = output;
			effects.events.push(Object.freeze({ type: 'completed', itemId: row.id, claimId: claim.id }));
		});
	}

	async #fail(ctx: Context, claim: QueueClaim<Input>, failure: EncodedFailure): Promise<void> {
		context.check(ctx);
		await this.#owned(claim, (row, now, effects) => {
			this.#finish(row, 'failed', now, effects);
			row.failure = Object.freeze({ ...failure });
			effects.events.push(Object.freeze({ type: 'failed', itemId: row.id, claimId: claim.id, failureId: failure.id }));
		});
	}

	async #retry(ctx: Context, claim: QueueClaim<Input>, options: QueueRetryOptions = {}): Promise<void> {
		context.check(ctx);
		if (options.availableAt !== undefined && options.delay !== undefined) {
			throw new TypeError('Queue retry accepts either availableAt or delay, not both.');
		}
		const delay = elapsed(options.delay ?? 'PT0S', 'retry delay', true);
		const priority = options.priority === undefined ? undefined : integer(options.priority, 'queue priority');
		await this.#owned(claim, (row, now, effects) => {
			const available = options.availableAt ?? now.add({ milliseconds: delay });
			if (priority !== undefined) {
				row.priority = priority;
				row.rank = -priority;
			}
			this.#requeue(row, available, now);
			effects.events.push(Object.freeze({ type: 'retried', itemId: row.id, claimId: claim.id, availableAt: available.toString() }));
			effects.wake = true;
		});
	}

	async #renew(
		ctx: Context,
		claim: QueueClaim<Input>,
		duration: Temporal.Duration | Temporal.DurationLike | string,
	): Promise<QueueClaim<Input>> {
		context.check(ctx);
		const milliseconds = elapsed(duration, 'claim renewal duration');
		return await this.#owned(claim, (row, now, effects) => {
			const expiresAt = now.add({ milliseconds });
			row.claim = { ...row.claim!, expiresAt: expiresAt.toString() };
			row.due = expiresAt.epochMilliseconds;
			effects.events.push(Object.freeze({ type: 'renewed', itemId: row.id, claimId: claim.id, expiresAt: expiresAt.toString() }));
			return this.#claimOf(row);
		});
	}

	async #cancel(ctx: Context, owner: QueueRef | QueueClaim<Input>, reason?: unknown): Promise<void> {
		context.check(ctx);
		if ('itemId' in owner) {
			await this.#owned(owner, (row, now, effects) => this.#cancelRow(row, now, reason, effects));
			return;
		}
		await this.#transact(async (store, _tx, now, effects) => {
			const row = await this.#row(store, owner.id);
			if (row.lane === 'terminal') return;
			this.#cancelRow(row, now, reason, effects);
			await store.put(row);
			await this.#pruneIn(store, now, PRUNE_INLINE, effects);
		});
	}

	async #result(ctx: Context, ref: QueueRef): Promise<Output> {
		context.check(ctx);
		while (true) {
			context.check(ctx);
			const row = (await this.#read(ref.id)) ?? this.#recent.get(ref.id);
			if (!row) throw new QueueItemNotFoundError(ref.id);
			if (row.state === 'completed') return row.output as Output;
			if (row.state === 'failed') throw new QueueItemFailedError(row.id, row.failure!);
			if (row.state === 'cancelled') throw new QueueItemCancelledError(row.id, row.cancellation);
			if (this.#closed) throw new QueueClosedError(this.#reason);
			let waiters = this.#resultWaiters.get(row.id);
			if (!waiters) {
				waiters = new Set();
				this.#resultWaiters.set(row.id, waiters);
			}
			try {
				await this.#change(ctx, waiters);
			} finally {
				if (waiters.size === 0) this.#resultWaiters.delete(row.id);
			}
		}
	}

	async #stats(): Promise<QueueStats> {
		this.#open();
		const counts = await this.#transact(async (store, _tx, now, effects) => {
			await this.#maintain(store, now, effects);
			const index = store.index('state');
			const states = ['queued', 'claimed', 'completed', 'failed', 'cancelled'] as const;
			const values = await Promise.all(states.map((state) => index.count([this.#ns, state])));
			return Object.fromEntries(states.map((state, index) => [state, values[index]!])) as Record<QueueStateType, number>;
		});
		let waitingResults = 0;
		for (const waiters of this.#resultWaiters.values()) waitingResults += waiters.size;
		return Object.freeze({ ...counts, waitingClaims: this.#claimWaiters.size, waitingResults });
	}

	async #inspect(options: QueueInspectOptions): Promise<QueuePageType> {
		inspection(options);
		this.#open();
		const db = await this.#db();
		const identity = `indexeddb:${db.name}:${this.#ns}`;
		const tx = db.transaction([QUEUE_ITEMS, QUEUE_META], 'readonly');
		let after: number;
		let through: number;
		if (options.cursor === undefined) {
			after = 0;
			through = (await tx.objectStore(QUEUE_META).get(this.#ns) as number | undefined) ?? 0;
		} else {
			const [start, end] = position(options.cursor, identity, options.state);
			after = Number(start);
			through = Number(end);
		}
		const upper = Math.min(through, after + options.maximumScanned);
		const entries: QueueEntryType[] = [];
		let reached = after;
		if (upper > after) {
			let next = await tx.objectStore(QUEUE_ITEMS).index('seq').openCursor(IDBKeyRange.bound([this.#ns, after + 1], [this.#ns, upper]));
			while (next) {
				const row = next.value as Row;
				if (options.state === undefined || row.state === options.state) {
					if (entries.length === options.limit) break;
					entries.push(entry(row));
				}
				reached = row.seq;
				next = await next.continue();
			}
			if (!next) reached = upper;
		}
		await tx.done;
		return Object.freeze({
			entries: Object.freeze(entries),
			scanned: reached - after,
			...(reached < through ? { cursor: cursor(identity, options.state, String(reached), String(through)) } : {}),
		});
	}

	async #prune(limit: number): Promise<QueuePruneResult> {
		this.#open();
		return await this.#transact(async (store, _tx, now, effects) => await this.#pruneIn(store, now, limit, effects));
	}

	async #cancelWhere(ctx: Context, where: Labels, reason?: unknown): Promise<number> {
		context.check(ctx);
		this.#open();
		const selector = extension.selector(where);
		return await this.#transact(async (store, _tx, now, effects) => {
			let count = 0;
			for (const row of await this.#select(store, selector)) {
				this.#cancelRow(row, now, reason, effects);
				await store.put(row);
				count++;
			}
			await this.#pruneIn(store, now, PRUNE_INLINE, effects);
			return count;
		});
	}

	async #reprioritize(ctx: Context, where: Labels, update: PriorityUpdate): Promise<number> {
		context.check(ctx);
		this.#open();
		const selector = extension.selector(where);
		return await this.#transact(async (store, _tx, _now, effects) => {
			let count = 0;
			for (const row of await this.#select(store, selector)) {
				const priority = extension.priority(update, row.priority, row.labels);
				if (priority === row.priority) continue;
				row.priority = priority;
				row.rank = -priority;
				await store.put(row);
				count++;
			}
			effects.wake = count > 0;
			return count;
		});
	}

	async #abandon(ctx: Context, selector: OwnerSelector): Promise<number> {
		context.check(ctx);
		this.#open();
		const selected = extension.owners(selector);
		return await this.#transact(async (store, _tx, now, effects) => {
			let count = 0;
			let next = await store.index('due').openCursor(IDBKeyRange.bound([this.#ns, 'claimed', LOW], [this.#ns, 'claimed', HIGH]));
			while (next) {
				const row = next.value as Row;
				if (selected(row.claim!.owner)) {
					const claimId = row.claim!.id;
					this.#requeue(row, now, now);
					await next.update(row);
					effects.events.push(Object.freeze({ type: 'claim-expired', itemId: row.id, claimId }));
					count++;
				}
				next = await next.continue();
			}
			effects.wake = count > 0;
			return count;
		});
	}

	async #close(reason?: unknown): Promise<void> {
		if (this.#closed) return;
		this.#closed = true;
		this.#reason = reason;
		const error = new QueueClosedError(reason);
		reject(this.#claimWaiters, error);
		for (const waiters of this.#resultWaiters.values()) reject(waiters, error);
		this.#resultWaiters.clear();
		this.#channel?.close();
		this.#emit(Object.freeze({ type: 'closed' }));
		try {
			(this.#events as { [Symbol.dispose]?: () => void })[Symbol.dispose]?.();
		} catch { /* Observer completion cannot fail closure. */ }
		if (this.#database.owned) {
			try {
				(await this.#database.db).close();
			} catch { /* The database never opened. */ }
		}
	}

	// ---- transitions --------------------------------------------------------

	/** Move a row to a terminal state; the caller writes it. */
	#finish(row: Row, state: 'completed' | 'failed' | 'cancelled', now: Temporal.Instant, effects: Effects): void {
		row.state = state;
		row.lane = 'terminal';
		row.due = now.epochMilliseconds;
		delete row.claim;
		effects.settled.push(row);
		effects.wake = true;
	}

	#cancelRow(row: Row, now: Temporal.Instant, reason: unknown, effects: Effects): void {
		this.#finish(row, 'cancelled', now, effects);
		if (reason !== undefined) row.cancellation = cloneable(reason);
		effects.events.push(Object.freeze({ type: 'cancelled', itemId: row.id }));
	}

	/** Return a row to the queue at `available`, dropping its claim. */
	#requeue(row: Row, available: Temporal.Instant, now: Temporal.Instant): void {
		row.state = 'queued';
		row.lane = temporal.Instant.compare(available, now) <= 0 ? 'ready' : 'delayed';
		row.available = available.toString();
		row.due = available.epochMilliseconds;
		delete row.claim;
	}

	/**
	 * Run `change` only while `claim` still owns its row: same item, claim id and
	 * owner, and the lease has not expired. An expired lease is recovered first,
	 * so the stale caller fails and the item is claimable again.
	 */
	async #owned<T>(claim: QueueClaim<Input>, change: (row: Row, now: Temporal.Instant, effects: Effects) => T): Promise<T> {
		const outcome = await this.#transact(async (store, _tx, now, effects) => {
			const row = await this.#row(store, claim.itemId);
			if (row.lane === 'claimed' && row.due <= now.epochMilliseconds) {
				await this.#expire(store, row, now, effects);
				return { stale: true } as const;
			}
			if (row.state !== 'claimed' || row.claim?.id !== claim.id || row.claim.owner !== claim.owner) return { stale: true } as const;
			const value = change(row, now, effects);
			await store.put(row);
			if (row.lane === 'terminal') await this.#pruneIn(store, now, PRUNE_INLINE, effects);
			return { stale: false, value } as const;
		});
		if (outcome.stale) throw new StaleClaimError(claim.itemId, claim.id);
		return outcome.value;
	}

	/** Promote due delayed rows and recover expired claims, a bounded number per pass. */
	async #maintain(store: Store, now: Temporal.Instant, effects: Effects): Promise<void> {
		const at = now.epochMilliseconds;
		let next = await store.index('due').openCursor(IDBKeyRange.bound([this.#ns, 'delayed', LOW], [this.#ns, 'delayed', at]));
		for (let count = 0; next && count < MAINTENANCE; count++) {
			const row = next.value as Row;
			row.lane = 'ready';
			await next.update(row);
			next = await next.continue();
		}
		next = await store.index('due').openCursor(IDBKeyRange.bound([this.#ns, 'claimed', LOW], [this.#ns, 'claimed', at]));
		for (let count = 0; next && count < MAINTENANCE; count++) {
			const row = next.value as Row;
			const claimId = row.claim!.id;
			this.#requeue(row, now, now);
			await next.update(row);
			effects.events.push(Object.freeze({ type: 'claim-expired', itemId: row.id, claimId }));
			effects.wake = true;
			next = await next.continue();
		}
	}

	async #expire(store: Store, row: Row, now: Temporal.Instant, effects: Effects): Promise<void> {
		const claimId = row.claim!.id;
		this.#requeue(row, now, now);
		await store.put(row);
		effects.events.push(Object.freeze({ type: 'claim-expired', itemId: row.id, claimId }));
		effects.wake = true;
	}

	/** Delete terminal rows beyond the retention count or older than the retention duration, oldest first. */
	async #pruneIn(store: Store, now: Temporal.Instant, limit: number, effects: Effects): Promise<QueuePruneResult> {
		const range = IDBKeyRange.bound([this.#ns, 'terminal', LOW], [this.#ns, 'terminal', HIGH]);
		const index = store.index('due');
		let remaining = await index.count(range);
		const cutoff = now.epochMilliseconds - this.#retention.milliseconds;
		let deleted = 0;
		let more = false;
		let next = await index.openCursor(range);
		while (next) {
			const row = next.value as Row;
			if (remaining <= this.#retention.limit && row.due > cutoff) break;
			if (deleted === limit) {
				more = true;
				break;
			}
			await next.delete();
			remaining--;
			deleted++;
			effects.events.push(Object.freeze({ type: 'pruned', itemId: row.id }));
			next = await next.continue();
		}
		return Object.freeze({ deleted, more });
	}

	/** Unfinished rows whose labels include every entry of `where`, found through the first label's index entry. */
	async #select(store: Store, where: Labels): Promise<Row[]> {
		const [name, value] = Object.entries(where)[0]!;
		const rows = await store.index('tags').getAll(tag(this.#ns, name, value)) as Row[];
		return rows.filter((row) => row.ns === this.#ns && row.lane !== 'terminal' && extension.matches(row.labels, where));
	}

	/** Earliest due instant among delayed rows and live claims, or undefined when nothing is pending. */
	async #soonest(store: Store): Promise<number | undefined> {
		const index = store.index('due');
		const delayed = await index.openCursor(IDBKeyRange.bound([this.#ns, 'delayed', LOW], [this.#ns, 'delayed', HIGH]));
		const claimed = await index.openCursor(IDBKeyRange.bound([this.#ns, 'claimed', LOW], [this.#ns, 'claimed', HIGH]));
		const dues = [delayed, claimed].flatMap((next) => next ? [(next.value as Row).due] : []);
		return dues.length === 0 ? undefined : Math.min(...dues);
	}

	// ---- plumbing ---------------------------------------------------------

	async #db(): Promise<IDBPDatabase> {
		return await this.#database.db;
	}

	async #row(store: Store, id: string): Promise<Row> {
		const row = await store.get([this.#ns, id]) as Row | undefined;
		if (!row) throw new QueueItemNotFoundError(id);
		return row;
	}

	async #read(id: string): Promise<Row | undefined> {
		const db = await this.#db();
		return await db.get(QUEUE_ITEMS, [this.#ns, id]) as Row | undefined;
	}

	async #unique(store: Store): Promise<string> {
		for (let attempt = 0; attempt < 100; attempt++) {
			const id = this.#id();
			assertKey(id);
			if (await store.getKey([this.#ns, id]) === undefined) return id;
		}
		throw new Error('Queue ID source produced too many collisions.');
	}

	#claimOf(row: Row): QueueClaim<Input> {
		return Object.freeze({
			id: row.claim!.id,
			itemId: row.id,
			owner: row.claim!.owner,
			value: row.input as Input,
			attempt: row.attempt,
			claimedAt: temporal.Instant.from(row.claim!.claimedAt),
			expiresAt: temporal.Instant.from(row.claim!.expiresAt),
		});
	}

	/**
	 * Run one readwrite transaction over the queue stores and publish its effects
	 * after commit. `work` must await only IndexedDB requests, or the transaction
	 * commits early. A thrown error aborts the transaction.
	 */
	async #transact<T>(work: (store: Store, tx: Tx, now: Temporal.Instant, effects: Effects) => Promise<T>): Promise<T> {
		const db = await this.#db();
		const tx = db.transaction([QUEUE_ITEMS, QUEUE_META], 'readwrite') as unknown as Tx;
		const effects: Effects = { events: [], settled: [], wake: false };
		let value: T;
		try {
			value = await work(tx.objectStore(QUEUE_ITEMS) as unknown as Store, tx, this.#clock.now(), effects);
		} catch (error) {
			try {
				tx.abort();
			} catch { /* Already finished. */ }
			await tx.done.catch(() => {});
			throw error;
		}
		await tx.done;
		for (const event of effects.events) this.#emit(event);
		for (const row of effects.settled) this.#settle(row);
		if (effects.wake || effects.settled.length > 0) {
			this.#wakeClaims();
			try {
				this.#channel?.postMessage(null);
			} catch { /* Another context will poll. */ }
		}
		return value;
	}

	#settle(row: Row): void {
		this.#recent.set(row.id, row);
		if (this.#recent.size > RECENT) this.#recent.delete(this.#recent.keys().next().value!);
		const waiters = this.#resultWaiters.get(row.id);
		if (!waiters) return;
		this.#resultWaiters.delete(row.id);
		for (const waiter of waiters) {
			waiter.unlink();
			waiter.resolve();
		}
	}

	#wakeClaims(): void {
		for (const waiter of this.#claimWaiters) {
			this.#claimWaiters.delete(waiter);
			waiter.unlink();
			waiter.resolve();
		}
	}

	/** Another handle changed storage: every waiter re-reads. */
	#wakeAll(): void {
		this.#wakeClaims();
		for (const [id, waiters] of this.#resultWaiters) {
			this.#resultWaiters.delete(id);
			for (const waiter of waiters) {
				waiter.unlink();
				waiter.resolve();
			}
		}
	}

	#emit(event: QueueEventType): void {
		try {
			this.#events.emit(event);
		} catch { /* Observation only. */ }
	}

	#open(): void {
		if (this.#closed) throw new QueueClosedError(this.#reason);
	}

	/** Sleep until woken, until `due` (epoch ms), or for at most the poll interval. */
	async #change(ctx: Context, waiters: Set<Waiter>, due?: number): Promise<void> {
		if (this.#waiting >= this.#maximumWaiters) throw new QueueWaitCapacityError(this.#maximumWaiters);
		this.#waiting++;
		try {
			const until = due === undefined ? this.#poll : Math.min(this.#poll, Math.max(0, Math.ceil(due - this.#clock.now().epochMilliseconds)));
			await sleep(ctx, this.#clock, waiters, until);
		} finally {
			this.#waiting--;
		}
	}
}

function sleep(ctx: Context, clock: Context['clock'], waiters: Set<Waiter>, milliseconds: number): Promise<void> {
	return new Promise<void>((resolve, rejectWait) => {
		if (ctx.signal.aborted) {
			rejectWait(ctx.signal.reason);
			return;
		}
		const timer = new AbortController();
		const unlink = () => {
			ctx.signal.removeEventListener('abort', abort);
			timer.abort();
		};
		const settle = (action: () => void) => {
			if (!waiters.delete(waiter)) return;
			unlink();
			action();
		};
		const abort = () => settle(() => rejectWait(ctx.signal.reason));
		const waiter: Waiter = { resolve, reject: rejectWait, unlink };
		waiters.add(waiter);
		ctx.signal.addEventListener('abort', abort, { once: true });
		void clock.sleep(milliseconds, timer.signal).then(() => settle(resolve), () => {});
	});
}

function reject(waiters: Set<Waiter>, reason: unknown): void {
	for (const waiter of waiters) {
		waiters.delete(waiter);
		waiter.unlink();
		waiter.reject(reason);
	}
}

function entry(row: Row): QueueEntryType {
	return Object.freeze({
		id: row.id,
		state: row.state,
		attempt: row.attempt,
		priority: row.priority,
		...(row.redrivenFrom === undefined ? {} : { redrivenFrom: row.redrivenFrom }),
	});
}

/** Index entry for one label; the type prefix keeps `1` and `'1'` apart. */
function tag(ns: string, name: string, value: string | number): string {
	return `${ns}\u0000${name}\u0000${typeof value === 'number' ? 'n' : 's'}${String(value)}`;
}

function tags(ns: string, labels: Labels): string[] {
	return Object.entries(labels).map(([name, value]) => tag(ns, name, value));
}

function cloneable(value: unknown): unknown {
	try {
		return structuredClone(value);
	} catch {
		return String(value);
	}
}

function assertKey(value: string): void {
	if (value.trim().length === 0) throw new TypeError('Queue keys and identifiers must not be empty.');
	if (value.length > 512) throw new TypeError('Queue keys and identifiers must not exceed 512 characters.');
}

function positiveInteger(value: number, label: string): number {
	if (!Number.isSafeInteger(value) || value < 1) throw new TypeError(`${label} must be a positive safe integer.`);
	return value;
}

function integer(value: number, label: string): number {
	if (!Number.isSafeInteger(value)) throw new TypeError(`${label} must be a safe integer.`);
	return value;
}
