import type { TechnologyDefinition } from '../../types';

export const premmerceTechnologyDefinition = {
	id: "premmerce",
	name: "Premmerce",
	website: "https://premmerce.com",
	description: "Premmerce is a provider of hosted and custom eCommerce management packages designed to support online business growth on an international scale.",
	icon: "Premmerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "premmerce:jsGlobal:0",
			kind: "jsGlobal",
			property: "premmerceOptimizer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "premmerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "premmerceSearch",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
