import type { TechnologyDefinition } from '../../types';

export const pagarMeTechnologyDefinition = {
	id: "pagar-me",
	name: "Pagar.me",
	website: "https://pagar.me",
	description: "Pagar.me is a Portuguese-language online payments solution for businesses in Brazil.",
	icon: "Pagar.me.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "pagar-me:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.pagar\\.me\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pagar-me:jsGlobal:1",
			kind: "jsGlobal",
			property: "PagarMeCheckout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pagar-me:jsGlobal:2",
			kind: "jsGlobal",
			property: "pagarme.balance",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
