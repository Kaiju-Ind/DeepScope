import { existsSync, globSync, readFileSync } from 'node:fs';
import { dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSync } from 'oxc-parser';
import { describe, expect, it } from 'vitest';

/** Workspace packages must rebuild without WXT, extension aliases or browser state. */
const ROOT = fileURLToPath(new URL('../../../../../', import.meta.url));
const OWNERS = ['dom', 'registry', 'detection'] as const;

/** Declared source export maps are the contract between source packages and their consumers. */
interface Manifest {
	readonly name: string;
	readonly exports: Readonly<Record<string, string>>;
	readonly dependencies?: Readonly<Record<string, string>>;
	readonly devDependencies?: Readonly<Record<string, string>>;
}

/** Read the actual workspace manifest instead of maintaining another dependency allowlist. */
function manifest(owner: string): Manifest {
	return JSON.parse(readFileSync(resolve(ROOT, 'packages', owner, 'package.json'), 'utf8')) as Manifest;
}

/** Read static exports and literal dynamic imports, including type-only edges. */
function imports(file: string, text: string): readonly string[] {
	const parsed = parseSync(file, text, { astType: 'ts' });
	if (parsed.errors.length) throw new Error(`${file}: ${JSON.stringify(parsed.errors)}`);
	return [
		...parsed.module.staticImports.map((entry) => entry.moduleRequest.value),
		...parsed.module.staticExports.flatMap((statement) => statement.entries
			.flatMap((entry) => entry.moduleRequest ? [entry.moduleRequest.value] : [])),
		...parsed.module.dynamicImports.map((entry) => text.slice(entry.moduleRequest.start, entry.moduleRequest.end)
			.replace(/^['"`]|['"`]$/g, '')),
	];
}

/** Package names stop after the scope and first segment, even for a narrow subpath import. */
function packageName(specifier: string): string {
	return specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0]!;
}

describe('portable package ownership', () => {
	it.each(OWNERS)('%s owns every dependency and keeps relative imports inside its directory', (owner) => {
		const directory = resolve(ROOT, 'packages', owner);
		const declared = manifest(owner);
		const issues: string[] = [];
		for (const file of globSync('**/*.{ts,tsx}', { cwd: directory, exclude: ['node_modules/**'] })) {
			const absolute = resolve(directory, file);
			const isTest = file.endsWith('.test.ts') || file.endsWith('.test.tsx') || file === 'vitest.config.ts';
			const dependencies = { ...declared.dependencies, ...(isTest ? declared.devDependencies : {}) };
			for (const specifier of imports(file, readFileSync(absolute, 'utf8'))) {
				if (specifier.startsWith('.')) {
					const target = resolve(dirname(absolute), specifier);
					if (relative(directory, target).startsWith('..')) issues.push(`${file}: leaves package through ${specifier}`);
					if (!['.ts', '.tsx'].includes(extname(specifier))) issues.push(`${file}: missing source extension in ${specifier}`);
					if (!existsSync(target)) issues.push(`${file}: missing ${specifier}`);
					continue;
				}
				if (/^(?:wxt(?:\/|$)|comctx(?:\/|$)|@\/|~\/)/u.test(specifier)) issues.push(`${file}: extension import ${specifier}`);
				if (specifier.startsWith(`${declared.name}/`) || specifier === declared.name) issues.push(`${file}: self-package import ${specifier}`);
				if (specifier.startsWith('node:')) {
					if (!isTest) issues.push(`${file}: Node adapter in portable source ${specifier}`);
					continue;
				}
				if (!(packageName(specifier) in dependencies)) issues.push(`${file}: undeclared dependency ${specifier}`);
			}
		}
		expect(issues).toEqual([]);
	});

	it.each(OWNERS)('%s exports existing source files and keeps authored modules within 500 lines', (owner) => {
		const directory = resolve(ROOT, 'packages', owner);
		const declared = manifest(owner);
		const issues: string[] = [];
		for (const [entry, target] of Object.entries(declared.exports)) {
			if (!target.startsWith('./') || !existsSync(resolve(directory, target))) issues.push(`${entry}: missing ${target}`);
		}
		for (const file of globSync('**/*.ts', { cwd: directory, exclude: ['node_modules/**', 'catalog/**', '**/*.test.ts', 'testing/**'] })) {
			const count = readFileSync(resolve(directory, file), 'utf8').split('\n').length - 1;
			if (count > 500) issues.push(`${file}: ${count} lines`);
		}
		expect(issues).toEqual([]);
	});
});
