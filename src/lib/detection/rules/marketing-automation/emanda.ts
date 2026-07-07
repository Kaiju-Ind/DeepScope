import type { TechnologyDefinition } from '../../types';

export const emandaTechnologyDefinition = {
	id: "emanda",
	name: "Emanda",
	website: "https://emanda.com.br",
	description: "Emanda is a platform offering SMS Marketing and Smart Email Marketing solutions.",
	icon: "Emanda.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "emanda:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.emanda\\.com\\.br\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "emanda:jsGlobal:1",
			kind: "jsGlobal",
			property: "linkEmanda",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "emanda:jsGlobal:2",
			kind: "jsGlobal",
			property: "srcEmaScript",
			valuePattern: new RegExp("app\\.emanda\\.com\\.br\\/"),
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
