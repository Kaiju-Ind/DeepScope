import type { TechnologyDefinition } from '../../types';

export const segmentTechnologyDefinition = {
	id: "segment",
	name: "Segment",
	website: "https://segment.com",
	description: "Segment is a customer data platform (CDP) that helps you collect, clean, and control your customer data.",
	icon: "Segment.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "segment:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.segment\\.com\\/analytics\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "segment:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/segment-wrapper\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "segment:jsGlobal:2",
			kind: "jsGlobal",
			property: "__SEGMENT_INSPECTOR__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "segment:jsGlobal:3",
			kind: "jsGlobal",
			property: "analytics.SNIPPET_VERSION",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "segment:jsGlobal:4",
			kind: "jsGlobal",
			property: "analytics.VERSION",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "segment:dns:5",
			kind: "dns",
			valuePattern: new RegExp("segment-site-verification", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
