import type { TechnologyDefinition } from '../../types';

export const googleSitemapGeneratorTechnologyDefinition = {
	id: "google-sitemap-generator",
	name: "XML Sitemap Generator for Google",
	website: "https://wordpress.org/plugins/google-sitemap-generator/",
	description: "XML Sitemap Generator for Google is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "google-sitemap-generator:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/google\\-sitemap\\-generator/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/google\\-sitemap\\-generator/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/google-sitemap-generator/.",
		},
		{
			id: "google-sitemap-generator:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/google\\-sitemap\\-generator/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/google\\-sitemap\\-generator/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/google-sitemap-generator/.",
		},
		{
			id: "google-sitemap-generator:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/google\\-sitemap\\-generator/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/google\\-sitemap\\-generator/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/google-sitemap-generator/.",
		},
		{
			id: "google-sitemap-generator:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/google\\-sitemap\\-generator/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/google\\-sitemap\\-generator/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/google-sitemap-generator/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
