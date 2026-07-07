import type { TechnologyDefinition } from '../../types';

export const answerbaseTechnologyDefinition = {
	id: "answerbase",
	name: "Answerbase",
	website: "https://answerbase.com",
	description: "Answerbase is a management platform for customer support and ecommerce, allowing users to ask questions, receive answers, and browse content and articles to meet their demand for information about products and services.",
	icon: "Answerbase.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "answerbase:jsGlobal:0",
			kind: "jsGlobal",
			property: "loadAnswerbaseCTAWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
