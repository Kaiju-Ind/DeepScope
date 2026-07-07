import type { TechnologyDefinition } from '../../types';

export const oneClickDemoImportTechnologyDefinition = {
	id: "one-click-demo-import",
	name: "One Click Demo Import",
	website: "https://wordpress.org/plugins/one-click-demo-import/",
	description: "One Click Demo Import is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "one-click-demo-import:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/one\\-click\\-demo\\-import/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/one\\-click\\-demo\\-import/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/one-click-demo-import/.",
		},
		{
			id: "one-click-demo-import:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/one\\-click\\-demo\\-import/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/one\\-click\\-demo\\-import/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/one-click-demo-import/.",
		},
		{
			id: "one-click-demo-import:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/one\\-click\\-demo\\-import/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/one\\-click\\-demo\\-import/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/one-click-demo-import/.",
		},
		{
			id: "one-click-demo-import:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/one\\-click\\-demo\\-import/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/one\\-click\\-demo\\-import/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/one-click-demo-import/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
