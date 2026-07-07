import type { TechnologyDefinition } from '../../types';

export const answerdashTechnologyDefinition = {
	id: "answerdash",
	name: "AnswerDash",
	website: "https://www.answerdash.com",
	description: "AnswerDash is a question and answer platform that serves business customers thereby reducing support costs and revealing customer needs.",
	icon: "AnswerDash.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "answerdash:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.answerdash\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "answerdash:jsGlobal:1",
			kind: "jsGlobal",
			property: "AnswerDash",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "answerdash:jsGlobal:2",
			kind: "jsGlobal",
			property: "AnswerDash.__plugin",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
