import type { TechnologyDefinition } from '../../types';

export const pushowlTechnologyDefinition = {
	id: "pushowl",
	name: "PushOwl",
	website: "https://pushowl.com",
	description: "PushOwl is a push notification platform for ecommerce stores.",
	icon: "PushOwl.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pushowl:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pushowl\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pushowl:jsGlobal:1",
			kind: "jsGlobal",
			property: "pushowl",
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
	},
} as const satisfies TechnologyDefinition;
