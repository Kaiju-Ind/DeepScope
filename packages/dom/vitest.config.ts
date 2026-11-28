import { defineConfig } from 'vitest/config';

/** Portable DOM algorithms run without WXT or the Solid compiler. */
export default defineConfig({ test: { name: 'dom', environment: 'node', include: ['**/*.test.ts'] } });
