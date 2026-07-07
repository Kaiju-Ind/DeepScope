import type { TechnologyDefinition } from '../../types';

export const hanselTechnologyDefinition = {
	id: "hansel",
	name: "Hansel",
	website: "https://hansel.io",
	description: "Hansel is a B2B enterprise software that deploys real-time Nudges to drive feature adoption and address user drop-offs, at scale.",
	icon: "Hansel.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "hansel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hansel\\.io\\/web\\/([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hansel:jsGlobal:1",
			kind: "jsGlobal",
			property: "Hansel",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hansel:jsGlobal:2",
			kind: "jsGlobal",
			property: "HanselPX",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
