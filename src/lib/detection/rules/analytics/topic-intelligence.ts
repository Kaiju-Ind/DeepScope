import type { TechnologyDefinition } from '../../types';

export const topicIntelligenceTechnologyDefinition = {
	id: "topic-intelligence",
	name: "Topic Intelligence",
	website: "https://topicintelligence.ai",
	description: "Topic Intelligence is a platform that employs artificial intelligence to identify, analyze, and interpret underlying themes and concepts within textual data.",
	icon: "TopicIntelligence.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "topic-intelligence:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("platform\\.topicintelligence\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
