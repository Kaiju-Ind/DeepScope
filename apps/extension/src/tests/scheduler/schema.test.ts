import { describe, expect, it } from 'vitest';

import { AnalysisWorkSchema, EXECUTION_SCHEMA_VERSION, MatcherWorkSchema } from '@/lib/scheduler/schema';

const common = {
	schemaVersion: EXECUTION_SCHEMA_VERSION,
	browserSessionId: 'browser-session',
	windowId: 3,
	tabId: 7,
	priority: 'foreground',
	priorityRank: 1,
	state: 'queued',
	createdAt: 1,
	updatedAt: 1,
	attempt: 0,
} as const;

describe('scheduler durable record schema', () => {
	it('accepts small analysis intent without page evidence', () => {
		const parsed = AnalysisWorkSchema.parse({
			...common,
			id: 'analysis:1',
			kind: 'analysis',
			frameId: 0,
			originHash: 'origin',
			urlHash: 'url',
			mode: 'refresh',
			observe: 'none',
			source: 'automatic',
		});

		expect(parsed.kind).toBe('analysis');
	});

	it.each(['expectedUrl', 'batch', 'html', 'text', 'scriptContent', 'cookies'])('rejects raw page evidence field %s', (field) => {
		const result = MatcherWorkSchema.safeParse({
			...common,
			id: 'matcher:1',
			kind: 'matcher',
			documentKey: 'url-hash',
			mode: 'complete',
			estimatedBytes: 128,
			[field]: 'sensitive-value',
		});

		expect(result.success).toBe(false);
	});
});
