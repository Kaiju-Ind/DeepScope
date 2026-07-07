import type { TechnologyDefinition } from '../../types';

export const elasticsearchTechnologyDefinition = {
	id: "elasticsearch",
	name: "Elasticsearch",
	website: "https://www.elastic.co",
	description: "Elasticsearch is a search engine based on the Lucene library. It provides a distributed, multitenant-capable full-text search engine with an HTTP web interface and schema-free JSON documents.",
	icon: "Elasticsearch.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "elasticsearch:dom:0",
			kind: "dom",
			selector: "div#topsearchelastic_widget",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"recurring",
		],
		cpe: "cpe:2.3:a:elastic:elasticsearch:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
