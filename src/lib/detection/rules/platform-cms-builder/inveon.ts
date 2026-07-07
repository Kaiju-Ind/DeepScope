import type { TechnologyDefinition } from '../../types';

export const inveonTechnologyDefinition = {
	id: "inveon",
	name: "Inveon",
	website: "https://www.inveon.com",
	description: "Inveon is a technology company that has been delivering ecommerce infrastructure software and mcommerce applications.",
	icon: "Inveon.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "inveon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("Scripts\\/_app\\/Inv(?:\\w+)\\.js\\?v=(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "inveon:jsGlobal:1",
			kind: "jsGlobal",
			property: "InvApp",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "inveon:jsGlobal:2",
			kind: "jsGlobal",
			property: "invTagManagerParams",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "inveon:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^INV\\.Customer$", "i"),
			confidence: 50,
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "inveon:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^inveonSessionId$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "inveon:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\/_app\\/inv(?:\\w+)\\.js\\?v=(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "inveon:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^inv\\.customer$", "i"),
			confidence: 50,
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "inveon:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^inveonsessionid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
