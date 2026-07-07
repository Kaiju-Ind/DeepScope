import type { TechnologyDefinition } from '../../types';

export const formitableTechnologyDefinition = {
	id: "formitable",
	name: "Formitable",
	website: "https://formitable.com",
	description: "Formitable is an reservation management system for restaurants.",
	icon: "Formitable.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "formitable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("formitable\\.js(?:\\?ver=([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "formitable:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.formitable\\.com"),
			description: "Script source URL matches a known technology marker.",
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
