import type { TechnologyDefinition } from '../../types';

export const blocksyCompanionTechnologyDefinition = {
	id: "blocksy-companion",
	name: "Blocksy Companion",
	website: "https://creativethemes.com/blocksy/companion/",
	description: "Blocksy Companion is a WordPress plugin that provides additional functionality and features for the Blocksy theme.",
	icon: "Blocksy.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "blocksy-companion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/blocksy\\-companion(?:\\-pro)?/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/blocksy\\-companion(?:\\-pro)?/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/blocksy-companion/ or blocksy-companion-pro/.",
		},
		{
			id: "blocksy-companion:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/blocksy-companion'], script[src*='/wp-content/plugins/blocksy-companion'], [class*='ct-dynamic-data'], [class*='ct-newsletter-subscribe'], [class*='ct-trending-block']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "blocksy-companion:resourceUrl:2",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/blocksy\\-companion(?:\\-pro)?/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/blocksy\\-companion(?:\\-pro)?/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/blocksy-companion/ or blocksy-companion-pro/.",
		},
		{
			id: "blocksy-companion:stylesheetHref:3",
			kind: "stylesheetHref",
			pattern: new RegExp("/wp\\-content/plugins/blocksy\\-companion(?:\\-pro)?/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/blocksy\\-companion(?:\\-pro)?/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Stylesheet URL is served from /wp-content/plugins/blocksy-companion/ or blocksy-companion-pro/.",
		},
		{
			id: "blocksy-companion:html:4",
			kind: "html",
			pattern: new RegExp("/wp\\-content/plugins/blocksy\\-companion(?:\\-pro)?/", "i"),
			confidence: 90,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/blocksy\\-companion(?:\\-pro)?/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Document HTML references /wp-content/plugins/blocksy-companion/ or blocksy-companion-pro/.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:creativethemes:blocksy_companion:*:*:*:*:*:wordpress:*:*",
	},
	implies: [
		"blocksy",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
