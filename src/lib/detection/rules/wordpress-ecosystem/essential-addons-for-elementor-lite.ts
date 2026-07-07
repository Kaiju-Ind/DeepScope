import type { TechnologyDefinition } from '../../types';

export const essentialAddonsForElementorLiteTechnologyDefinition = {
	id: "essential-addons-for-elementor-lite",
	name: "Essential Addons for Elementor",
	website: "https://wordpress.org/plugins/essential-addons-for-elementor-lite/",
	description: "Essential Addons for Elementor is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "essential-addons-for-elementor-lite:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/essential\\-addons\\-for\\-elementor\\-lite/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/essential\\-addons\\-for\\-elementor\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/essential-addons-for-elementor-lite/.",
		},
		{
			id: "essential-addons-for-elementor-lite:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/essential\\-addons\\-for\\-elementor\\-lite/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/essential\\-addons\\-for\\-elementor\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/essential-addons-for-elementor-lite/.",
		},
		{
			id: "essential-addons-for-elementor-lite:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/essential\\-addons\\-for\\-elementor\\-lite/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/essential\\-addons\\-for\\-elementor\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/essential-addons-for-elementor-lite/.",
		},
		{
			id: "essential-addons-for-elementor-lite:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/essential\\-addons\\-for\\-elementor\\-lite/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/essential\\-addons\\-for\\-elementor\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/essential-addons-for-elementor-lite/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
