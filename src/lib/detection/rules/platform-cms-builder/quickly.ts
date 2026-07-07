import type { TechnologyDefinition } from '../../types';

export const quicklyTechnologyDefinition = {
	id: "quickly",
	name: "Quickly",
	website: "https://quickly.tn",
	description: "Quickly is an ecommerce platform that enables creation and deployment of online stores.",
	icon: "Quickly.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "quickly:jsGlobal:0",
			kind: "jsGlobal",
			property: "Quickly.platform",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "quickly:jsGlobal:1",
			kind: "jsGlobal",
			property: "Quickly.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "quickly:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Quickly$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
