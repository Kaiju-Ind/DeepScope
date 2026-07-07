import type { TechnologyDefinition } from '../../types';

export const convermaxTechnologyDefinition = {
	id: "convermax",
	name: "Convermax",
	website: "https://convermax.com",
	description: "Convermax is a search solution that enhances the search experience for ecommerce website visitors by providing more accurate and relevant results.",
	icon: "Convermax.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "convermax:jsGlobal:0",
			kind: "jsGlobal",
			property: "Convermax.addProductsHistory",
			description: "Page-owned global matches a known technology marker.",
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
