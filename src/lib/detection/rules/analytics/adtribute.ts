import type { TechnologyDefinition } from '../../types';

export const adtributeTechnologyDefinition = {
	id: "adtribute",
	name: "Adtribute",
	website: "https://www.adtribute.io",
	description: "Adtribute is a tool designed to track users accurately and unify data, enhancing outcomes in marketing attribution, business intelligence, and data activation.",
	icon: "Adtribute.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "adtribute:jsGlobal:0",
			kind: "jsGlobal",
			property: "adbq.0.referrer_url",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
