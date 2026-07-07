import type { TechnologyDefinition } from '../../types';

export const pleziTechnologyDefinition = {
	id: "plezi",
	name: "Plezi",
	website: "https://www.plezi.co",
	description: "Plezi is a marketing automation tool.",
	icon: "Plezi.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "plezi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.plezi\\.co"),
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
