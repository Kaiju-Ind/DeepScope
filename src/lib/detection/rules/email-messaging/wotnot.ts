import type { TechnologyDefinition } from '../../types';

export const wotnotTechnologyDefinition = {
	id: "wotnot",
	name: "WotNot",
	website: "https://wotnot.io",
	description: "WotNot is a no-code chatbot platform enabling users to create and deploy chatbots without programming skills.",
	icon: "WotNot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "wotnot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.wotnot\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wotnot:jsGlobal:1",
			kind: "jsGlobal",
			property: "WotNot.GetChatWindow",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
