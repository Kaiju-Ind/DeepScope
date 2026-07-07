import type { TechnologyDefinition } from '../../types';

export const pubsubjsTechnologyDefinition = {
	id: "pubsubjs",
	name: "PubSubJS",
	website: "https://github.com/mroderick/PubSubJS",
	description: "PubSubJS is a topic-based publish/subscribe library written in JavaScript.",
	icon: "pubsub-js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "pubsubjs:jsGlobal:0",
			kind: "jsGlobal",
			property: "PubSub",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pubsubjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "PubSub.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
