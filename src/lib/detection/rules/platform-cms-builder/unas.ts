import type { TechnologyDefinition } from '../../types';

export const unasTechnologyDefinition = {
	id: "unas",
	name: "Unas",
	website: "https://unas.hu",
	description: "Unas is an all-in-one ecommerce platform from Hungary.",
	icon: "Unas.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "unas:jsGlobal:0",
			kind: "jsGlobal",
			property: "UNAS.shop",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "unas:jsGlobal:1",
			kind: "jsGlobal",
			property: "unas_shop_url",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "unas:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^UnasID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "unas:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^UnasServiceProxyID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "unas:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^unasid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "unas:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^unasserviceproxyid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
