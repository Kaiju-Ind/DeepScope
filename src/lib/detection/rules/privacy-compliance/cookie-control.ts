import type { TechnologyDefinition } from '../../types';

export const cookieControlTechnologyDefinition = {
	id: "cookie-control",
	name: "Cookie Control",
	website: "https://www.civicuk.com/cookie-control",
	description: "Cookie Control is a cookie consent management tool for websites.",
	icon: "CookieControl.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "cookie-control:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cc\\.cdn\\.civiccomputing\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cookie-control:jsGlobal:1",
			kind: "jsGlobal",
			property: "CookieControl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
