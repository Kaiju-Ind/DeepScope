import type { TechnologyDefinition } from '../../types';

export const megaTechnologyDefinition = {
	id: "mega",
	name: "Mega",
	website: "https://www.gomega.ai",
	description: "Mega is a platform that applies artificial intelligence to automate and improve search engine optimization processes and paid advertising campaign performance.",
	icon: "Mega.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "mega:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.gomega\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mega:jsGlobal:1",
			kind: "jsGlobal",
			property: "MegaTag.getAttribution",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
