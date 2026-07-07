import type { TechnologyDefinition } from '../../types';

export const tokeetTechnologyDefinition = {
	id: "tokeet",
	name: "Tokeet",
	website: "https://www.tokeet.com",
	description: "Tokeet is an AI-powered property management software.",
	icon: "Tokeet.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tokeet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widgets\\.tokeet\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tokeet:jsGlobal:1",
			kind: "jsGlobal",
			property: "tokeetIWSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
