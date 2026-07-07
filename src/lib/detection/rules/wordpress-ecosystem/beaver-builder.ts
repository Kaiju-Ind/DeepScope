import type { TechnologyDefinition } from '../../types';

export const beaverBuilderTechnologyDefinition = {
	id: "beaver-builder",
	name: "Beaver Builder",
	website: "https://www.wpbeaverbuilder.com/",
	description: "Beaver Builder is a drag-and-drop page builder for WordPress.",
	icon: "BeaverBuilder.svg",
	categories: [
		"wordpress-ecosystem",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "beaver-builder:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/(?:plugins/bb\\-plugin|uploads/bb\\-plugin)/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/(?:plugins/bb\\-plugin|uploads/bb\\-plugin)/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from Beaver Builder plugin or generated upload assets.",
		},
		{
			id: "beaver-builder:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/(?:plugins/bb\\-plugin|uploads/bb\\-plugin)/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/(?:plugins/bb\\-plugin|uploads/bb\\-plugin)/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from Beaver Builder plugin or generated upload assets.",
		},
		{
			id: "beaver-builder:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/(?:plugins/bb\\-plugin|uploads/bb\\-plugin)/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/(?:plugins/bb\\-plugin|uploads/bb\\-plugin)/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from Beaver Builder plugin or generated upload assets.",
		},
		{
			id: "beaver-builder:html:3",
			kind: "html",
			pattern: new RegExp("(?:<body[^>]+fl-builder|/wp\\-content/(?:plugins/bb\\-plugin|uploads/bb\\-plugin)/)", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/(?:plugins/bb\\-plugin|uploads/bb\\-plugin)/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references Beaver Builder classes or owned asset paths.",
		},
		{
			id: "beaver-builder:dom:4",
			kind: "dom",
			selector: "body[class*='fl-builder'], link[id*='fl-builder'], link[href*='/wp-content/uploads/bb-plugin/'], link[href*='/wp-content/plugins/bb-plugin/'], .fl-builder-content, .fl-row, .fl-module, [class*='fl-node-']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:fastlinemedia:beaver_builder:*:*:*:*:*:wordpress:*:*",
	},
	implies: [
		"wordpress",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
