import type { TechnologyDefinition } from '../../types';

export const openGraphTechnologyDefinition = {
	id: "open-graph",
	name: "Open Graph",
	website: "https://ogp.me",
	description: "Open Graph metadata declares social sharing preview fields for a page.",
	icon: "Open Graph.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "open-graph:meta:title",
			kind: "meta",
			key: "og:title",
			confidence: 90,
			description: "Document declares og:title metadata.",
		},
		{
			id: "open-graph:meta:type",
			kind: "meta",
			key: "og:type",
			confidence: 90,
			description: "Document declares og:type metadata.",
		},
		{
			id: "open-graph:meta:image",
			kind: "meta",
			key: "og:image",
			confidence: 90,
			description: "Document declares og:image metadata.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
