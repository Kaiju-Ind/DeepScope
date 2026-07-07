import type { TechnologyDefinition } from '../../types';

export const phorestTechnologyDefinition = {
	id: "phorest",
	name: "Phorest",
	website: "https://www.phorest.com",
	description: "Phorest software is an all-in-one solution for managing and growing businesses in the hair, beauty, barber, and spa industries.",
	icon: "Phorest.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "phorest:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("booking-widget\\.phorestcdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
