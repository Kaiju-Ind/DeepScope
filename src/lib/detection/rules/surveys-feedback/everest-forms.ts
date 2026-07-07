import type { TechnologyDefinition } from '../../types';

export const everestFormsTechnologyDefinition = {
	id: "everest-forms",
	name: "Everest Forms",
	website: "https://everestforms.net",
	description: "Everest Forms is a form builder plugin for creating customizable contact, registration, and submission forms on websites.",
	icon: "EverestForms.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "everest-forms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Everest Forms ([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
