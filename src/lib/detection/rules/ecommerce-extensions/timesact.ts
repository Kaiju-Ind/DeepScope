import type { TechnologyDefinition } from '../../types';

export const timesactTechnologyDefinition = {
	id: "timesact",
	name: "Timesact",
	website: "https://timesact.com",
	description: "Timesact is a Shopify app that automates pre-order and back-in-stock notifications to streamline inventory and sales management.",
	icon: "Timesact.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "timesact:dom:0",
			kind: "dom",
			selector: "div[class*='timesact_powered_by']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "timesact:jsGlobal:1",
			kind: "jsGlobal",
			property: "timesactScriptNew",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
