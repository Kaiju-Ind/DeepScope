import type { TechnologyDefinition } from '../../types';

export const xenoChatTechnologyDefinition = {
	id: "xeno-chat",
	name: "Xeno Chat",
	website: "https://xenoapp.com",
	description: "Xeno Chat is a messaging app that enables live responses to support customer attraction, conversion, and retention.",
	icon: "Xeno.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "xeno-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.xeno\\.app"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "xeno-chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "_xeno._Utils",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "xeno-chat:jsGlobal:2",
			kind: "jsGlobal",
			property: "_xenoLoader",
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
