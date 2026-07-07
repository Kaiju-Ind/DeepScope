import type { TechnologyDefinition } from '../../types';

export const upfluenceTechnologyDefinition = {
	id: "upfluence",
	name: "Upfluence",
	website: "https://www.upfluence.com",
	description: "Upfluence is the all-in-one affiliate and influencer marketing platform for ecommerce and direct-to-consumer brands.",
	icon: "Upfluence.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "upfluence:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.upfluence\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "upfluence:dom:1",
			kind: "dom",
			selector: "link[href*='//uploader-upfluence-assets.s3']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
