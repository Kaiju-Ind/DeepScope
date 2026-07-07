import type { TechnologyDefinition } from '../../types';

export const commentoTechnologyDefinition = {
	id: "commento",
	name: "Commento",
	website: "https://commento.io",
	description: "Commento is a tool for fostering discussion and improving engagement on websites.",
	icon: "Commento.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "commento:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.commento\\.io\\/"),
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
