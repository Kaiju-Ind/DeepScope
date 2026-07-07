import type { TechnologyDefinition } from '../../types';

export const hostingerReachTechnologyDefinition = {
	id: "hostinger-reach",
	name: "Hostinger Reach",
	website: "https://wordpress.org/plugins/hostinger-reach/",
	description: "Hostinger Reach is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "hostinger-reach:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/hostinger\\-reach/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/hostinger\\-reach/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/hostinger-reach/.",
		},
		{
			id: "hostinger-reach:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/hostinger\\-reach/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/hostinger\\-reach/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/hostinger-reach/.",
		},
		{
			id: "hostinger-reach:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/hostinger\\-reach/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/hostinger\\-reach/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/hostinger-reach/.",
		},
		{
			id: "hostinger-reach:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/hostinger\\-reach/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/hostinger\\-reach/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/hostinger-reach/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
