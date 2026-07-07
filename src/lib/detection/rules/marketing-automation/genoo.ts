import type { TechnologyDefinition } from '../../types';

export const genooTechnologyDefinition = {
	id: "genoo",
	name: "Genoo",
	website: "https://genoo.com",
	description: "Genoo is a provider of marketing automation and online marketing tools.",
	icon: "Genoo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
