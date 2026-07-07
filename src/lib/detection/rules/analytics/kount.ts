import type { TechnologyDefinition } from '../../types';

export const kountTechnologyDefinition = {
	id: "kount",
	name: "Kount",
	website: "https://kount.com",
	description: "Kount is a suite of fraud detection and prevention solutions for ecommerce businesses.",
	icon: "Kount.svg",
	categories: [
		"analytics",
		"security",
	],
	rules: [
		{
			id: "kount:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("shopify\\.kount\\.net\\/js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kount:jsGlobal:1",
			kind: "jsGlobal",
			property: "ka.ClientSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kount:jsGlobal:2",
			kind: "jsGlobal",
			property: "ka.collectData",
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
