import type { TechnologyDefinition } from '../../types';

export const happyTalkTechnologyDefinition = {
	id: "happy-talk",
	name: "Happy Talk",
	website: "https://www.happytalk.io/",
	description: "HappyTalk is a customer consultation tool developed in Korea that automates interactions to support business communication.",
	icon: "HappyTalk.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "happy-talk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chat-static\\.happytalkio\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "happy-talk:jsGlobal:1",
			kind: "jsGlobal",
			property: "Happytalk",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
