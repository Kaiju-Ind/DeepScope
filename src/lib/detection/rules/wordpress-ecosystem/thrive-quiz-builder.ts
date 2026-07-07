import type { TechnologyDefinition } from '../../types';

export const thriveQuizBuilderTechnologyDefinition = {
	id: "thrive-quiz-builder",
	name: "Thrive Quiz Builder",
	website: "https://thrivethemes.com/quizbuilder",
	description: "Thrive Quiz Builder is a powerful WordPress plugin that can help you to create quizzes for your website or blog.",
	icon: "Thrive.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "thrive-quiz-builder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/thrive-quiz-builder\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "thrive-quiz-builder:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/thrive-quiz-builder/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:thrivethemes:thrive_quiz_builder:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
