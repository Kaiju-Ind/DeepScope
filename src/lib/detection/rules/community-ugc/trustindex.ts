import type { TechnologyDefinition } from '../../types';

export const trustindexTechnologyDefinition = {
	id: "trustindex",
	name: "Trustindex",
	website: "https://www.trustindex.io",
	description: "Trustindex is a review management tool that helps businesses effectively manage and monitor customer reviews.",
	icon: "Trustindex.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "trustindex:dom:0",
			kind: "dom",
			selector: "link[href*='.trustindex.io/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "trustindex:jsGlobal:1",
			kind: "jsGlobal",
			property: "Trustindex",
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
