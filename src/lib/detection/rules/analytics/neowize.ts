import type { TechnologyDefinition } from '../../types';

export const neowizeTechnologyDefinition = {
	id: "neowize",
	name: "Neowize",
	website: "https://www.neowize.com",
	description: "Neowize is a platform that applies artificial intelligence and data science to enhance analytics and decision-making in ecommerce.",
	icon: "Neowize.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "neowize:jsGlobal:0",
			kind: "jsGlobal",
			property: "neowize_api_key",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "neowize:jsGlobal:1",
			kind: "jsGlobal",
			property: "neowize_cart_data",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
