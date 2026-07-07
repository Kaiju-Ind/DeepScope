import type { TechnologyDefinition } from '../../types';

export const biletoTechnologyDefinition = {
	id: "bileto",
	name: "Bileto",
	website: "https://www.bileto.com",
	description: "Bileto is an all-in-one platform for ticket sale and inspection.",
	icon: "Bileto.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "bileto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bileto\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
