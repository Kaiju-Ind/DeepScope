import type { TechnologyDefinition } from '../../types';

export const outbrainTechnologyDefinition = {
	id: "outbrain",
	name: "Outbrain",
	website: "https://www.outbrain.com",
	description: "Outbrain is a web advertising platform that displays boxes of links, known as chumboxes, to pages within websites.",
	icon: "Outbrain.svg",
	categories: [
		"widgets-misc",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "outbrain:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.outbrain\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "outbrain:jsGlobal:1",
			kind: "jsGlobal",
			property: "OB_ADV_ID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "outbrain:jsGlobal:2",
			kind: "jsGlobal",
			property: "OB_releaseVer",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "outbrain:jsGlobal:3",
			kind: "jsGlobal",
			property: "OutbrainPermaLink",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "outbrain:jsGlobal:4",
			kind: "jsGlobal",
			property: "obApi.version",
			valuePattern: new RegExp("^[\\d.]+$"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
