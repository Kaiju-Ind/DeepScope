import { defineConfig } from 'vitest/config';

/** Portable detection algorithms run without extension or UI transforms. */
export default defineConfig({ test: { name: 'detection', environment: 'node', globals: true, include: ['**/*.test.ts'], testTimeout: 30_000 } });
