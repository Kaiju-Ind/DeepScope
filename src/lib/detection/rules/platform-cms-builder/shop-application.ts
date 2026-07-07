import type { TechnologyDefinition } from '../../types';

export const shopApplicationTechnologyDefinition = {
	id: "shop-application",
	name: "Shop Application",
	website: "https://www.shop-application.com",
	description: "Shop Application is a French ecommerce software solution that enables product sales both online and in physical stores.",
	icon: "ShopApplication.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shop-application:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Shop Application$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "shop-application:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^shop application$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
