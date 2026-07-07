import type { TechnologyDefinition } from '../../types';

export const beddyTechnologyDefinition = {
	id: "beddy",
	name: "Beddy",
	website: "https://www.beddy.io",
	description: "Beddy is a hospitality management software designed to streamline operations, enhance guest experiences, and improve efficiency in hotels and other hospitality establishments.",
	icon: "Beddy.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "beddy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.beddy\\.io\\/"),
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
