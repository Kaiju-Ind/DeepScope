import type { TechnologyDefinition } from '../../types';

export const richrelevanceTechnologyDefinition = {
	id: "richrelevance",
	name: "RichRelevance",
	website: "https://richrelevance.com",
	description: "RichRelevance is a cloud-based omnichannel personalisation platform built to help Retailers, B2B, financial services, travel and hospitality, and branded manufacturers personalise their customer experiences.",
	icon: "RichRelevance.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "richrelevance:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.richrelevance\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "richrelevance:jsGlobal:1",
			kind: "jsGlobal",
			property: "RR.U",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "richrelevance:jsGlobal:2",
			kind: "jsGlobal",
			property: "rr_v",
			valuePattern: new RegExp("([\\d.]+)"),
			confidence: 50,
			version: {
				source: "match",
				template: "$1\\",
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
