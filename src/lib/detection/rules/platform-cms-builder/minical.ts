import type { TechnologyDefinition } from '../../types';

export const minicalTechnologyDefinition = {
	id: "minical",
	name: "miniCal",
	website: "https://www.minical.io",
	description: "miniCal is an open-source property management system.",
	icon: "miniCal.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "minical:jsGlobal:0",
			kind: "jsGlobal",
			property: "miniCal.projectUrl",
			valuePattern: new RegExp("app\\.minical\\.io"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
			"poa",
		],
		cpe: "cpe:2.3:a:minical:minical:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
