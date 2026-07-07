import type { TechnologyDefinition } from '../../types';

export const highlightIoTechnologyDefinition = {
	id: "highlight-io",
	name: "Highlight.io",
	website: "https://www.highlight.io/",
	description: "Highlight.io is a monitoring software for developers, offering visibility into applications with features like session replay, error monitoring, and logging to identify frontend and backend issues.",
	icon: "HighlightIO.svg",
	categories: [
		"analytics",
		"developer-tooling",
	],
	rules: [
		{
			id: "highlight-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("unpkg\\.com\\/highlight\\.run"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "highlight-io:jsGlobal:1",
			kind: "jsGlobal",
			property: "_highlightFetchPatch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "highlight-io:jsGlobal:2",
			kind: "jsGlobal",
			property: "_highlightWebSocketEventCallback",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
