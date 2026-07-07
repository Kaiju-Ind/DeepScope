import type { TechnologyDefinition } from '../../types';

export const nootizTechnologyDefinition = {
	id: "nootiz",
	name: "Nootiz",
	website: "https://www.nootiz.com",
	description: "Nootiz is a visual feedback tool designed to streamline the process of collecting and managing user feedback on websites.",
	icon: "Nootiz.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "nootiz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("load\\.nootiz\\.com\\/"),
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
