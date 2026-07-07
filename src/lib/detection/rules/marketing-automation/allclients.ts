import type { TechnologyDefinition } from '../../types';

export const allclientsTechnologyDefinition = {
	id: "allclients",
	name: "AllClients",
	website: "https://allclients.com",
	description: "AllClients is an all-in-one platform that integrates contact management and marketing automation.",
	icon: "AllClients.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "allclients:dom:0",
			kind: "dom",
			selector: "form[action*='www.allclients.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "allclients:dom:1",
			kind: "dom",
			selector: "iframe[href*='www.allclients.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "allclients:dom:2",
			kind: "dom",
			selector: "form[action*='www.allclients.com/'], iframe[href*='www.allclients.com/']",
			description: "DOM selector matches a known technology marker.",
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
