import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { fontless } from 'fontless';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'wxt';

/** Release version shared by `package.json` and every browser manifest. */
const version = (JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as { version: string }).version;

/**
 * Build identity embedded into diagnostic records and support bundles.
 *
 * The identity must not depend on the build time. Firefox add-on review rebuilds
 * the submitted sources and requires identical output, and release checksums are
 * only meaningful when a rebuild of the same commit produces the same files.
 * CI provides the commit (`DEEPSCOPE_SOURCE_COMMIT`, else GitHub's `GITHUB_SHA`);
 * local builds say `local`.
 */
const buildId = `${version}+${(process.env.DEEPSCOPE_SOURCE_COMMIT || process.env.GITHUB_SHA)?.slice(0, 12) || 'local'}`;

/**
 * Firefox add-on identity. AMO does not assign one for Manifest V3, and the id
 * cannot change after the first signed release, so confirm it before then.
 */
const FIREFOX_ADDON_ID = 'deepscope@openarsenal.github.io';

/** Browsers whose extension platform provides offscreen documents. */
const OFFSCREEN_BROWSERS = new Set(['chrome', 'edge', 'opera']);

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
	// WXT defaults Firefox and Safari to Manifest V2. DeepScope targets V3 everywhere.
	manifestVersion: 3,
	hooks: {
		/**
		 * Give Safari a background page instead of a service worker.
		 *
		 * WXT emits `background.service_worker` for every V3 target except Firefox.
		 * A service worker cannot construct a `Worker`, and Safari has no offscreen
		 * documents, so the matcher workers could not run anywhere. Safari accepts a
		 * non-persistent background page with the same script, which can own them.
		 *
		 * No `persistent` key: WebKit already treats every V3 background page as
		 * non-persistent (and rejects `true`), while the Safari packager warns that
		 * the key is unsupported. Omitting it keeps the same event-page lifecycle.
		 */
		'build:manifestGenerated': (wxt, manifest) => {
			if (wxt.config.browser !== 'safari' || !manifest.background) return;
			const background = manifest.background as { service_worker?: string; type?: 'module' };
			if (!background.service_worker) return;
			manifest.background = {
				scripts: [background.service_worker],
				...(background.type ? { type: background.type } : {}),
			} as typeof manifest.background;
		},
	},
	manifest: ({ browser }) => ({
		name: 'Kaiju DeepScope',
		description: 'Detect web technologies automatically on active web pages and show the evidence behind each result.',
		version,
		// Temporal is native from Chrome 144 (Firefox 139). Chrome's background is a
		// service worker, which cannot load a polyfill lazily, so the minimum is the
		// first version with native Temporal.
		...(browser === 'firefox' || browser === 'safari' ? {} : { minimum_chrome_version: '144' }),
		...(browser === 'firefox'
			? {
				browser_specific_settings: {
					gecko: {
						id: FIREFOX_ADDON_ID,
						// AMO requires `data_collection_permissions` for new add-ons, and
						// Firefox understands it from 140 (the 2025 ESR). That also covers
						// MAIN-world scripting (128) and `storage.session` (115).
						strict_min_version: '140.0',
						// Analysis runs locally. The only network requests re-fetch the
						// inspected page's own same-origin assets.
						data_collection_permissions: { required: ['none'] },
					},
					// Firefox for Android reads the same key from 142.
					gecko_android: { strict_min_version: '142.0' },
				},
			}
			: {}),
		...(browser === 'safari'
			? { browser_specific_settings: { safari: { strict_min_version: '18.4' } } }
			: {}),
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
		permissions: [
			'activeTab',
			'scripting',
			'storage',
			'clipboardWrite',
			...(OFFSCREEN_BROWSERS.has(browser) ? ['offscreen'] : []),
		],
		host_permissions: ['http://*/*', 'https://*/*'],
	}),
	vite: () => ({
		build: { modulePreload: false },
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
							preload: false,
						}
						: { name: 'American Kestrel', provider: 'none' },
					{
						name: 'Space Grotesk',
						provider: 'fontsource',
						weights: ['300 700'],
						styles: ['normal'],
						preload: false,
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
