import type { TechnologyDefinition } from '../../types';

export const evervizTechnologyDefinition = {
	id: "everviz",
	name: "Everviz",
	website: "https://www.everviz.com",
	description: "Everviz is an online tool for creating interactive charts and maps, enabling data visualization with customizable features.",
	icon: "Everviz.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "everviz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.everviz\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "everviz:jsGlobal:1",
			kind: "jsGlobal",
			property: "everviz.beforePrint",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
