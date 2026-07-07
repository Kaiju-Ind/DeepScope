import type { TechnologyDefinition } from '../../types';

export const rezdyTechnologyDefinition = {
	id: "rezdy",
	name: "Rezdy",
	website: "https://www.rezdy.com",
	description: "Rezdy is an online booking software for tours and attractions.",
	icon: "Rezdy.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "rezdy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("rezdy\\.\\w+\\/pluginJs"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rezdy:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("rezdy\\.\\w+\\/pluginjs"),
			description: "Script source URL matches a known technology marker.",
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
