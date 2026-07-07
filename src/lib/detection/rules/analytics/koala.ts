import type { TechnologyDefinition } from '../../types';

export const koalaTechnologyDefinition = {
	id: "koala",
	name: "Koala",
	website: "https://getkoala.com/",
	description: "Koala is an analytical product with CRM features that helps businesses efficiently identify and track prospects, providing valuable insights and streamlining the sales process.",
	icon: "Koala.svg",
	categories: [
		"analytics",
		"business-tools",
	],
	rules: [
		{
			id: "koala:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.getkoala\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "koala:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("api\\.getkoala\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "koala:jsGlobal:2",
			kind: "jsGlobal",
			property: "KoalaSDK",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
