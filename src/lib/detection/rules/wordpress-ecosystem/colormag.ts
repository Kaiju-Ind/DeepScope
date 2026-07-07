import type { TechnologyDefinition } from '../../types';

export const colormagTechnologyDefinition = {
	id: "colormag",
	name: "ColorMag",
	website: "https://themegrill.com/themes/colormag/",
	description: "ColorMag theme is for creating news, magazine, newspaper and other kinds of publishing sites. Compatible with Elementor.",
	icon: "ThemeGrill.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "colormag:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("themes\\/colormag.*\\.js(?:\\?ver=([0-9.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "colormag:dom:1",
			kind: "dom",
			selector: "body[class*='colormag-theme']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "colormag:dom:2",
			kind: "dom",
			selector: "link[id*='colormag']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:themegrill:colormag:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
