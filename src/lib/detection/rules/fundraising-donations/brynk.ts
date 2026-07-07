import type { TechnologyDefinition } from '../../types';

export const brynkTechnologyDefinition = {
	id: "brynk",
	name: "BRYNK",
	website: "https://www.brynk.com",
	description: "BRYNK is an all-in-one platform for managing memberships, donors, events, and payments or fundraising activities.",
	icon: "BRYNK.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "brynk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.brynk\\.org"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
