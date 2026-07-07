import type { TechnologyDefinition } from '../../types';

export const flampTechnologyDefinition = {
	id: "flamp",
	name: "Flamp",
	website: "https://flamp.ru",
	description: "Flamp is a city review widget that displays user-generated ratings and reviews of local businesses, helping visitors assess service quality and reputation.",
	icon: "Flamp.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "flamp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.flamp\\.ru"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
