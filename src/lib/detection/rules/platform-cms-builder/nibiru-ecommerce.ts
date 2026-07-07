import type { TechnologyDefinition } from '../../types';

export const nibiruEcommerceTechnologyDefinition = {
	id: "nibiru-ecommerce",
	name: "Nibiru Ecommerce",
	website: "https://nibiru.uy",
	description: "Nibiru Ecommerce is a Uruguay-based SaaS platform for building and managing online stores with no sales commissions, offering integrations, scalability, and full control from day one.",
	icon: "Nibiru Ecommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nibiru-ecommerce:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^Nibiru Ecommerce$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "nibiru-ecommerce:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^nibiru ecommerce$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
