import type { TechnologyDefinition } from '../../types';

export const suiteshareTechnologyDefinition = {
	id: "suiteshare",
	name: "Suiteshare",
	website: "https://suiteshare.com/",
	description: "Suiteshare powers conversational shopping experiences.",
	icon: "Suiteshare.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "suiteshare:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.suiteshare\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
