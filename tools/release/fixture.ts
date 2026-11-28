import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, readlinkSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach } from 'vitest';

/** Each test owns a parent containing only its checkout, output and inert adapters. */
const roots = new Set<string>();
/** Invoke the real CLI while its current directory contains only disposable data. */
const cli = fileURLToPath(new URL('./archives.mjs', import.meta.url));

afterEach(() => {
	for (const root of roots) rmSync(root, { recursive: true, force: true });
	roots.clear();
});

/** Create the app version, built manifests and opaque archive inputs the collector reads. */
export function workspace(version = '0.1.0') {
	const root = mkdtempSync(join(tmpdir(), 'deepscope-release-'));
	roots.add(root);
	const checkout = join(root, 'checkout');
	mkdirSync(join(checkout, 'apps/extension'), { recursive: true });
	writeFileSync(join(checkout, 'apps/extension/package.json'), JSON.stringify({ version }));
	writeFileSync(join(checkout, 'source.txt'), 'Source must survive a refused destination.');
	for (const browser of ['chrome', 'firefox', 'safari']) {
		mkdirSync(join(checkout, '.output', `${browser}-mv3`), { recursive: true });
		writeFileSync(join(checkout, '.output', `${browser}-mv3`, 'manifest.json'), JSON.stringify({ version }));
		writeFileSync(join(checkout, '.output', `workspace-${version}-${browser}.zip`), `built ${browser} bytes`);
	}
	writeFileSync(join(checkout, '.output', `workspace-${version}-sources.zip`), 'source archive bytes');
	return {
		root,
		checkout,
		/** Run one native command; a failed CLI must not mutate files outside its owner. */
		command(args: readonly string[], preload?: string) {
			return spawnSync(process.execPath, [...(preload ? ['--require', preload] : []), cli, ...args], {
				cwd: checkout, encoding: 'utf8', timeout: 5_000,
			});
		},
	};
}

/** Capture file bytes, directory membership and link targets without following aliases. */
export function contents(directory: string): Record<string, string> {
	const result: Record<string, string> = {};
	/** Keep paths relative to this fixture so snapshots do not depend on a temporary name. */
	function visit(path: string, prefix: string): void {
		for (const entry of readdirSync(path, { withFileTypes: true })) {
			const name = `${prefix}${entry.name}`;
			const actual = join(path, entry.name);
			if (entry.isDirectory()) {
				result[`${name}/`] = 'directory';
				visit(actual, `${name}/`);
			} else if (entry.isSymbolicLink()) result[name] = `link:${readlinkSync(actual)}`;
			else result[name] = readFileSync(actual).toString('base64');
		}
	}
	visit(directory, '');
	return result;
}
