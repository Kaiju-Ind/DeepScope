import type { TechnologyDefinition } from '../../types';

export const bCartTechnologyDefinition = {
	id: "b-cart",
	name: "B Cart",
	website: "https://bcart.jp",
	description: "BCart is a B2B ecommerce platform that supports digital transformation in ordering, billing, and sales processes.",
	icon: "BCart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "b-cart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.bcart\\.jp"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "b-cart:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Bcart$", "i"),
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
