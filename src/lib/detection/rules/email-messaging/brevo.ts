import type { TechnologyDefinition } from '../../types';

export const brevoTechnologyDefinition = {
	id: "brevo",
	name: "Brevo",
	website: "https://www.brevo.com",
	description: "Brevo is a live chat system designed for customer support and engagement on websites.",
	icon: "Brevo.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "brevo:dom:0",
			kind: "dom",
			selector: "iframe[src*='meet.brevo.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "brevo:jsGlobal:1",
			kind: "jsGlobal",
			property: "BrevoConversations",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
