import type { TechnologyDefinition } from '../../types';

export const readTheDocsTechnologyDefinition = {
	id: "read-the-docs",
	name: "Read the Docs",
	website: "https://about.readthedocs.com",
	description: "Read the Docs is a documentation platform that uses a Docs-as-Code workflow to provide versioned content, integrated previews, and secure authentication directly within standard Git development processes.",
	icon: "ReadtheDocs.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "read-the-docs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.readthedocs\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "read-the-docs:jsGlobal:1",
			kind: "jsGlobal",
			property: "ReadTheDocsEventData._data",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
		cpe: "cpe:2.3:a:readthedocs:read_the_docs:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
