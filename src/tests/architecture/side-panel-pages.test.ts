import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const ROUTER = fileURLToPath(new URL('../../panel/router.tsx', import.meta.url));
const CURRENT_PAGE = fileURLToPath(new URL('../../panel/pages/current.tsx', import.meta.url));
const SIDE_PANEL_MAIN = fileURLToPath(new URL('../../entrypoints/sidepanel/main.tsx', import.meta.url));
const OBSOLETE_POPUP = fileURLToPath(new URL('../../entrypoints/popup/main.tsx', import.meta.url));

describe('side-panel page composition', () => {
	it('uses hash routing without changing the default all-in-one page', () => {
		const router = readFileSync(ROUTER, 'utf8');
		const currentPage = readFileSync(CURRENT_PAGE, 'utf8');

		expect(router).toContain('createHashHistory()');
		expect(router).toContain("path: '/technologies'");
		expect(router).toContain("path: '/scans'");
		expect(router).toContain("path: '/settings'");
		expect(currentPage).toContain('<ScansPage />');
		expect(currentPage).toContain('<SettingsPage />');
		expect(currentPage).toContain('<TechnologiesPage />');
	});

	it('mounts the router inside one side-panel state owner', () => {
		const main = readFileSync(SIDE_PANEL_MAIN, 'utf8');

		expect(main).toContain('<PanelProvider>');
		expect(main).toContain('<RouterProvider router={panelRouter} />');
		expect(main).toContain("import './style.css';");
		expect(main).toContain("import './App.css';");
	});

	it('gives each routed page a narrow state projection instead of the whole panel context', () => {
		const scans = readFileSync(fileURLToPath(new URL('../../panel/pages/scans.tsx', import.meta.url)), 'utf8');
		const settings = readFileSync(fileURLToPath(new URL('../../panel/pages/settings.tsx', import.meta.url)), 'utf8');
		const technologies = readFileSync(fileURLToPath(new URL('../../panel/pages/technologies.tsx', import.meta.url)), 'utf8');

		expect(scans).toContain('useScans()');
		expect(settings).toContain('useSettings()');
		expect(technologies).toContain('useTechnologies()');
		expect(scans).not.toContain('usePanel()');
		expect(settings).not.toContain('usePanel()');
		expect(technologies).not.toContain('usePanel()');
	});

	it('removes the obsolete popup entrypoint instead of maintaining two UI applications', () => {
		expect(existsSync(OBSOLETE_POPUP)).toBe(false);
	});
});
