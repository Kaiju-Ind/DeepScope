import type { TechnologyDefinition } from '../../types';

export const taptopTechnologyDefinition = {
	id: "taptop",
	name: "Taptop",
	website: "https://taptop.pro",
	description: "Taptop is Software-as-a-Service (SaaS) for website building and hosting.",
	icon: "Taptop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "taptop:jsGlobal:0",
			kind: "jsGlobal",
			property: "taptop.gsap",
			description: "Page-owned global matches a known technology marker.",
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
