import type { TechnologyDefinition } from '../../types';

export const errorceptionTechnologyDefinition = {
	id: "errorception",
	name: "Errorception",
	website: "https://errorception.com",
	description: "Errorception is an error reporting service for client-side in-browser JavaScript errors.",
	icon: "Errorception.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "errorception:jsGlobal:0",
			kind: "jsGlobal",
			property: "_errs",
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
