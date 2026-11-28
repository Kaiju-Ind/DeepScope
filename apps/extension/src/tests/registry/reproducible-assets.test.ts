import { describe, expect, it } from 'vitest';

import { buildRegistryAssets } from "../../../modules/compile-registry.ts";
import { compileTechnologyRegistry } from "@deepscope/detection/compiler";
import { technologies } from "@deepscope/registry";

describe('registry build output', () => {
	it('renders byte-identical files when the same catalog is built twice', () => {
		const first = buildRegistryAssets(technologies, compileTechnologyRegistry).assets;
		const second = buildRegistryAssets(technologies, compileTechnologyRegistry).assets;

		expect(second.map((asset) => asset.path)).toEqual(first.map((asset) => asset.path));
		for (const [index, asset] of first.entries()) {
			// Compare per file so a failure names the file that drifted.
			expect({ path: asset.path, contents: second[index]!.contents }).toEqual({ path: asset.path, contents: asset.contents });
		}
	}, 120_000);

	it('embeds no build timestamp', () => {
		const { assets } = buildRegistryAssets(technologies, compileTechnologyRegistry);
		for (const asset of assets) expect(asset.contents, asset.path).not.toContain('generatedAt');
	}, 120_000);
});
