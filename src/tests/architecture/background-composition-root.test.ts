import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const BACKGROUND_ENTRYPOINT = fileURLToPath(new URL('../../entrypoints/background.ts', import.meta.url));
const BACKGROUND_RUNTIME = fileURLToPath(new URL('../../lib/background/runtime.ts', import.meta.url));
const SIDE_PANEL_PROVIDER = fileURLToPath(new URL('../../panel/provider.tsx', import.meta.url));
const SIDE_PANEL_SETTINGS = fileURLToPath(new URL('../../panel/pages/settings.tsx', import.meta.url));
const SIDE_PANEL_ENTRYPOINT = fileURLToPath(new URL('../../entrypoints/sidepanel/index.html', import.meta.url));
const WXT_CONFIG = fileURLToPath(new URL('../../../wxt.config.ts', import.meta.url));

describe('background composition-root ownership', () => {
	it('keeps orchestration state and workflows out of the browser entrypoint', () => {
		const source = readFileSync(BACKGROUND_ENTRYPOINT, 'utf8');

		expect(source).toContain('createBackgroundRuntime({');
		expect(source).not.toMatch(/new\s+(?:Map|Set)</);
		expect(source).not.toContain('function analyzeFreshVisibleTab');
		expect(source).not.toContain('function analyzeAndPersistObservationBatch');
		expect(source).not.toContain('scheduleObservationRefreshFromContent');
		expect(source).not.toContain('createMatcherPipelineResult(');
	});

	it('starts toggleable automatic analysis from active page load and activation events', () => {
		const source = readFileSync(BACKGROUND_ENTRYPOINT, 'utf8');
		const config = readFileSync(WXT_CONFIG, 'utf8');
		const sidePanel = readFileSync(SIDE_PANEL_SETTINGS, 'utf8');

		expect(source).toContain('browser.tabs.onUpdated.addListener');
		expect(source).toContain("scanVisibleTab(tabId, tab.windowId, 'refresh', 'page-load')");
		expect(source).toContain('browser.tabs.onActivated.addListener');
		expect(source).toContain("scanVisibleTab(tabId, windowId, 'snapshot-first', 'tab-activated')");
		expect(config).toContain("host_permissions: ['http://*/*', 'https://*/*']");
		expect(sidePanel).toContain('Scan pages automatically');
		expect(sidePanel).toContain('panel.setAutoScanEnabled');
	});

	it('opens one window-scoped side panel and lets it follow active-tab changes', () => {
		const source = readFileSync(BACKGROUND_ENTRYPOINT, 'utf8');
		const config = readFileSync(WXT_CONFIG, 'utf8');
		const provider = readFileSync(SIDE_PANEL_PROVIDER, 'utf8');
		const sidePanel = readFileSync(SIDE_PANEL_ENTRYPOINT, 'utf8');

		expect(source).toContain('browser.action.onClicked.addListener');
		expect(source).toContain('browser.sidePanel.open({ windowId })');
		expect(source).not.toContain('browser.sidePanel.setOptions({');
		expect(provider).toContain('browser.tabs.onActivated.addListener');
		expect(source).toContain("notifySidePanelTab(tabId, windowId, 'activated')");
		expect(source).toContain("notifySidePanelTab(tabId, tab.windowId, 'updated')");
		expect(provider).toContain('isSidePanelTabNotification(message)');
		expect(provider).toContain('getPanelWindowId()');
		expect(provider).toContain('getPanelTabTarget(panelWindowId)');
		expect(config).not.toContain('default_popup');
		expect(config).toContain("minimum_chrome_version: '116'");
		expect(sidePanel).not.toContain('manifest.type');
	});

	it('keeps live side-panel revisions on origin storage until the exact page session is known', () => {
		const source = readFileSync(SIDE_PANEL_PROVIDER, 'utf8');

		expect(source).toContain('subscribeToVisibleSnapshotRevisions(identity, null)');
		expect(source).toContain('subscribeToVisibleSnapshotRevisions(identity, stored.snapshot.key)');
		expect(source).toContain('visibleDetectorSnapshotRevision');
		expect(source).toContain('visibleLifecycleSnapshotRevision');
		expect(source).not.toContain('browserDetectionSnapshotRevisionSource');
	});

	it('keeps the application runtime independent from concrete browser/RPC implementations', () => {
		const source = readFileSync(BACKGROUND_RUNTIME, 'utf8');

		expect(source).not.toMatch(/from\s+['"]wxt\/browser['"]/);
		expect(source).not.toMatch(/from\s+['"]comctx['"]/);
		expect(source).not.toMatch(/from\s+['"]@\/lib\/persistence\/browser['"]/);
		expect(source).not.toMatch(/from\s+['"]@\/lib\/storage['"]/);
	});
});
