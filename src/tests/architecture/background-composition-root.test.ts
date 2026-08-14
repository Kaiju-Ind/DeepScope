import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const BACKGROUND_ENTRYPOINT = fileURLToPath(new URL('../../entrypoints/background.ts', import.meta.url));
const BACKGROUND_RUNTIME = fileURLToPath(new URL('../../lib/background/runtime.ts', import.meta.url));

describe('background composition-root boundary', () => {
	it('keeps orchestration state and workflows out of the browser entrypoint', () => {
		const source = readFileSync(BACKGROUND_ENTRYPOINT, 'utf8');

		expect(source).toContain('createBackgroundRuntime({');
		expect(source).not.toMatch(/new\s+(?:Map|Set)</);
		expect(source).not.toContain('function analyzeFreshVisibleTab');
		expect(source).not.toContain('function analyzeAndPersistObservationBatch');
		expect(source).not.toContain('scheduleObservationRefreshFromContent');
		expect(source).not.toContain('createMatcherPipelineResult(');
	});

	it('keeps the application runtime independent from concrete browser/RPC implementations', () => {
		const source = readFileSync(BACKGROUND_RUNTIME, 'utf8');

		expect(source).not.toMatch(/from\s+['"]wxt\/browser['"]/);
		expect(source).not.toMatch(/from\s+['"]comctx['"]/);
		expect(source).not.toMatch(/from\s+['"]@\/lib\/persistence\/browser['"]/);
		expect(source).not.toMatch(/from\s+['"]@\/lib\/storage['"]/);
	});
});
