import type { TechnologyDefinition } from '../../types';

export const nextsaleTechnologyDefinition = {
	id: "nextsale",
	name: "Nextsale",
	website: "https://nextsale.io",
	description: "Nextsale is a conversion optimisation platform that provides social proof and urgency tools for ecommerce websites.",
	icon: "Nextsale.svg",
	categories: [
		"widgets-misc",
		"marketing-automation",
	],
	rules: [
		{
			id: "nextsale:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:api|sdk)\\.nextsale\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nextsale:jsGlobal:1",
			kind: "jsGlobal",
			property: "NextsaleObject",
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
