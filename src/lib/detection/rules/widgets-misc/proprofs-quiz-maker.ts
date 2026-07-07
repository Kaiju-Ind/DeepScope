import type { TechnologyDefinition } from '../../types';

export const proprofsQuizMakerTechnologyDefinition = {
	id: "proprofs-quiz-maker",
	name: "ProProfs Quiz Maker",
	website: "https://www.proprofs.com/quiz-school",
	description: "ProProfs Quiz Maker is a quiz-based widget builder that enables the creation of interactive quizzes for embedding on websites or digital platforms.",
	icon: "ProProfs.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "proprofs-quiz-maker:jsGlobal:0",
			kind: "jsGlobal",
			property: "GetSecureUrlProProfs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "proprofs-quiz-maker:jsGlobal:1",
			kind: "jsGlobal",
			property: "ProProfsSaveBotReport",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "proprofs-quiz-maker:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^pp_bot_kb_detail$", "i"),
			description: "Cookie name matches a known technology marker.",
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
