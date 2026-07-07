import type { TechnologyDefinition } from '../../types';

export const ecomchainTechnologyDefinition = {
	id: "ecomchain",
	name: "eComchain",
	website: "https://ecomchain.com",
	description: "eComchain is a cloud-based ecommerce platform offering B2B and B2C solutions with integrated enterprise resource planning (ERP).",
	icon: "eComchain.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ecomchain:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.ecomchain\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
