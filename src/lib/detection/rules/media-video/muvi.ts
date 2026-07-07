import type { TechnologyDefinition } from '../../types';

export const muviTechnologyDefinition = {
	id: "muvi",
	name: "Muvi",
	website: "https://www.muvi.com",
	description: "Muvi is a SaaS-based provider of over-the-top (OTT) platform solutions for video streaming, offering end-to-end infrastructure for content delivery and monetization.",
	icon: "Muvi.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "muvi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.muvi\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "muvi:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("www\\.muvi\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "muvi:meta:2",
			kind: "meta",
			key: "publisher",
			valuePattern: new RegExp("www\\.muvi\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
