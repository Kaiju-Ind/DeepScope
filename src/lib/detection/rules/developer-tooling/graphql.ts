import type { TechnologyDefinition } from '../../types';

export const graphqlTechnologyDefinition = {
	id: "graphql",
	name: "GraphQL",
	website: "https://graphql.org",
	description: "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.",
	icon: "GraphQL.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "graphql:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("graphql\\.[\\w]+\\.(?:com|net)\\/"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "graphql:meta:1",
			kind: "meta",
			key: "store-config",
			valuePattern: new RegExp("graphqlMethod", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "graphql:meta:2",
			kind: "meta",
			key: "store-config",
			valuePattern: new RegExp("graphqlmethod", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:graphql:graphql:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
