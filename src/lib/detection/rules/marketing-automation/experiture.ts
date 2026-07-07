import type { TechnologyDefinition } from '../../types';

export const experitureTechnologyDefinition = {
	id: "experiture",
	name: "Experiture",
	website: "https://www.experiture.com",
	description: "Experiture is a customer experience marketing platform that manages campaigns, customer data, and engagement across digital channels.",
	icon: "Experiture.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "experiture:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.experiture\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
