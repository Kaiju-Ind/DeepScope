import type { TechnologyDefinition } from '../../types';

export const eaglecartTechnologyDefinition = {
	id: "eaglecart",
	name: "Eaglecart",
	website: "https://eaglecart.com",
	description: "Eaglecart is a platform that consolidates online store operations, point-of-sale systems, and inventory management across multiple regions, currencies, and warehouse locations.",
	icon: "Eaglecart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "eaglecart:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^eaglecart_timezone$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "eaglecart:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Eaglecart$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "eaglecart:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Eaglecart$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "eaglecart:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^eaglecart$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "eaglecart:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^eaglecart$", "i"),
			description: "Meta tag matches a known technology marker.",
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
