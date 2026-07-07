import type { TechnologyDefinition } from '../../types';

export const ultimateAddonsForGutenbergTechnologyDefinition = {
	id: "ultimate-addons-for-gutenberg",
	name: "Ultimate Addons for Elementor",
	website: "https://wordpress.org/plugins/ultimate-addons-for-gutenberg/",
	description: "Ultimate Addons for Elementor is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "ultimate-addons-for-gutenberg:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/ultimate-addons-for-gutenberg/.",
		},
		{
			id: "ultimate-addons-for-gutenberg:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/ultimate-addons-for-gutenberg/.",
		},
		{
			id: "ultimate-addons-for-gutenberg:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/ultimate-addons-for-gutenberg/.",
		},
		{
			id: "ultimate-addons-for-gutenberg:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/ultimate\\-addons\\-for\\-gutenberg/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/ultimate-addons-for-gutenberg/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
