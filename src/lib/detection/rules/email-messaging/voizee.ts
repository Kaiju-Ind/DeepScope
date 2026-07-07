import type { TechnologyDefinition } from '../../types';

export const voizeeTechnologyDefinition = {
	id: "voizee",
	name: "Voizee",
	website: "https://voizee.com",
	description: "Voizee is an AI-powered platform that enables businesses to manage automated and human-assisted text messaging and voice calling for customer communication and operational workflows.",
	icon: "Voizee.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "voizee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.voizee\\.com\\/"),
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
