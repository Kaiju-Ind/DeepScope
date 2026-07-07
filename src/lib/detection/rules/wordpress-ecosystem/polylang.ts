import type { TechnologyDefinition } from '../../types';

export const polylangTechnologyDefinition = {
	id: "polylang",
	name: "Polylang",
	website: "https://wordpress.org/plugins/polylang",
	description: "Polylang is a WordPress plugin which allows you to create multilingual WordPress site.",
	icon: "Polylang.svg",
	categories: [
		"wordpress-ecosystem",
		"translations",
	],
	rules: [
		{
			id: "polylang:dom:0",
			kind: "dom",
			selector: "#pll_switcher, .pll-switcher, [class*='pll-language'], [class*='pll_switcher']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "polylang:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^pll_language$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "polylang:header:2",
			kind: "header",
			key: "x-redirected-by",
			valuePattern: new RegExp("Polylang(?: (Pro))?", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "polylang:header:3",
			kind: "header",
			key: "x-redirected-by",
			valuePattern: new RegExp("polylang(?: (pro))?", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "polylang:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("/wp\\-content/plugins/polylang/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/polylang/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Script URL is served from /wp-content/plugins/polylang/.",
		},
		{
			id: "polylang:resourceUrl:5",
			kind: "resourceUrl",
			pattern: new RegExp("/wp\\-content/plugins/polylang/", "i"),
			confidence: 100,
			version: {
				source: "matchedValue",
				pattern: new RegExp("/wp\\-content/plugins/polylang/[^?#\\s\"\\']+[?&]ver=([^&\\s\"\\']+)", "i"),
				group: 1,
			},
			description: "Loaded resource URL is served from /wp-content/plugins/polylang/.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:polylang_plugin_project:polylang:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
