import type { TechnologyDefinition } from '../../types';

export const locksmithTechnologyDefinition = {
	id: "locksmith",
	name: "Locksmith",
	website: "https://apps.shopify.com/locksmith",
	description: "Locksmith is a shopify app for adding access control capability on shopify stores.",
	icon: "Locksmith.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "locksmith:jsGlobal:0",
			kind: "jsGlobal",
			property: "Locksmith",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
