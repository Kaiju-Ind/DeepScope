import type { TechnologyDefinition } from '../../types';

export const odooreStudioLiteTechnologyDefinition = {
	id: "odoore-studio-lite",
	name: "Odoore Studio Lite",
	website: "https://wordpress.org/themes/odoore-studio-lite/",
	description: "Odoore Studio Lite is a popular WordPress theme. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "odoore-studio-lite:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/themes/odoore\\-studio\\-lite/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/odoore\\-studio\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/themes/odoore-studio-lite/.",
		},
		{
			id: "odoore-studio-lite:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/themes/odoore\\-studio\\-lite/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/odoore\\-studio\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/themes/odoore-studio-lite/.",
		},
		{
			id: "odoore-studio-lite:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/themes/odoore\\-studio\\-lite/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/odoore\\-studio\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/themes/odoore-studio-lite/.",
		},
		{
			id: "odoore-studio-lite:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/themes/odoore\\-studio\\-lite/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/odoore\\-studio\\-lite/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/themes/odoore-studio-lite/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
