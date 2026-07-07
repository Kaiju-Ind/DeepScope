import type { TechnologyDefinition } from '../../types';

export const carecartSalesPopUpTechnologyDefinition = {
	id: "carecart-sales-pop-up",
	name: "CareCart Sales Pop Up",
	website: "https://carecart.io/sales-pop-up-app",
	description: "CareCart Sales Pop Up is a stock countdown timer, recent sales notifications, live sales pop up widget.",
	icon: "CareCart.png",
	categories: [
		"ecommerce-extensions",
		"widgets-misc",
	],
	rules: [
		{
			id: "carecart-sales-pop-up:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sales-pop\\.carecart\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
