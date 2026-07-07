import type { TechnologyDefinition } from '../../types';

export const ecomtrackTechnologyDefinition = {
	id: "ecomtrack",
	name: "Ecomtrack",
	website: "https://www.ecommercen.com",
	description: "Ecomtrack is a software program that enables businesses to monitor inventory and sales.",
	icon: "Ecomtrack.svg",
	categories: [
		"platform-cms-builder",
		"analytics",
	],
	rules: [
		{
			id: "ecomtrack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.ecomtrack\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ecomtrack:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^ecomtrack$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
