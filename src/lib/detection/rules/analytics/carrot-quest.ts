import type { TechnologyDefinition } from '../../types';

export const carrotQuestTechnologyDefinition = {
	id: "carrot-quest",
	name: "Carrot quest",
	website: "https://www.carrotquest.io",
	description: "Carrot quest is a customer engagement and communication platform that aids businesses in improving interactions with users and customers through targeted messaging, in-app messaging, live chat, email campaigns, and user behavior tracking.",
	icon: "Carrot quest.svg",
	categories: [
		"analytics",
		"email-messaging",
	],
	rules: [
		{
			id: "carrot-quest:jsGlobal:0",
			kind: "jsGlobal",
			property: "carrotquest",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "carrot-quest:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.carrotquest\\.app", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "carrot-quest:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.carrotquest\\.app", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
