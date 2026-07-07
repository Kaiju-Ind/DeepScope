import type { TechnologyDefinition } from '../../types';

export const chatwootTechnologyDefinition = {
	id: "chatwoot",
	name: "Chatwoot",
	website: "https://www.chatwoot.com",
	description: "Chatwoot is a customer support tool for instant messaging channels.",
	icon: "Chatwoot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatwoot:jsGlobal:0",
			kind: "jsGlobal",
			property: "$chatwoot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chatwoot:jsGlobal:1",
			kind: "jsGlobal",
			property: "chatwootSDK",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:chatwoot:chatwoot:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
