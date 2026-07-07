import type { TechnologyDefinition } from '../../types';

export const kauzTechnologyDefinition = {
	id: "kauz",
	name: "Kauz",
	website: "https://kauz.ai",
	description: "Kauz is a self-service platform for businesses to manage and train AI assistants across different operational needs.",
	icon: "Kauz.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "kauz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.kauz\\.ai"),
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
