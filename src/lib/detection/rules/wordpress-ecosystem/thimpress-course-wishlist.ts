import type { TechnologyDefinition } from '../../types';

export const thimpressCourseWishlistTechnologyDefinition = {
	id: "thimpress-course-wishlist",
	name: "ThimPress Course Wishlist",
	website: "https://wordpress.org/plugins/learnpress-wishlist",
	description: "Course Wishlist is a WordPress plugin by ThimPress. Course Wishlist bring wishlist feature for LearnPress.",
	icon: "ThimPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "thimpress-course-wishlist:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/learnpress-wishlist/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"thimpress-learnpress",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
