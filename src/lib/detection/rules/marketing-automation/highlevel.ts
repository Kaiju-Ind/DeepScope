import type { TechnologyDefinition } from '../../types';

export const highlevelTechnologyDefinition = {
	id: "highlevel",
	name: "HighLevel",
	website: "https://www.gohighlevel.com",
	description: "HighLevel is an all-in-one marketing and automation platform designed for marketing agencies and small businesses to manage CRM, marketing campaigns, sales funnels, appointment scheduling, and more.",
	icon: "HighLevel.svg",
	categories: [
		"marketing-automation",
		"business-tools",
	],
	rules: [
		{
			id: "highlevel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.leadconnectorhq\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "highlevel:jsGlobal:1",
			kind: "jsGlobal",
			property: "leadConnector.chatWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
