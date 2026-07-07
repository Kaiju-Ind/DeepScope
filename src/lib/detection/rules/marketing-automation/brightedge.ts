import type { TechnologyDefinition } from '../../types';

export const brightedgeTechnologyDefinition = {
	id: "brightedge",
	name: "BrightEdge",
	website: "https://www.brightedge.com",
	description: "BrightEdge is an SEO solution and content performance marketing platform.",
	icon: "BrightEdge.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "brightedge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.brightedge\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "brightedge:jsGlobal:1",
			kind: "jsGlobal",
			property: "BEJSSDK.CLIENT_VERSION",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "brightedge:jsGlobal:2",
			kind: "jsGlobal",
			property: "_bright3.VERSION",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "brightedge:jsGlobal:3",
			kind: "jsGlobal",
			property: "be_sdk_options",
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
