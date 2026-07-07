import type { TechnologyDefinition } from '../../types';

export const purpleadsTechnologyDefinition = {
	id: "purpleads",
	name: "PurpleAds",
	website: "https://purpleads.io",
	description: "PurpleAds is an online advertising solution that businesses use to promote their products and services on Google Search, YouTube and other sites across the web.",
	icon: "PurpleAds.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "purpleads:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.purpleads\\.io\\/"),
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
