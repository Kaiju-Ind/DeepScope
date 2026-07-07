import type { TechnologyDefinition } from '../../types';

export const bluehostBlueprintTechnologyDefinition = {
	id: "bluehost-blueprint",
	name: "Bluehost Blueprint",
	website: "https://wordpress.org/themes/bluehost-blueprint/",
	description: "Bluehost Blueprint is a popular WordPress theme. Detection is based on plugin/theme asset paths, not loose text mentions.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "bluehost-blueprint:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/themes/bluehost\\-blueprint/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/bluehost\\-blueprint/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/themes/bluehost-blueprint/.",
		},
		{
			id: "bluehost-blueprint:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/themes/bluehost\\-blueprint/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/bluehost\\-blueprint/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/themes/bluehost-blueprint/.",
		},
		{
			id: "bluehost-blueprint:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/themes/bluehost\\-blueprint/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/bluehost\\-blueprint/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/themes/bluehost-blueprint/.",
		},
		{
			id: "bluehost-blueprint:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/themes/bluehost\\-blueprint/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/themes/bluehost\\-blueprint/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/themes/bluehost-blueprint/.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
