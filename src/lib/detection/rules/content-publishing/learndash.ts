import type { TechnologyDefinition } from '../../types';

export const learndashTechnologyDefinition = {
	id: "learndash",
	name: "LearnDash",
	website: "https://www.learndash.com",
	description: "LearnDash is a WordPress plugin that enables the creation and management of online courses, quizzes, and educational content within a website.",
	icon: "LearnDash.svg",
	categories: [
		"content-publishing",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "learndash:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/sfwd-lms/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:learndash:learndash:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
