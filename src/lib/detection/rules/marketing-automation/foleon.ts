import type { TechnologyDefinition } from '../../types';

export const foleonTechnologyDefinition = {
	id: "foleon",
	name: "Foleon",
	website: "https://www.foleon.com",
	description: "Foleon is a content creation platform designed for business teams to produce engaging and intelligent content experiences at scale.",
	icon: "Foleon.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "foleon:jsGlobal:0",
			kind: "jsGlobal",
			property: "foleon",
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
