import type { TechnologyDefinition } from '../../types';

export const helpdocsTechnologyDefinition = {
	id: "helpdocs",
	name: "HelpDocs",
	website: "https://www.helpdocs.io",
	description: "HelpDocs is an knowledge management system.",
	icon: "HelpDocs.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "helpdocs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.helpdocs\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "helpdocs:jsGlobal:1",
			kind: "jsGlobal",
			property: "HDAnalytics",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "helpdocs:jsGlobal:2",
			kind: "jsGlobal",
			property: "HDUtils",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "helpdocs:jsGlobal:3",
			kind: "jsGlobal",
			property: "hd_instant_search",
			confidence: 50,
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
