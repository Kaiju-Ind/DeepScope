import type { TechnologyDefinition } from '../../types';

export const soteshopTechnologyDefinition = {
	id: "soteshop",
	name: "SoteShop",
	website: "https://www.soteshop.com/",
	description: "SoteShop is an e-shop management software.",
	icon: "SoteShop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "soteshop:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^soteshop$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
