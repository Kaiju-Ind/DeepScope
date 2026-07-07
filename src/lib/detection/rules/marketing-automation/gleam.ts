import type { TechnologyDefinition } from '../../types';

export const gleamTechnologyDefinition = {
	id: "gleam",
	name: "Gleam",
	website: "https://gleam.io",
	description: "Gleam is a marketing app that aids in expanding business email lists, ecommerce stores, SaaS businesses, and Facebook audiences.",
	icon: "Gleam.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "gleam:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.gleamjs\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gleam:jsGlobal:1",
			kind: "jsGlobal",
			property: "Gleam",
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
