import type { TechnologyDefinition } from '../../types';

export const splitTechnologyDefinition = {
	id: "split",
	name: "Split",
	website: "https://www.split.io",
	description: "Split is a feature delivery platform that powers feature flag management, software experimentation, and continuous delivery.",
	icon: "Split.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "split:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.split\\.io\\/(?:sdk\\/split-([\\d\\.]+)\\.min\\.js)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "split:jsGlobal:1",
			kind: "jsGlobal",
			property: "SPLITIO_API_KEY",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "split:jsGlobal:2",
			kind: "jsGlobal",
			property: "split_shopper_client",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "split:jsGlobal:3",
			kind: "jsGlobal",
			property: "split_visitor_client",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "split:jsGlobal:4",
			kind: "jsGlobal",
			property: "splitio",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
