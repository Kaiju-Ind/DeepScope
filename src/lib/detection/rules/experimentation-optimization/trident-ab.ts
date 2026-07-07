import type { TechnologyDefinition } from '../../types';

export const tridentAbTechnologyDefinition = {
	id: "trident-ab",
	name: "Trident AB",
	website: "https://tridentab.com",
	description: "Trident AB is a platform for optimizing websites through A/B testing.",
	icon: "TridentAB.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "trident-ab:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("Trident\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "trident-ab:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("trident\\/"),
			description: "Script content contains a bounded technology signature.",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
