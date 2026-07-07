import type { TechnologyDefinition } from '../../types';

export const aphixTechnologyDefinition = {
	id: "aphix",
	name: "Aphix",
	website: "https://www.aphixsoftware.com",
	description: "Aphix is a provider of a fully integrated ecommerce and mobile ordering platform.",
	icon: "Aphix.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "aphix:dom:0",
			kind: "dom",
			selector: "p#aphix-brand-footer > a[href*='.aphixsoftware.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "aphix:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^WebShop by Aphix Software$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "aphix:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^webshop by aphix software$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
