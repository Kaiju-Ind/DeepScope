import type { TechnologyDefinition } from '../../types';

export const dezrezTechnologyDefinition = {
	id: "dezrez",
	name: "Dezrez",
	website: "https://www.dezrez.com",
	description: "Dezrez is an estate agent software platform that provides tools for property listings, client relationship management, marketing, and transaction handling within real estate agencies.",
	icon: "Dezrez.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "dezrez:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.dezrez\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dezrez:dom:1",
			kind: "dom",
			selector: "iframe[src*='www.dezrez.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
