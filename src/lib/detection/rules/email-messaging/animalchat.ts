import type { TechnologyDefinition } from '../../types';

export const animalchatTechnologyDefinition = {
	id: "animalchat",
	name: "AnimalChat",
	website: "https://animalchat.net",
	description: "AnimalChat is a messaging platform that connects pet owners and professionals, providing a flexible alternative to traditional communication methods.",
	icon: "AnimalChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "animalchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.animalchat\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
