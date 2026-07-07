import type { TechnologyDefinition } from '../../types';

export const happyfoxHelpdeskTechnologyDefinition = {
	id: "happyfox-helpdesk",
	name: "HappyFox Helpdesk",
	website: "https://www.happyfox.com/customer-service-software/",
	description: "HappyFox is a help desk ticketing system that is hosted on cloud, supporting multiple customer support channels like email, voice and live chat.",
	icon: "HappyFox.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "happyfox-helpdesk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.happyfox\\.com\\/media\\/"),
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
