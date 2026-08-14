import { readdirSync, readFileSync } from 'node:fs';
import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const SRC_ROOT = fileURLToPath(new URL('../../', import.meta.url));
const FORBIDDEN_STORAGE_IMPORT = /from\s+['"](?:@\/lib\/storage|(?:\.\.\/)+storage)['"]/;

/** Walk application source while leaving infrastructure and tests out of the dependency rule. */
function applicationSourceFiles(): string[] {
	const files: string[] = [];
	const visit = (directory: string): void => {
		for (const entry of readdirSync(directory, { withFileTypes: true })) {
			const path = resolve(directory, entry.name);
			if (entry.isDirectory()) {
				const sourcePath = relative(SRC_ROOT, path).replaceAll('\\', '/');
				if (sourcePath === 'lib/storage' || sourcePath === 'lib/persistence' || sourcePath === 'tests') {
					continue;
				}
				visit(path);
				continue;
			}
			if (extname(entry.name) === '.ts' || extname(entry.name) === '.tsx') {
				files.push(path);
			}
		}
	};
	visit(SRC_ROOT);
	return files;
}

describe('persistence dependency boundary', () => {
	it('keeps concrete storage imports inside persistence infrastructure', () => {
		const violations = applicationSourceFiles()
			.filter((path) => FORBIDDEN_STORAGE_IMPORT.test(readFileSync(path, 'utf8')))
			.map((path) => relative(SRC_ROOT, path).replaceAll('\\', '/'));

		expect(violations).toEqual([]);
	});
});
