import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const REGISTRY_MODULE = fileURLToPath(new URL('../../../modules/compile-registry.ts', import.meta.url));
const PACKAGED_ARTIFACTS = fileURLToPath(new URL('../../lib/registry/packaged-artifacts.ts', import.meta.url));

function read(path: string): string {
	return readFileSync(path, 'utf8');
}

describe('generated registry output', () => {
	it('packages only the rule-free runtime artifact and matcher shards', () => {
		const source = read(REGISTRY_MODULE);

		expect(source).toContain('writeRegistryAssets(publicRegistryDir, assets.filter(isPublicRegistryAsset))');
		expect(source).toContain('asset.path === PACKAGED_REGISTRY_ASSET_PATHS.runtime');
		expect(source).toContain("asset.path.includes('/registry.kind.')");
		expect(source).toContain('resetRegistryDir(publicRegistryDir)');
	});

	it('uses one schema version constant for every generated registry product', () => {
		const source = read(REGISTRY_MODULE);

		expect(source).toContain('PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION');
		expect(source).not.toContain('schemaVersion: 1');
	});

	it('keeps generated runtime JSON compact and removes the obsolete RegExp marker', () => {
		const source = read(PACKAGED_ARTIFACTS);

		expect(source).toContain("return { source: value.source, flags: value.flags }");
		expect(source).not.toContain('$kaijuDeepScopeRegExp');
		expect(source).toContain('JSON.stringify(encodeRegistryJsonValue(value))');
		expect(source).not.toContain('JSON.stringify(encodeRegistryJsonValue(value), null, 2)');
	});
});
