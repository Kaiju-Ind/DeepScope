import type { TechnologyDefinition } from '../../types';

export const onlimTechnologyDefinition = {
	id: "onlim",
	name: "Onlim",
	website: "https://onlim.com",
	description: "Onlim is a software platform designed for chatbots, social media management, and intelligent personal assistants.",
	icon: "Onlim.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "onlim:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.onlim\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "onlim:jsGlobal:1",
			kind: "jsGlobal",
			property: "Onlim",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "onlim:jsGlobal:2",
			kind: "jsGlobal",
			property: "OnlimChatbot",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
