import type { TechnologyDefinition } from '../../types';

export const appstleTechnologyDefinition = {
	id: "appstle",
	name: "Appstle",
	website: "https://appstle.com",
	description: "Appstle is a platform that boosts ecommerce revenue through retention-focused customer experiences.",
	icon: "Appstle.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "appstle:jsGlobal:0",
			kind: "jsGlobal",
			property: "AppstleIncluded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "appstle:jsGlobal:1",
			kind: "jsGlobal",
			property: "appstleInit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
