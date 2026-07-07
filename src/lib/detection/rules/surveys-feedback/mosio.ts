import type { TechnologyDefinition } from '../../types';

export const mosioTechnologyDefinition = {
	id: "mosio",
	name: "Mosio",
	website: "https://www.mosio.com",
	description: "Mosio is a text messaging software solution for research that supports participant communication and data collection.",
	icon: "Mosio.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "mosio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chat\\.mosio\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
