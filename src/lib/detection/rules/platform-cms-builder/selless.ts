import type { TechnologyDefinition } from '../../types';

export const sellessTechnologyDefinition = {
	id: "selless",
	name: "Selless",
	website: "https://selless.com",
	description: "Selless is an all-in-one, ready-to-use ecommerce platform.",
	icon: "Selless.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "selless:jsGlobal:0",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.assetPrefix",
			valuePattern: new RegExp("\\.selless\\.us\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
