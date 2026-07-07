import type { TechnologyDefinition } from '../../types';

export const chatfoodTechnologyDefinition = {
	id: "chatfood",
	name: "ChatFood",
	website: "https://www.chatfood.io",
	description: "ChatFood is a platform providing mobile ordering tailored for hospitality brands.",
	icon: "ChatFood.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatfood:jsGlobal:0",
			kind: "jsGlobal",
			property: "ChatFoodWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chatfood:jsGlobal:1",
			kind: "jsGlobal",
			property: "ChatFoodWidgetClient",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
