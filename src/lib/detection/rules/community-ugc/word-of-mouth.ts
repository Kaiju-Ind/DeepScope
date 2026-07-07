import type { TechnologyDefinition } from '../../types';

export const wordOfMouthTechnologyDefinition = {
	id: "word-of-mouth",
	name: "Word of Mouth",
	website: "https://www.wordofmouth.com.au",
	description: "Word of Mouth is a feedback platform that allows users to compare reviews and ratings for various services and businesses.",
	icon: "WOMO.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "word-of-mouth:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.womo\\.com\\.au\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
