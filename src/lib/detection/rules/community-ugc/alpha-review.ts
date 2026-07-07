import type { TechnologyDefinition } from '../../types';

export const alphaReviewTechnologyDefinition = {
	id: "alpha-review",
	name: "Alpha Review",
	website: "https://alph.kr",
	description: "Alpha Review is an in-store ecommerce review tool developed in Korea, designed to gather and display customer feedback directly within retail environments.",
	icon: "AlphaReview.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "alpha-review:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/alpha_au\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "alpha-review:jsGlobal:1",
			kind: "jsGlobal",
			property: "ALPHAREVIEW_FRONT_ALL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "alpha-review:jsGlobal:2",
			kind: "jsGlobal",
			property: "alpha_review_count_update",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "alpha-review:jsGlobal:3",
			kind: "jsGlobal",
			property: "alpha_review_count_update_on",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
