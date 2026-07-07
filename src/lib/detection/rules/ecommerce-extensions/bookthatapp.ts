import type { TechnologyDefinition } from '../../types';

export const bookthatappTechnologyDefinition = {
	id: "bookthatapp",
	name: "BookThatApp",
	website: "https://www.bookthatapp.com",
	description: "BookThatApp is a Shopify appointment booking, product rental and class booking app.",
	icon: "BookThatApp.png",
	categories: [
		"ecommerce-extensions",
		"booking-scheduling",
	],
	rules: [
		{
			id: "bookthatapp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bookthatapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bookthatapp:jsGlobal:1",
			kind: "jsGlobal",
			property: "BookThatApp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
