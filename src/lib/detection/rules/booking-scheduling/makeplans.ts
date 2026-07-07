import type { TechnologyDefinition } from '../../types';

export const makeplansTechnologyDefinition = {
	id: "makeplans",
	name: "Makeplans",
	website: "https://makeplans.com",
	description: "Makeplans is a scheduling system designed for appointment booking and event registration, providing tools to manage availability, reservations, and attendee organization.",
	icon: "Makeplans.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "makeplans:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.makeplans\\.com"),
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
