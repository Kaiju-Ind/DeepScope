import type { TechnologyDefinition } from '../../types';

export const hooryTechnologyDefinition = {
	id: "hoory",
	name: "Hoory",
	website: "https://www.hoory.com",
	description: "Hoory is a Conversational AI platform that automates customer support.",
	icon: "Hoory.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "hoory:jsGlobal:0",
			kind: "jsGlobal",
			property: "$hoory",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hoory:jsGlobal:1",
			kind: "jsGlobal",
			property: "hoorySDK.reRun",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hoory:jsGlobal:2",
			kind: "jsGlobal",
			property: "hoorySettings",
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
