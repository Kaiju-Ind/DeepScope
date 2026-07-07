import type { TechnologyDefinition } from '../../types';

export const borderfreeTechnologyDefinition = {
	id: "borderfree",
	name: "Borderfree",
	website: "https://www.borderfree.com",
	description: "Borderfree is an cross-border ecommerce solutions provider.",
	icon: "Borderfree.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "borderfree:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("global\\.prd\\.borderfree\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "borderfree:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("wm\\.prd\\.borderfree\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "borderfree:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("bfx-objects\\.prd\\.borderfree\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "borderfree:jsGlobal:3",
			kind: "jsGlobal",
			property: "bfx._apiKey",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "borderfree:jsGlobal:4",
			kind: "jsGlobal",
			property: "bfx._brand",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "borderfree:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^bfx\\.apiKey:$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "borderfree:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^bfx\\.country:$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "borderfree:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^bfx\\.language$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "borderfree:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^bfx\\.logLevel$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "borderfree:cookie:9",
			kind: "cookie",
			keyPattern: new RegExp("^bfx\\.apikey:$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "borderfree:cookie:10",
			kind: "cookie",
			keyPattern: new RegExp("^bfx\\.loglevel$", "i"),
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
