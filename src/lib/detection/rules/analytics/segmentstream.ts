import type { TechnologyDefinition } from '../../types';

export const segmentstreamTechnologyDefinition = {
	id: "segmentstream",
	name: "SegmentStream",
	website: "https://segmentstream.com",
	description: "SegmentStream is a AI-powered marketing analytics platform built for data-driven CMOs, web analysts and performance marketing teams.",
	icon: "SegmentStream.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "segmentstream:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.segmentstream\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "segmentstream:jsGlobal:1",
			kind: "jsGlobal",
			property: "segmentstream.VERSION",
			valuePattern: new RegExp("(.+)"),
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
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
