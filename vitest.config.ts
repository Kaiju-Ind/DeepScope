import solid from 'vite-plugin-solid';
import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';

const resolve = {
	tsconfigPaths: true,
	alias: {
		'@': fileURLToPath(new URL('./src', import.meta.url)),
		'~': fileURLToPath(new URL('./src', import.meta.url)),
	},
};

/** Panel tests mount real Solid components, so only they receive the Solid transform. */
const UI_TESTS = 'src/tests/app/**/*.test.{ts,tsx}';

/**
 * Two projects keep module resolution honest for each runtime.
 *
 * `vite-plugin-solid` adds the `browser` resolve condition. Node-only test
 * dependencies such as `oxc-parser` then resolve to their WebAssembly builds,
 * which are not installed. Runtime and architecture tests therefore run with
 * plain Node resolution, and only panel tests opt into the Solid transform.
 */
export default defineConfig({
	test: {
		globals: true,
		projects: [
			{
				resolve,
				test: {
					name: 'runtime',
					environment: 'node',
					globals: true,
					include: ['src/tests/**/*.test.{ts,tsx}'],
					exclude: [UI_TESTS],
					// Several suites run the full registry or property tests. They take under a
					// second on an idle machine but exceed Vitest's 5 s default on a loaded one
					// or a shared CI runner, which would make failures depend on load.
					testTimeout: 30_000,
				},
			},
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
			{
				// Repository checks under `tools/`, such as the guidance consistency test.
				test: { name: 'guidance', environment: 'node', globals: true, include: ['tools/**/*.test.ts'] },
			},
			{
				plugins: [solid()],
				resolve,
				test: { name: 'ui', environment: 'node', globals: true, include: [UI_TESTS] },
			},
		],
	},
});
