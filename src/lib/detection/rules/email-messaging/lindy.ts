import type { TechnologyDefinition } from '../../types';

export const lindyTechnologyDefinition = {
	id: "lindy",
	name: "Lindy",
	website: "https://www.lindy.ai",
	description: "Lindy is an AI assistant that helps complete tasks using custom AI, with no coding required.",
	icon: "Lindy.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "lindy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.lindy\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
