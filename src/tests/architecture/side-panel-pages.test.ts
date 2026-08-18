import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

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
		const router = readFileSync(ROUTER, 'utf8');

		expect(router).toContain('createHashHistory()');
		expect(router).toContain("path: '/'");
		expect(router).toContain("path: '/technologies'");
		expect(router).toContain("path: '/technology/$technologyId'");
		expect(router).toContain("path: '/history'");
		expect(router).not.toContain("path: '/scans'");
		expect(router).toContain("path: '/diagnostics'");
		expect(router).toContain("path: '/settings'");
	});

	it('mounts the router inside one side-panel state owner and the Kaiju UI styles', () => {
		const main = readFileSync(SIDE_PANEL_MAIN, 'utf8');
		const app = readFileSync(SIDE_PANEL_APP, 'utf8');

		expect(main).toContain("import('@/app/app')");
		expect(main).toContain('<SupportFallback surface="sidepanel"');
		expect(app).toContain('<PanelProvider>');
		expect(app).toContain('<RouterProvider router={panelRouter} />');
		expect(main).toContain("import '@/styles/app.css';");
		expect(main).toContain("import '@/styles/panel.css';");
		expect(main).not.toContain("import './style.css';");
		expect(main).not.toContain("import './App.css';");
	});

	it('gives each routed product page a narrow state projection', () => {
		const summary = read('../../app/pages/summary.tsx');
		const history = read('../../app/pages/history.tsx');
		const settings = read('../../app/pages/settings.tsx');
		const technologies = read('../../app/pages/technologies.tsx');
		const technology = read('../../app/pages/technology.tsx');

		expect(summary).toContain('useSummary()');
		expect(history).toContain('useHistory()');
		expect(settings).toContain('useSettings()');
		expect(technologies).toContain('useTechnologies()');
		expect(technology).toContain('useTechnology()');
		for (const source of [summary, history, settings, technologies, technology]) expect(source).not.toContain('usePanel()');
	});

	it('keeps live inspection in Summary and completed replay in History', () => {
		const summary = read('../../app/pages/summary.tsx');
		const history = read('../../app/pages/history.tsx');
		const technologies = read('../../app/pages/technologies.tsx');

		expect(summary).toContain('<AnalysisProgress activity=');
		expect(summary).toContain('Detected on this page');
		expect(summary).toContain('Key findings');
		expect(summary).not.toContain('Current inspection');
		expect(history).toContain('panel.getReplayHistory');
		expect(history).toContain('Changes from previous run');
		expect(history).toContain("scope: 'page'");
		expect(history).toContain("showUrl={scope() === 'origin'}");
		expect(history).toContain('Emitted technologies only.');
		expect(technologies).toContain('<AnalysisProgress activity=');
		expect(technologies).toContain('TechnologyListSkeleton');
	});

	it('retargets the mounted panel by exact tab identity and rejects stale async state', () => {
		const provider = read('../../app/provider.tsx');
		const background = read('../../entrypoints/background.ts');

		expect(provider).toContain('subscribeTabTargetChanges');
		expect(provider).toContain('resetTab(identity)');
		expect(provider).toContain('!sameTab(visibleTabIdentity(), identity)');
		expect(provider).toContain('snapshot-revision-ignored-for-stale-tab');
		expect(provider).toContain('analysis-revision-ignored-for-stale-tab');
		expect(provider).toContain('void hydrateReplay(revision, options.identity)');
		expect(provider).toContain('visible-tab-identity-retry-after-stale-target');
		expect(provider).toContain('queueTabSync("tab-change")');
		expect(background).toContain("scanVisibleTab(tabId, windowId, 'snapshot-first', 'tab-activated')");
	});

	it('owns at most one panel observation and does not start a scan just because the user switched tabs', () => {
		const provider = read('../../app/provider.tsx');

		expect(provider).toContain('releaseObservationTarget(previousSessionTarget, "tab-change")');
		expect(provider).toContain('releaseObservationTarget(response.value.sessionTarget, "stale-response")');
		expect(provider).toContain('releaseObservationTarget(target, "panel-close")');
		expect(provider).toContain('if (reason === "tab-change") {');
		expect(provider).toContain('setWorkflow({ kind: "idle" });');
		expect(provider).not.toContain('cleanup-retain-observation');
	});

	it('releases panel-local state when browser tabs close', () => {
		const provider = read('../../app/provider.tsx');
		const tab = readFileSync(TAB_RUNTIME, 'utf8');
		const session = readFileSync(PANEL_SESSION, 'utf8');

		expect(provider).toContain('closed: session.remove');
		expect(tab).toContain('browser.tabs.onRemoved.addListener(onRemoved)');
		expect(tab).toContain('browser.tabs.onRemoved.removeListener(onRemoved)');
		expect(session).toContain('export function remove(tabId: number): void');
		expect(session).toContain('tabs.delete(tabId)');
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
		const panelDiagnostics = read('../../app/pages/diagnostics.tsx');
		const options = read('../../entrypoints/options/main.tsx');
		const optionsHtml = readFileSync(OPTIONS_ENTRYPOINT, 'utf8');

		expect(panelDiagnostics).toContain('<DiagnosticsView showOpenFullPage');
		expect(options).toContain("import('@/app/components/diagnostics-view')");
		expect(options).toContain('<DiagnosticsView standalone />');
		expect(options).toContain('<SupportFallback surface="options"');
		expect(options).not.toContain('PanelProvider');
		expect(options).not.toContain('panelRouter');
		expect(optionsHtml).toContain('<meta name="manifest.open_in_tab" content="true" />');
	});

	it('removes the obsolete popup entrypoint instead of maintaining two UI applications', () => {
		expect(existsSync(OBSOLETE_POPUP)).toBe(false);
	});
});
