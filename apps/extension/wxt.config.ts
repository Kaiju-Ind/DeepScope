import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig, type WxtUnimportOptions } from 'wxt';

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
 * Browsers whose minimum supported version ships Temporal (Chromium 144, Firefox 139).
 *
 * `@utils/duration/temporal` imports `temporal-polyfill` statically and prefers
 * the native global at run time. For these browsers the polyfill specifier is
 * aliased to a module that re-exports the native global, so their bundles carry
 * no polyfill. Safari ships Temporal from 27.3 and keeps the polyfill.
 */
const NATIVE_TEMPORAL_BROWSERS = new Set(['chrome', 'edge', 'opera', 'firefox']);
const nativeTemporal = fileURLToPath(new URL('../../utils/duration/temporal.native.ts', import.meta.url));

/** Repository root: build output and the Firefox sources archive live here, not in this package. */
const repoRoot = fileURLToPath(new URL('../../', import.meta.url));

/**
 * Portable packages and vendored Utils declare their own imports.
 *
 * WXT's Solid preset detects names textually. Fields and parameters named
 * `batch` can cause an unused `solid-js` import in these renderer-free modules.
 * Keep the existing plugin exclusions and exclude both source owners so clean
 * builds do not acquire an undeclared renderer dependency.
 */
const portableSources = new RegExp(
	`^${repoRoot.replaceAll('\\', '/').replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')}(?:packages|utils)/`,
	'u',
);

export default defineConfig({
	srcDir: 'src',
	outDir: `${repoRoot}.output`,
	zip: {
		// Archive names predate the workspace split and stay
		// `kaiju-deepscope-extension-<version>-<browser>.zip`.
		name: 'kaiju-deepscope-extension',
		// AMO reviewers rebuild from the sources archive with pnpm alone, so it holds
		// the whole workspace (root manifests, lockfile, apps/, packages/, utils/, tools/).
		// WXT still skips dot folders (.mise, .wxt, .output), node_modules and tests.
		sourcesRoot: repoRoot,
	},
	// unimport's default excludes plus portable source owners. WXT hands these options
	// to unimport's Vite plugin, which reads `exclude`, but does not type it.
	imports: { exclude: [/[\\/]node_modules[\\/]/u, /[\\/]\.git[\\/]/u, portableSources] } as WxtUnimportOptions,
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
	/** Generate the selected browser's manifest from the shared extension contract, adding only its supported permissions and store metadata. */
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
	/** Keep shared Solid and style compilation while selecting the browser's Temporal implementation and embedding the current build identity. */
	vite: ({ browser }) => ({
		build: { modulePreload: false },
		resolve: {
			alias: NATIVE_TEMPORAL_BROWSERS.has(browser)
				? [{ find: /^temporal-polyfill\/full\/implementation$/, replacement: nativeTemporal }]
				: [],
		},
		plugins: [
			tailwindcss(),
			Icons({ compiler: 'solid' }),
		],
		define: { __KAIJU_BUILD_ID__: JSON.stringify(buildId) },
	}),
});
