import type { TechnologyDefinition } from '../../types';

export const coassembleTechnologyDefinition = {
	id: "coassemble",
	name: "Coassemble",
	website: "https://coassemble.com",
	description: "Coassemble is an eLearning and team training platform that provides tools for creating, delivering, and managing training content for organizations and teams.",
	icon: "Coassemble.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "coassemble:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("frontend\\.coassemble\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
