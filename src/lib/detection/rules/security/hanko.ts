import type { TechnologyDefinition } from '../../types';

export const hankoTechnologyDefinition = {
	id: "hanko",
	name: "Hanko",
	website: "https://www.hanko.io",
	description: "Hanko is a passwordless authentication solution offering secure login integration.",
	icon: "Hanko.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "hanko:jsGlobal:0",
			kind: "jsGlobal",
			property: "_hankoStyle",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
