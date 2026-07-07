import type { TechnologyDefinition } from '../../types';

export const manychatTechnologyDefinition = {
	id: "manychat",
	name: "ManyChat",
	website: "https://manychat.com/",
	description: "ManyChat is a service that allows you to create chatbots for Facebook Messenger.",
	icon: "ManyChat.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "manychat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.manychat\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "manychat:jsGlobal:1",
			kind: "jsGlobal",
			property: "mcwidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
