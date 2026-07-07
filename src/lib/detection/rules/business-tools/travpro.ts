import type { TechnologyDefinition } from '../../types';

export const travproTechnologyDefinition = {
	id: "travpro",
	name: "TravPRO",
	website: "https://travpromobile.com",
	description: "TravPRO is a mobile sales solution designed to support travel agents in managing bookings and client interactions.",
	icon: "TravPRO.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "travpro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("data\\.travpromobile\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "travpro:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("data\\.travpromobile\\.com"),
			description: "Script content contains a bounded technology signature.",
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
