import type { TechnologyDefinition } from '../../types';

export const storylyTechnologyDefinition = {
	id: "storyly",
	name: "Storyly",
	website: "https://www.storyly.io",
	description: "Storyly is a platform that enables the creation of personalized, shoppable experiences for apps and websites.",
	icon: "Storyly.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "storyly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("web-story\\.storyly\\.io\\/v(\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "storyly:jsGlobal:1",
			kind: "jsGlobal",
			property: "StorylyWeb",
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
