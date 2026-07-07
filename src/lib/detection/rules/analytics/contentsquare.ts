import type { TechnologyDefinition } from '../../types';

export const contentsquareTechnologyDefinition = {
	id: "contentsquare",
	name: "Contentsquare",
	website: "https://contentsquare.com",
	description: "Contentsquare is a digital experience analytics platform with session replay, heatmaps, and journey analysis.",
	icon: "Contentsquare.svg",
	categories: [
		"analytics",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "contentsquare:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.contentsquare\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "contentsquare:jsGlobal:1",
			kind: "jsGlobal",
			property: "CS_CONF.trackerDomain",
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
