/**
 * The IndexedDB database shared by the queue and workflow history stores.
 *
 * Both stores live in one database so a history write and the queue claim it
 * depends on can be checked in one transaction. IndexedDB runs readwrite
 * transactions on overlapping stores one at a time across the whole extension
 * origin, so a service worker, an offscreen document and an extension page
 * that open the same database see each claim atomically.
 *
 * Private-tab work must not reach disk: give it `queue/memory` and
 * `history.memory()` instead of this database.
 *
 * DeepScope's own file, not vendored.
 *
 * @module
 */
import { openDB, type IDBPDatabase } from 'idb';

/** Schema version. Raise it with an upgrade step when a store or index changes. */
export const VERSION = 1;
/** Queue items for every namespace, keyed `[namespace, id]`. */
export const QUEUE_ITEMS = 'queue.items';
/** Per-namespace admission counters, keyed by namespace. */
export const QUEUE_META = 'queue.meta';
/** Workflow instruction history, keyed `[namespace, runId, path]`. */
export const HISTORY = 'workflow.history';

/** An open database, or the name to open lazily. */
export type DatabaseInput = IDBPDatabase | Promise<IDBPDatabase> | string;

/**
 * Open (creating or upgrading) the shared database.
 *
 * The caller owns the returned handle and closes it after every store using it
 * has closed. Another context holding an older version blocks the upgrade, so
 * `blocking` closes this handle when a newer version asks for it.
 */
export function open(name: string): Promise<IDBPDatabase> {
	return openDB(name, VERSION, {
		upgrade(db) {
			const items = db.createObjectStore(QUEUE_ITEMS, { keyPath: ['ns', 'id'] });
			// Ready work in claim order: higher priority first (rank = -priority), then FIFO.
			items.createIndex('order', ['ns', 'lane', 'rank', 'seq']);
			// The next instant that changes a row: availability, claim expiry or finish time.
			items.createIndex('due', ['ns', 'lane', 'due']);
			items.createIndex('state', ['ns', 'state']);
			// Rows without a key are not indexed, so only keyed admissions are deduplicated.
			items.createIndex('key', ['ns', 'key'], { unique: true });
			items.createIndex('seq', ['ns', 'seq'], { unique: true });
			items.createIndex('tags', 'tags', { multiEntry: true });
			db.createObjectStore(QUEUE_META);
			const history = db.createObjectStore(HISTORY, { keyPath: ['ns', 'runId', 'path'] });
			history.createIndex('run', ['ns', 'runId']);
		},
		blocking(_current, _next, event) {
			(event.target as IDBDatabase).close();
		},
	});
}

/** Resolve a database input once; `owned` is true when the store opened it and must close it. */
export function resolve(input: DatabaseInput): { readonly db: Promise<IDBPDatabase>; readonly owned: boolean; readonly name: Promise<string> } {
	const db = typeof input === 'string' ? open(input) : Promise.resolve(input);
	return { db, owned: typeof input === 'string', name: db.then((handle) => handle.name) };
}
