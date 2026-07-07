import { defineConfig } from 'wxt';

export default defineConfig({
	srcDir: 'src',
	modules: ['@wxt-dev/module-solid'],
	manifest: {
		name: 'Kaiju Site Scope',
		description: 'Detect web technologies on the active tab and show the evidence behind each result.',
		version: '0.1.0',
		icons: {
			16: '/icons/icon-16.png',
			32: '/icons/icon-32.png',
			48: '/icons/icon-48.png',
			128: '/icons/icon-128.png',
		},
		action: {
			default_title: 'Kaiju Site Scope',
			default_popup: 'popup.html',
			default_icon: {
				16: '/icons/icon-16.png',
				32: '/icons/icon-32.png',
				48: '/icons/icon-48.png',
				128: '/icons/icon-128.png',
			},
		},
		permissions: ['activeTab', 'scripting', 'storage', 'offscreen'],
		host_permissions: [],
	},

	// @ts-ignore
	// vite: () => ({
	// 	build: {
	// 		minify: false,
	// 		terserOptions: {
	// 			compress: false,
	// 			mangle: false,
	// 		},
	// 	},
	// }),
});
