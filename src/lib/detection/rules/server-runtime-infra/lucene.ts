import type { TechnologyDefinition } from '../../types';

export const luceneTechnologyDefinition = {
	id: "lucene",
	name: "Lucene",
	website: "https://lucene.apache.org/core/",
	description: "Lucene is a free and open-source search engine software library.",
	icon: "Lucene.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:apache:lucene:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
