import type { TechnologyDefinition } from '../../types';

export const stepformTechnologyDefinition = {
	id: "stepform",
	name: "StepFORM",
	website: "https://stepform.io",
	description: "StepFORM is a form and quiz builder that enables the creation and management of interactive forms and quizzes for collecting responses and organizing submitted data.",
	icon: "StepForm.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "stepform:jsGlobal:0",
			kind: "jsGlobal",
			property: "stepFORM",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stepform:jsGlobal:1",
			kind: "jsGlobal",
			property: "stepFORMData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
