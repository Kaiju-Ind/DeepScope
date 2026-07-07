import type { TechnologyDefinition } from '../../types';

export const five9TechnologyDefinition = {
	id: "five9",
	name: "Five9",
	website: "https://www.five9.com",
	description: "Five9 is a cloud-based contact center platform that enables businesses to manage customer interactions across multiple communication channels, including voice, email, chat, and social media.",
	icon: "Five9.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "five9:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.five9\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "five9:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.five9\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "five9:jsGlobal:2",
			kind: "jsGlobal",
			property: "Five9.Api",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "five9:jsGlobal:3",
			kind: "jsGlobal",
			property: "Five9Modules",
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
