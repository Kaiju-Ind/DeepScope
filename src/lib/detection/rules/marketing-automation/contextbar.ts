import type { TechnologyDefinition } from '../../types';

export const contextbarTechnologyDefinition = {
	id: "contextbar",
	name: "ContextBar",
	website: "https://contextbar.ru",
	description: "ContextBar is a tool designed to attract consistent, thematically relevant visitors to a website.",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "contextbar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.contextbar\\.ru\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
