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
				test: { name: 'runtime', environment: 'node', globals: true, include: ['src/tests/**/*.test.{ts,tsx}'], exclude: [UI_TESTS] },
			},
			{
				plugins: [solid()],
				resolve,
				test: { name: 'ui', environment: 'node', globals: true, include: [UI_TESTS] },
			},
		],
	},
});
