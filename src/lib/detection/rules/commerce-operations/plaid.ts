import type { TechnologyDefinition } from '../../types';

export const plaidTechnologyDefinition = {
	id: "plaid",
	name: "Plaid",
	website: "https://plaid.com",
	description: "Plaid is a fintech company that facilitates communication between financial services apps and users' banks and credit card providers.",
	icon: "Plaid.svg",
	categories: [
		"commerce-operations",
		"widgets-misc",
	],
	rules: [
		{
			id: "plaid:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.plaid\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "plaid:jsGlobal:1",
			kind: "jsGlobal",
			property: "Plaid.version",
			valuePattern: new RegExp("([\\.\\d]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "plaid:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("cdn\\.plaid\\.com\\/", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
