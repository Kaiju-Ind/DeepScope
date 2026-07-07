import type { TechnologyDefinition } from '../../types';

export const icloseTechnologyDefinition = {
	id: "iclose",
	name: "iClose",
	website: "https://iclosed.io",
	description: "iClose is an appointment scheduling tool that helps businesses streamline lead generation and meeting coordination without additional advertising expenses.",
	icon: "iClosed.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "iclose:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.iclosed\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
