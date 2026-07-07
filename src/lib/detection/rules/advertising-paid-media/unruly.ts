import type { TechnologyDefinition } from '../../types';

export const unrulyTechnologyDefinition = {
	id: "unruly",
	name: "Unruly",
	website: "https://unruly.co",
	description: "Unruly is a video advertising platform.",
	icon: "Unruly.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "unruly:dom:0",
			kind: "dom",
			selector: "link[href*='.unrulymedia.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "unruly:jsGlobal:1",
			kind: "jsGlobal",
			property: "unruly.native",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
