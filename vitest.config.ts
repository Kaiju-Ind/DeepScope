import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
	resolve: {
		tsconfigPaths: true,
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'~': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	test: {
		globals: true,
	},
});
