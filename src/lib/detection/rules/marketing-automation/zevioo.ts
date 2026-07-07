import type { TechnologyDefinition } from '../../types';

export const zeviooTechnologyDefinition = {
	id: "zevioo",
	name: "Zevioo",
	website: "https://zevioo.com",
	description: "Zevioo is an AI-powered platform that helps ecommerce stores improve conversions, customer loyalty, and revenue through automated optimization and data-driven personalization.",
	icon: "Zevioo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "zevioo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("zevioo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
