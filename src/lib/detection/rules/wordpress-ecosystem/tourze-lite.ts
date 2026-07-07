import type { TechnologyDefinition } from '../../types';

export const tourzeLiteTechnologyDefinition = {
	id: "tourze-lite",
	name: "Tourze Lite",
	website: "https://wordpress.org/themes/tourze-lite/",
	description: "Tourze Lite is a popular WordPress theme. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "tourze-lite:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/themes/tourze\\-lite/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/tourze\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/themes/tourze-lite/.",
		},
		{
			id: "tourze-lite:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/themes/tourze\\-lite/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/tourze\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/themes/tourze-lite/.",
		},
		{
			id: "tourze-lite:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/themes/tourze\\-lite/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/tourze\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/themes/tourze-lite/.",
		},
		{
			id: "tourze-lite:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/themes/tourze\\-lite/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/tourze\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/themes/tourze-lite/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
