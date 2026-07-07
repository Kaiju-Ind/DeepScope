import type { TechnologyDefinition } from '../../types';

export const konfidencyReviewsTechnologyDefinition = {
	id: "konfidency-reviews",
	name: "Konfidency Reviews",
	website: "https://www.konfidency.com.br",
	description: "Konfidency Reviews is a platform that builds trust, boosts organic traffic, and supports purchasing decisions by providing reviews from customers who are familiar with the products.",
	icon: "KonfidencyReviews.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "konfidency-reviews:jsGlobal:0",
			kind: "jsGlobal",
			property: "konfidencyCustomer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "konfidency-reviews:jsGlobal:1",
			kind: "jsGlobal",
			property: "konfidencyLoader",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
