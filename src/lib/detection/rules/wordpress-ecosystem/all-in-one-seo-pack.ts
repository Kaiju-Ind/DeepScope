import type { TechnologyDefinition } from '../../types';

export const allInOneSeoPackTechnologyDefinition = {
	id: "all-in-one-seo-pack",
	name: "All in One SEO",
	website: "https://wordpress.org/plugins/all-in-one-seo-pack/",
	description: "All in One SEO is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "all-in-one-seo-pack:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-seo\\-pack/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-seo\\-pack/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/all-in-one-seo-pack/.",
		},
		{
			id: "all-in-one-seo-pack:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-seo\\-pack/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-seo\\-pack/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/all-in-one-seo-pack/.",
		},
		{
			id: "all-in-one-seo-pack:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-seo\\-pack/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-seo\\-pack/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/all-in-one-seo-pack/.",
		},
		{
			id: "all-in-one-seo-pack:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-seo\\-pack/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/all\\-in\\-one\\-seo\\-pack/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/all-in-one-seo-pack/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
