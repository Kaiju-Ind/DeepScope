import type { TechnologyDefinition } from '../../types';

export const optimonkTechnologyDefinition = {
	id: "optimonk",
	name: "OptiMonk",
	website: "https://www.optimonk.com",
	description: "OptiMonk is an on-site message toolkit used to improve conversions using action-based popups ad bars.",
	icon: "OptiMonk.svg",
	categories: [
		"commerce-operations",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "optimonk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.optimonk\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "optimonk:dom:1",
			kind: "dom",
			selector: "link[href*='.optimonk.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
