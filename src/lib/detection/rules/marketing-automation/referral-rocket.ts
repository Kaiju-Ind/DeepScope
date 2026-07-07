import type { TechnologyDefinition } from '../../types';

export const referralRocketTechnologyDefinition = {
	id: "referral-rocket",
	name: "Referral Rocket",
	website: "https://referralrocket.io",
	description: "Referral Rocket is a software solution for referral and affiliate marketing.",
	icon: "ReferralRocket.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "referral-rocket:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.referralrocket\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
