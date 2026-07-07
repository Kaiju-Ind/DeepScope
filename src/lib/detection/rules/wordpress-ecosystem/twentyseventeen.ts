import type { TechnologyDefinition } from '../../types';

export const twentyseventeenTechnologyDefinition = {
	id: "twentyseventeen",
	name: "Twenty Seventeen",
	website: "https://wordpress.org/themes/twentyseventeen/",
	description: "Twenty Seventeen is a popular WordPress theme. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "twentyseventeen:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/themes/twentyseventeen/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/twentyseventeen/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/themes/twentyseventeen/.",
		},
		{
			id: "twentyseventeen:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/themes/twentyseventeen/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/twentyseventeen/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/themes/twentyseventeen/.",
		},
		{
			id: "twentyseventeen:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/themes/twentyseventeen/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/twentyseventeen/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/themes/twentyseventeen/.",
		},
		{
			id: "twentyseventeen:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/themes/twentyseventeen/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/twentyseventeen/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/themes/twentyseventeen/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
