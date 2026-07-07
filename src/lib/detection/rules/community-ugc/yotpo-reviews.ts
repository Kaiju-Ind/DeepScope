import type { TechnologyDefinition } from '../../types';

export const yotpoReviewsTechnologyDefinition = {
	id: "yotpo-reviews",
	name: "Yotpo Reviews",
	website: "https://www.yotpo.com/platform/reviews/",
	description: "Yotpo is a user-generated content marketing platform.",
	icon: "Yotpo.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "yotpo-reviews:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.yotpo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yotpo-reviews:jsGlobal:1",
			kind: "jsGlobal",
			property: "yotpo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yotpo-reviews:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("(?!cdn-loyalty)\\.yotpo\\.com\\/"),
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
