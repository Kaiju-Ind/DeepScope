import type { TechnologyDefinition } from '../../types';

export const reviewsUpTechnologyDefinition = {
	id: "reviews-up",
	name: "Reviews Up",
	website: "https://reviewsup.com",
	description: "Reviews Up is a platform that collects and displays user ratings and feedback to evaluate products, services, or experiences.",
	icon: "ReviewsUp.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "reviews-up:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.getreviewsup\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "reviews-up:jsGlobal:1",
			kind: "jsGlobal",
			property: "ReviewsUpWidgets",
			description: "Page-owned global matches a known technology marker.",
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
