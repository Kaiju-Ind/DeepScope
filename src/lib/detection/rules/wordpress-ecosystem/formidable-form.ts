import type { TechnologyDefinition } from '../../types';

export const formidableFormTechnologyDefinition = {
	id: "formidable-form",
	name: "Formidable Form",
	website: "https://formidableforms.com",
	description: "Formidable Forms is a WordPress plugin that enables you to create quizzes, surveys, calculators, timesheets, multi-page application forms.",
	icon: "Formidable Form.png",
	categories: [
		"wordpress-ecosystem",
		"surveys-feedback",
	],
	rules: [
		{
			id: "formidable-form:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/formidable/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
