import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

import * as priority from './priority';
import {
	AnalysisWorkSchema,
	EXECUTION_SCHEMA_VERSION,
	MatcherWorkSchema,
	WorkSchema,
	type AnalysisWorkType,
	type WorkKindType,
	type WorkPriorityType,
	type WorkType,
} from './schema';

const DATABASE_NAME = 'kaiju-deepscope-execution';
const DATABASE_VERSION = EXECUTION_SCHEMA_VERSION;
const WORK_STORE = 'work';

interface ExecutionDatabaseSchema extends DBSchema {
	work: {
		key: string;
		value: WorkType;
		indexes: {
			'by-session-kind-state-priority': [string, string, string, number, number];
			'by-session-window': [string, number];
			'by-session-tab': [string, number];
			'by-session-kind': [string, string];
		};
	};
}

/** Create the current disposable execution work store and its scheduling indexes. */
function createWorkStore(db: IDBPDatabase<ExecutionDatabaseSchema>): void {
	const work = db.createObjectStore(WORK_STORE, { keyPath: 'id' });
	work.createIndex('by-session-kind-state-priority', [
		'browserSessionId',
		'kind',
		'state',
		'priorityRank',
		'createdAt',
	]);
	work.createIndex('by-session-window', ['browserSessionId', 'windowId']);
	work.createIndex('by-session-tab', ['browserSessionId', 'tabId']);
	work.createIndex('by-session-kind', ['browserSessionId', 'kind']);
}

let connection: Promise<IDBPDatabase<ExecutionDatabaseSchema>> | undefined;

/** Create a unique fencing token for one durable work claim. */
function createClaimToken(): string {
	return crypto.randomUUID();
}

/**
 * Open the extension execution database.
 *
 * Connections close when a newer schema version needs the origin. A rejected or
 * abnormally terminated connection is never cached, so one transient IndexedDB
 * failure cannot poison every later scheduler operation.
 */
export function open(): Promise<IDBPDatabase<ExecutionDatabaseSchema>> {
	if (connection) return connection;
	let opened: IDBPDatabase<ExecutionDatabaseSchema> | undefined;
	const pending = openDB<ExecutionDatabaseSchema>(DATABASE_NAME, DATABASE_VERSION, {
		upgrade(db) {
			// Execution intent is reconstructable control state. Recreate its store on
			// every schema upgrade so removed fields and indexes cannot survive as
			// accidental compatibility surface. Product snapshots live elsewhere.
			if (db.objectStoreNames.contains(WORK_STORE)) db.deleteObjectStore(WORK_STORE);
			createWorkStore(db);
		},
		blocking() {
			opened?.close();
			connection = undefined;
		},
		terminated() {
			connection = undefined;
		},
	}).then((db) => {
		opened = db;
		return db;
	}).catch((error) => {
		if (connection === pending) connection = undefined;
		throw error;
	});
	connection = pending;
	return pending;
}

/** Close the cached connection, primarily for extension teardown and isolated tests. */
export async function close(): Promise<void> {
	const pending = connection;
	connection = undefined;
	if (!pending) return;
	try {
		(await pending).close();
	} catch {
		// A failed open owns no usable connection to close.
	}
}

/** Persist one validated work record. */
export async function save(work: WorkType): Promise<void> {
	const db = await open();
	await db.put(WORK_STORE, WorkSchema.parse(work));
}


/** Remove one scheduler work record. */
export async function remove(id: string): Promise<void> {
	const db = await open();
	await db.delete(WORK_STORE, id);
}

/** Remove one claimed record only while the caller still owns its exact claim. */
export async function removeClaim(id: string, claimToken: string): Promise<boolean> {
	const db = await open();
	const tx = db.transaction(WORK_STORE, 'readwrite');
	const value = await tx.store.get(id);
	if (!value) {
		await tx.done;
		return false;
	}
	const work = parseWork(value);
	if (work.state !== 'claimed' || work.claimToken !== claimToken) {
		await tx.done;
		return false;
	}
	await tx.store.delete(id);
	await tx.done;
	return true;
}

/** Result of atomically admitting one analysis intent into the durable queue. */
export type AnalysisAdmissionType =
	| Readonly<{ accepted: true; created: boolean; work: AnalysisWorkType }>
	| Readonly<{ accepted: false }>;

