import type { TechnologyDefinition } from '../../types';

export const kktixTechnologyDefinition = {
	id: "kktix",
	name: "KKTIX",
	website: "https://kktix.com",
	description: "KKTIX is a Taiwanese software platform that provides online ticketing and event management solutions.",
	icon: "KKTIX.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "kktix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.kktix\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
