import type { TechnologyDefinition } from '../../types';

export const jsonLdTechnologyDefinition = {
	id: "json-ld",
	name: "JSON-LD",
	website: "https://json-ld.org/",
	description: "Embeds JSON-LD structured data.",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "json-ld:html:0",
			kind: "html",
			pattern: new RegExp("<script[^>]+type=[\"\\']application/ld\\+json[\"\\']", "i"),
			confidence: 100,
			description: "Document embeds JSON-LD structured data.",
		},
	],
} as const satisfies TechnologyDefinition;
