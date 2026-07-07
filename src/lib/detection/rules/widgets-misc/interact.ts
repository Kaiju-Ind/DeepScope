import type { TechnologyDefinition } from '../../types';

export const interactTechnologyDefinition = {
	id: "interact",
	name: "Interact",
	website: "https://www.tryinteract.com",
	description: "Interact is a tool for creating online quizzes.",
	icon: "Interact.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "interact:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tryinteract\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "interact:jsGlobal:1",
			kind: "jsGlobal",
			property: "InteractApp.name",
			valuePattern: new RegExp("InteractApp"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "interact:jsGlobal:2",
			kind: "jsGlobal",
			property: "InteractPromotionObject",
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
