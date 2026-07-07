import type { TechnologyDefinition } from '../../types';

export const sprinklrTechnologyDefinition = {
	id: "sprinklr",
	name: "Sprinklr",
	website: "https://www.sprinklr.com",
	description: "Sprinklr is a customer experience management platform that unifies front-office teams, tools, and touchpoints using AI technology.",
	icon: "Sprinklr.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "sprinklr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sprinklr\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sprinklr:jsGlobal:1",
			kind: "jsGlobal",
			property: "sprChat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sprinklr:jsGlobal:2",
			kind: "jsGlobal",
			property: "sprChatSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
