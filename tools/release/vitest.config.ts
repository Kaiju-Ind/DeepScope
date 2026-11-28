import { defineConfig } from 'vitest/config';

/** Exercise release preparation through its actual CLI and native task owners. */
export default defineConfig({
	test: { name: 'release', environment: 'node', include: ['**/*.test.ts'] },
});
