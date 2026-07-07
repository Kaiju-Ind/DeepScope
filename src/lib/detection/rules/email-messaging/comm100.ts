import type { TechnologyDefinition } from '../../types';

export const comm100TechnologyDefinition = {
	id: "comm100",
	name: "Comm100",
	website: "https://www.comm100.com",
	description: "Comm100 is a provider of customer service and communication products.",
	icon: "Comm100.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "comm100:jsGlobal:0",
			kind: "jsGlobal",
			property: "Comm100API",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "comm100:jsGlobal:1",
			kind: "jsGlobal",
			property: "comm100_chatButton",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "comm100:jsGlobal:2",
			kind: "jsGlobal",
			property: "comm100_livechat_open_link",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
