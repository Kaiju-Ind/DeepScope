import type { TechnologyDefinition } from '../../types';

export const kongetTechnologyDefinition = {
	id: "konget",
	name: "Konget",
	website: "https://konget.ru",
	description: "Konget is a platform that integrates applications for lead generation, a builder for automated outgoing calls, and a suite of marketing statistics and analytics.",
	icon: "Konget.svg",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "konget:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.konget\\.ru\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "konget:jsGlobal:1",
			kind: "jsGlobal",
			property: "__KONGET_PUBLIC__",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
