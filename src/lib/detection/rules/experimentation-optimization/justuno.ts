import type { TechnologyDefinition } from '../../types';

export const justunoTechnologyDefinition = {
	id: "justuno",
	name: "Justuno",
	website: "https://www.justuno.com",
	description: "Justuno is a visitor conversion optimisation platform.",
	icon: "Justuno.svg",
	categories: [
		"experimentation-optimization",
		"commerce-operations",
	],
	rules: [
		{
			id: "justuno:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("my\\.jst\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "justuno:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.justuno\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "justuno:jsGlobal:2",
			kind: "jsGlobal",
			property: "JustunoApp",
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
