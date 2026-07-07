import type { TechnologyDefinition } from '../../types';

export const web4realtyTechnologyDefinition = {
	id: "web4realty",
	name: "Web4Realty",
	website: "https://web4realty.com",
	description: "Web4Realty is an all-in-one marketing and sales platform for real estate professionals.",
	icon: "Web4Realty.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "web4realty:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("idxjs\\.web4realty\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
