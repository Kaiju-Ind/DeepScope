import type { TechnologyDefinition } from '../../types';

export const modifiedEcommerceTechnologyDefinition = {
	id: "modified-ecommerce",
	name: "Modified eCommerce",
	website: "https://www.modified-shop.org",
	description: "Modified eCommerce is a PHP-based open-source ecommerce platform designed for creating and managing online stores with customizable features and functionalities.",
	icon: "Modified eCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "modified-ecommerce:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("by modified eCommerce Shopsoftware", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "modified-ecommerce:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("by modified ecommerce shopsoftware", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:modified-shop:modified_ecommerce_shopsoftware:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
