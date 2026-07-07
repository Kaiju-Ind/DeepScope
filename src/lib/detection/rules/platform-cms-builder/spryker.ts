import type { TechnologyDefinition } from '../../types';

export const sprykerTechnologyDefinition = {
	id: "spryker",
	name: "Spryker",
	website: "https://www.spryker.com",
	description: "Spryker is an ecommerce technology platform that enables global enterprises to build transactional business models.",
	icon: "Spryker.svg",
	categories: [
		"platform-cms-builder",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "spryker:jsGlobal:0",
			kind: "jsGlobal",
			property: "spryker.config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "spryker:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("spryker", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		pricing: [
			"high",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
