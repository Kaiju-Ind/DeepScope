import type { TechnologyDefinition } from '../../types';

export const reviewStarsTechnologyDefinition = {
	id: "review-stars",
	name: "Review Stars",
	website: "https://reviewstars.com/",
	description: "Review Stars is a digital marketing boutique that assists businesses in enhancing their positive online reputation using review generation technology.",
	icon: "ReviewStars.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "review-stars:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.reviewstars\\.com\\/"),
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
