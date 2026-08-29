import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import {
	callNames,
	callObjectStringValues,
	callStringArguments,
	dynamicImportSources,
	expressionNames,
	importedNames,
	importSources,
	jsxElementNames,
	parseSource,
	stringLiterals,
} from '@/tests/support/oxc';

const ROUTER = fileURLToPath(new URL('../../app/router.tsx', import.meta.url));
const SIDE_PANEL_MAIN = fileURLToPath(new URL('../../entrypoints/sidepanel/main.tsx', import.meta.url));
const SIDE_PANEL_APP = fileURLToPath(new URL('../../app/app.tsx', import.meta.url));
const OPTIONS_ENTRYPOINT = fileURLToPath(new URL('../../entrypoints/options/index.html', import.meta.url));
const OBSOLETE_POPUP = fileURLToPath(new URL('../../entrypoints/popup/main.tsx', import.meta.url));
const TAB_RUNTIME = fileURLToPath(new URL('../../app/tab.ts', import.meta.url));
const PANEL_SESSION = fileURLToPath(new URL('../../app/session.ts', import.meta.url));

function read(relative: string): string {
	return readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8');
}

describe('side-panel page composition', () => {
	it('uses hash routing for the extension user flows', () => {
		const router = parseSource(ROUTER);
		const paths = callObjectStringValues(router, 'createRoute', 'path');

		expect(importedNames(router, '@tanstack/solid-router')).toContain('createHashHistory');
		expect(paths).toEqual([
			'/',
			'/technologies',
			'/technology/$technologyId',
			'/history',
			'/diagnostics',
			'/settings',
		]);
	});

	it('mounts the router inside one side-panel state owner and the Kaiju UI styles', () => {
		const main = parseSource(SIDE_PANEL_MAIN);
		const app = parseSource(SIDE_PANEL_APP);

		expect(dynamicImportSources(main)).toContain('@/app/app');
		expect(jsxElementNames(main)).toContain('SupportFallback');
		expect(jsxElementNames(app)).toEqual(expect.arrayContaining(['PanelProvider', 'RouterProvider']));
		expect(importSources(main)).toEqual(expect.arrayContaining(['@/styles/app.css', '@/styles/panel.css']));
		expect(importSources(main)).not.toEqual(expect.arrayContaining(['./style.css', './App.css']));
	});

	it('gives each routed product page a narrow state projection', () => {
		const projections = [
			['../../app/pages/summary.tsx', 'useSummary'],
			['../../app/pages/history.tsx', 'useHistory'],
			['../../app/pages/settings.tsx', 'useSettings'],
			['../../app/pages/technologies.tsx', 'useTechnologies'],
			['../../app/pages/technology.tsx', 'useTechnology'],
		] as const;

		for (const [relative, projection] of projections) {
			const source = parseSource(fileURLToPath(new URL(relative, import.meta.url)));
			const imports = importedNames(source, '@/app/context');
			expect(imports).toContain(projection);
			expect(imports).not.toContain('usePanel');
		}
	});

	it('keeps live inspection in Summary and completed replay in History', () => {
		const summary = parseSource(fileURLToPath(new URL('../../app/pages/summary.tsx', import.meta.url)));
		const history = parseSource(fileURLToPath(new URL('../../app/pages/history.tsx', import.meta.url)));
		const technologies = parseSource(fileURLToPath(new URL('../../app/pages/technologies.tsx', import.meta.url)));

		expect(jsxElementNames(summary)).toContain('AnalysisProgress');
		expect(stringLiterals(summary)).toEqual(expect.arrayContaining(['Detected on this page', 'Key findings']));
		expect(stringLiterals(summary)).not.toContain('Current inspection');
		expect(callNames(history)).toContain('panel.getReplayHistory');
		expect(stringLiterals(history)).toEqual(expect.arrayContaining(['Changes from previous run', 'page', 'origin', 'Emitted technologies only.']));
		expect(jsxElementNames(technologies)).toEqual(expect.arrayContaining(['AnalysisProgress', 'TechnologyListSkeleton']));
	});

	it('retargets the mounted panel by exact tab identity and rejects stale async state', () => {
		const provider = parseSource(fileURLToPath(new URL('../../app/provider.tsx', import.meta.url)));
		const background = parseSource(fileURLToPath(new URL('../../entrypoints/background.ts', import.meta.url)));

		expect(callNames(provider)).toEqual(expect.arrayContaining(['subscribeTabTargetChanges', 'resetTab', 'sameTab', 'hydrateReplay', 'queueTabSync']));
		expect(stringLiterals(provider)).toEqual(expect.arrayContaining([
			'snapshot-revision-ignored-for-stale-tab',
			'analysis-revision-ignored-for-stale-tab',
			'visible-tab-identity-retry-after-stale-target',
			'tab-change',
		]));
		expect(callNames(background)).toContain('autoScanController.scanVisibleTab');
		expect(callStringArguments(background, 'autoScanController.scanVisibleTab')).toEqual(expect.arrayContaining(['snapshot-first', 'tab-activated']));
	});

	it('owns at most one panel observation and does not start a scan just because the user switched tabs', () => {
		const provider = parseSource(fileURLToPath(new URL('../../app/provider.tsx', import.meta.url)));
		const reasons = callStringArguments(provider, 'releaseObservationTarget');

		expect(reasons).toEqual(expect.arrayContaining(['tab-change', 'stale-response', 'panel-close']));
		expect(callNames(provider)).toContain('setWorkflow');
		expect(stringLiterals(provider)).toEqual(expect.arrayContaining(['tab-change', 'idle']));
		expect(stringLiterals(provider)).not.toContain('cleanup-retain-observation');
	});

	it('releases panel-local state when browser tabs close', () => {
		const provider = parseSource(fileURLToPath(new URL('../../app/provider.tsx', import.meta.url)));
		const tab = parseSource(TAB_RUNTIME);
		const session = parseSource(PANEL_SESSION);

		expect(expressionNames(provider)).toContain('session.remove');
		expect(callNames(tab)).toEqual(expect.arrayContaining([
			'browser.tabs.onRemoved.addListener',
			'browser.tabs.onRemoved.removeListener',
		]));
		expect(callNames(session)).toContain('tabs.delete');
	});

	it('telegraphs incremental technology discovery instead of silently inserting late results', () => {
		const summary = read('../../app/pages/summary.tsx');
		const technologies = read('../../app/pages/technologies.tsx');

		expect(summary).toContain('Watching for additional technologies');
		expect(summary).toContain('Additional technologies detected');
		expect(technologies).toContain('Watching for more technologies');
		expect(technologies).toContain('New technologies arrived');
	});

	it('keeps diagnostics reachable from both the panel and an independent options page', () => {
		const panelDiagnostics = parseSource(fileURLToPath(new URL('../../app/pages/diagnostics.tsx', import.meta.url)));
		const options = parseSource(fileURLToPath(new URL('../../entrypoints/options/main.tsx', import.meta.url)));
		const optionsHtml = readFileSync(OPTIONS_ENTRYPOINT, 'utf8');

		expect(jsxElementNames(panelDiagnostics)).toContain('DiagnosticsView');
		expect(dynamicImportSources(options)).toContain('@/app/components/diagnostics-view');
		expect(jsxElementNames(options)).toEqual(expect.arrayContaining(['DiagnosticsView', 'SupportFallback']));
		expect(jsxElementNames(options)).not.toEqual(expect.arrayContaining(['PanelProvider', 'RouterProvider']));
		expect(optionsHtml).toContain('<meta name="manifest.open_in_tab" content="true" />');
	});

	it('removes the obsolete popup entrypoint instead of maintaining two UI applications', () => {
		expect(existsSync(OBSOLETE_POPUP)).toBe(false);
	});
});
