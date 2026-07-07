import type { TechnologyDefinition } from '../../types';

export const storeVantageTechnologyDefinition = {
	id: "store-vantage",
	name: "Store Vantage",
	website: "https://storevantage.com",
	description: "Store Vantage is a scheduling and customer relationship management platform designed to help small businesses organize appointments, manage client records, and track interactions.",
	icon: "StoreVantage.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "store-vantage:jsGlobal:0",
			kind: "jsGlobal",
			property: "_storevantage.account",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "store-vantage:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^storevantage$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "store-vantage:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^svSession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "store-vantage:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^svsession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
