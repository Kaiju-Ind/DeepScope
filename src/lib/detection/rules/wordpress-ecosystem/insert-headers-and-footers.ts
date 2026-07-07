import type { TechnologyDefinition } from '../../types';

export const insertHeadersAndFootersTechnologyDefinition = {
	id: "insert-headers-and-footers",
	name: "WPCode",
	website: "https://wordpress.org/plugins/insert-headers-and-footers/",
	description: "WPCode is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "insert-headers-and-footers:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/insert\\-headers\\-and\\-footers/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/insert\\-headers\\-and\\-footers/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/insert-headers-and-footers/.",
		},
		{
			id: "insert-headers-and-footers:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/insert\\-headers\\-and\\-footers/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/insert\\-headers\\-and\\-footers/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/insert-headers-and-footers/.",
		},
		{
			id: "insert-headers-and-footers:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/insert\\-headers\\-and\\-footers/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/insert\\-headers\\-and\\-footers/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/insert-headers-and-footers/.",
		},
		{
			id: "insert-headers-and-footers:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/insert\\-headers\\-and\\-footers/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/insert\\-headers\\-and\\-footers/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/insert-headers-and-footers/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
