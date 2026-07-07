import type { TechnologyDefinition } from '../../types';

export const technology4TellTechnologyDefinition = {
	id: "4-tell",
	name: "4-Tell",
	website: "https://4-tell.com",
	description: "4-Tell is an ecommerce software company for retailers with AI-powered personalisation and recommendations products.",
	icon: "4-Tell.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "4-tell:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("4tellcdn\\.azureedge\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "4-tell:jsGlobal:1",
			kind: "jsGlobal",
			property: "_4TellBoost",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "4-tell:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^4Tell$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "4-tell:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^4TellCart$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "4-tell:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^4TellSession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "4-tell:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^4tell$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "4-tell:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^4tellcart$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "4-tell:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^4tellsession$", "i"),
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
