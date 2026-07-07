import type { TechnologyDefinition } from '../../types';

export const growaveTechnologyDefinition = {
	id: "growave",
	name: "Growave",
	website: "https://growave.io",
	description: "Growave is the all-in-one app: social login and sharing, reviews, wishlists, instagram feed, automated emails and more.",
	icon: "Growave.svg",
	categories: [
		"marketing-automation",
		"authentication-identity",
	],
	rules: [
		{
			id: "growave:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.socialshopwave\\.com\\/"),
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
