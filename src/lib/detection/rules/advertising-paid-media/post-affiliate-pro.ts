import type { TechnologyDefinition } from '../../types';

export const postAffiliateProTechnologyDefinition = {
	id: "post-affiliate-pro",
	name: "Post Affiliate Pro",
	website: "https://www.postaffiliatepro.com",
	description: "Post Affiliate Pro is a software built for online stores and ecommerce websites that need to track and monitor their affiliate network.",
	icon: "Post Affiliate Pro.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "post-affiliate-pro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("postaffiliatepro\\.com\\/scripts\\/trackjs\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "post-affiliate-pro:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:affiliate|associate)\\..+\\/scripts\\/trackjs\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "post-affiliate-pro:jsGlobal:2",
			kind: "jsGlobal",
			property: "PostAffAction",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "post-affiliate-pro:jsGlobal:3",
			kind: "jsGlobal",
			property: "PostAffCookie",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "post-affiliate-pro:jsGlobal:4",
			kind: "jsGlobal",
			property: "PostAffInfo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "post-affiliate-pro:jsGlobal:5",
			kind: "jsGlobal",
			property: "PostAffTracker",
			description: "Page-owned global matches a known technology marker.",
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
