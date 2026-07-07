import type { TechnologyDefinition } from '../../types';

export const aptaniaTechnologyDefinition = {
	id: "aptania",
	name: "Aptania",
	website: "https://www.aptania.com",
	description: "Aptania is an all-in-one customer data platform that provides web analytics, lead generation, and customer insights in a single system.",
	icon: "Aptania.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "aptania:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.aptania\\.com\\/"),
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
} as const satisfies TechnologyDefinition;
