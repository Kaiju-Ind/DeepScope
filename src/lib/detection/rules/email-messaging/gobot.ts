import type { TechnologyDefinition } from '../../types';

export const gobotTechnologyDefinition = {
	id: "gobot",
	name: "Gobot",
	website: "https://www.getgobot.com",
	description: "Gobot is a tool that increases website leads, sales, and engagement through a conversational bot.",
	icon: "Gobot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "gobot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getgobot\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gobot:jsGlobal:1",
			kind: "jsGlobal",
			property: "gobot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gobot:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_gobot$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
