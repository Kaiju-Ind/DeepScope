import type { TechnologyDefinition } from '../../types';

export const communityFundedTechnologyDefinition = {
	id: "community-funded",
	name: "Community Funded",
	website: "https://www.communityfunded.com",
	description: "Community Funded is a digital fundraising and engagement platform.",
	icon: "Community Funded.png",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "community-funded:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/give\\.communityfunded\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "community-funded:dom:1",
			kind: "dom",
			selector: "a[href*='//give.communityfunded.com/']",
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
