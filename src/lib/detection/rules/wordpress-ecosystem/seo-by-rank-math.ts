import type { TechnologyDefinition } from '../../types';

export const seoByRankMathTechnologyDefinition = {
	id: "seo-by-rank-math",
	name: "Rank Math SEO",
	website: "https://wordpress.org/plugins/seo-by-rank-math/",
	description: "Rank Math SEO is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "seo-by-rank-math:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/seo\\-by\\-rank\\-math/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/seo\\-by\\-rank\\-math/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/seo-by-rank-math/.",
		},
		{
			id: "seo-by-rank-math:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/seo\\-by\\-rank\\-math/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/seo\\-by\\-rank\\-math/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/seo-by-rank-math/.",
		},
		{
			id: "seo-by-rank-math:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/seo\\-by\\-rank\\-math/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/seo\\-by\\-rank\\-math/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/seo-by-rank-math/.",
		},
		{
			id: "seo-by-rank-math:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/seo\\-by\\-rank\\-math/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/seo\\-by\\-rank\\-math/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/seo-by-rank-math/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
