import type { TechnologyDefinition } from '../../types';

export const selzyTechnologyDefinition = {
	id: "selzy",
	name: "Selzy",
	website: "https://selzy.com",
	description: "Selzy is an email marketing platform for sending bulk emails, tracking statistics, conducting A/B tests, and automating campaigns.",
	icon: "Selzy.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "selzy:dom:0",
			kind: "dom",
			selector: "form[action*='.selzy.com/']",
			description: "DOM selector matches a known technology marker.",
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
