import type { TechnologyDefinition } from '../../types';

export const kommiTechnologyDefinition = {
	id: "kommi",
	name: "Kommi",
	website: "https://kommi.io",
	description: "Kommi is a provider of digital marketing services.",
	icon: "Kommi.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "kommi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tracker\\.kommi\\.io\\/"),
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
