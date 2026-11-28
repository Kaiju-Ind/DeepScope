import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';

/**
 * Workspace test entry: `vitest run` here runs every project.
 *
 * `apps/extension` declares its own `runtime` and `ui` projects in its
 * vitest.config.ts, so it is listed by directory and Vitest flattens them in.
 */
export default defineConfig({
	test: {
		globals: true,
		projects: [
			'apps/extension',
			'packages/*',
			{
				// Vendored Kaiju Utils (`utils/`). Upstream tests register through
				// `node:test`, which the shim maps onto Vitest. Type tests (`types.test.ts`,
				// `*.types.test.ts`) hold only compile-time assertions, so `pnpm compile`
				// checks them and Vitest skips them. See utils/README.md.
				resolve: { alias: { 'node:test': fileURLToPath(new URL('./utils/vitest.node-test.ts', import.meta.url)) } },
				test: {
					name: 'utils',
					environment: 'node',
					globals: true,
					include: ['utils/**/*.test.ts'],
					exclude: ['**/node_modules/**', 'utils/**/types.test.ts', 'utils/**/*.types.test.ts'],
				},
			},
			'tools/*/vitest.config.ts',
		],
	},
});
