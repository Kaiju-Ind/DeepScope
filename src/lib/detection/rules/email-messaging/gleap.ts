import type { TechnologyDefinition } from '../../types';

export const gleapTechnologyDefinition = {
	id: "gleap",
	name: "Gleap",
	website: "https://www.gleap.io",
	description: "Gleap is an all-in-one customer feedback platform offering features like in-app bug reporting, live chat, AI support bots, product roadmaps, customer surveys, and marketing automation to enhance customer service and product development.",
	icon: "Gleap.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "gleap:jsGlobal:0",
			kind: "jsGlobal",
			property: "Gleap",
			description: "Page-owned global matches a known technology marker.",
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
