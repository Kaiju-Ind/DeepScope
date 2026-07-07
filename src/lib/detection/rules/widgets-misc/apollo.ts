import type { TechnologyDefinition } from '../../types';

export const apolloTechnologyDefinition = {
	id: "apollo",
	name: "Apollo",
	website: "https://www.apollographql.com",
	description: "Apollo is a fully-featured caching GraphQL client with integrations for React, Angular, and more.",
	icon: "Apollo.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "apollo:dom:0",
			kind: "dom",
			selector: "script#__APOLLO_STATE__",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "apollo:jsGlobal:1",
			kind: "jsGlobal",
			property: "__APOLLO_CLIENT__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apollo:jsGlobal:2",
			kind: "jsGlobal",
			property: "__APOLLO_CLIENT__.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apollo:jsGlobal:3",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.props.pageProps.__APOLLO_STATE__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apollo:header:4",
			kind: "header",
			key: "Access-Control-Allow-Headers",
			valuePattern: new RegExp("^x-apollo-tracing", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "apollo:jsGlobal:5",
			kind: "jsGlobal",
			property: "__APOLLO_STATE__",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"graphql",
		"typescript-confidence-50",
	],
} as const satisfies TechnologyDefinition;
