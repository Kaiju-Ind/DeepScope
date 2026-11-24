#!/usr/bin/env node
/**
 * Copy the Kaiju Utils packages DeepScope uses into `utils/` as `@utils/*`.
 *
 * Usage: `node tools/utils/sync.ts [--source ../kaiju-utils] [--check]`
 *
 * `utils/sync.json` names the upstream commit, the PR heads overlaid on it, the
 * entry points DeepScope adopts and the npm versions to pin. From those entry
 * points the script follows every relative and `@kaiju-ind/*` import, so a
 * transitive file is copied only when an adopted file reaches it. A unit test
 * is copied when everything it imports is either copied or a fixture, and its
 * other imports are on the allowed list. Each copied file gets an attribution
 * header, `@kaiju-ind/` becomes `@utils/`, and each package gets a generated
 * `package.json` whose `exports` keep the upstream subpaths that were copied.
 * Files in `utils/sync.json#patches` are then patched with `utils/patches/*.patch`.
 *
 * Files without the vendored header (the browser stores, the queue conformance
 * suite, the Vitest shim) are DeepScope's own and are never touched.
 *
 * `--check` writes nothing and fails when the tree differs from a fresh sync.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, normalize, resolve } from 'node:path';
import { parseArgs } from 'node:util';

interface Overlay {
	readonly ref: string;
	readonly source: string;
	readonly files: readonly string[];
}

interface SyncConfig {
	readonly upstream: string;
	readonly base: string;
	readonly overlays: readonly Overlay[];
	readonly entries: readonly string[];
	readonly testExternals: readonly string[];
	readonly dependencies: Readonly<Record<string, string>>;
	readonly devDependencies: Readonly<Record<string, string>>;
	readonly local: Readonly<Record<string, { readonly exports?: Readonly<Record<string, string>> }>>;
	readonly patches: Readonly<Record<string, string>>;
}

interface UpstreamPackage {
	readonly version: string;
	readonly sideEffects?: unknown;
	readonly exports: Readonly<Record<string, string>>;
}

/** First line of every copied TypeScript file; the script owns files that start with it. */
const MARKER = '// Vendored from Kaiju-Ind/Utils';
const README_MARKER = '<!-- Vendored from Kaiju-Ind/Utils';
const IMPORT = /(?:import|export)\s+(?:type\s+)?(?:[^'";]*?\s+from\s+)?['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/g;

const root = resolve(dirname(new URL(import.meta.url).pathname), '../..');
const utils = join(root, 'utils');
const { values: args } = parseArgs({
	options: {
		source: { type: 'string', default: resolve(root, '../kaiju-utils') },
		check: { type: 'boolean', default: false },
	},
});
const config = JSON.parse(readFileSync(join(utils, 'sync.json'), 'utf8')) as SyncConfig;

/** Extract `packages/` and `LICENSE` at one commit into a fresh directory. */
function checkout(ref: string): string {
	const dir = mkdtempSync(join(tmpdir(), 'utils-sync-'));
	const archive = execFileSync('git', ['-C', args.source!, 'archive', '--format=tar', ref, 'packages', 'LICENSE'], {
		maxBuffer: 1 << 30,
	});
	execFileSync('tar', ['-x', '-C', dir], { input: archive });
	return dir;
}

const base = checkout(config.base);
const overlays = config.overlays.map((overlay) => ({ ...overlay, dir: checkout(overlay.ref) }));

/** Upstream path (relative to `packages/`) to the directory holding its chosen revision. */
function origin(file: string): { readonly dir: string; readonly ref: string; readonly source?: string } {
	for (const overlay of overlays) {
		if (overlay.files.includes(`packages/${file}`)) return { dir: overlay.dir, ref: overlay.ref, source: overlay.source };
	}
	return { dir: base, ref: config.base };
}

function read(file: string): string {
	return readFileSync(join(origin(file).dir, 'packages', file), 'utf8');
}

const manifests = new Map<string, UpstreamPackage>();
function manifest(name: string): UpstreamPackage {
	let value = manifests.get(name);
	if (!value) {
		value = JSON.parse(readFileSync(join(base, 'packages', name, 'package.json'), 'utf8')) as UpstreamPackage;
		manifests.set(name, value);
	}
	return value;
}

/** Resolve `@kaiju-ind/name/sub` through the upstream `exports` map. */
function resolveSpecifier(specifier: string): string | undefined {
	const match = /^@kaiju-ind\/([^/]+)(\/.*)?$/.exec(specifier);
	if (!match) return undefined;
	const target = manifest(match[1]!).exports[`.${match[2] ?? ''}`];
	return target === undefined ? undefined : normalize(join(match[1]!, target));
}

/** Imports of one file: other upstream files, or bare external specifiers. */
function imports(file: string): { readonly files: string[]; readonly external: string[] } {
	const source = read(file).replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
	const files: string[] = [];
	const external: string[] = [];
	for (const match of source.matchAll(IMPORT)) {
		const specifier = match[1] ?? match[2]!;
		if (specifier.startsWith('.')) files.push(normalize(join(dirname(file), specifier)));
		else if (specifier.startsWith('@kaiju-ind/')) files.push(resolveSpecifier(specifier) ?? `missing:${specifier}`);
		else external.push(specifier);
	}
	return { files, external };
}

// 1. Every file an adopted entry point reaches.
const closure = new Set<string>();
const externals = new Map<string, Set<string>>();
const queue = config.entries.map((entry) => {
	const file = resolveSpecifier(`@kaiju-ind/${entry}`);
	if (!file) throw new Error(`Unknown entry point ${entry}.`);
	return file;
});
while (queue.length > 0) {
	const file = queue.pop()!;
	if (closure.has(file)) continue;
	if (file.startsWith('missing:')) throw new Error(`Unresolved import ${file}.`);
	closure.add(file);
	const found = imports(file);
	queue.push(...found.files);
	for (const specifier of found.external) {
		const pkg = file.split('/')[0]!;
		if (!externals.has(pkg)) externals.set(pkg, new Set());
		externals.get(pkg)!.add(specifier);
	}
}
const packages = [...new Set([...closure].map((file) => file.split('/')[0]!))].sort();

// 2. Unit tests whose imports stay inside the copy, plus the fixtures they need.
const allowed = config.testExternals.map((pattern) => new RegExp(`^${pattern}$`));
function walkFiles(dir: string, prefix = ''): string[] {
	const out: string[] = [];
	for (const entry of readdirSync(join(dir, prefix), { withFileTypes: true })) {
		const path = join(prefix, entry.name);
		if (entry.isDirectory()) out.push(...walkFiles(dir, path));
		else out.push(path);
	}
	return out;
}
const tests = new Set<string>();
const fixtures = new Set<string>();
const skippedTests: string[] = [];
for (const pkg of packages) {
	for (const path of walkFiles(join(base, 'packages'), pkg)) {
		if (!path.endsWith('.test.ts')) continue;
		const extra = new Set<string>();
		const problems: string[] = [];
		const pending = [path];
		const seen = new Set<string>();
		while (pending.length > 0) {
			const file = pending.pop()!;
			if (seen.has(file)) continue;
			seen.add(file);
			if (file.startsWith('missing:') || !existsSync(join(base, 'packages', file))) {
				problems.push(file);
				continue;
			}
			if (file !== path && !closure.has(file)) {
				if (!/(^|\/)fixtures\//.test(file)) {
					problems.push(file);
					continue;
				}
				extra.add(file);
			}
			const found = imports(file);
			pending.push(...found.files);
			for (const specifier of found.external) {
				if (!allowed.some((pattern) => pattern.test(specifier))) problems.push(specifier);
			}
		}
		if (problems.length > 0) skippedTests.push(`${path}: ${[...new Set(problems)].slice(0, 3).join(', ')}`);
		else {
			tests.add(path);
			for (const file of extra) fixtures.add(file);
		}
	}
}

// 3. READMEs of every copied directory.
const copied = [...closure, ...tests, ...fixtures].sort();
const readmes = new Set<string>();
for (const file of copied) {
	const readme = join(dirname(file), 'README.md');
	if (existsSync(join(base, 'packages', readme))) readmes.add(readme);
}

function rewrite(text: string): string {
	return text.replaceAll('@kaiju-ind/', '@utils/');
}

function header(file: string): string {
	const from = origin(file);
	const source = from.source ? ` (${from.source})` : '';
	const change = config.patches[file] ?? 'none';
	return `${MARKER} packages/${file} @ ${from.ref.slice(0, 7)}${source}.\n` +
		`// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: ${change}. Resync: scripts/utils/sync.ts.\n`;
}

const output = new Map<string, string>();
for (const file of copied) output.set(file, header(file) + rewrite(read(file)));
for (const file of readmes) {
	output.set(file, `${README_MARKER} packages/${file} @ ${config.base.slice(0, 7)}; links to upstream docs are not copied. -->\n\n${rewrite(read(file))}`);
}

// 4. A package.json per package, with only the subpaths that were copied.
function internalImports(pkg: string, files: Iterable<string>): string[] {
	const names = new Set<string>();
	for (const file of files) {
		if (!file.startsWith(`${pkg}/`)) continue;
		for (const target of imports(file).files) {
			const name = target.split('/')[0]!;
			if (name !== pkg) names.add(name);
		}
	}
	return [...names].sort();
}
function packageOf(specifier: string): string {
	const parts = specifier.split('/');
	return specifier.startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0]!;
}
function pinned(names: Iterable<string>, table: Readonly<Record<string, string>>): Record<string, string> {
	const out: Record<string, string> = {};
	for (const name of [...new Set(names)].sort()) {
		if (name.startsWith('node:')) continue;
		const version = table[name];
		if (version === undefined) throw new Error(`No pinned version for ${name} in utils/sync.json.`);
		out[name] = version;
	}
	return out;
}
for (const pkg of packages) {
	const upstream = manifest(pkg);
	const exports: Record<string, string> = {};
	for (const [subpath, target] of Object.entries(upstream.exports)) {
		if (closure.has(normalize(join(pkg, target)))) exports[subpath] = target;
	}
	Object.assign(exports, config.local[pkg]?.exports ?? {});
	const source = [...closure].filter((file) => file.startsWith(`${pkg}/`));
	const testFiles = [...tests, ...fixtures].filter((file) => file.startsWith(`${pkg}/`));
	const dependencies: Record<string, string> = {};
	for (const name of internalImports(pkg, source)) dependencies[`@utils/${name}`] = 'workspace:*';
	Object.assign(dependencies, pinned([...(externals.get(pkg) ?? [])].map(packageOf), config.dependencies));
	const devDependencies: Record<string, string> = {};
	for (const name of internalImports(pkg, testFiles)) {
		if (!dependencies[`@utils/${name}`]) devDependencies[`@utils/${name}`] = 'workspace:*';
	}
	const testExternal = new Set<string>();
	for (const file of testFiles) for (const specifier of imports(file).external) testExternal.add(packageOf(specifier));
	for (const [name, version] of Object.entries(pinned(testExternal, { ...config.dependencies, ...config.devDependencies }))) {
		if (!dependencies[name]) devDependencies[name] = version;
	}
	const json = {
		name: `@utils/${pkg}`,
		version: upstream.version,
		private: true,
		type: 'module',
		...(upstream.sideEffects === undefined ? {} : { sideEffects: upstream.sideEffects }),
		license: 'MIT',
		description: `Vendored from Kaiju-Ind/Utils packages/${pkg} @ ${config.base.slice(0, 7)}. See utils/README.md.`,
		exports,
		...(Object.keys(dependencies).length > 0 ? { dependencies } : {}),
		...(Object.keys(devDependencies).length > 0 ? { devDependencies } : {}),
	};
	output.set(`${pkg}/package.json`, `${JSON.stringify(json, null, '\t')}\n`);
}
output.set('LICENSE', readFileSync(join(base, 'LICENSE'), 'utf8'));

// 5. Write into a staging copy of utils/, apply patches there, then compare or replace.
const stage = mkdtempSync(join(tmpdir(), 'utils-stage-'));
execFileSync('cp', ['-R', `${utils}/.`, stage]);
function owned(path: string): boolean {
	if (path.endsWith('package.json')) return packages.includes(path.split('/')[0]!) || manifestOwned(path);
	if (!path.endsWith('.ts') && !path.endsWith('.md')) return false;
	const text = readFileSync(join(stage, path), 'utf8');
	return text.startsWith(MARKER) || text.startsWith(README_MARKER);
}
function manifestOwned(path: string): boolean {
	const text = readFileSync(join(stage, path), 'utf8');
	return text.includes('"description": "Vendored from Kaiju-Ind/Utils');
}
for (const path of walkFiles(stage)) {
	if (path.split('/').includes('node_modules') || path.startsWith('patches/')) continue;
	if (path.split('/').length > 1 && owned(path)) rmSync(join(stage, path));
}
for (const [path, text] of output) {
	mkdirSync(dirname(join(stage, path)), { recursive: true });
	writeFileSync(join(stage, path), text);
}
const patchDir = join(utils, 'patches');
const patches = existsSync(patchDir) ? readdirSync(patchDir).filter((name) => name.endsWith('.patch')).sort() : [];
for (const name of patches) {
	// Patches are `git diff` output from the repository root, so strip `a/utils/`.
	execFileSync('git', ['apply', '-p2', join(patchDir, name)], { cwd: stage });
}

const changed: string[] = [];
const stagedFiles = new Set(walkFiles(stage).filter((path) => !path.split('/').includes('node_modules')));
const currentFiles = new Set(walkFiles(utils).filter((path) => !path.split('/').includes('node_modules')));
for (const path of new Set([...stagedFiles, ...currentFiles])) {
	const before = currentFiles.has(path) ? readFileSync(join(utils, path), 'utf8') : undefined;
	const after = stagedFiles.has(path) ? readFileSync(join(stage, path), 'utf8') : undefined;
	if (before !== after) changed.push(path);
}

console.log(`Upstream ${config.upstream} @ ${config.base.slice(0, 7)}; overlays: ${config.overlays.map((o) => `${o.source} @ ${o.ref.slice(0, 7)}`).join(', ') || 'none'}.`);
console.log(`${packages.length} packages, ${closure.size} source files, ${tests.size} tests, ${fixtures.size} fixtures, ${patches.length} patches.`);
console.log(`Tests left upstream (${skippedTests.length}):\n  ${skippedTests.join('\n  ')}`);
if (args.check) {
	if (changed.length > 0) {
		console.error(`utils/ differs from a fresh sync:\n  ${changed.join('\n  ')}`);
		process.exitCode = 1;
	} else console.log('utils/ matches a fresh sync.');
} else {
	for (const path of changed) {
		if (stagedFiles.has(path)) {
			mkdirSync(dirname(join(utils, path)), { recursive: true });
			writeFileSync(join(utils, path), readFileSync(join(stage, path)));
		} else rmSync(join(utils, path));
	}
	console.log(`${changed.length} files changed.`);
}
for (const dir of [base, stage, ...overlays.map((overlay) => overlay.dir)]) rmSync(dir, { recursive: true, force: true });
