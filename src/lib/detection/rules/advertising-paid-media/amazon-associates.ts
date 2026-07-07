import type { TechnologyDefinition } from '../../types';

export const amazonAssociatesTechnologyDefinition = {
	id: "amazon-associates",
	name: "Amazon Associates",
	website: "https://affiliate-program.amazon.com",
	description: "Amazon Associates is an affiliate marketing program that allows website owners and bloggers to create links and earn referral fees when customers click through and buy products from Amazon.",
	icon: "Amazon.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "amazon-associates:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.associates-amazon\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "amazon-associates:dom:1",
			kind: "dom",
			selector: "a[href*='amazon.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "amazon-associates:dom:2",
			kind: "dom",
			selector: "a[href*='amzn.to']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
