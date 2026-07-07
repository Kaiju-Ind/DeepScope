import type { TechnologyDefinition } from '../../types';

export const blocksyTechnologyDefinition = {
	id: "blocksy",
	name: "Blocksy",
	website: "https://creativethemes.com/blocksy",
	description: "Blocksy is a modern and lightweight WordPress theme designed for a variety of websites, including blogs, portfolios, ecommerce stores, and business websites.",
	icon: "Blocksy.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "blocksy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/blocksy\\/(?:.+main\\.js(?:\\?ver=([\\d\\.]+)))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "blocksy:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/blocksy/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "blocksy:jsGlobal:2",
			kind: "jsGlobal",
			property: "blocksyJsonP",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blocksy:jsGlobal:3",
			kind: "jsGlobal",
			property: "blocksyResponsiveMenuCache",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:creativethemes:blocksy:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
