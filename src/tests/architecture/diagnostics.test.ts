import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

function read(relative: string): string {
	return readFileSync(fileURLToPath(new URL(relative, import.meta.url)), 'utf8');
}

describe('crash-durable diagnostics architecture', () => {
	it('routes LogTape records to console and the durable journal without throttling failures', () => {
		const logging = read('../../lib/diagnostics/logging.ts');

		expect(logging).toContain("sinks: { console: consoleSink, journal: journalSink }");
		expect(logging).toContain("sinks: ['console', 'journal']");
		expect(logging).toContain("level === 'warning' || level === 'error' || level === 'fatal'");
		expect(logging).not.toContain("filters: ['kaijuDeepScopeBurstThrottle']");
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
			expect(read(file)).toContain('installDiagnosticCrashHooks(');
		}
	});

	it('does not persist host-page global errors as content-script crashes', () => {
		const content = read('../../entrypoints/content.ts');
		const crash = read('../../lib/diagnostics/crash.ts');

		expect(content).toContain('installDiagnosticCrashHooks("content", { captureGlobalError: false });');
		expect(crash).toContain('options.captureGlobalError !== false');
	});

	it('preserves worker errors and structured-clone failures at the offscreen host', () => {
		const offscreen = read('../../entrypoints/offscreen/main.ts');

		expect(offscreen).toContain("addEventListener('error'");
		expect(offscreen).toContain("addEventListener('messageerror'");
		expect(offscreen).toContain('filename: event.filename');
		expect(offscreen).toContain('line: event.lineno');
		expect(offscreen).toContain('column: event.colno');
	});

	it('reconciles non-terminal matcher records when a new background context starts', () => {
		const reconcile = read('../../lib/background/reconcile-matcher-jobs.ts');
		const contracts = read('../../lib/matcher/contracts.ts');

		expect(reconcile).toContain("reason: 'context-interrupted'");
		expect(reconcile).toContain('interruptedStatus: record.status');
		expect(reconcile).toContain('cancelOffscreenMatcherJob(record.jobId)');
		expect(contracts).toContain("| 'context-interrupted';");
	});
	it('keeps the diagnostic composition root small and virtualizes the filtered timeline', () => {
		const view = read('../../app/components/diagnostics-view.tsx');
		const timeline = read('../../app/diagnostics/timeline.tsx');

		expect(view).toContain("import { Timeline } from '@/app/diagnostics/timeline';");
		expect(timeline).toContain("from '@tanstack/solid-virtual'");
		expect(timeline).toContain('query.find(props.records');
		expect(timeline).toContain('virtualizer.getVirtualItems()');
		expect(timeline).toContain('virtualizer.measureElement(element)');
		expect(timeline).not.toContain('records.slice(0, 80)');
	});

});
