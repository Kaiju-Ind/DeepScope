import type { TechnologyDefinition } from '../../types';

export const yelpReviewBadgeTechnologyDefinition = {
	id: "yelp-review-badge",
	name: "Yelp Review Badge",
	website: "https://yelp.com",
	description: "Yelp Review Badges showcase business reviews from Yelp on websites.",
	icon: "Yelp.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "yelp-review-badge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("yelp\\.com\\/biz_badge_js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yelp-review-badge:dom:1",
			kind: "dom",
			selector: "img[src*='dyn.yelpcdn.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
