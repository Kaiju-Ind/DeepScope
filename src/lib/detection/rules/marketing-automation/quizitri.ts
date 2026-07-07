import type { TechnologyDefinition } from '../../types';

export const quizitriTechnologyDefinition = {
	id: "quizitri",
	name: "Quizitri",
	website: "https://www.quizitri.com",
	description: "Quizitri is a tool for creating unlimited quizzes aimed at increasing conversions, website traffic, lead generation, and sales.",
	icon: "Quizitri.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "quizitri:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.quizitri\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "quizitri:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.quizitri\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
