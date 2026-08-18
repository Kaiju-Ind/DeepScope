import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const ROUTER = fileURLToPath(new URL('../../app/router.tsx', import.meta.url));
const SIDE_PANEL_MAIN = fileURLToPath(new URL('../../entrypoints/sidepanel/main.tsx', import.meta.url));
const SIDE_PANEL_APP = fileURLToPath(new URL('../../app/app.tsx', import.meta.url));
const OPTIONS_ENTRYPOINT = fileURLToPath(new URL('../../entrypoints/options/index.html', import.meta.url));
const OBSOLETE_POPUP = fileURLToPath(new URL('../../entrypoints/popup/main.tsx', import.meta.url));

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
		expect(summary).toContain('Current inspection');
		expect(history).toContain('getCachedReplayTraceHistory');
		expect(history).toContain('Comparison covers emitted technologies only');
		expect(technologies).toContain('<AnalysisProgress activity=');
		expect(technologies).toContain('TechnologyListSkeleton');
	});

	it('keeps diagnostics reachable from both the panel and an independent options page', () => {
		const panelDiagnostics = read('../../app/pages/diagnostics.tsx');
		const options = read('../../entrypoints/options/main.tsx');
		const optionsHtml = readFileSync(OPTIONS_ENTRYPOINT, 'utf8');

		expect(panelDiagnostics).toContain('<DiagnosticsView showOpenFullPage />');
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
