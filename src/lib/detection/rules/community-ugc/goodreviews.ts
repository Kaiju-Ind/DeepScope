import type { TechnologyDefinition } from '../../types';

export const goodreviewsTechnologyDefinition = {
	id: "goodreviews",
	name: "GoodReviews",
	website: "https://goodreviews.io",
	description: "GoodReviews is a tool that displays and collects Google reviews to support online reputation management and customer feedback tracking.",
	icon: "GoodReview.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "goodreviews:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.goodreviews\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "goodreviews:jsGlobal:1",
			kind: "jsGlobal",
			property: "GoodReviewObject",
			description: "Page-owned global matches a known technology marker.",
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
