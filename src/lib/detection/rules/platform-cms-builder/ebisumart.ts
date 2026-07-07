import type { TechnologyDefinition } from '../../types';

export const ebisumartTechnologyDefinition = {
	id: "ebisumart",
	name: "ebisumart",
	website: "https://www.ebisumart.com",
	description: "ebisumart is a cloud-based storefront system for developing and renewing high-quality ecommerce websites.",
	icon: "ebisumart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ebisumart:jsGlobal:0",
			kind: "jsGlobal",
			property: "Ebisu.FontChanger",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ebisumart:jsGlobal:1",
			kind: "jsGlobal",
			property: "Ebisu.FontChanger.map.L",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ebisumart:jsGlobal:2",
			kind: "jsGlobal",
			property: "ebisu_conv",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
