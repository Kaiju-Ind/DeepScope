import type { TechnologyDefinition } from '../../types';

export const getroTechnologyDefinition = {
	id: "getro",
	name: "Getro",
	website: "https://www.getro.com",
	description: "Gentro is an automated job board and private talent network that removes the manual effort of linking individuals and companies within a network.",
	icon: "Getro.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "getro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("an\\.getro\\.com\\/"),
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
