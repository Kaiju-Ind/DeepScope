import type { TechnologyDefinition } from '../../types';

export const bloomreachDiscoveryTechnologyDefinition = {
	id: "bloomreach-discovery",
	name: "Bloomreach Discovery",
	website: "https://www.bloomreach.com/en/products/discovery",
	description: "Bloomreach Discovery is a powerful combination of AI-powered site search, SEO, recommendations, and product merchandising.",
	icon: "Bloomreach.svg",
	categories: [
		"search",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "bloomreach-discovery:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.brsrvr\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bloomreach-discovery:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.brcdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bloomreach-discovery:jsGlobal:2",
			kind: "jsGlobal",
			property: "BrTrk.scriptVersion",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bloomreach-discovery:jsGlobal:3",
			kind: "jsGlobal",
			property: "br_data.acct_id",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
