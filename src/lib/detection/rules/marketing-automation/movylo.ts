import type { TechnologyDefinition } from '../../types';

export const movyloTechnologyDefinition = {
	id: "movylo",
	name: "Movylo",
	website: "https://www.movylo.com",
	description: "Movylo is an AI-driven platform that automates customer engagement across websites and social media to drive sales.",
	icon: "Movylo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "movylo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.movylo\\.com\\/"),
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
