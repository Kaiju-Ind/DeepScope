/** The parts of an extension storage area that key enumeration needs. */
export type EnumerableStorageArea = {
	get(keys?: null | string | readonly string[]): Promise<Record<string, unknown>>;
	getKeys?: () => Promise<string[]>;
};

/** Keys per `get` call; small enough that ordinary records stay far below Safari's limit. */
const READ_BATCH_SIZE = 40;

/**
 * List stored keys that pass `wanted`.
 *
 * Uses `getKeys()` where the area has it, so no values are read. Otherwise it
 * falls back to `get(null)`, which Safari refuses once the area holds about
 * 1 MiB (see `readStorageEntries`).
 */
export async function readStorageKeys(
	area: EnumerableStorageArea,
	wanted: (key: string) => boolean,
): Promise<string[]> {
	if (typeof area.getKeys === 'function') return (await area.getKeys()).filter(wanted);
	return Object.keys(await area.get(null)).filter(wanted);
}

/**
 * Read every stored entry whose key passes `wanted`.
 *
 * Safari rejects `storage.local.get(null)` with "exceeded maximum data size
 * allowed per call" once the area holds about 1 MiB (checked in Safari
 * Technology Preview, November 2026). DeepScope's journal and snapshots pass
 * that within minutes of use, after which every caller that enumerated storage
 * with `get(null)` failed. Where the area can list its keys, this reads only
 * the wanted keys, in batches, and halves any batch the browser still refuses.
 * A single value that is too large on its own is skipped and passed to
 * `onUnreadable`.
 */
export async function readStorageEntries(
	area: EnumerableStorageArea,
	wanted: (key: string) => boolean,
	onUnreadable?: (key: string, error: unknown) => void,
): Promise<Array<[string, unknown]>> {
	if (typeof area.getKeys !== 'function') {
		return Object.entries(await area.get(null)).filter(([key]) => wanted(key));
	}

	const keys = (await area.getKeys()).filter(wanted);
	const entries: Array<[string, unknown]> = [];
	/** Split failed storage batches until unreadable individual keys can be reported without discarding readable neighbors. */
	const read = async (batch: readonly string[]): Promise<void> => {
		try {
			const values = await area.get(batch);
			for (const key of batch) {
				if (Object.hasOwn(values, key)) entries.push([key, values[key]]);
			}
		} catch (error) {
			if (batch.length === 1) {
				onUnreadable?.(batch[0]!, error);
				return;
			}
			const middle = Math.ceil(batch.length / 2);
			await read(batch.slice(0, middle));
			await read(batch.slice(middle));
		}
	};
	for (let index = 0; index < keys.length; index += READ_BATCH_SIZE) {
		await read(keys.slice(index, index + READ_BATCH_SIZE));
	}
	return entries;
}
