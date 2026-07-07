import type { TechnologyDefinition } from '../../types';

export const graphqlTechnologyDefinition = {
	id: "graphql",
	name: "GraphQL",
	website: "https://graphql.org/",
	description: "A query language for your API",
	categories: [
		"api-pattern",
	],
	rules: [
		{
			id: "graphql:html:modern:0",
			kind: "html",
			pattern: new RegExp("\\/graphql"),
			confidence: 65,
			description: "Document HTML matches a modern tooling marker.",
		},
		{
			id: "graphql:resourceUrl:modern:1",
			kind: "resourceUrl",
			pattern: new RegExp("graphql-request[.\\-@/]"),
			confidence: 65,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "graphql:resourceUrl:modern:2",
			kind: "resourceUrl",
			pattern: new RegExp("graphql-tag[.\\-@/]"),
			confidence: 65,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
		{
			id: "graphql:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("\"graphql\""),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "graphql:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("\"__typename\""),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "graphql:scriptContent:modern:5",
			kind: "scriptContent",
			pattern: new RegExp("\"__schema\""),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "graphql:scriptContent:modern:6",
			kind: "scriptContent",
			pattern: new RegExp("\"\\$[a-zA-Z]+\":.*\"kind\":\"Variable\""),
			confidence: 55,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "graphql:header:modern:7",
			kind: "header",
			key: "content-type",
			valuePattern: new RegExp("application\\/graphql"),
			confidence: 55,
			description: "HTTP response header matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;
