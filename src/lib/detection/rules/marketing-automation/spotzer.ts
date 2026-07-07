import type { TechnologyDefinition } from '../../types';

export const spotzerTechnologyDefinition = {
	id: "spotzer",
	name: "Spotzer",
	website: "https://spotzerdigital.com",
	description: "Spotzer is a platform offering solutions for crafting online content that garners high exposure on search engines and social networks.",
	icon: "Spotzer.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "spotzer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.spotzer\\.com\\/"),
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
