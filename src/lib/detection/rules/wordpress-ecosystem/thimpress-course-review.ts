import type { TechnologyDefinition } from '../../types';

export const thimpressCourseReviewTechnologyDefinition = {
	id: "thimpress-course-review",
	name: "ThimPress Course Review",
	website: "https://wordpress.org/plugins/learnpress-course-review",
	description: "Course Review is a WordPress plugin by ThimPress. Course Review gives students the opportunity to evaluate and provide feedback in order to improve the course.",
	icon: "ThimPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "thimpress-course-review:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/learnpress-course-review/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
