import type { TechnologyDefinition } from '../../types';

export const caastTvTechnologyDefinition = {
	id: "caast-tv",
	name: "Caast.tv",
	website: "https://en.caast.tv",
	description: "Caast.tv is a digital commercial animation solution integrated into the ecommerce customer journey.",
	icon: "Caast.tv.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "caast-tv:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.caast\\.tv\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "caast-tv:jsGlobal:1",
			kind: "jsGlobal",
			property: "caast.open",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "caast-tv:jsGlobal:2",
			kind: "jsGlobal",
			property: "caastInstance",
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