/**
 * Atomically insert or join one analysis intent while enforcing the queue limit.
 *
 * Equivalent automatic and interactive requests share one durable identity. An
 * interactive request may promote existing work, but admission never resets a
 * claimed record or replaces its lease. The transaction performs IndexedDB
 * operations only so it cannot auto-close around unrelated asynchronous work.
 */
export async function admitAnalysis(
	work: AnalysisWorkType,
	maxPending: number,
): Promise<AnalysisAdmissionType> {
	const db = await open();
	const tx = db.transaction(WORK_STORE, 'readwrite');
	const currentValue = await tx.store.get(work.id);
	if (currentValue) {
		const current = parseWork(currentValue);
		if (current.kind !== 'analysis') {
			await tx.done;
			throw new Error(`Execution work ${work.id} is not an analysis record.`);
		}

		const shouldPromote = work.priorityRank < current.priorityRank;
		const shouldMarkInteractive = work.source === 'interactive' && current.source !== 'interactive';
		if (!shouldPromote && !shouldMarkInteractive) {
			await tx.done;
			return { accepted: true, created: false, work: current };
		}

		const updated = AnalysisWorkSchema.parse({
			...current,
			...(shouldPromote ? { priority: work.priority, priorityRank: work.priorityRank } : {}),
			...(shouldMarkInteractive ? { source: 'interactive' } : {}),
			updatedAt: Date.now(),
		});
		await tx.store.put(updated);
		await tx.done;
		return { accepted: true, created: false, work: updated };
	}

	const retained = await tx.store.index('by-session-kind').count([work.browserSessionId, 'analysis']);
	if (retained >= maxPending) {
		await tx.done;
		return { accepted: false };
	}

	await tx.store.put(AnalysisWorkSchema.parse(work));
	await tx.done;
	return { accepted: true, created: true, work };
}

/**
 * Atomically claim the highest-priority queued work for one kind.
 *
 * IndexedDB transactions may auto-close when unrelated asynchronous work is
 * awaited. This transaction therefore performs IDB operations only. Network,
 * runtime messaging, matching, and timers happen after the claim commits.
 */
export async function claim(input: {
	readonly browserSessionId: string;
	readonly kind: WorkKindType;
	readonly owner: string;
	readonly minPriorityRank?: number;
	readonly maxPriorityRank?: number;
}): Promise<WorkType | undefined> {
	const db = await open();
	const tx = db.transaction(WORK_STORE, 'readwrite');
	const index = tx.store.index('by-session-kind-state-priority');
	const minPriorityRank = input.minPriorityRank ?? 0;
	const maxPriorityRank = input.maxPriorityRank ?? 3;
	const range = IDBKeyRange.bound(
		[input.browserSessionId, input.kind, 'queued', minPriorityRank, 0],
		[input.browserSessionId, input.kind, 'queued', maxPriorityRank, Number.MAX_SAFE_INTEGER],
	);
	const cursor = await index.openCursor(range);
	if (!cursor) {
		await tx.done;
		return undefined;
	}

	const candidate = parseWork(cursor.value);
	const now = Date.now();
	const claimed = parseWork({
		...candidate,
		state: 'claimed',
		updatedAt: now,
		attempt: candidate.attempt + 1,
		claimOwner: input.owner,
		claimToken: createClaimToken(),
	});
	await cursor.update(claimed);
	await tx.done;
	return claimed;
}

/** Atomically claim one known queued work record before its first local execution step. */
export async function claimId(input: {
	readonly id: string;
	readonly owner: string;
}): Promise<WorkType | undefined> {
	const db = await open();
	const tx = db.transaction(WORK_STORE, 'readwrite');
	const value = await tx.store.get(input.id);
	if (!value) {
		await tx.done;
		return undefined;
	}
	const work = parseWork(value);
	if (work.state === 'claimed') {
		await tx.done;
		return work.claimOwner === input.owner ? work : undefined;
	}
	const now = Date.now();
	const claimed = parseWork({
		...work,
		state: 'claimed',
		updatedAt: now,
		attempt: work.attempt + 1,
		claimOwner: input.owner,
		claimToken: createClaimToken(),
	});
	await tx.store.put(claimed);
	await tx.done;
	return claimed;
}

