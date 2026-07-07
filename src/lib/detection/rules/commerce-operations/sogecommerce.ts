import type { TechnologyDefinition } from '../../types';

export const sogecommerceTechnologyDefinition = {
	id: "sogecommerce",
	name: "Sogecommerce",
	website: "https://sogecommerce.societegenerale.eu",
	description: "Sogecommerce is an online payment system provided by Societe Generale for processing digital transactions securely.",
	icon: "Sogecommerce.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "sogecommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/woo-sogecommerce-payment\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
