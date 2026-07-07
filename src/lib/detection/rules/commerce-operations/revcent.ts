import type { TechnologyDefinition } from '../../types';

export const revcentTechnologyDefinition = {
	id: "revcent",
	name: "RevCent",
	website: "https://revcent.com",
	description: "RevCent is a payment processing solution designed to manage and facilitate online transactions for businesses across various platforms.",
	icon: "RevCent.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "revcent:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.revcent\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
