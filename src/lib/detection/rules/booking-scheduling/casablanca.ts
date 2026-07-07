import type { TechnologyDefinition } from '../../types';

export const casablancaTechnologyDefinition = {
	id: "casablanca",
	name: "Casablanca",
	website: "https://casablanca.at",
	description: "Casablanca is a hotel booking and property management platform for accommodation businesses.",
	icon: "default.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "casablanca:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("frontend\\.casablanca\\.at\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "casablanca:dom:1",
			kind: "dom",
			selector: "a[href*='://ibe.casablanca.at/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "casablanca:dom:2",
			kind: "dom",
			selector: "iframe[src*='://ibe.casablanca.at/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
