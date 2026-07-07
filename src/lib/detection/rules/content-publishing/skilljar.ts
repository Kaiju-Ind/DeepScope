import type { TechnologyDefinition } from '../../types';

export const skilljarTechnologyDefinition = {
	id: "skilljar",
	name: "Skilljar",
	website: "https://www.skilljar.com/",
	description: "Skilljar is a B2B customer training platform and learning management system.",
	icon: "skilljar.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "skilljar:jsGlobal:0",
			kind: "jsGlobal",
			property: "SKILLJAR_DASHBOARD_GLOBALS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "skilljar:jsGlobal:1",
			kind: "jsGlobal",
			property: "skilljarCatalogPage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "skilljar:jsGlobal:2",
			kind: "jsGlobal",
			property: "skilljarThemeVersionMajor",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "skilljar:jsGlobal:3",
			kind: "jsGlobal",
			property: "skilljarTranslate",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
