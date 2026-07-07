import type { TechnologyDefinition } from '../../types';

export const buildertrendTechnologyDefinition = {
	id: "buildertrend",
	name: "Buildertrend",
	website: "https://buildertrend.com",
	icon: "Buildertrend.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "buildertrend:dom:0",
			kind: "dom",
			selector: "iframe[src*='buildertrend.net'], script[src*='buildertrend.net']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
