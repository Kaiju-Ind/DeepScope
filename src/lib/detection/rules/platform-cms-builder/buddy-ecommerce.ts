import type { TechnologyDefinition } from '../../types';

export const buddyEcommerceTechnologyDefinition = {
	id: "buddy-ecommerce",
	name: "Buddy eCommerce",
	website: "https://hellobuddy.app",
	description: "Buddy eCommerce is a multi-tenant software-as-a-service (SaaS) ecommerce platform that enables businesses to create and manage branded storefront websites with centralized infrastructure and scalable online retail functionality.",
	icon: "BuddyeCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "buddy-ecommerce:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Buddy eCommerce$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "buddy-ecommerce:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Buddy eCommerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
