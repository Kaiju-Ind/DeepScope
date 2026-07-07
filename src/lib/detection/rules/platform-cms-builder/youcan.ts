import type { TechnologyDefinition } from '../../types';

export const youcanTechnologyDefinition = {
	id: "youcan",
	name: "YouCan",
	website: "https://youcan.shop",
	description: "YouCan is an integrated platform specialised in ecommerce, offering a wide range of services needed by merchants and entrepreneurs.",
	icon: "YouCan.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "youcan:jsGlobal:0",
			kind: "jsGlobal",
			property: "YCPay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "youcan:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("Youcan\\.Private\\.DC\\/", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "youcan:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("youcan\\.private\\.dc\\/", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
	implies: [
		"laravel",
		"mysql",
		"php",
		"redis",
		"youcan-pay",
	],
} as const satisfies TechnologyDefinition;
