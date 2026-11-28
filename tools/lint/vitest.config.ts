import { defineConfig } from 'vitest/config';

/** Discover repository guidance checks from their native package owner. */
export default defineConfig({
	test: { name: 'guidance', environment: 'node', globals: true, include: ['**/*.test.ts'] },
});
