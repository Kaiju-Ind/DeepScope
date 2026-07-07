import type { TechnologyDefinition } from '../../types';

export const adlooxTechnologyDefinition = {
	id: "adloox",
	name: "Adloox",
	website: "https://www.adloox.com",
	description: "Adloox is an European-born buy-side ad verification and insights company.",
	icon: "Adloox.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adloox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.adlooxtracking\\.com\\/"),
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
