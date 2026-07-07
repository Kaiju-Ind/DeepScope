import type { TechnologyDefinition } from '../../types';

export const botbrainsTechnologyDefinition = {
	id: "botbrains",
	name: "botBrains",
	website: "https://www.botbrains.io",
	description: "botBrains is an AI-powered platform offering customer support chatbots that handle inquiries and improve response times.",
	icon: "botBrains.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "botbrains:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chat\\.botbrains\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "botbrains:jsGlobal:1",
			kind: "jsGlobal",
			property: "$botbrains",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "botbrains:jsGlobal:2",
			kind: "jsGlobal",
			property: "botbrainsCleanup",
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
