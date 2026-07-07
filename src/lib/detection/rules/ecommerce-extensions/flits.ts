import type { TechnologyDefinition } from '../../types';

export const flitsTechnologyDefinition = {
	id: "flits",
	name: "Flits",
	website: "https://getflits.com",
	description: "Flits is a customer account pages that get all your shopper data in one place.",
	icon: "Flits.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "flits:jsGlobal:0",
			kind: "jsGlobal",
			property: "flitsObjects.accountPage",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
