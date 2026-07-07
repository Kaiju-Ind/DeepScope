import type { TechnologyDefinition } from '../../types';

export const redshopTechnologyDefinition = {
	id: "redshop",
	name: "RedShop",
	website: "https://www.redshop.io",
	description: "RedShop provides a platform for SMEs to manage their ecommerce business.",
	icon: "RedShop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "redshop:dom:0",
			kind: "dom",
			selector: "link[href*='//redshop.s3.amazonaws.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"amazon-s3",
		"next-js",
		"react",
		"typescript",
	],
} as const satisfies TechnologyDefinition;
