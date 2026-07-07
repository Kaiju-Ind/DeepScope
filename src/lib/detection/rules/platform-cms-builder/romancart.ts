import type { TechnologyDefinition } from '../../types';

export const romancartTechnologyDefinition = {
	id: "romancart",
	name: "RomanCart",
	website: "https://www.romancart.com",
	description: "RomanCart is a shopping cart and internet marketing system designed to support online sales, manage product listings, process transactions, and facilitate basic digital marketing functions for ecommerce websites.",
	icon: "RomanCart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "romancart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.romancart\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
