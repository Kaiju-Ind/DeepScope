import type { TechnologyDefinition } from '../../types';

export const upsyTechnologyDefinition = {
	id: "upsy",
	name: "Upsy",
	website: "https://upsyshopping.com",
	description: "Upsy is a platform that provides personalized product recommendations for ecommerce stores.",
	icon: "Upsy.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "upsy:jsGlobal:0",
			kind: "jsGlobal",
			property: "_upsyAbTest",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "upsy:jsGlobal:1",
			kind: "jsGlobal",
			property: "parseUpsyQuery",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "upsy:jsGlobal:2",
			kind: "jsGlobal",
			property: "upsy_sdk.getCookie",
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
