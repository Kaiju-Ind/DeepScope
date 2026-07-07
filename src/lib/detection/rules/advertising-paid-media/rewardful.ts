import type { TechnologyDefinition } from '../../types';

export const rewardfulTechnologyDefinition = {
	id: "rewardful",
	name: "Rewardful",
	website: "https://www.getrewardful.com/",
	description: "Rewardful is a way for SaaS companies to setup affiliate and referral programs with Stripe.",
	icon: "Rewardful.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "rewardful:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("r\\.wdfl\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rewardful:jsGlobal:1",
			kind: "jsGlobal",
			property: "Rewardful",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
