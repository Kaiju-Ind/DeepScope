import type { TechnologyDefinition } from '../../types';

export const riveTechnologyDefinition = {
	id: "rive",
	name: "Rive",
	website: "https://rive.app",
	description: "Rive is a real-time interactive design and animation tool.",
	icon: "Rive.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "rive:jsGlobal:0",
			kind: "jsGlobal",
			property: "rive.Rive",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rive:dom:1",
			kind: "dom",
			selector: "link[href*='rive.app/'][rel='canonical']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
