import type { TechnologyDefinition } from '../../types';

export const googleAnalyticsForWordpressTechnologyDefinition = {
	id: "google-analytics-for-wordpress",
	name: "MonsterInsights",
	website: "https://wordpress.org/plugins/google-analytics-for-wordpress/",
	description: "MonsterInsights is a popular WordPress plugin.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "google-analytics-for-wordpress:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/google\\-analytics\\-for\\-wordpress/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/google\\-analytics\\-for\\-wordpress/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/google-analytics-for-wordpress/.",
		},
		{
			id: "google-analytics-for-wordpress:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/google\\-analytics\\-for\\-wordpress/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/google\\-analytics\\-for\\-wordpress/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/google-analytics-for-wordpress/.",
		},
		{
			id: "google-analytics-for-wordpress:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/google\\-analytics\\-for\\-wordpress/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/google\\-analytics\\-for\\-wordpress/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/google-analytics-for-wordpress/.",
		},
		{
			id: "google-analytics-for-wordpress:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/google\\-analytics\\-for\\-wordpress/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/google\\-analytics\\-for\\-wordpress/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/google-analytics-for-wordpress/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
