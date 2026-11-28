import { readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';
import { parseSync, Visitor } from 'oxc-parser';

const SRC_ROOT = fileURLToPath(new URL('../../', import.meta.url));
/** Benchmarks sit beside `src/` (in `bench/`) and follow the same rule. */
const BENCH_ROOT = fileURLToPath(new URL('../../../bench/', import.meta.url));

/** Resolve authored local import paths without mistaking comments or string examples for dependencies. */
function dependency(owner: string, specifier: string): string {
	const path = specifier.startsWith('@/') || specifier.startsWith('~/')
		? resolve(SRC_ROOT, specifier.slice(2))
		: specifier.startsWith('.')
		? resolve(dirname(owner), specifier)
		: specifier;
	const extension = extname(path);
	return ['.ts', '.tsx', '.js', '.jsx'].includes(extension) ? path.slice(0, -extension.length) : path;
}

/** Use native module records; only files with dynamic imports need a full AST walk. */
function violations(path: string, forbidden: (target: string) => boolean): string[] {
	const text = readFileSync(path, 'utf8');
	const source = parseSync(path, text, { astType: 'ts' });
	if (source.errors.length) throw new Error(`${path}: ${JSON.stringify(source.errors)}`);
	const found: string[] = [];
	const check = (specifier: string, offset: number): void => {
		if (forbidden(dependency(path, specifier))) {
			const line = text.slice(0, offset).split('\n').length;
			found.push(`${relative(SRC_ROOT, path)}:${line} imports ${specifier}`);
		}
	};
	for (const entry of source.module.staticImports) check(entry.moduleRequest.value, entry.start);
	for (const statement of source.module.staticExports) {
		for (const entry of statement.entries) {
			if (entry.moduleRequest) check(entry.moduleRequest.value, statement.start);
		}
	}
	if (source.module.dynamicImports.length) {
		new Visitor({
			ImportExpression(node) {
				const specifier = node.source.type === 'Literal' && typeof node.source.value === 'string'
					? node.source.value
					: node.source.type === 'TemplateLiteral' && node.source.expressions.length === 0
					? node.source.quasis[0]?.value.cooked
					: undefined;
				if (typeof specifier === 'string') check(specifier, node.start);
			},
		}).visit(source.program);
	}
	return found;
}

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
	visit(BENCH_ROOT);
	return files;
}

describe('persistence dependency boundary', () => {
	// Each existing source directory owns its diagnostics; every authored module is still checked.
	const directories = Map.groupBy(applicationSourceFiles(), (path) => relative(SRC_ROOT, dirname(path)));
	it.each([...directories])('keeps %s independent from concrete storage', (_directory, files) => {
		const storage = resolve(SRC_ROOT, 'lib/storage');
		// The storage entry point performs browser I/O; its schema and session modules remain portable.
		expect(
			files.flatMap((path) => violations(path, (target) => target === storage || target === storage + '/index')),
		).toEqual([]);
	});

	it('keeps the application runtime independent from concrete browser and RPC implementations', () => {
		const concrete = [
			'wxt/browser',
			'comctx',
			resolve(SRC_ROOT, 'lib/persistence/browser'),
			resolve(SRC_ROOT, 'lib/storage'),
		];
		const runtime = resolve(SRC_ROOT, 'lib/background/runtime');
		const files = applicationSourceFiles().filter((path) => path.startsWith(runtime + '/'));
		expect(files.length).toBeGreaterThan(0);
		expect(files.flatMap((path) => violations(
			path,
			(target) => concrete.some((owner) => target === owner || target === owner + '/index') || target === resolve(SRC_ROOT, 'lib/browser/permissions'),
		))).toEqual([]);
	});
});
