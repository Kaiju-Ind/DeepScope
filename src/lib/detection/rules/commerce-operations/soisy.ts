import type { TechnologyDefinition } from '../../types';

export const soisyTechnologyDefinition = {
	id: "soisy",
	name: "Soisy",
	website: "https://www.soisy.it",
	description: "Soisy is a buy now, pay later solution provider.",
	icon: "Soisy.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "soisy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.soisy\\.it\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
