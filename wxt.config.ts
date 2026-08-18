import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { fontless } from 'fontless';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'wxt';

/** Build identity embedded into diagnostic records and support bundles. */
const buildId = `0.1.0-${new Date().toISOString()}`;

/**
 * Local logo font source owned by Fontless during the Vite build.
 *
 * A data URL lets Fontless hash and emit the licensed local font through the
 * same asset pipeline as provider fonts. A public `/fonts/...` URL would make
 * Fontless attempt to fetch an extension-relative URL while Node owns the build.
 */
const kestrelPath = fileURLToPath(new URL('./src/assets/fonts/american-kestrel/americankestral.ttf', import.meta.url));
const kestrelSource = existsSync(kestrelPath)
	? `data:font/ttf;base64,${readFileSync(kestrelPath).toString('base64')}`
	: undefined;

export default defineConfig({
	srcDir: 'src',
	modules: ['@wxt-dev/module-solid'],
	manifest: {
		name: 'Kaiju DeepScope',
		description: 'Detect web technologies automatically on active web pages and show the evidence behind each result.',
		version: '0.1.0',
		// comctx 1.7.5 calls Promise.withResolvers() in the extension startup path.
		minimum_chrome_version: '119',
		icons: {
			16: '/icons/icon-16.png',
			32: '/icons/icon-32.png',
			48: '/icons/icon-48.png',
			128: '/icons/icon-128.png',
		},
		action: {
			default_title: 'Kaiju DeepScope',
			default_icon: {
				16: '/icons/icon-16.png',
				32: '/icons/icon-32.png',
				48: '/icons/icon-48.png',
				128: '/icons/icon-128.png',
			},
		},
		permissions: ['activeTab', 'scripting', 'storage', 'offscreen', 'clipboardWrite'],
		host_permissions: ['http://*/*', 'https://*/*'],
	},
	vite: () => ({
		plugins: [
			fontless({
				provider: 'fontsource',
				processCSSVariables: 'font-prefixed-only',
				defaults: {
					preload: false,
					formats: ['woff2'],
					weights: [400, 700],
					styles: ['normal'],
					fallbacks: { 'sans-serif': ['Arial', 'Helvetica Neue'] },
				},
				families: [
					kestrelSource
						? {
							name: 'American Kestrel',
							src: [{ url: kestrelSource, format: 'truetype' }],
							weight: 400,
							style: 'normal',
							fallbacks: ['Space Grotesk'],
							preload: true,
						}
						: { name: 'American Kestrel', provider: 'none' },
					{
						name: 'Space Grotesk',
						provider: 'fontsource',
						weights: ['300 700'],
						styles: ['normal'],
						preload: true,
					},
					{
						name: 'Space Mono',
						provider: 'fontsource',
						weights: ['400 700'],
						styles: ['normal'],
						preload: false,
					},
				],
				assets: { prefix: '/assets/_fonts' },
				experimental: { disableLocalFallbacks: false },
			}),
			tailwindcss(),
			Icons({ compiler: 'solid' }),
		],
		define: { __KAIJU_BUILD_ID__: JSON.stringify(buildId) },
	}),
});
