import type { TechnologyDefinition } from '../../types';

export const talkableTechnologyDefinition = {
	id: "talkable",
	name: "Talkable",
	website: "https://www.talkable.com",
	description: "Talkable is a cloud-based referral marketing system that assists medium to large businesses with campaign creation and channel performance tracking.",
	icon: "Talkable.svg",
	categories: [
		"experimentation-optimization",
		"commerce-operations",
		"marketing-automation",
	],
	rules: [
		{
			id: "talkable:jsGlobal:0",
			kind: "jsGlobal",
			property: "talkable.config.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
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
