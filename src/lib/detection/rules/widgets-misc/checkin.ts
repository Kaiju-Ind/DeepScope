import type { TechnologyDefinition } from '../../types';

export const checkinTechnologyDefinition = {
	id: "checkin",
	name: "Checkin",
	website: "https://www.checkin.no",
	description: "Checkin is a system that automates registration processes.",
	icon: "Checkin.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "checkin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("registration\\.checkin\\.no"),
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
