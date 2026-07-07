import type { TechnologyDefinition } from '../../types';

export const docsifyTechnologyDefinition = {
	id: "docsify",
	name: "Docsify",
	website: "https://docsify.js.org",
	description: "Docsify is an open-source documentation generator for creating user-friendly documentation websites.",
	icon: "Docsify.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "docsify:jsGlobal:0",
			kind: "jsGlobal",
			property: "Docsify.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "docsify:jsGlobal:1",
			kind: "jsGlobal",
			property: "DocsifyCompiler",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:docsifyjs:docsify:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
