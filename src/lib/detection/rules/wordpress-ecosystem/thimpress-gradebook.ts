import type { TechnologyDefinition } from '../../types';

export const thimpressGradebookTechnologyDefinition = {
	id: "thimpress-gradebook",
	name: "ThimPress Gradebook",
	website: "https://thimpress.com/product/gradebook-add-on-for-learnpress",
	description: "Gradebook is a WordPress plugin by ThimPress. Gradebook add-on for LearnPress makes it easier to track the students learning progress and result.",
	icon: "ThimPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "thimpress-gradebook:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/learnpress-gradebook/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
	requires: [
		"thimpress-learnpress",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
