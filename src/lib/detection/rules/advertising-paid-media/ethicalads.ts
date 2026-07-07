import type { TechnologyDefinition } from '../../types';

export const ethicaladsTechnologyDefinition = {
	id: "ethicalads",
	name: "EthicalAds",
	website: "https://www.ethicalads.io/",
	description: "EthicalAds is a privacy-focused advertising network for developer and technical audiences.",
	icon: "EthicalAds.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "ethicalads:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("media\\.ethicalads\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
