import type { TechnologyDefinition } from '../../types';

export const easichatTechnologyDefinition = {
	id: "easichat",
	name: "EasiChat",
	website: "https://easichat.co.uk",
	description: "Easichat is an online customer service platform that uses AI to automate and manage customer interactions.",
	icon: "EasiChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "easichat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.easichat\\.co\\.uk"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "easichat:jsGlobal:1",
			kind: "jsGlobal",
			property: "easiChat.widget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
