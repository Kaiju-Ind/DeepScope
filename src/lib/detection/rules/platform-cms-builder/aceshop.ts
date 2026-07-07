import type { TechnologyDefinition } from '../../types';

export const aceshopTechnologyDefinition = {
	id: "aceshop",
	name: "AceShop",
	website: "https://www.joomace.net/joomla-extensions/aceshop-joomla-shopping-cart",
	description: "AceShop is a full-featured ecommerce component for Joomla that enables online store creation and management within the Joomla content management system.",
	icon: "AceShop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "aceshop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/aceshopjquery\\/aceshopjquery\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
	},
	requires: [
		"joomla",
		"jquery",
	],
} as const satisfies TechnologyDefinition;
