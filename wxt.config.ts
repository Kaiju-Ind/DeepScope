import tailwindcss from '@tailwindcss/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'wxt';

const buildId = `0.1.0-${new Date().toISOString()}`;

export default defineConfig({
	srcDir: 'src',
	modules: ['@wxt-dev/module-solid'],
	manifest: {
		name: 'Kaiju Site Scope',
		description: 'Detect web technologies automatically on active web pages and show the evidence behind each result.',
		version: '0.1.0',
		minimum_chrome_version: '116',
		icons: {
			16: '/icons/icon-16.png',
			32: '/icons/icon-32.png',
			48: '/icons/icon-48.png',
			128: '/icons/icon-128.png',
		},
		action: {
			default_title: 'Kaiju Site Scope',
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
			tailwindcss(),
			Icons({
				compiler: 'solid',
				customCollections: { kaiju: FileSystemIconLoader('./src/icons') },
			}),
		],
		define: { __KAIJU_BUILD_ID__: JSON.stringify(buildId) },
	}),
});
