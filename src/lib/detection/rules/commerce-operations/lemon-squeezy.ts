import type { TechnologyDefinition } from '../../types';

export const lemonSqueezyTechnologyDefinition = {
	id: "lemon-squeezy",
	name: "Lemon Squeezy",
	website: "https://www.lemonsqueezy.com",
	description: "Lemon Squeezy is a platform designed for SaaS businesses, providing functionalities such as payment processing, subscription management, global tax compliance, fraud prevention, multi-currency support, failed payment recovery, and integration with PayPal, with the aim of facilitating the operational management of software businesses.",
	icon: "Lemon Squeezy.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "lemon-squeezy:jsGlobal:0",
			kind: "jsGlobal",
			property: "LemonSqueezy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lemon-squeezy:jsGlobal:1",
			kind: "jsGlobal",
			property: "lemonSqueezyAffiliateConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
