import type { TechnologyDefinition } from '../../types';

export const porchTechnologyDefinition = {
	id: "porch",
	name: "Porch",
	website: "https://porch.com",
	description: "Porch is a moving management system that simplifies moving, insurance, and home improvement processes.",
	icon: "Porch.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "porch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.porch\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "porch:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^PorchBITracking$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "porch:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^porchbitracking$", "i"),
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
