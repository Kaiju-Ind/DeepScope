import type { TechnologyDefinition } from '../../types';

export const smallchatTechnologyDefinition = {
	id: "smallchat",
	name: "Smallchat",
	website: "https://small.chat",
	description: "Smallchat is a tool that allows users to engage with website visitors directly within Slack.",
	icon: "Smallchat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "smallchat:jsGlobal:0",
			kind: "jsGlobal",
			property: "Smallchat",
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
