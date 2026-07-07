import type { TechnologyDefinition } from '../../types';

export const customPostTypeUiTechnologyDefinition = {
	id: "custom-post-type-ui",
	name: "Custom Post Type UI",
	website: "https://wordpress.org/plugins/custom-post-type-ui/",
	description: "Custom Post Type UI is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "custom-post-type-ui:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/custom\\-post\\-type\\-ui/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/custom\\-post\\-type\\-ui/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/custom-post-type-ui/.",
		},
		{
			id: "custom-post-type-ui:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/custom\\-post\\-type\\-ui/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/custom\\-post\\-type\\-ui/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/custom-post-type-ui/.",
		},
		{
			id: "custom-post-type-ui:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/custom\\-post\\-type\\-ui/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/custom\\-post\\-type\\-ui/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/custom-post-type-ui/.",
		},
		{
			id: "custom-post-type-ui:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/custom\\-post\\-type\\-ui/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/custom\\-post\\-type\\-ui/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/custom-post-type-ui/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
