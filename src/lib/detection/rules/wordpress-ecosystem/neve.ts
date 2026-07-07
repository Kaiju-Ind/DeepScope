import type { TechnologyDefinition } from '../../types';

export const neveTechnologyDefinition = {
	id: "neve",
	name: "Neve",
	website: "https://themeisle.com/themes/neve/",
	description: "Neve is a super-fast, easily customizable, multi-purpose theme that works perfectly with the WordPress Block Editor and the most popular page builders as well as WooCommerce",
	icon: "ThemeIsle.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "neve:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("themes\\/neve\\S*\\.js(?:\\?ver=([0-9.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "neve:dom:1",
			kind: "dom",
			selector: "body[class*='neve-theme']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "neve:dom:2",
			kind: "dom",
			selector: "link[id*='neve-style']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "neve:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("themes\\/neve\\s*\\.js(?:\\?ver=([0-9.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
