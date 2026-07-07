import type { TechnologyDefinition } from '../../types';

export const tinymceAdvancedTechnologyDefinition = {
	id: "tinymce-advanced",
	name: "Advanced Editor Tools",
	website: "https://wordpress.org/plugins/tinymce-advanced/",
	description: "Advanced Editor Tools is a popular WordPress plugin. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "tinymce-advanced:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/tinymce\\-advanced/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/tinymce\\-advanced/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/tinymce-advanced/.",
		},
		{
			id: "tinymce-advanced:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/tinymce\\-advanced/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/tinymce\\-advanced/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/tinymce-advanced/.",
		},
		{
			id: "tinymce-advanced:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/tinymce\\-advanced/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/tinymce\\-advanced/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/tinymce-advanced/.",
		},
		{
			id: "tinymce-advanced:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/tinymce\\-advanced/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/tinymce\\-advanced/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/tinymce-advanced/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
