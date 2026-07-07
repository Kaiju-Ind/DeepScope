import type { TechnologyDefinition } from '../../types';

export const gorgiasTechnologyDefinition = {
	id: "gorgias",
	name: "Gorgias",
	website: "https://www.gorgias.com/",
	description: "Gorgias is a helpdesk and chat solution designed for ecommerce stores.",
	icon: "Gorgias.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "gorgias:jsGlobal:0",
			kind: "jsGlobal",
			property: "gorgiasChat",
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
