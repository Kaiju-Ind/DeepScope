import type { TechnologyDefinition } from '../../types';

export const riddleTechnologyDefinition = {
	id: "riddle",
	name: "Riddle",
	website: "https://www.riddle.com",
	description: "Riddle is a platform enabling creation of lists, polls, and quizzes.",
	icon: "Riddle.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "riddle:jsGlobal:0",
			kind: "jsGlobal",
			property: "riddleAPI",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
