import { existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import {
	callName,
	callNames,
	callNumberArguments,
	expressionNames,
	importSources,
	objectPropertyCallNames,
	objectPropertyNames,
	parseSource,
	stringLiterals,
	walk,
} from '@/tests/support/oxc';

const SRC_ROOT = fileURLToPath(new URL('../../', import.meta.url));
const MATCHER_WORKER = fileURLToPath(new URL('../../entrypoints/offscreen/matcher.worker.ts', import.meta.url));
const OFFSCREEN_ENTRY = fileURLToPath(new URL('../../entrypoints/offscreen/main.ts', import.meta.url));
const OFFSCREEN_CLIENT = fileURLToPath(new URL('../../lib/matcher/offscreen/client.ts', import.meta.url));
const OFFSCREEN_HOST = fileURLToPath(new URL('../../lib/matcher/offscreen/host.ts', import.meta.url));
const BACKGROUND_RUNTIME = fileURLToPath(new URL('../../lib/background/runtime.ts', import.meta.url));
const BACKGROUND_ENTRYPOINT = fileURLToPath(new URL('../../entrypoints/background.ts', import.meta.url));
const MATCHER_SCHEDULER = fileURLToPath(new URL('../../lib/scheduler/matcher.ts', import.meta.url));

const OBSOLETE_MATCHER_MODULES = [
	fileURLToPath(new URL('../../lib/matcher/offscreen/queue.ts', import.meta.url)),
	fileURLToPath(new URL('../../lib/matcher/offscreen/development.ts', import.meta.url)),
	fileURLToPath(new URL('../../lib/lifecycle/offscreen-matcher.ts', import.meta.url)),
	fileURLToPath(new URL('../../lib/content/dom-selectors.ts', import.meta.url)),
	fileURLToPath(new URL('../../lib/registry/packaged-provider.ts', import.meta.url)),
] as const;

/** Resolve a project-owned static import to its authored TypeScript module. */
function resolveProjectImport(importer: string, specifier: string): string | undefined {
	let candidate: string;
	if (specifier.startsWith('@/')) candidate = resolve(SRC_ROOT, specifier.slice(2));
	else if (specifier.startsWith('./') || specifier.startsWith('../')) candidate = resolve(dirname(importer), specifier);
	else return undefined;

	for (const path of [candidate, `${candidate}.ts`, `${candidate}.tsx`, resolve(candidate, 'index.ts'), resolve(candidate, 'index.tsx')]) {
		if (existsSync(path) && statSync(path).isFile()) return path;
	}
	return undefined;
}

/** Traverse static project imports from one executable root. */
function dependencyGraph(root: string): ReadonlySet<string> {
	const visited = new Set<string>();
	const visit = (path: string): void => {
		if (visited.has(path)) return;
		visited.add(path);
		for (const specifier of importSources(parseSource(path))) {
			const dependency = resolveProjectImport(path, specifier);
			if (dependency) visit(dependency);
		}
	};
	visit(root);
	return visited;
}

/** Return external static imports reached from a set of authored modules. */
function externalImports(paths: Iterable<string>): readonly string[] {
	const imports = new Set<string>();
	for (const path of paths) {
		for (const specifier of importSources(parseSource(path))) {
			if (!resolveProjectImport(path, specifier)) imports.add(specifier);
		}
	}
	return [...imports];
}

describe('matcher runtime architecture', () => {
	it('removes superseded matcher ownership modules instead of preserving compatibility paths', () => {
		for (const path of OBSOLETE_MATCHER_MODULES) expect(existsSync(path)).toBe(false);
	});

	it('keeps waiting and partition-selection policy in the background scheduler', () => {
		const hostImports = importSources(parseSource(OFFSCREEN_HOST));
		const schedulerImports = importSources(parseSource(MATCHER_SCHEDULER));

		expect(hostImports).not.toContain('./queue');
		expect(hostImports).not.toContain('../partition');
		expect(schedulerImports).toContain('./database');
		expect(schedulerImports).toContain('./budget');
		expect(schedulerImports).toContain('./fairness');
		expect(schedulerImports).toContain('@/lib/matcher/partition');
	});

	it('keeps the background runtime on the rule-free Registry provider contract', () => {
		const imports = importSources(parseSource(BACKGROUND_RUNTIME));

		expect(imports).toContain('@/lib/detection/registry-provider');
		expect(imports).not.toContain('@/lib/registry/build-provider');
		expect(imports).not.toContain('@/lib/registry/matcher-artifact');
		expect(imports).not.toContain('@/lib/registry/packaged-matcher');
	});

	it('loads matcher shards only inside the dedicated matcher worker', () => {
		const workerImports = importSources(parseSource(MATCHER_WORKER));
		const backgroundGraph = dependencyGraph(BACKGROUND_ENTRYPOINT);

		expect(workerImports).toContain('@/lib/registry/packaged-matcher');
		expect([...backgroundGraph].some((path) => path.endsWith('/registry/build-provider.ts'))).toBe(false);
		expect([...backgroundGraph].some((path) => path.endsWith('/registry/matcher-artifact.ts'))).toBe(false);
	});

	it('keeps headless background, offscreen, and matcher-worker dependency graphs free of UI runtime modules', () => {
		for (const root of [BACKGROUND_ENTRYPOINT, OFFSCREEN_ENTRY, MATCHER_WORKER]) {
			const graph = dependencyGraph(root);
			const uiFiles = [...graph].filter((path) => path.includes('/src/app/'));
			const external = externalImports(graph);

			expect(uiFiles).toEqual([]);
			expect(external).not.toContain('solid-js');
			expect(external).not.toContain('@solidjs/router');
		}
	});

	it('uses the WORKERS offscreen reason without a DOM parser dependency', () => {
		const client = parseSource(OFFSCREEN_CLIENT);
		const graph = dependencyGraph(OFFSCREEN_ENTRY);
		const members = expressionNames(client);

		expect(members).toContain('offscreen.Reason.WORKERS');
		expect(members).not.toContain('offscreen.Reason.DOM_PARSER');
		expect([...graph].some((path) => path.endsWith('/content/dom-selectors.ts'))).toBe(false);
	});

	it('does not log raw observation values or full expected URLs from matcher performance diagnostics', () => {
		const worker = parseSource(MATCHER_WORKER);
		const calls = callNames(worker);
		const properties = objectPropertyNames(worker);

		expect(calls).toContain('redactEvidenceValue');
		expect(callNumberArguments(worker, 'redactEvidenceValue')).toContain(240);
		expect(objectPropertyCallNames(worker, 'expectedUrlPreview')).toContain('previewLogValue');
		expect(objectPropertyCallNames(worker, 'observationValuePreview')).toContain('previewObservationValue');
		expect(properties).not.toContain('expectedUrl');
		expect(properties).not.toContain('observationValue');
		expect(properties).not.toContain('observationAttributes');
	});

	it('routes tab activation into matcher reprioritization instead of cancellation', () => {
		const runtime = parseSource(BACKGROUND_RUNTIME);
		const background = parseSource(BACKGROUND_ENTRYPOINT);
		const calls: string[] = [];
		walk(background.program, (node) => {
			const name = callName(node);
			if (name) calls.push(name);
		});

		expect(stringLiterals(runtime)).not.toContain('tab-deactivated');
		expect(stringLiterals(background)).not.toContain('tab-deactivated');
		expect(calls).toContain('matcherQueue.activateTab');
	});
});
