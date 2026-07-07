import type { TechnologyDefinition } from '../../types';

export const sporcleTechnologyDefinition = {
	id: "sporcle",
	name: "Sporcle",
	website: "https://www.sporcle.com",
	description: "Sporkle is a trivia and quiz widget that provides interactive question-based content for testing knowledge across various topics through embedded or web-based quizzes.",
	icon: "Sporcle.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "sporcle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.sporcle\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
