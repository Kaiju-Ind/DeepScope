import type { TechnologyDefinition } from '../../types';

export const rockerboxTechnologyDefinition = {
	id: "rockerbox",
	name: "Rockerbox",
	website: "https://www.rockerbox.com",
	description: "Rockerbox is a provider of multi-touch attribution software.",
	icon: "Rockerbox.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "rockerbox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wxyz\\.rb\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rockerbox:jsGlobal:1",
			kind: "jsGlobal",
			property: "RB.source",
			confidence: 50,
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
