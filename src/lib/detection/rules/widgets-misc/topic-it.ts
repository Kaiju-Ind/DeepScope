import type { TechnologyDefinition } from '../../types';

export const topicItTechnologyDefinition = {
	id: "topic-it",
	name: "Topic'it",
	website: "https://topicit.net",
	description: "Topic'it is a tool that optimizes forums for mobile devices, enhancing usability and accessibility across smartphones and tablets.",
	icon: "TopicIt.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "topic-it:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("connect\\.topicit\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "topic-it:jsGlobal:1",
			kind: "jsGlobal",
			property: "topicit_action",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
