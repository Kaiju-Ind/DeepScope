import type { TechnologyDefinition } from '../../types';

export const copernicaTechnologyDefinition = {
	id: "copernica",
	name: "Copernica",
	website: "https://www.copernica.com",
	description: "Copernica is a platform for managing email campaigns and automating customer communication using structured data and rule-based workflows.",
	icon: "Copernica.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "copernica:dom:0",
			kind: "dom",
			selector: "form[action*='publisher.copernica.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
