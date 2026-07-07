import type { TechnologyDefinition } from '../../types';

export const guestyTechnologyDefinition = {
	id: "guesty",
	name: "Guesty",
	website: "https://www.guesty.com/",
	description: "Guesty is a cloud-based platform, designed exclusively for Airbnb and vacation rental managers.",
	icon: "Guesty.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "guesty:dom:0",
			kind: "dom",
			selector: "script[id*='guesty-js-extra']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "guesty:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^guesty\\-muid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "guesty:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^guesty\\-utms$", "i"),
			description: "Cookie name matches a known technology marker.",
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
