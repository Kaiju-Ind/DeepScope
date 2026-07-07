import type { TechnologyDefinition } from '../../types';

export const haptikTechnologyDefinition = {
	id: "haptik",
	name: "Haptik",
	website: "https://www.haptik.ai",
	description: "Haptik is an Indian enterprise conversational AI platform founded in August 2013, and acquired by Reliance Industries Limited in 2019.",
	icon: "Haptik.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "haptik:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.haptikapi\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "haptik:jsGlobal:1",
			kind: "jsGlobal",
			property: "HaptikSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "haptik:jsGlobal:2",
			kind: "jsGlobal",
			property: "haptik",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "haptik:jsGlobal:3",
			kind: "jsGlobal",
			property: "haptikInitSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
