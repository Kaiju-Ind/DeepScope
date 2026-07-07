import type { TechnologyDefinition } from '../../types';

export const cSideTechnologyDefinition = {
	id: "c-side",
	name: "c/side",
	website: "https://cside.dev",
	description: "c/side is a security solution that protects organizations from advanced client-side threats, including script injection, data skimming, and browser-based attacks.",
	icon: "cside.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "c-side:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cside\\.dev"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
