import type { TechnologyDefinition } from '../../types';

export const vidoraTechnologyDefinition = {
	id: "vidora",
	name: "Vidora",
	website: "https://www.vidora.com",
	description: "Vidora is a real-time machine learning platform which focuses on consumer data.",
	icon: "Vidora.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "vidora:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.vidora\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vidora:jsGlobal:1",
			kind: "jsGlobal",
			property: "vidora",
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
