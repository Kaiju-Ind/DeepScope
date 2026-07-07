import type { TechnologyDefinition } from '../../types';

export const claspoTechnologyDefinition = {
	id: "claspo",
	name: "Claspo",
	website: "https://claspo.io",
	description: "Claspo is a pop-up builder designed to generate and capture leads, increase sales, and grow subscriber lists.",
	icon: "Claspo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "claspo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\.claspo\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "claspo:jsGlobal:1",
			kind: "jsGlobal",
			property: "claspo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
