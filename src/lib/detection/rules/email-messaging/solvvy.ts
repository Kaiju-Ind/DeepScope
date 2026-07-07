import type { TechnologyDefinition } from '../../types';

export const solvvyTechnologyDefinition = {
	id: "solvvy",
	name: "Solvvy",
	website: "https://solvvy.com/",
	description: "Solvvy provides live chat and chatbot services.",
	icon: "solvvy.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "solvvy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.solvvy\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "solvvy:jsGlobal:1",
			kind: "jsGlobal",
			property: "Solvvy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
