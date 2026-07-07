import type { TechnologyDefinition } from '../../types';

export const maguruTechnologyDefinition = {
	id: "maguru",
	name: "Maguru",
	website: "https://www.maguru.dk",
	description: "Maguru is a marketing tool designed to help organizations manage and execute promotional activities.",
	icon: "Maguru.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "maguru:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("go\\.maguru\\.dk"),
			description: "Script source URL matches a known technology marker.",
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
