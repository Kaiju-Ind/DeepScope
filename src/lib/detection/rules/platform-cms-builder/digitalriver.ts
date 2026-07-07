import type { TechnologyDefinition } from '../../types';

export const digitalriverTechnologyDefinition = {
	id: "digitalriver",
	name: "DigitalRiver",
	website: "https://www.digitalriver.com",
	description: "Digital River provides global ecommerce, payments and marketing services.",
	icon: "DigitalRiver.svg",
	categories: [
		"platform-cms-builder",
		"commerce-operations",
	],
	rules: [
		{
			id: "digitalriver:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.digitalriver\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "digitalriver:jsGlobal:1",
			kind: "jsGlobal",
			property: "DigitalRiver",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "digitalriver:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^X\\-DR\\-SHOPPER\\-ets$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "digitalriver:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^X\\-DR\\-THEME$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "digitalriver:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^x\\-dr\\-shopper\\-ets$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "digitalriver:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^x\\-dr\\-theme$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
