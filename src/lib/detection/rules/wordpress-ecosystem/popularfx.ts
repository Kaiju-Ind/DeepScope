import type { TechnologyDefinition } from '../../types';

export const popularfxTechnologyDefinition = {
	id: "popularfx",
	name: "PopularFX",
	website: "https://popularfx.com",
	description: "PopularFX is a fully customizable responsive WordPress theme. It comes with drag and drop page builder.",
	icon: "PopularFX.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "popularfx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/popularfx\\/.+\\?ver=([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "popularfx:dom:1",
			kind: "dom",
			selector: "link#popularfx-style-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
