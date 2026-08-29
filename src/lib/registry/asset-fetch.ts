/** Fetch implementation used by packaged Registry loaders and deterministic tests. */
export type RegistryAssetFetch = (url: string) => Promise<{ readonly ok: boolean; json(): Promise<unknown> }>;

/** Preserve the platform fetch receiver while keeping packaged provider tests injectable. */
export async function fetchRegistryAsset(url: string): Promise<{ readonly ok: boolean; json(): Promise<unknown> }> {
	return await globalThis.fetch(url);
}
