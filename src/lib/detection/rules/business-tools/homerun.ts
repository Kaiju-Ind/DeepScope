import type { TechnologyDefinition } from '../../types';

export const homerunTechnologyDefinition = {
	id: "homerun",
	name: "Homerun",
	website: "https://www.homerun.co",
	description: "Homerun is a platform used to organize hiring processes and manage candidate applications.",
	icon: "Homerun.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "homerun:jsGlobal:0",
			kind: "jsGlobal",
			property: "homerunI18n",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "homerun:jsGlobal:1",
			kind: "jsGlobal",
			property: "homerunPrivacySettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
