import type { TechnologyDefinition } from '../../types';

export const hasuraTechnologyDefinition = {
	id: "hasura",
	name: "Hasura",
	website: "https://hasura.io",
	description: "Hasura is an open-source engine that enables developers to effortlessly create real-time GraphQL APIs by auto-generating them from existing database schemas.",
	icon: "Hasura.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "hasura:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hasura\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
			"payg",
			"poa",
		],
		cpe: "cpe:2.3:a:hasura:graphql_engine:*:*:*:*:*:*:*:*",
	},
	implies: [
		"graphql",
	],
} as const satisfies TechnologyDefinition;
