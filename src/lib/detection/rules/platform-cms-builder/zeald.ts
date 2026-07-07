import type { TechnologyDefinition } from '../../types';

export const zealdTechnologyDefinition = {
	id: "zeald",
	name: "Zeald",
	website: "https://www.zeald.com",
	description: "Zeald is a full-service website design and digital marketing company.",
	icon: "Zeald.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zeald:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^ZES_BACKEND$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "zeald:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^zes_backend$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
	requires: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
