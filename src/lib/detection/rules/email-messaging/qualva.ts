import type { TechnologyDefinition } from '../../types';

export const qualvaTechnologyDefinition = {
	id: "qualva",
	name: "Qualva",
	website: "https://qualva.com",
	description: "Qualva is a chatbot platform designed to deliver consistent, user-focused interaction and support across various applications.",
	icon: "Qualva.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "qualva:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("form\\.qualva\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "qualva:jsGlobal:1",
			kind: "jsGlobal",
			property: "qualva.Widget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
