import type { TechnologyDefinition } from '../../types';

export const boulevardTechnologyDefinition = {
	id: "boulevard",
	name: "Boulevard",
	website: "https://www.joinblvd.com",
	description: "Boulevard is a business management platform tailored to streamline appointment-based operations, specifically designed for the wellness industry.",
	icon: "Boulevard.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "boulevard:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.joinboulevard\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "boulevard:dom:1",
			kind: "dom",
			selector: "iframe[src*='.boulevard.io']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
