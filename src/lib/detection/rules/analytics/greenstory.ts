import type { TechnologyDefinition } from '../../types';

export const greenstoryTechnologyDefinition = {
	id: "greenstory",
	name: "GreenStory",
	website: "https://www.greenstory.io",
	description: "GreenStory is a supply chain transparency analytics tool that helps businesses track and report on their supply chain operations.",
	icon: "GreenStory.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "greenstory:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.greenstory\\.ca\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "greenstory:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackJsonpGreenStoryWidgets",
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
