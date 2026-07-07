import type { TechnologyDefinition } from '../../types';

export const userlinkTechnologyDefinition = {
	id: "userlink",
	name: "Userlink",
	website: "https://userlink.ai",
	description: "Userlink is a platform that integrates AI chatbots into webshops to improve customer experience and boost sales.",
	icon: "Userlink.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "userlink:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("files\\.userlink\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "userlink:jsGlobal:1",
			kind: "jsGlobal",
			property: "setUserlinkChatVisible",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "userlink:jsGlobal:2",
			kind: "jsGlobal",
			property: "userlinkIsInAvailableTimePeriod",
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
