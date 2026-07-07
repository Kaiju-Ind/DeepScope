import type { TechnologyDefinition } from '../../types';

export const schemaAppTechnologyDefinition = {
	id: "schema-app",
	name: "Schema App",
	website: "https://www.schemaapp.com",
	description: "Schema App is a tool that converts website content into schema markup, the language of search.",
	icon: "SchemaApp.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "schema-app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.schemaapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "schema-app:jsGlobal:1",
			kind: "jsGlobal",
			property: "schema_highlighter",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
