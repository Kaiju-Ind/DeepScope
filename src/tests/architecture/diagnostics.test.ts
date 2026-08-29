import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import {
	callName,
	callNames,
	importSources,
	isNode,
	jsxAttributeNames,
	parseSource,
	stringLiterals,
	walk,
} from '@/tests/support/oxc';

function source(relative: string) {
	return parseSource(fileURLToPath(new URL(relative, import.meta.url)));
}

describe('crash-durable diagnostics architecture', () => {
	it('routes diagnostics to console and durable journal without a failure throttle', () => {
		const logging = source('../../lib/diagnostics/logging.ts');
		const literals = stringLiterals(logging);

		expect(literals).toEqual(expect.arrayContaining(['console', 'journal', 'warning', 'error', 'fatal']));
		expect(literals).not.toContain('kaijuDeepScopeBurstThrottle');
	});

	it('installs crash hooks on every long-lived extension execution surface', () => {
		for (const file of [
			'../../entrypoints/background.ts',
			'../../entrypoints/content.ts',
			'../../entrypoints/sidepanel/main.tsx',
			'../../entrypoints/offscreen/main.ts',
			'../../entrypoints/offscreen/matcher.worker.ts',
			'../../entrypoints/options/main.tsx',
		]) {
			expect(callNames(source(file))).toContain('installDiagnosticCrashHooks');
		}
	});

	it('does not persist host-page global errors as content-script crashes', () => {
		const content = source('../../entrypoints/content.ts');
		const crash = source('../../lib/diagnostics/crash.ts');
		let contentDisablesGlobalErrors = false;
		let crashHonorsOption = false;

		walk(content.program, (node) => {
			if (node.type !== 'CallExpression' || callName(node) !== 'installDiagnosticCrashHooks') return;
			const args = Array.isArray(node.arguments) ? node.arguments : [];
			const options = args[1];
			if (!isNode(options) || options.type !== 'ObjectExpression') return;
			for (const property of Array.isArray(options.properties) ? options.properties : []) {
				if (!isNode(property) || property.type !== 'Property') continue;
				if (!isNode(property.key) || property.key.type !== 'Identifier' || property.key.name !== 'captureGlobalError') continue;
				if (isNode(property.value) && property.value.type === 'Literal' && property.value.value === false) contentDisablesGlobalErrors = true;
			}
		});
		walk(crash.program, (node) => {
			if (node.type !== 'BinaryExpression' || node.operator !== '!==') return;
			const left = node.left;
			const right = node.right;
			if (!isNode(left) || left.type !== 'MemberExpression' || !isNode(left.property) || left.property.type !== 'Identifier') return;
			if (left.property.name === 'captureGlobalError' && isNode(right) && right.type === 'Literal' && right.value === false) crashHonorsOption = true;
		});

		expect(contentDisablesGlobalErrors).toBe(true);
		expect(crashHonorsOption).toBe(true);
	});

	it('preserves worker errors and structured-clone failures at the matcher pool', () => {
		const pool = source('../../lib/matcher/offscreen/pool.ts');
		const literals = stringLiterals(pool);

		expect(literals).toEqual(expect.arrayContaining(['error', 'messageerror']));
		expect(pool.text).toMatch(/event\.filename/u);
		expect(pool.text).toMatch(/event\.lineno/u);
		expect(pool.text).toMatch(/event\.colno/u);
	});

	it('forwards storage-less offscreen diagnostics to the background storage owner', () => {
		const journal = source('../../lib/diagnostics/journal.ts');
		const background = source('../../entrypoints/background.ts');

		expect(stringLiterals(journal)).toEqual(expect.arrayContaining(['diagnostics.context', 'diagnostics.record']));
		expect(callNames(journal)).toEqual(expect.arrayContaining(['extensionRuntime.sendMessage', 'runtime.postMessage']));
		expect(callNames(background)).toEqual(expect.arrayContaining([
			'isDiagnosticTransportMessage',
			'persistTransportedDiagnosticMessage',
		]));
	});

	it('keeps the diagnostic composition root small and virtualizes the filtered timeline', () => {
		const view = source('../../app/components/diagnostics-view.tsx');
		const timeline = source('../../app/diagnostics/timeline.tsx');
		const timelineCalls = callNames(timeline);

		expect(importSources(view)).toContain('@/app/diagnostics/timeline');
		expect(importSources(timeline)).toContain('@tanstack/solid-virtual');
		expect(timelineCalls).toEqual(expect.arrayContaining(['query.find', 'virtualizer.getVirtualItems', 'createMemo']));
		expect(timelineCalls).not.toContain('virtualizer.measureElement');
		expect(jsxAttributeNames(timeline)).not.toContain('data-index');
		expect(timeline.text).not.toContain('records.slice(0, 80)');
	});
});
