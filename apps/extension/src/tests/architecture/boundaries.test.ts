/**
 * Source-layout guardrails from docs/migration/source-layout-plan.md.
 *
 * - Size ratchet: authored modules stay at or under 500 lines. Files that were
 *   already larger are listed with their size when the ratchet was added; they
 *   may only shrink, and an entry must be removed once its file is back under
 *   the cap or moved.
 * - Entrypoints are composition only: at most 120 lines (same ratchet), and no
 *   other module imports them.
 * - `lib` never imports `app`.
 * - `app/model` stays pure: no browser, RPC, Solid or persistence imports, no
 *   other `app` modules, and no import-time side effects.
 *
 * Files are discovered from disk, so new modules are covered without editing
 * this test.
 */
import { globSync, readFileSync } from 'node:fs';
import { dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parseSync } from 'oxc-parser';
import { describe, expect, it } from 'vitest';

const SRC = fileURLToPath(new URL('../../', import.meta.url));

/** Line cap for authored modules, and for entrypoints. */
const CAP = 500;
const ENTRYPOINT_CAP = 120;

/** Modules over the cap when the ratchet was added (lines as `wc -l` counts them). Shrink only. */
const OVERSIZED: Readonly<Record<string, number>> = {
	'lib/background/runtime.ts': 3039,
	'app/provider.tsx': 1349,
	'app/model.ts': 935,
	'lib/detection/engine.ts': 987,
	// +2 for the Safari-safe batched storage reads (bug C, stress test); split in Phase B.
	'lib/storage/detection-snapshots.ts': 941,
	'lib/content/observe/runtime.ts': 947,
	'lib/candidates/refine.ts': 861,
	'lib/detection/observation-matcher-index.ts': 708,
	'lib/scheduler/matcher.ts': 647,
	'entrypoints/content.ts': 649,
	'lib/detection/rule-performance-profile.ts': 655,
	// +1 for the Safari-safe batched storage reads (bug C, stress test); split in Phase B.
	'lib/diagnostics/journal.ts': 629,
	'lib/content/collect-page-signals.ts': 624,
	'lib/collectors/background-signals.ts': 516,
};

/** Entrypoints over the entrypoint cap when the ratchet was added. Shrink only. */
const THICK_ENTRYPOINTS: Readonly<Record<string, number>> = {
	'entrypoints/background.ts': 332,
	'entrypoints/content.ts': 649,
};

/** Import-time statements in `app/model` that predate the rule (moves to `app/artifact.ts`). */
const MODEL_SIDE_EFFECTS = new Set(['app/model.ts: publishArtifactRuntime()']);

/** Authored TypeScript under `src`, relative to it, with forward slashes. */
function sources(): string[] {
	return globSync('**/*.{ts,tsx}', { cwd: SRC })
		.map((path) => path.replaceAll('\\', '/'))
		.filter((path) => !path.startsWith('tests/') && !path.endsWith('.d.ts'))
		.sort();
}

const lines = (path: string): number => readFileSync(resolve(SRC, path), 'utf8').split('\n').length - 1;

/** Excluded from the size cap: generated data, vendored UI components and the registry. */
function capped(path: string): boolean {
	return !path.startsWith('registry/') && !path.startsWith('ui/') && !/^\/\/ @generated/.test(readFileSync(resolve(SRC, path), 'utf8'));
}

/** Resolve a specifier to a `src`-relative path without extension, or return it unchanged (packages). */
function target(owner: string, specifier: string): string {
	const path = specifier.startsWith('@/') || specifier.startsWith('~/')
		? specifier.slice(2)
		: specifier.startsWith('.')
		? relative(SRC, resolve(SRC, dirname(owner), specifier)).replaceAll('\\', '/')
		: specifier;
	const extension = extname(path);
	return ['.ts', '.tsx', '.js', '.jsx'].includes(extension) ? path.slice(0, -extension.length) : path;
}

interface ModuleType {
	readonly imports: readonly { readonly target: string; readonly line: number }[];
	/** Top-level expression statements, as source text. */
	readonly effects: readonly string[];
}

