import type { TechnologyDefinition } from '../../types';

export const feedspringTechnologyDefinition = {
	id: "feedspring",
	name: "FeedSpring",
	website: "https://www.feedspring.com",
	description: "FeedSpring is a platform that creates visually appealing social media feeds for websites.",
	icon: "FeedSpring.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "feedspring:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\.feedspring\\.co\\/"),
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
