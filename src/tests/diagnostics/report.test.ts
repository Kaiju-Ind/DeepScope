import { describe, expect, it } from 'vitest';

import type { DiagnosticSnapshot } from '@/lib/diagnostics/contracts';
import { formatDiagnosticReport } from '@/lib/diagnostics/report';

const snapshot: DiagnosticSnapshot = {
	createdAt: Date.UTC(2026, 7, 17, 1, 2, 3),
	extension: { name: 'Kaiju Site Scope', version: '0.1.0', buildId: 'test-build' },
	platform: { os: 'mac', arch: 'arm', naclArch: 'arm64' },
	storageBytes: 2048,
	contexts: [{ contextId: 'ctx-live', contextType: 'SIDE_PANEL', windowId: 4, tabId: 8 }],
	runs: [{ schemaVersion: 1, id: 'run-old', surface: 'background', startedAt: Date.UTC(2026, 7, 17, 1), buildId: 'test-build' }],
	jobs: [{
		jobId: 'matcher:8:test',
		tabId: 8,
		status: 'failed',
		mode: 'complete',
		createdAt: Date.UTC(2026, 7, 17, 1, 0, 1),
		updatedAt: Date.UTC(2026, 7, 17, 1, 0, 4),
		completedPartitionCount: 2,
		partitionCount: 5,
		reason: 'context-interrupted',
		interruptedStatus: 'streaming',
		interruptedAt: Date.UTC(2026, 7, 17, 1, 0, 4),
		errorMessage: 'Matcher work was interrupted.',
	}],
	records: [{
		schemaVersion: 1,
		id: 'record-1',
		contextId: 'run-old',
		surface: 'background',
		sequence: 1,
		timestamp: Date.UTC(2026, 7, 17, 1, 0, 3),
		level: 'error',
		category: ['kaiju-site-scope', 'background', 'matcher'],
		message: 'Matcher interrupted.',
		properties: { jobId: 'matcher:8:test' },
	}],
};

describe('diagnostic support report', () => {
	it('preserves build, topology, prior matcher state, and the recent failure', () => {
		const report = formatDiagnosticReport(snapshot);

		expect(report).toContain('Build: test-build');
		expect(report).toContain('SIDE_PANEL ctx-live window=4 tab=8');
		expect(report).toContain('reason=context-interrupted');
		expect(report).toContain('previous=streaming');
		expect(report).toContain('partitions=2/5');
		expect(report).toContain('Matcher interrupted.');
	});
});
