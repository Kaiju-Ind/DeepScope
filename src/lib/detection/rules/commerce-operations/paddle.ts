import type { TechnologyDefinition } from '../../types';

export const paddleTechnologyDefinition = {
	id: "paddle",
	name: "Paddle",
	website: "https://paddle.com/",
	description: "Paddle is a billing and payment gateway for B2B SaaS companies.",
	icon: "Paddle.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "paddle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.paddle\\.com\\/paddle\\/paddle\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "paddle:jsGlobal:1",
			kind: "jsGlobal",
			property: "Paddle.Checkout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paddle:jsGlobal:2",
			kind: "jsGlobal",
			property: "PaddleScriptLocation",
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
