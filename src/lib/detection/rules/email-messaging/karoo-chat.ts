import type { TechnologyDefinition } from '../../types';

export const karooChatTechnologyDefinition = {
	id: "karoo-chat",
	name: "Karoo Chat",
	website: "https://karoo.com.br",
	description: "Karoo Chat is a platform that combines human and automated customer service, offering online live chat for customer support.",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "karoo-chat:jsGlobal:0",
			kind: "jsGlobal",
			property: "_kwp.host",
			valuePattern: new RegExp("widget\\.karoo\\.com\\.br"),
			description: "Page-owned global matches a known technology marker.",
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
