import type { TechnologyDefinition } from '../../types';

export const mkdocsTechnologyDefinition = {
	id: "mkdocs",
	name: "MkDocs",
	website: "https://www.mkdocs.org/",
	description: "MkDocs is a static site generator, used for building project documentation.",
	icon: "mkdocs.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "mkdocs:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^mkdocs-([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:mkdocs:mkdocs:*:*:*:*:*:*:*:*",
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
