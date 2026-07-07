import type { TechnologyDefinition } from '../../types';

export const sessionlyTechnologyDefinition = {
	id: "sessionly",
	name: "Sessionly",
	website: "https://sessionly.hubspotpagebuilder.com",
	description: "Sessionly is a loyalty and referral program for Shopware and Shopify merchants, focusing on customer retention and acquisition through rewards and detailed analytics.",
	icon: "Sessionly.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "sessionly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/sessionly\\.io\\/"),
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
		"shopware",
	],
} as const satisfies TechnologyDefinition;
