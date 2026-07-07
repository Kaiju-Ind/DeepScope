import type { TechnologyDefinition } from '../../types';

export const socialSnowballTechnologyDefinition = {
	id: "social-snowball",
	name: "Social Snowball",
	website: "https://socialsnowball.io",
	description: "Social Snowball is an affiliate and referral marketing platform tailored for ecommerce brands.",
	icon: "SocialSnowball.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "social-snowball:jsGlobal:0",
			kind: "jsGlobal",
			property: "snowballTrackScript",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "social-snowball:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_omappvp$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "social-snowball:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^social_snowball_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
