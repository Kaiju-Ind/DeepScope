import type { TechnologyDefinition } from '../../types';

export const quantcastChoiceTechnologyDefinition = {
	id: "quantcast-choice",
	name: "Quantcast Choice",
	website: "https://www.quantcast.com/products/choice-consent-management-platform",
	description: "Quantcast Choice is a free consent management platform to meet key privacy requirements stemming from ePrivacy Directive, GDPR, and CCPA.",
	icon: "Quantcast.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "quantcast-choice:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("quantcast\\.mgr\\.consensu\\.org"),
			description: "Script source URL matches a known technology marker.",
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
