import type { TechnologyDefinition } from '../../types';

export const growthbookTechnologyDefinition = {
	id: "growthbook",
	name: "GrowthBook",
	website: "https://www.growthbook.io",
	description: "GrowthBook is a platform for product teams to run and track experiments, analyze results, and make data-driven decisions to optimize their products for growth.",
	icon: "GrowthBook.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "growthbook:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.growthbook.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "growthbook:jsGlobal:1",
			kind: "jsGlobal",
			property: "_growthbook.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "growthbook:jsGlobal:2",
			kind: "jsGlobal",
			property: "_siteSetting.growthBookApiHost",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "growthbook:jsGlobal:3",
			kind: "jsGlobal",
			property: "growthbook",
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
		cpe: "cpe:2.3:a:growthbook:growthbook:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
