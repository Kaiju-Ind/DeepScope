import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const ROUTER = fileURLToPath(new URL('../../panel/router.tsx', import.meta.url));
const SIDE_PANEL_MAIN = fileURLToPath(new URL('../../entrypoints/sidepanel/main.tsx', import.meta.url));
const SIDE_PANEL_APP = fileURLToPath(new URL('../../panel/app.tsx', import.meta.url));
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
		expect(router).toContain("path: '/technology/$technologyId'");
		expect(router).toContain("path: '/scans'");
		expect(router).toContain("path: '/diagnostics'");
		expect(router).toContain("path: '/settings'");
	});

	it('mounts the router inside one side-panel state owner and the Kaiju UI styles', () => {
		const main = readFileSync(SIDE_PANEL_MAIN, 'utf8');
		const app = readFileSync(SIDE_PANEL_APP, 'utf8');

		expect(main).toContain("import('@/panel/app')");
		expect(main).toContain('<SupportFallback surface="sidepanel"');
		expect(app).toContain('<PanelProvider>');
		expect(app).toContain('<RouterProvider router={panelRouter} />');
		expect(main).toContain("import '@/styles/app.css';");
		expect(main).toContain("import '@/styles/panel.css';");
		expect(main).not.toContain("import './style.css';");
		expect(main).not.toContain("import './App.css';");
	});

	it('gives each routed product page a narrow state projection', () => {
		const scans = read('../../panel/pages/scans.tsx');
		const settings = read('../../panel/pages/settings.tsx');
		const technologies = read('../../panel/pages/technologies.tsx');
		const technology = read('../../panel/pages/technology.tsx');

		expect(scans).toContain('useScans()');
		expect(settings).toContain('useSettings()');
		expect(technologies).toContain('useTechnologies()');
		expect(technology).toContain('useTechnology()');
		for (const source of [scans, settings, technologies, technology]) expect(source).not.toContain('usePanel()');
	});

	it('keeps diagnostics reachable from both the panel and an independent options page', () => {
		const panelDiagnostics = read('../../panel/pages/diagnostics.tsx');
		const options = read('../../entrypoints/options/main.tsx');
		const optionsHtml = readFileSync(OPTIONS_ENTRYPOINT, 'utf8');

		expect(panelDiagnostics).toContain('<DiagnosticsView showOpenFullPage />');
		expect(options).toContain("import('@/components/DiagnosticsView')");
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
