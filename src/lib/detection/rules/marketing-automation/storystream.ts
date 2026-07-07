import type { TechnologyDefinition } from '../../types';

export const storystreamTechnologyDefinition = {
	id: "storystream",
	name: "StoryStream",
	website: "https://storystream.ai",
	description: "StoryStream is a content curation platform that specialises in user generated content.",
	icon: "StoryStream.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "storystream:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("apps\\.storystream\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
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
