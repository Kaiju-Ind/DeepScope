import type { TechnologyDefinition } from '../../types';

export const prospaTechnologyDefinition = {
	id: "prospa",
	name: "Prospa",
	website: "https://www.prospa.com",
	description: "Prospa is a platform that enables small businesses to pay for purchases over time with an interest-free repayment solution.",
	icon: "Prospa.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "prospa:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.prospa\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
