import type { TechnologyDefinition } from '../../types';

export const elementorTechnologyDefinition = {
	id: "elementor",
	name: "Elementor Website Builder",
	website: "https://wordpress.org/plugins/elementor/",
	description: "Elementor Website Builder is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "elementor:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/elementor/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/elementor/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/elementor/.",
		},
		{
			id: "elementor:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/elementor/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/elementor/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/elementor/.",
		},
		{
			id: "elementor:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/elementor/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/elementor/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/elementor/.",
		},
		{
			id: "elementor:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/elementor/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/elementor/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/elementor/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
