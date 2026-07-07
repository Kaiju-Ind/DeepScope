import type { TechnologyDefinition } from '../../types';

export const bobonusTechnologyDefinition = {
	id: "bobonus",
	name: "Bobonus",
	website: "https://bobonus.com",
	description: "Bobonus is an ecommerce platform for restaurants.",
	icon: "Bobonus.svg",
	categories: [
		"booking-scheduling",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bobonus:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("https\\:\\/\\/bobonus\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "bobonus:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("https\\:\\/\\/bobonus\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
