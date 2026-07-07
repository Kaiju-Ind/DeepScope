import type { TechnologyDefinition } from '../../types';

export const payseraTechnologyDefinition = {
	id: "paysera",
	name: "Paysera",
	website: "https://www.paysera.com",
	description: "Paysera is a platform that provides money transfer and payment services.",
	icon: "Paysera.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "paysera:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.paysera\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
