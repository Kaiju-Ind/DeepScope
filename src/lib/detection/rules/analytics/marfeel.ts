import type { TechnologyDefinition } from '../../types';

export const marfeelTechnologyDefinition = {
	id: "marfeel",
	name: "Marfeel",
	website: "https://www.marfeel.com",
	description: "Marfeel is a publisher platform that allows publishers to create, optimise and monetise their mobile websites.",
	icon: "Marfeel.svg",
	categories: [
		"analytics",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "marfeel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.marfeel\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "marfeel:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mrf\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "marfeel:jsGlobal:2",
			kind: "jsGlobal",
			property: "marfeel",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
