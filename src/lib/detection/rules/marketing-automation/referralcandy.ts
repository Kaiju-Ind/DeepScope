import type { TechnologyDefinition } from '../../types';

export const referralcandyTechnologyDefinition = {
	id: "referralcandy",
	name: "ReferralCandy",
	website: "https://www.referralcandy.com",
	description: "ReferralCandy is a marketing platform that gets shoppers to refer their friends.",
	icon: "ReferralCandy.svg",
	categories: [
		"marketing-automation",
		"commerce-operations",
	],
	rules: [
		{
			id: "referralcandy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.referralcandy\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "referralcandy:dom:1",
			kind: "dom",
			selector: "iframe[src*='.referralcandy.com/'],li > a[href*='.referralcandy.com/'],div > a[href*='.referralcandy.com/'] ",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
