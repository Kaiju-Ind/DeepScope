import type { TechnologyDefinition } from '../../types';

export const quicktextTechnologyDefinition = {
	id: "quicktext",
	name: "Quicktext",
	website: "https://www.quicktext.im",
	description: "Quicktext is an AI-powered hotel chatbot and instant communication platform designed to increase direct bookings for hotels.",
	icon: "Quicktext.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "quicktext:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.quicktext\\.im\\/"),
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
