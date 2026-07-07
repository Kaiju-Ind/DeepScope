import type { TechnologyDefinition } from '../../types';

export const revelTechnologyDefinition = {
	id: "revel",
	name: "Revel",
	website: "https://revel.github.io",
	icon: "Revel.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "revel:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^REVEL_FLASH$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "revel:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^REVEL_SESSION$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "revel:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^revel_flash$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "revel:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^revel_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:revel:revel:*:*:*:*:*:go:*:*",
	},
	implies: [
		"go",
	],
} as const satisfies TechnologyDefinition;
