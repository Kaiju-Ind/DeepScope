import type { TechnologyDefinition } from '../../types';

export const evvntTechnologyDefinition = {
	id: "evvnt",
	name: "Evvnt",
	website: "https://evvnt.com",
	description: "Evvnt is a digital events marketing and management platform.",
	icon: "Evvnt.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "evvnt:dom:0",
			kind: "dom",
			selector: "script[data-source*='evvnt']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "evvnt:jsGlobal:1",
			kind: "jsGlobal",
			property: "evvnt_require",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
