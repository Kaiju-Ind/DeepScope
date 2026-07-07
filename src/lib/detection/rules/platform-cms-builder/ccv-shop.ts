import type { TechnologyDefinition } from '../../types';

export const ccvShopTechnologyDefinition = {
	id: "ccv-shop",
	name: "CCV Shop",
	website: "https://ccvshop.be",
	description: "CCV Shop is a Dutch ecommerce platform that enables users to create and manage online stores efficiently.",
	icon: "ccvshop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ccv-shop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/website\\/JavaScript\\/Vertoshop\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ccv-shop:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/website\\/javascript\\/vertoshop\\.js"),
			description: "Script source URL matches a known technology marker.",
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
} as const satisfies TechnologyDefinition;
