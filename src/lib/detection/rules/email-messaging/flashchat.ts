import type { TechnologyDefinition } from '../../types';

export const flashchatTechnologyDefinition = {
	id: "flashchat",
	name: "Flashchat",
	website: "https://flashchat.ai",
	description: "Flashchat is an automated messenger conversation tool.",
	icon: "Flashchat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "flashchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.flashchat\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
