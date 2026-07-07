import type { TechnologyDefinition } from '../../types';

export const croctTechnologyDefinition = {
	id: "croct",
	name: "Croct",
	website: "https://croct.com",
	description: "Croct is a headless CMS that incorporates A/B testing and personalization features for content management and digital delivery.",
	icon: "Croct.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "croct:jsGlobal:0",
			kind: "jsGlobal",
			property: "croct.initialize",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
