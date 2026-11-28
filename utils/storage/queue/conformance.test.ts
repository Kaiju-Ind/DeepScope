// DeepScope's own test: the queue conformance suite against every store; not vendored.
import 'fake-indexeddb/auto';
import * as queue from '@utils/scheduler/queue';
import { conformance } from '@utils/scheduler/queue/testing';

import { open } from '../indexeddb.ts';
import { indexeddb } from './indexeddb.ts';
import { memory } from './memory.ts';

conformance('upstream memory', ({ clock, capacity, retention }) => ({
	queue: queue.memory<string, string>({ clock, ...(capacity ? { capacity } : {}), ...(retention ? { retention } : {}) }),
}));

conformance('labeled memory', ({ clock, capacity, retention }) => ({
	queue: memory<string, string>({ clock, ...(capacity ? { capacity } : {}), ...(retention ? { retention } : {}) }),
}));

let databases = 0;
conformance('indexeddb', async ({ clock, capacity, retention }) => {
	const db = await open(`conformance-${++databases}`);
	const options = { database: db, namespace: 'jobs', clock, ...(capacity ? { capacity } : {}), ...(retention ? { retention } : {}) };
	return {
		queue: indexeddb<string, string>(options),
		// Another handle on the same database, as the offscreen document would hold.
		peer: async () => indexeddb<string, string>({ ...options, database: db.name }),
		cleanup: async () => db.close(),
	};
});
