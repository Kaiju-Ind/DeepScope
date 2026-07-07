import type { TechnologyDefinition } from '../../types';

export const tossdownTechnologyDefinition = {
	id: "tossdown",
	name: "Tossdown",
	website: "https://tossdown.com",
	description: "Tossdown is an ecommerce solution for food businesses, including restaurants, bakeries, grocery stores, and meat shops.",
	icon: "Tossdown.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tossdown:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tossdown\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tossdown:jsGlobal:1",
			kind: "jsGlobal",
			property: "api_path",
			valuePattern: new RegExp("tossdown\\.com"),
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
