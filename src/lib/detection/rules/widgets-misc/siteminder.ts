import type { TechnologyDefinition } from '../../types';

export const siteminderTechnologyDefinition = {
	id: "siteminder",
	name: "SiteMinder",
	website: "https://www.siteminder.com",
	description: "SiteMinder is an appointment booking solution designed for hotels.",
	icon: "SiteMinder.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "siteminder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.siteminder\\.com"),
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
