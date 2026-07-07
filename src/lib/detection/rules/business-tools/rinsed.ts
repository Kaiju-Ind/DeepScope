import type { TechnologyDefinition } from '../../types';

export const rinsedTechnologyDefinition = {
	id: "rinsed",
	name: "Rinsed",
	website: "https://www.rinsed.com",
	description: "Rinsed is a customer relationship management software tailored for the car wash industry.",
	icon: "Rinsed.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "rinsed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.app\\.rinsed\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rinsed:jsGlobal:1",
			kind: "jsGlobal",
			property: "isRinsedScriptLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
