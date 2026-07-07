import type { TechnologyDefinition } from '../../types';

export const rechargeTechnologyDefinition = {
	id: "recharge",
	name: "Recharge",
	website: "https://rechargepayments.com",
	description: "Recharge is the a subscription payments platform designed for merchants to set up and manage dynamic recurring billing across web and mobile.",
	icon: "Recharge.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "recharge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("rechargeassets-bootstrapheroes-rechargeapps\\.netdna-ssl\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "recharge:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.rechargecdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "recharge:jsGlobal:2",
			kind: "jsGlobal",
			property: "ReChargeWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
	implies: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
