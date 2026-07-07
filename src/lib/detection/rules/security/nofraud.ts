import type { TechnologyDefinition } from '../../types';

export const nofraudTechnologyDefinition = {
	id: "nofraud",
	name: "NoFraud",
	website: "https://www.nofraud.com",
	description: "NoFraud is a fraud prevention solution for ecommerce businesses.",
	icon: "NoFraud.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "nofraud:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("services\\.nofraud\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
