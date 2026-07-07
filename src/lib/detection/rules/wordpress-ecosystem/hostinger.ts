import type { TechnologyDefinition } from '../../types';

export const hostingerTechnologyDefinition = {
	id: "hostinger",
	name: "Hostinger Tools",
	website: "https://wordpress.org/plugins/hostinger/",
	description: "Hostinger Tools is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "hostinger:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/hostinger/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/hostinger/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/hostinger/.",
		},
		{
			id: "hostinger:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/hostinger/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/hostinger/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/hostinger/.",
		},
		{
			id: "hostinger:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/hostinger/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/hostinger/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/hostinger/.",
		},
		{
			id: "hostinger:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/hostinger/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/hostinger/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/hostinger/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
