import { describe, expect, it } from 'vitest';

import type { AnalyzeVisibleTabInput, AnalyzeVisibleTabOutput } from '@/lib/contracts/analysis';
import {
	SNAPSHOT_REUSE_STATUSES,
	ANALYSIS_MODES,
	OBSERVATION_MODES,
} from '@/lib/contracts/analysis';

describe('visible-tab analysis contract', () => {
	it('keeps request modes and observation values stable', () => {
		expect(ANALYSIS_MODES).toEqual(['snapshot-first', 'refresh']);
		expect(OBSERVATION_MODES).toEqual(['none', 'while-popup-open', 'bounded']);
		expect(SNAPSHOT_REUSE_STATUSES).toEqual(['hit', 'miss', 'bypassed']);
	});

	it('keeps the popup analysis response JSON-safe', () => {
		const input: AnalyzeVisibleTabInput = {
			target: {
				tabId: 7,
				frameId: 0,
				url: 'https://example.com/products',
				hostname: 'example.com',
				originHash: 'origin-example',
				urlHash: 'url-example-products',
				incognito: false,
			},
			mode: 'snapshot-first',
			observe: 'while-popup-open',
		};
		const output: AnalyzeVisibleTabOutput = {
			analysis: {
				url: 'https://example.com/products',
				hostname: 'example.com',
				analyzedAt: 1_700_000_000_000,
				source: 'fresh',
				results: [],
				errors: [],
			},
			snapshot: {
				status: 'miss',
				key: 'analysis:https://example.com',
				expiresAt: 1_700_086_400_000,
			},
			session: {
				status: 'observing',
				throttleMs: 1_500,
				pendingMutationCount: 0,
				sessionId: 'session-1',
				expectedUrl: 'https://example.com/products',
			},
		};

		expect(input).toMatchObject({
			target: { tabId: 7, url: 'https://example.com/products' },
			mode: 'snapshot-first',
			observe: 'while-popup-open',
		});
		expect(JSON.parse(JSON.stringify(output))).toEqual(output);
	});
});
