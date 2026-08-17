import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const MATCHER_WORKER = fileURLToPath(new URL('../../entrypoints/offscreen/matcher.worker.ts', import.meta.url));

describe('matcher worker diagnostics', () => {
	it('keeps performance diagnostics out of Chrome extension warning records', () => {
		const source = readFileSync(MATCHER_WORKER, 'utf8');

		expect(source).toContain("matcherWorkerLogger.debug(");
		expect(source).toContain("matcherWorkerLogger.isEnabledFor('trace')");
		expect(source).toContain('matcherWorkerLogger.trace(formatSlowRuleEvaluationMessage(summary)');
		expect(source).not.toContain('matcherWorkerLogger.warn(');
		expect(source).not.toContain('Slow matcher partition in worker:');
	});

	it('separates shard hydration from semantic matcher duration', () => {
		const source = readFileSync(MATCHER_WORKER, 'utf8');

		expect(source).toContain('shardLoadDurationMs');
		expect(source).toContain('matchDurationMs');
		expect(source).toContain('totalDurationMs');
		expect(source).toContain('shardCacheHit');
	});

	it('redacts page-derived values before they enter performance logs', () => {
		const source = readFileSync(MATCHER_WORKER, 'utf8');

		expect(source).toContain('redactEvidenceValue(value, 240)');
		expect(source).toContain('expectedUrlPreview: previewLogValue(task.job.expectedUrl)');
		expect(source).not.toContain('expectedUrl: task.job.expectedUrl');
		expect(source).not.toContain('observationValue: observation.value');
		expect(source).not.toContain('observationAttributes: observation.attributes');
	});
});
