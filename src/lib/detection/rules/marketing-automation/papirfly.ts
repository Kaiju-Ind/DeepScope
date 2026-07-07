import type { TechnologyDefinition } from '../../types';

export const papirflyTechnologyDefinition = {
	id: "papirfly",
	name: "Papirfly",
	website: "https://www.papirfly.com",
	description: "Papirfly is an all-in-one brand management platform.",
	icon: "Papirfly.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "papirfly:dom:0",
			kind: "dom",
			selector: "link[href*='/papirfly-base.min.css?']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "papirfly:jsGlobal:1",
			kind: "jsGlobal",
			property: "Papirfly",
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
