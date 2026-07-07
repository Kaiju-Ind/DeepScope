import type { TechnologyDefinition } from '../../types';

export const shortlyTechnologyDefinition = {
	id: "shortly",
	name: "Shortly",
	website: "https://apps.shopify.com/shortly",
	description: "Shortly help create short URLs for influencer-marketing, social media posts & email-marketing campaigns with your own store domain.",
	icon: "Shortly.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "shortly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/shortly\\.shop\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
