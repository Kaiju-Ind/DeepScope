import type { TechnologyDefinition } from '../../types';

export const clarivoyTechnologyDefinition = {
	id: "clarivoy",
	name: "Clarivoy",
	website: "https://www.clarivoy.com",
	description: "Clarivoy is an automotive marketing campaign tool.",
	icon: "Clarivoy.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "clarivoy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.clarivoy\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
