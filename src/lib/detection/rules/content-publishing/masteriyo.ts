import type { TechnologyDefinition } from '../../types';

export const masteriyoTechnologyDefinition = {
	id: "masteriyo",
	name: "Masteriyo",
	website: "https://masteriyo.com",
	description: "Masteriyo is a course creation and monetization tool for WordPress.",
	icon: "Masteriyo.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "masteriyo:dom:0",
			kind: "dom",
			selector: "style[id*='masteriyo-public-inline-css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "masteriyo:jsGlobal:1",
			kind: "jsGlobal",
			property: "_MASTERIYO_WISHLIST_ADDON_",
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
		cpe: "cpe:2.3:a:themegrill:masteriyo:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
