import type { TechnologyDefinition } from '../../types';

export const perimeterxTechnologyDefinition = {
	id: "perimeterx",
	name: "PerimeterX",
	website: "https://www.perimeterx.com",
	description: "PerimeterX is a provider of scalable, behavior-based threat protection technology for the web, cloud, and mobile.",
	icon: "PerimeterX.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "perimeterx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("client\\.a\\.pxi\\.pub\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "perimeterx:jsGlobal:1",
			kind: "jsGlobal",
			property: "_pxAppId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "perimeterx:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_px3$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "perimeterx:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^_pxff_cc$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "perimeterx:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^_pxhd$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "perimeterx:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^_pxvid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
