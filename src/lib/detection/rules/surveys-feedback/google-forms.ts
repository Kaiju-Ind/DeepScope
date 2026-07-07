import type { TechnologyDefinition } from '../../types';

export const googleFormsTechnologyDefinition = {
	id: "google-forms",
	name: "Google Forms",
	website: "https://www.google.com/forms/about/",
	description: "Google Forms is a free online form builder that allows you to create and publish online forms, surveys, quizzes, order forms, and more.",
	icon: "Google Forms.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "google-forms:dom:0",
			kind: "dom",
			selector: "form[action*='docs.google.com/forms/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
