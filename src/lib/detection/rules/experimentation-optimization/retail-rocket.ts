import type { TechnologyDefinition } from '../../types';

export const retailRocketTechnologyDefinition = {
	id: "retail-rocket",
	name: "Retail Rocket",
	website: "https://retailrocket.net",
	description: "Retail Rocket is a big data-based personalisation platform for ecommerce websites.",
	icon: "Retail Rocket.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "retail-rocket:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.retailrocket\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "retail-rocket:jsGlobal:1",
			kind: "jsGlobal",
			property: "retailrocket",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "retail-rocket:jsGlobal:2",
			kind: "jsGlobal",
			property: "rrAddToBasket",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "retail-rocket:jsGlobal:3",
			kind: "jsGlobal",
			property: "rrApiOnReady",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "retail-rocket:jsGlobal:4",
			kind: "jsGlobal",
			property: "rrLibrary",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "retail-rocket:jsGlobal:5",
			kind: "jsGlobal",
			property: "rrPartnerId",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "retail-rocket:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^rr\\-testCookie$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "retail-rocket:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^rrpvid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "retail-rocket:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^rr\\-testcookie$", "i"),
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
