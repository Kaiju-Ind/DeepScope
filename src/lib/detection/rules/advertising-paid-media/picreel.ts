import type { TechnologyDefinition } from '../../types';

export const picreelTechnologyDefinition = {
	id: "picreel",
	name: "Picreel",
	website: "https://www.picreel.com",
	description: "Picreel is a conversion optimisation software.",
	icon: "Picreel.svg",
	categories: [
		"advertising-paid-media",
		"widgets-misc",
	],
	rules: [
		{
			id: "picreel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.picreel\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "picreel:dom:1",
			kind: "dom",
			selector: "iframe[src*='app.picreel.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "picreel:jsGlobal:2",
			kind: "jsGlobal",
			property: "picreel",
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
