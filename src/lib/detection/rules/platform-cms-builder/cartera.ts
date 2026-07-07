import type { TechnologyDefinition } from '../../types';

export const carteraTechnologyDefinition = {
	id: "cartera",
	name: "Cartera",
	website: "https://www.cartera.com",
	description: "Cartera is an ecommerce system that enables businesses to manage online sales, product listings, and transactions.",
	icon: "CarteraCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cartera:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cartera\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
