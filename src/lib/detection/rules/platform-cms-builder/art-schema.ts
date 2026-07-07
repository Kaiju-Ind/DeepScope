import type { TechnologyDefinition } from '../../types';

export const artSchemaTechnologyDefinition = {
	id: "art-schema",
	name: "Art Schema",
	website: "https://www.artschema.net",
	description: "Art Schema is a tool for creating websites with custom designs and data types, offering a template-free website building experience.",
	icon: "ArtSchema.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "art-schema:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.artschema\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
