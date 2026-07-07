import type { TechnologyDefinition } from '../../types';

export const twentytwentytwoTechnologyDefinition = {
	id: "twentytwentytwo",
	name: "Twenty Twenty-Two",
	website: "https://wordpress.org/themes/twentytwentytwo/",
	description: "Twenty Twenty-Two is a popular WordPress theme. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twentytwentytwo:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/themes/twentytwentytwo/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/twentytwentytwo/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/themes/twentytwentytwo/.",
		},
		{
			id: "twentytwentytwo:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/themes/twentytwentytwo/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/twentytwentytwo/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/themes/twentytwentytwo/.",
		},
		{
			id: "twentytwentytwo:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/themes/twentytwentytwo/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/twentytwentytwo/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/themes/twentytwentytwo/.",
		},
		{
			id: "twentytwentytwo:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/themes/twentytwentytwo/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/twentytwentytwo/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/themes/twentytwentytwo/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
