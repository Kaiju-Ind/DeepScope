

type StorageArea = {
	get(keys?: null | string | readonly string[]): Promise<Record<string, unknown>>;
	getKeys?: () => Promise<string[]>;
	set(items: Record<string, unknown>): Promise<void>;
	remove(keys: string | readonly string[]): Promise<void>;
};

/** Resolve local extension storage from either supported namespace, returning null in contexts that require transport. */
export function getStorageArea(): StorageArea | null {
	const runtime = globalThis as typeof globalThis & {
		browser?: { storage?: { local?: StorageArea } };
		chrome?: { storage?: { local?: StorageArea } };
	};
	return runtime.browser?.storage?.local ?? runtime.chrome?.storage?.local ?? null;
}
