import type { TechnologyDefinition } from '../../types';

export const hapanaTechnologyDefinition = {
	id: "hapana",
	name: "Hapana",
	website: "https://www.hapana.com",
	description: "Hapana is a gym and fitness studio management platform designed to streamline operations.",
	icon: "Hapana.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "hapana:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hapana\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
