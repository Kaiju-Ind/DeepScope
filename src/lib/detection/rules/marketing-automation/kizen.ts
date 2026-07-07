import type { TechnologyDefinition } from '../../types';

export const kizenTechnologyDefinition = {
	id: "kizen",
	name: "Kizen",
	website: "https://kizen.com",
	description: "Kizen is an automation and AI personalization solution designed to simplify and accelerate the adoption of relevant AI technologies in the healthcare, insurance, and financial services industries.",
	icon: "Kizen.svg",
	categories: [
		"marketing-automation",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "kizen:dom:0",
			kind: "dom",
			selector: "a[data-kizen-track]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kizen:jsGlobal:1",
			kind: "jsGlobal",
			property: "KIZEN",
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
