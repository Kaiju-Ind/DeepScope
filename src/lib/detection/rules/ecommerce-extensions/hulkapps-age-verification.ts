import type { TechnologyDefinition } from '../../types';

export const hulkappsAgeVerificationTechnologyDefinition = {
	id: "hulkapps-age-verification",
	name: "HulkApps Age Verification",
	website: "https://www.hulkapps.com/products/age-verification-shopify",
	description: "HulkApps Age Verification allow your customers to certify their age before they land in your store.",
	icon: "HulkApps.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "hulkapps-age-verification:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("age-verification\\.hulkapps\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
