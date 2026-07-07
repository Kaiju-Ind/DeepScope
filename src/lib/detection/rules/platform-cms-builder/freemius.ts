import type { TechnologyDefinition } from '../../types';

export const freemiusTechnologyDefinition = {
	id: "freemius",
	name: "Freemius",
	website: "https://freemius.com",
	description: "Freemius is a managed ecommerce engine designed for selling WordPress plugins.",
	icon: "Freemius.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "freemius:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("checkout\\.freemius\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
