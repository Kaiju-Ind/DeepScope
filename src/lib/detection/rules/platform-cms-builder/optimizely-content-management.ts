import type { TechnologyDefinition } from '../../types';

export const optimizelyContentManagementTechnologyDefinition = {
	id: "optimizely-content-management",
	name: "Optimizely Content Management",
	website: "https://www.optimizely.com/products/content/",
	description: "Optimizely Content Management (formerly EPiServer) is digital content, ecommerce, and marketing management solution designed for editors and marketers.",
	icon: "Optimizely.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "optimizely-content-management:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.episerver.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "optimizely-content-management:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^EPi:StateMarker$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "optimizely-content-management:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^EPiServer$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "optimizely-content-management:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^EPiSessionId$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "optimizely-content-management:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^EPiTrace$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "optimizely-content-management:header:5",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.episerver\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "optimizely-content-management:meta:6",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("EPiServer", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "optimizely-content-management:dom:7",
			kind: "dom",
			selector: "link[href*='/EPiServer.Forms/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "optimizely-content-management:jsGlobal:8",
			kind: "jsGlobal",
			property: "epi.EPiServer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "optimizely-content-management:cookie:9",
			kind: "cookie",
			keyPattern: new RegExp("^epi:statemarker$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "optimizely-content-management:cookie:10",
			kind: "cookie",
			keyPattern: new RegExp("^episerver$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "optimizely-content-management:cookie:11",
			kind: "cookie",
			keyPattern: new RegExp("^episessionid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "optimizely-content-management:cookie:12",
			kind: "cookie",
			keyPattern: new RegExp("^epitrace$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "optimizely-content-management:meta:13",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("episerver", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:episerver:episerver:*:*:*:*:*:*:*:*",
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
