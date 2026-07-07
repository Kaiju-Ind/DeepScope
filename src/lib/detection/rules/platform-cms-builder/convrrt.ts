import type { TechnologyDefinition } from '../../types';

export const convrrtTechnologyDefinition = {
	id: "convrrt",
	name: "Convrrt",
	website: "https://www.convrrt.com",
	description: "Convrrt is a platform that offers tools for creating responsive landing pages.",
	icon: "Convrrt.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "convrrt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.convrrt\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
