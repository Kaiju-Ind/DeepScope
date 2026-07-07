import type { TechnologyDefinition } from '../../types';

export const dynatraceTechnologyDefinition = {
	id: "dynatrace",
	name: "Dynatrace",
	website: "https://www.dynatrace.com",
	description: "Dynatrace is a technology company that produces a software intelligence platform based on artificial intelligence to monitor and optimise application performance and development, IT infrastructure, and user experience for businesses and government agencies throughout the world.",
	icon: "Dynatrace.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "dynatrace:jsGlobal:0",
			kind: "jsGlobal",
			property: "dtrum",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dynatrace:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^dtCookie1$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "dynatrace:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^dtcookie1$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
