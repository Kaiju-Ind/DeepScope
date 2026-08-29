import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { callName, callNames, callStringArguments, importSources, importedNames, isNode, parseSource, walk } from '@/tests/support/oxc';

const BACKGROUND_ENTRYPOINT = fileURLToPath(new URL('../../entrypoints/background.ts', import.meta.url));
const BACKGROUND_RUNTIME = fileURLToPath(new URL('../../lib/background/runtime.ts', import.meta.url));
const SIDE_PANEL_PROVIDER = fileURLToPath(new URL('../../app/provider.tsx', import.meta.url));
const SIDE_PANEL_TAB = fileURLToPath(new URL('../../app/tab.ts', import.meta.url));
const SIDE_PANEL_SETTINGS = fileURLToPath(new URL('../../app/pages/settings.tsx', import.meta.url));

describe('background composition-root ownership', () => {
	it('keeps browser-owned startup effects inside the WXT background callback', () => {
		const source = parseSource(BACKGROUND_ENTRYPOINT);
		const forbiddenModuleCalls = new Set([
			'logging.configure',
			'installDiagnosticCrashHooks',
			'createBackgroundRuntime',
			'createAutoScanController',
			'analysisScheduler.create',
			'matcherScheduler.create',
			'offscreen.start',
		]);
		const violations: string[] = [];
		let hasDefineBackground = false;

		walk(source.program, (node, ancestors) => {
			if (!isNode(node) || node.type !== 'CallExpression') return;
			const name = callName(node);
			if (name === 'defineBackground') hasDefineBackground = true;
			if (!name || !forbiddenModuleCalls.has(name)) return;
			const insideFunction = ancestors.some((ancestor) =>
				ancestor.type === 'FunctionDeclaration' ||
				ancestor.type === 'FunctionExpression' ||
				ancestor.type === 'ArrowFunctionExpression'
			);
			if (!insideFunction) violations.push(name);
		});

		expect(hasDefineBackground).toBe(true);
		expect(violations).toEqual([]);
	});

	it('keeps analysis and matcher scheduling at the executable composition root', () => {
		const source = parseSource(BACKGROUND_ENTRYPOINT);

		expect(importSources(source)).toContain('@/lib/scheduler/analysis');
		expect(importSources(source)).toContain('@/lib/scheduler/matcher');
		expect(importedNames(source, '@/lib/scheduler/analysis')).toContain('*');
		expect(importedNames(source, '@/lib/scheduler/matcher')).toContain('*');
		expect(importSources(source)).not.toContain('@/lib/background/reconcile-matcher-jobs');
		expect(callNames(source)).not.toContain('createMatcherPipelineResult');
	});

	it('starts toggleable automatic analysis from page load and activation events', () => {
		const source = parseSource(BACKGROUND_ENTRYPOINT);
		const settings = parseSource(SIDE_PANEL_SETTINGS);
		const calls = callNames(source);
		const scanArguments = callStringArguments(source, 'scanVisibleTab');

		expect(calls).toContain('browser.tabs.onUpdated.addListener');
		expect(calls).toContain('browser.tabs.onActivated.addListener');
		expect(scanArguments).toEqual(expect.arrayContaining(['refresh', 'page-load', 'snapshot-first', 'tab-activated']));
		expect(callNames(settings)).toContain('panel.setAutoScanEnabled');
	});

	it('opens one window-scoped side panel and lets it follow active-tab changes', () => {
		const source = parseSource(BACKGROUND_ENTRYPOINT);
		const provider = parseSource(SIDE_PANEL_PROVIDER);
		const tab = parseSource(SIDE_PANEL_TAB);
		const backgroundCalls = callNames(source);
		const tabCalls = callNames(tab);

		expect(backgroundCalls).toContain('browser.action.onClicked.addListener');
		expect(backgroundCalls).toContain('browser.sidePanel.open');
		expect(backgroundCalls).not.toContain('browser.sidePanel.setOptions');
		expect(callNames(provider)).toContain('subscribeTabTargetChanges');
		expect(tabCalls).toContain('browser.tabs.onActivated.addListener');
		expect(tabCalls).toContain('browser.tabs.onUpdated.addListener');
		expect(callStringArguments(source, 'notifySidePanelTab')).toEqual(expect.arrayContaining(['activated', 'updated']));
		expect(callNames(tab)).toContain('isSidePanelTabNotification');
		expect(callNames(provider)).toEqual(expect.arrayContaining(['getWindowId', 'getTabTarget']));
	});

	it('keeps live side-panel revisions on the session-aware snapshot source', () => {
		const source = parseSource(SIDE_PANEL_PROVIDER);
		const calls = callNames(source);

		expect(calls).toContain('subscribeToSnapshotRevisions');
		expect(importSources(source)).not.toContain('@/lib/storage/browser-detection-snapshot-revision-source');
	});

	it('keeps the application runtime independent from concrete browser/RPC implementations', () => {
		const imports = importSources(parseSource(BACKGROUND_RUNTIME));

		expect(imports).not.toContain('wxt/browser');
		expect(imports).not.toContain('comctx');
		expect(imports).not.toContain('@/lib/persistence/browser');
		expect(imports).not.toContain('@/lib/storage');
	});
});
