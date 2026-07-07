import type { TechnologyDefinition } from '../../types';

export const qbrickTechnologyDefinition = {
	id: "qbrick",
	name: "Qbrick",
	website: "https://www.qbrick.com",
	description: "Qbrick is a video advertising system.",
	icon: "Qbrick.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "qbrick:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.qbrick\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "qbrick:jsGlobal:1",
			kind: "jsGlobal",
			property: "Qbrick",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
