import type { TechnologyDefinition } from '../../types';

export const zeusTechnologyTechnologyDefinition = {
	id: "zeus-technology",
	name: "Zeus Technology",
	website: "https://www.zeustechnology.com",
	description: "Zeus Technology is a media monetisation platform that levels the playing field for publishers and advertisers of all sizes.",
	icon: "Zeus Technology.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "zeus-technology:jsGlobal:0",
			kind: "jsGlobal",
			property: "zeus.version",
			valuePattern: new RegExp("v([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zeus-technology:jsGlobal:1",
			kind: "jsGlobal",
			property: "zeusAdUnitPath",
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
