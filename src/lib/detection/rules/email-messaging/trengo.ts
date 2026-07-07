import type { TechnologyDefinition } from '../../types';

export const trengoTechnologyDefinition = {
	id: "trengo",
	name: "Trengo",
	website: "https://trengo.com",
	description: "Trengo is an omnichannel communication platform that unifies all messaging channels into one single view.",
	icon: "Trengo.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "trengo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.widget\\.trengo\\.eu\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trengo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Trengo.eventBus",
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
