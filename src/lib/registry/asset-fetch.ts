/** Fetch implementation used by packaged Registry loaders and deterministic tests. */
export type RegistryAssetFetch = (url: string) => Promise<{ readonly ok: boolean; json(): Promise<unknown> }>;

/** Preserve the platform fetch receiver while keeping packaged provider tests injectable. */
export async function fetchRegistryAsset(url: string): Promise<{ readonly ok: boolean; json(): Promise<unknown> }> {
	return await globalThis.fetch(url);
}

/**
 * Resolve a packaged extension path against the calling page or worker's own URL.
 *
 * Use `location.href`, never `location.origin`: Safari lowercases the host in
 * `origin` (`safari-web-extension://04bc…`) but serves packaged files only
 * under the host as `href` spells it (`safari-web-extension://04BC…`), so a
 * fetch built from `origin` fails with "Load failed".
 */
export function resolvePackagedAssetUrl(path: string, location: { readonly href: string }): string {
	return new globalThis.URL(`/${path.replace(/^\/+/, '')}`, location.href).toString();
}
