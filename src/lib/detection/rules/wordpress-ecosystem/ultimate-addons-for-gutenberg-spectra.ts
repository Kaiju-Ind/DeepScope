import type { TechnologyDefinition } from '../../types';

export const ultimateAddonsForGutenbergSpectraTechnologyDefinition = {
	id: "ultimate-addons-for-gutenberg-spectra",
	name: "Spectra Gutenberg Blocks",
	website: "https://wordpress.org/plugins/ultimate-addons-for-gutenberg-spectra/",
	description: "Spectra Gutenberg Blocks is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "ultimate-addons-for-gutenberg-spectra:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg\\-spectra/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg\\-spectra/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/ultimate-addons-for-gutenberg-spectra/.",
		},
		{
			id: "ultimate-addons-for-gutenberg-spectra:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg\\-spectra/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg\\-spectra/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/ultimate-addons-for-gutenberg-spectra/.",
		},
		{
			id: "ultimate-addons-for-gutenberg-spectra:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg\\-spectra/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg\\-spectra/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/ultimate-addons-for-gutenberg-spectra/.",
		},
		{
			id: "ultimate-addons-for-gutenberg-spectra:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg\\-spectra/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg\\-spectra/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/ultimate-addons-for-gutenberg-spectra/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
