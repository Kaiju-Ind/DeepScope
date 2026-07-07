import type { TechnologyDefinition } from '../../types';

export const marketplanTechnologyDefinition = {
	id: "marketplan",
	name: "MarketPlan",
	website: "https://www.gomarketplan.io",
	description: "MarketPlan is a platform that integrates campaign mapping, simulation, collaboration, and smart analytics, all in one place.",
	icon: "MarketPlan.svg",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "marketplan:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.marketplan\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "marketplan:jsGlobal:1",
			kind: "jsGlobal",
			property: "marketplan",
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
	},
} as const satisfies TechnologyDefinition;
