import type { TechnologyDefinition } from '../../types';

export const schemaOrgTechnologyDefinition = {
	id: "schema-org",
	name: "Schema.org Structured Data",
	website: "https://schema.org/",
	description: "Uses Schema.org structured data through JSON-LD, Microdata, or RDFa markers.",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "schema-org:html:jsonld-context",
			kind: "html",
			pattern: new RegExp("https?:\\\\/\\\\/schema\\.org|https?://schema\\.org", "i"),
			confidence: 90,
			description: "Document references Schema.org structured data context.",
		},
		{
			id: "schema-org:html:itemtype",
			kind: "html",
			pattern: new RegExp("itemtype=[\"\\']https?://schema\\.org/[^\"\\']+[\"\\']", "i"),
			confidence: 100,
			description: "Document uses Schema.org microdata itemtype.",
		},
	],
} as const satisfies TechnologyDefinition;
