import type { TechnologyDefinition } from '../../types';

export const reviewsIoTechnologyDefinition = {
	id: "reviews-io",
	name: "Reviews.io",
	website: "https://www.reviews.io",
	description: "Reviews.io is a review collection tool for companies to collect merchant (company) & product reviews from genuine customers, then share these on Google.",
	icon: "Reviews.io.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "reviews-io:dom:0",
			kind: "dom",
			selector: "a[href*='.reviews.io/company-reviews/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "reviews-io:jsGlobal:1",
			kind: "jsGlobal",
			property: "reviewsio_hasVoted",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "reviews-io:jsGlobal:2",
			kind: "jsGlobal",
			property: "reviewsio_shareLink",
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
