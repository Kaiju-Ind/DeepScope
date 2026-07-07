import type { TechnologyDefinition } from '../../types';

export const revbidTechnologyDefinition = {
	id: "revbid",
	name: "RevBid",
	website: "https://revbid.net",
	description: "RevBid is a header bidding platform designed for publishers to optimize ad revenue.",
	icon: "RevBid.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "revbid:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.revbid\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
