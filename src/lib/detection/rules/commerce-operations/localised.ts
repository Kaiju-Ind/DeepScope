import type { TechnologyDefinition } from '../../types';

export const localisedTechnologyDefinition = {
	id: "localised",
	name: "Localised",
	website: "https://www.localised.com",
	description: "Localised is local-first ecommerce platform.",
	icon: "Localised.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "localised:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("api\\.localised\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "localised:dom:1",
			kind: "dom",
			selector: "img[src*='localised.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "localised:html:2",
			kind: "html",
			pattern: new RegExp("\\b(?:api\\.)?localised\\.com\\b", "i"),
			confidence: 90,
			description: "Document HTML contains a Localised platform URL.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
