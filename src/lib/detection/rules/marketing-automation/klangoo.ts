import type { TechnologyDefinition } from '../../types';

export const klangooTechnologyDefinition = {
	id: "klangoo",
	name: "Klangoo",
	website: "https://klangoo.com",
	description: "Klangoo is an AI-based audience engagement solution designed to enhance user interaction and optimise content delivery.",
	icon: "Klangoo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "klangoo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.klangoo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
