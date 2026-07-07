import type { TechnologyDefinition } from '../../types';

export const elementskitLiteTechnologyDefinition = {
	id: "elementskit-lite",
	name: "ElementsKit Elementor Addons",
	website: "https://wordpress.org/plugins/elementskit-lite/",
	description: "ElementsKit Elementor Addons is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "elementskit-lite:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/elementskit\\-lite/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/elementskit\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/elementskit-lite/.",
		},
		{
			id: "elementskit-lite:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/elementskit\\-lite/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/elementskit\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/elementskit-lite/.",
		},
		{
			id: "elementskit-lite:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/elementskit\\-lite/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/elementskit\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/elementskit-lite/.",
		},
		{
			id: "elementskit-lite:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/elementskit\\-lite/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/elementskit\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/elementskit-lite/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
