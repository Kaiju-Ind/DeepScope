import { browser } from 'wxt/browser';

import { fetchRegistryAsset, type RegistryAssetFetch } from './asset-fetch';
import {
	PACKAGED_REGISTRY_ASSET_PATHS,
	isPackagedRuntimeTechnologyRegistryAsset,
} from './packaged-artifacts';
import {
	createRuntimeTechnologyRegistryFromData,
	type RuntimeTechnologyRegistryArtifact,
} from './runtime-artifact';
import type { RuntimeTechnologyRegistryProvider } from '../detection/registry-provider';

/** Runtime hooks needed to load the rule-free Registry product from packaged extension assets. */
export interface PackagedRuntimeTechnologyRegistryProviderInput {
	readonly resolveUrl?: (path: string) => string;
	readonly fetchAsset?: RegistryAssetFetch;
}

/** Create the rule-free packaged provider used by the background service worker. */
export function createPackagedRuntimeTechnologyRegistryProvider(
	input: PackagedRuntimeTechnologyRegistryProviderInput = {},
): RuntimeTechnologyRegistryProvider {
	const resolveUrl = input.resolveUrl ?? ((path) => browser.runtime.getURL(
		path as Parameters<typeof browser.runtime.getURL>[0],
	));
	const fetchAsset = input.fetchAsset ?? fetchRegistryAsset;
	let runtimePromise: Promise<RuntimeTechnologyRegistryArtifact> | undefined;

	return {
		getRuntimeRegistry() {
			if (!runtimePromise) {
				runtimePromise = loadPackagedRuntimeRegistry({ resolveUrl, fetchAsset }).catch((error) => {
					runtimePromise = undefined;
					throw error;
				});
			}
			return runtimePromise;
		},
	};
}

/** Load the only Registry product the background runtime is allowed to acquire. */
async function loadPackagedRuntimeRegistry(input: {
	readonly resolveUrl: (path: string) => string;
	readonly fetchAsset: RegistryAssetFetch;
}): Promise<RuntimeTechnologyRegistryArtifact> {
	const url = input.resolveUrl(PACKAGED_REGISTRY_ASSET_PATHS.runtime);
	const response = await input.fetchAsset(url);
	if (!response.ok) throw new Error(`Unable to load packaged runtime registry asset from ${url}.`);

	const parsed = await response.json();
	if (!isPackagedRuntimeTechnologyRegistryAsset(parsed)) {
		throw new Error('Packaged runtime registry asset did not match the expected schema.');
	}
	return createRuntimeTechnologyRegistryFromData(parsed);
}
