import type { TechnologyDefinition } from '../../types';

export const narvarTechnologyDefinition = {
	id: "narvar",
	name: "Narvar",
	website: "https://corp.narvar.com",
	description: "Narvar is a customer experience platform that helps retailers inspire long-term customer loyalty, at all steps of the post-purchase journey.",
	icon: "Narvar.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "narvar:dom:0",
			kind: "dom",
			selector: "a[href*='.narvar.com/'], img[src*='.narvar.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "narvar:jsGlobal:1",
			kind: "jsGlobal",
			property: "NARVARJS_URL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "narvar:jsGlobal:2",
			kind: "jsGlobal",
			property: "narvar",
			confidence: 1,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "narvar:header:3",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.narvar\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "narvar:header:4",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.narvar\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
