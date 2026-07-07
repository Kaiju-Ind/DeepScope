import type { TechnologyDefinition } from '../../types';

export const tripteaseTechnologyDefinition = {
	id: "triptease",
	name: "Triptease",
	website: "https://www.triptease.com",
	description: "Triptease is a SaaS that provides digital tools that create better experiences and relationships between hotels and guests.",
	icon: "Triptease.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "triptease:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.triptease\\.io\\/"),
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
