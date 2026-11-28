import { defineConfig } from 'vitest/config';

/** Keep artifact tool lifetime checks in the tool's own workspace project. */
export default defineConfig({
	test: { name: 'verify', environment: 'node', include: ['**/*.test.ts'] },
});
