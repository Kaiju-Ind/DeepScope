import type { TechnologyDefinition } from '../../types';

export const dexemTechnologyDefinition = {
	id: "dexem",
	name: "Dexem",
	website: "https://www.dexem.com",
	description: "Dexem is an AI-powered platform for managing and analyzing calls, offering tools to track, monitor, and improve call performance.",
	icon: "Dexem.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "dexem:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.dexem\\.net\\/"),
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
