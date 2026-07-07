import type { TechnologyDefinition } from '../../types';

export const zadarmaTechnologyDefinition = {
	id: "zadarma",
	name: "Zadarma",
	website: "https://zadarma.com",
	description: "Zadarma is a VoIP service that provides cloud-based voice communications for businesses, supporting internet calling, virtual phone numbers, and call management features.",
	icon: "Zadarma.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "zadarma:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("my\\.zadarma\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
