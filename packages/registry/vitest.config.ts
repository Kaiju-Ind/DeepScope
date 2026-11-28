import { defineConfig } from 'vitest/config';

/** Authoring contracts run without extension or UI transforms. */
export default defineConfig({ test: { name: 'registry', environment: 'node', globals: true, include: ['**/*.test.ts'], testTimeout: 30_000 } });
