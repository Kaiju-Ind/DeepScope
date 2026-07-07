import type { TechnologyDefinition } from '../../types';

export const falakcartTechnologyDefinition = {
	id: "falakcart",
	name: "Falakcart",
	website: "https://falakcart.com",
	description: "Falakcart is an ecommerce platform for creating and managing online stores with integrated storefront and checkout tooling.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "falakcart:header:0",
			kind: "header",
			key: "set-cookie",
			valuePattern: new RegExp("falakcart-session=", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
