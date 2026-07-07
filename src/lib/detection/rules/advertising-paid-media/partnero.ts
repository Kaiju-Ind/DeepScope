import type { TechnologyDefinition } from '../../types';

export const partneroTechnologyDefinition = {
	id: "partnero",
	name: "Partnero",
	website: "https://www.partnero.com",
	description: "Partnero is a partnership management platform designed for relationship-building.",
	icon: "Partnero.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "partnero:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.partnero\\.com\\/"),
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