/** Read static, re-exported and literal dynamic imports from Oxc's module record. */
function parse(path: string): ModuleType {
	const text = readFileSync(resolve(SRC, path), 'utf8');
	const source = parseSync(path, text, { astType: 'ts' });
	if (source.errors.length) throw new Error(`${path}: ${JSON.stringify(source.errors)}`);
	const at = (offset: number) => text.slice(0, offset).split('\n').length;
	const imports = [
		...source.module.staticImports.map((entry) => ({ specifier: entry.moduleRequest.value, offset: entry.start })),
		...source.module.staticExports.flatMap((statement) => statement.entries
			.filter((entry) => entry.moduleRequest)
			.map((entry) => ({ specifier: entry.moduleRequest!.value, offset: statement.start }))),
		...source.module.dynamicImports.map((entry) => ({
			specifier: text.slice(entry.moduleRequest.start, entry.moduleRequest.end).replace(/^['"`]|['"`]$/g, ''),
			offset: entry.start,
		})),
	].map(({ specifier, offset }) => ({ target: target(path, specifier), line: at(offset) }));
	const effects = source.program.body
		.filter((statement) => statement.type === 'ExpressionStatement')
		.map((statement) => `${path}: ${text.slice(statement.start, statement.end).replace(/;$/, '')}`);
	return { imports, effects };
}

/** `path:line imports target` for every import of `path` that `forbidden` rejects. */
function violations(paths: readonly string[], forbidden: (target: string) => boolean): string[] {
	return paths.flatMap((path) => parse(path).imports
		.filter((entry) => forbidden(entry.target))
		.map((entry) => `${path}:${entry.line} imports ${entry.target}`));
}

const under = (prefix: string) => (path: string) => path === prefix || path.startsWith(`${prefix}/`);

describe('module size ratchet', () => {
	const files = sources().filter(capped);

	it(`keeps new modules at or under ${CAP} lines`, () => {
		const over = files.filter((path) => !(path in OVERSIZED) && lines(path) > CAP).map((path) => `${path}: ${lines(path)}`);
		expect(over, 'split these modules; the allowlist is only for files that predate the ratchet').toEqual([]);
	});

	it.each(Object.entries(OVERSIZED))('%s only shrinks', (path, recorded) => {
		expect(files, `${path} moved or was deleted: remove it from OVERSIZED`).toContain(path);
		const size = lines(path);
		expect(size, `${path} is back under ${CAP} lines: remove it from OVERSIZED`).toBeGreaterThan(CAP);
		expect(size, `${path} grew past its recorded size; split it instead`).toBeLessThanOrEqual(recorded);
	});
});

describe('entrypoints are composition only', () => {
	const entrypoints = sources().filter(under('entrypoints'));

	it(`keeps entrypoints at or under ${ENTRYPOINT_CAP} lines`, () => {
		const over = entrypoints
			.filter((path) => !(path in THICK_ENTRYPOINTS) && lines(path) > ENTRYPOINT_CAP)
			.map((path) => `${path}: ${lines(path)}`);
		expect(over).toEqual([]);
	});

	it.each(Object.entries(THICK_ENTRYPOINTS))('%s only shrinks', (path, recorded) => {
		expect(entrypoints).toContain(path);
		expect(lines(path)).toBeLessThanOrEqual(recorded);
	});

	it('is never imported by other modules', () => {
		const others = sources().filter((path) => !under('entrypoints')(path));
		expect(violations(others, under('entrypoints'))).toEqual([]);
	});
});

describe('dependency direction', () => {
	it('keeps lib independent from app', () => {
		expect(violations(sources().filter(under('lib')), under('app'))).toEqual([]);
	});

	describe('app/model stays pure', () => {
		const model = sources().filter((path) => path === 'app/model.ts' || path.startsWith('app/model/'));

		it('imports no browser, RPC, Solid, persistence or other app modules', () => {
			expect(model.length).toBeGreaterThan(0);
			const impure = (target: string) =>
				target === 'wxt/browser' || target.startsWith('wxt/') || target === 'comctx' ||
				target === 'solid-js' || target.startsWith('solid-js/') ||
				under('lib/persistence')(target) || target === 'lib/storage' || target === 'lib/storage/index' ||
				(under('app')(target) && target !== 'app/model' && !target.startsWith('app/model/'));
			expect(violations(model, impure)).toEqual([]);
		});

		it('runs nothing at import time', () => {
			const effects = model.flatMap((path) => parse(path).effects).filter((effect) => !MODEL_SIDE_EFFECTS.has(effect));
			expect(effects).toEqual([]);
		});
	});
});
