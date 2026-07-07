import type { TechnologyDefinition } from '../../types';

export const betterdocsPluginTechnologyDefinition = {
	id: "betterdocs-plugin",
	name: "BetterDocs plugin",
	website: "https://betterdocs.co/docs/wordpress",
	description: "BetterDocs plugin is an advanced documentation and knowledge base plugin for WordPress.",
	icon: "BetterDocs.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "betterdocs-plugin:resourceUrl:0",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/betterdocs(?:\\-pro)?/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/betterdocs(?:\\-pro)?/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/betterdocs/ or betterdocs-pro/.",
		},
		{
			id: "betterdocs-plugin:stylesheetHref:1",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/betterdocs(?:\\-pro)?/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/betterdocs(?:\\-pro)?/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/betterdocs/ or betterdocs-pro/.",
		},
		{
			id: "betterdocs-plugin:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/betterdocs(?:\\-pro)?/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/betterdocs(?:\\-pro)?/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/betterdocs/ or betterdocs-pro/.",
		},
		{
			id: "betterdocs-plugin:html:3",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/betterdocs(?:\\-pro)?/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/betterdocs(?:\\-pro)?/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references BetterDocs-owned plugin assets.",
		},
		{
			id: "betterdocs-plugin:dom:4",
			kind: "dom",
			selector: ".betterdocs-wrapper, .betterdocs-searchform, .betterdocs-search-field, .betterdocs-category-grid-wrapper, .betterdocs-single-wrapper, [class*='betterdocs-']",
			description: "DOM selector matches BetterDocs knowledge-base markup.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
	implies: [
		"betterdocs",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