/** Requeue work claimed by an older runtime owner after service-worker replacement. */
export async function recoverClaims(browserSessionId: string, currentOwner: string, kind: WorkKindType): Promise<readonly WorkType[]> {
	const db = await open();
	const tx = db.transaction(WORK_STORE, 'readwrite');
	const index = tx.store.index('by-session-kind');
	const recovered: WorkType[] = [];
	let cursor = await index.openCursor([browserSessionId, kind]);
	while (cursor) {
		const work = parseWork(cursor.value);
		if (work.state === 'claimed' && work.claimOwner !== currentOwner) {
			const updated = parseWork({
				...work,
				state: 'queued',
				updatedAt: Date.now(),
				claimOwner: undefined,
				claimToken: undefined,
			});
			await cursor.update(updated);
			recovered.push(updated);
		}
		cursor = await cursor.continue();
	}
	await tx.done;
	return recovered;
}

/** Delete live work from browser sessions that can no longer own open tabs. */
export async function removeOtherSessions(browserSessionId: string): Promise<number> {
	const db = await open();
	const tx = db.transaction(WORK_STORE, 'readwrite');
	let cursor = await tx.store.openCursor();
	let removed = 0;
	while (cursor) {
		const work = parseWork(cursor.value);
		if (work.browserSessionId !== browserSessionId) {
			await cursor.delete();
			removed += 1;
		}
		cursor = await cursor.continue();
	}
	await tx.done;
	return removed;
}

/** Change non-interactive work priority when Chrome activates another tab in a window. */
export async function reprioritizeWindow(browserSessionId: string, windowId: number, activeTabId: number): Promise<number> {
	const db = await open();
	const tx = db.transaction(WORK_STORE, 'readwrite');
	const index = tx.store.index('by-session-window');
	let cursor = await index.openCursor([browserSessionId, windowId]);
	let changed = 0;
	while (cursor) {
		const work = parseWork(cursor.value);
		const nextPriority = priority.tab(work.priority, work.tabId === activeTabId);
		if (nextPriority !== work.priority) {
			await cursor.update(parseWork({
				...work,
				priority: nextPriority,
				priorityRank: priority.rank(nextPriority),
				updatedAt: Date.now(),
			}));
			changed += 1;
		}
		cursor = await cursor.continue();
	}
	await tx.done;
	return changed;
}

/** Return all work of one kind for the current browser session. */
export async function listKind(browserSessionId: string, kind: WorkKindType): Promise<readonly WorkType[]> {
	const db = await open();
	const values = await db.getAllFromIndex(WORK_STORE, 'by-session-kind', [browserSessionId, kind]);
	return values.map(parseWork);
}

/** Remove one scheduler kind for a closed tab without disturbing sibling work. */
export async function removeTabKind(browserSessionId: string, tabId: number, kind: WorkKindType): Promise<readonly WorkType[]> {
	return await removeByIndexKind('by-session-tab', [browserSessionId, tabId], kind);
}

async function removeByIndexKind(
	indexName: 'by-session-tab',
	key: IDBValidKey,
	kind: WorkKindType,
): Promise<readonly WorkType[]> {
	const db = await open();
	const tx = db.transaction(WORK_STORE, 'readwrite');
	const index = tx.store.index(indexName);
	let cursor = await index.openCursor(key);
	const removed: WorkType[] = [];
	while (cursor) {
		const work = parseWork(cursor.value);
		if (work.kind === kind) {
			removed.push(work);
			await cursor.delete();
		}
		cursor = await cursor.continue();
	}
	await tx.done;
	return removed;
}

/** Replace one record's priority without changing its claim or ownership state. */
export async function setPriority(id: string, nextPriority: WorkPriorityType): Promise<boolean> {
	const db = await open();
	const tx = db.transaction(WORK_STORE, 'readwrite');
	const value = await tx.store.get(id);
	if (!value) {
		await tx.done;
		return false;
	}
	const work = parseWork(value);
	await tx.store.put(parseWork({
		...work,
		priority: nextPriority,
		priorityRank: priority.rank(nextPriority),
		updatedAt: Date.now(),
	}));
	await tx.done;
	return true;
}

/** Parse a work record through its concrete schema when callers need narrowing. */
export function parseWork(value: unknown): WorkType {
	const parsed = WorkSchema.parse(value);
	return parsed.kind === 'analysis' ? AnalysisWorkSchema.parse(parsed) : MatcherWorkSchema.parse(parsed);
}
