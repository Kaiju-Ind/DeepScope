import type { TechnologyDefinition } from '../../types';

export const loyaltylionTechnologyDefinition = {
	id: "loyaltylion",
	name: "LoyaltyLion",
	website: "https://loyaltylion.com",
	description: "LoyaltyLion is a data-driven ecommerce loyalty and engagement platform.",
	icon: "LoyaltyLion.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "loyaltylion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.loyaltylion\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "loyaltylion:jsGlobal:1",
			kind: "jsGlobal",
			property: "loyaltylion.version",
			valuePattern: new RegExp("([\\d\\-]+)"),
			version: {
				source: "match",
				group: 1,
			},
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
