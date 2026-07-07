import type { TechnologyDefinition } from '../../types';

export const akiaTechnologyDefinition = {
	id: "akia",
	name: "Akia",
	website: "https://www.akia.com",
	description: "Akia is a platform offering AI-powered communication tools designed to streamline messaging and guest interactions within the hospitality industry.",
	icon: "Akia.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "akia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("web\\.akia\\.ai"),
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
