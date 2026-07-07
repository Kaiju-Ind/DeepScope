import type { TechnologyDefinition } from '../../types';

export const elevioTechnologyDefinition = {
	id: "elevio",
	name: "Elevio",
	website: "https://elev.io",
	description: "Elevio is a self-service support platform for SaaS that delivers contextual knowledge to customers, support agents, and internal teams.",
	icon: "Elevio.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "elevio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.elev\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "elevio:jsGlobal:1",
			kind: "jsGlobal",
			property: "_elev",
			description: "Page-owned global matches a known technology marker.",
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
