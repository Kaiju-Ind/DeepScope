import type { TechnologyDefinition } from '../../types';

export const adglareTechnologyDefinition = {
	id: "adglare",
	name: "AdGlare",
	website: "https://www.adglare.com",
	description: "AdGlare is an ad serving solution designed for advertisers, publishers, and agencies.",
	icon: "AdGlare.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adglare:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.adglare\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
