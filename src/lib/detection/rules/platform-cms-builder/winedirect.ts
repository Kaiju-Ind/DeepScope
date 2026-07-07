import type { TechnologyDefinition } from '../../types';

export const winedirectTechnologyDefinition = {
	id: "winedirect",
	name: "WineDirect",
	website: "https://www.winedirect.com",
	description: "WineDirect is an all-in-one ecommerce and POS (Point of Sale) platform that is specifically designed for wineries and wine retailers.",
	icon: "WineDirect.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "winedirect:jsGlobal:0",
			kind: "jsGlobal",
			property: "vin65.checkout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "winedirect:jsGlobal:1",
			kind: "jsGlobal",
			property: "vin65remote",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "winedirect:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^WineDirect\\sEcommerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "winedirect:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^winedirect\\secommerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
