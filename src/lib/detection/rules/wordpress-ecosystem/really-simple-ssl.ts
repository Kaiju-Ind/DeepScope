import type { TechnologyDefinition } from '../../types';

export const reallySimpleSslTechnologyDefinition = {
	id: "really-simple-ssl",
	name: "Really Simple Security",
	website: "https://wordpress.org/plugins/really-simple-ssl/",
	description: "Really Simple Security is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "really-simple-ssl:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/really\\-simple\\-ssl/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/really\\-simple\\-ssl/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/really-simple-ssl/.",
		},
		{
			id: "really-simple-ssl:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/really\\-simple\\-ssl/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/really\\-simple\\-ssl/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/really-simple-ssl/.",
		},
		{
			id: "really-simple-ssl:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/really\\-simple\\-ssl/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/really\\-simple\\-ssl/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/really-simple-ssl/.",
		},
		{
			id: "really-simple-ssl:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/really\\-simple\\-ssl/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/really\\-simple\\-ssl/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/really-simple-ssl/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
