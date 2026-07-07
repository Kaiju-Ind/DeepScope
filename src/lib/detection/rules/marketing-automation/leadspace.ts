import type { TechnologyDefinition } from '../../types';

export const leadspaceTechnologyDefinition = {
	id: "leadspace",
	name: "Leadspace",
	website: "https://www.leadspace.com",
	description: "Leadspace is a customer data platform catering to B2B sales and marketing needs.",
	icon: "Leadspace.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "leadspace:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sfc\\.leadspace\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
