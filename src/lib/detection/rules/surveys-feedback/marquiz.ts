import type { TechnologyDefinition } from '../../types';

export const marquizTechnologyDefinition = {
	id: "marquiz",
	name: "Marquiz",
	website: "https://marquiz.io",
	description: "Marquiz is an online tool designed for creating user-friendly forms, quizzes, and surveys tailored for digital marketing.",
	icon: "Marquiz.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "marquiz:jsGlobal:0",
			kind: "jsGlobal",
			property: "webpackChunkmarquiz_quiz",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
