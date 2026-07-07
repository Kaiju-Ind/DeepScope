import type { TechnologyDefinition } from '../../types';

export const meliboTechnologyDefinition = {
	id: "melibo",
	name: "Melibo",
	website: "https://www.melibo.de",
	description: "Melibo is an AI platform focused on enhancing customer service and advancing chatbot technology.",
	icon: "Melibo.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "melibo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.melibo\\.de\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "melibo:jsGlobal:1",
			kind: "jsGlobal",
			property: "melibo.openWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
