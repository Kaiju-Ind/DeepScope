import type { TechnologyDefinition } from '../../types';

export const adLightningTechnologyDefinition = {
	id: "ad-lightning",
	name: "Ad Lightning",
	website: "https://www.adlightning.com",
	description: "Ad Lightning is an programmatic ads monitoring and audit service.",
	icon: "Ad Lightning.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "ad-lightning:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.adlightning\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
