import type { TechnologyDefinition } from '../../types';

export const nexmindTechnologyDefinition = {
	id: "nexmind",
	name: "NexMind",
	website: "https://www.nexmind.ai",
	description: "NexMind is a platform offering advanced analytics tools for businesses to make informed decisions and foster growth.",
	icon: "NexMind.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "nexmind:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.nexmind\\.ai\\/"),
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
