import type { TechnologyDefinition } from '../../types';

export const roblyTechnologyDefinition = {
	id: "robly",
	name: "Robly",
	website: "https://www.robly.com",
	description: "Robly is an email marketing platform designed to simplify campaign creation and management for businesses.",
	icon: "Robly.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "robly:dom:0",
			kind: "dom",
			selector: "form[action*='list.robly.com/']",
			description: "DOM selector matches a known technology marker.",
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
